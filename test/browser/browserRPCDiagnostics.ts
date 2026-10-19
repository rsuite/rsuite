import { createHash } from 'node:crypto';
import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';

interface RPCConnection {
  id: number;
  role: 'tester' | 'orchestrator';
  session: string;
  openedAt: number;
  endedAt: number | null;
  closedAt: number | null;
  hadError: boolean | null;
  bytesRead: number;
  bytesWritten: number;
}

interface RPCSnapshot {
  active: RPCConnection[];
  closed: RPCConnection[];
  droppedConnections: number;
  stoppedAt: number | null;
}

/** Observe RPC transports from server startup, including connections opened before test setup. */
export function createBrowserRPCObserver() {
  const active = new Map<Socket, { record: RPCConnection; detach: () => void }>();
  const closed: RPCConnection[] = [];
  let nextId = 0;
  let droppedConnections = 0;
  let finalSnapshot: RPCSnapshot | undefined;
  const describe = (socket: Socket, record: RPCConnection) => ({
    ...record,
    bytesRead: socket.bytesRead,
    bytesWritten: socket.bytesWritten
  });

  return {
    observeConnection(request: IncomingMessage, socket: Socket) {
      if (finalSnapshot) return;
      const url = new URL(request.url || '/', 'http://localhost');
      const role = url.searchParams.get('type');
      if (
        url.pathname !== '/__vitest_browser_api__' ||
        (role !== 'tester' && role !== 'orchestrator') ||
        active.has(socket)
      ) {
        return;
      }
      // Keep long-lived orchestrators while retaining a bounded history of finished testers.
      if (active.size >= 32) {
        droppedConnections++;
        return;
      }
      const record: RPCConnection = {
        id: ++nextId,
        role,
        // Correlate the two RPC roles without recording tokens, raw URLs or payloads.
        session: createHash('sha256')
          .update(url.searchParams.get('sessionId') || '')
          .digest('hex')
          .slice(0, 12),
        openedAt: Date.now(),
        endedAt: null,
        closedAt: null,
        hadError: null,
        bytesRead: socket.bytesRead,
        bytesWritten: socket.bytesWritten
      };
      const onEnd = () => {
        record.endedAt = Date.now();
      };
      const detach = () => {
        socket.off('end', onEnd);
        socket.off('close', onClose);
      };
      const onClose = (hadError: boolean) => {
        record.closedAt = Date.now();
        record.hadError = hadError;
        closed.push(describe(socket, record));
        if (closed.length > 16) closed.shift();
        active.delete(socket);
        detach();
      };
      active.set(socket, { record, detach });
      socket.once('end', onEnd);
      socket.once('close', onClose);
    },
    snapshot() {
      if (finalSnapshot) {
        return {
          ...finalSnapshot,
          active: finalSnapshot.active.map(record => ({ ...record })),
          closed: finalSnapshot.closed.map(record => ({ ...record }))
        };
      }
      return {
        active: Array.from(active, ([socket, { record }]) => describe(socket, record)),
        closed: closed.map(record => ({ ...record })),
        droppedConnections,
        stoppedAt: null
      };
    },
    dispose() {
      if (finalSnapshot) return;
      // Vitest may close Vite before Playwright pages. Preserve the final bounded snapshot.
      finalSnapshot = {
        active: Array.from(active, ([socket, { record }]) => describe(socket, record)),
        closed: closed.map(record => ({ ...record })),
        droppedConnections,
        stoppedAt: Date.now()
      };
      active.forEach(({ detach }) => detach());
      active.clear();
      closed.length = 0;
    }
  };
}
