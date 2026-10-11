import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium, firefox } from 'playwright';
import { createServer } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createBrowserRPCObserver } from './browserRPCDiagnostics';
import { createBrowserModuleDiagnostics } from './moduleLoadDiagnostics';
import { observeBrowserLifecycle } from './browserLifecycleDiagnostics';
import type { AddressInfo } from 'node:net';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { ViteDevServer } from 'vite';
import type { BrowserLifecycleDiagnostic } from './browserLifecycleDiagnostics';

// Run the production startup script against a real fixture socket instead of a Vitest session.
const rpcClientFixture = {
  name: 'rpc-close-client-fixture',
  enforce: 'pre' as const,
  resolveId(id: string) {
    if (id === '@vitest/browser/client') return '\0rpc-close-client-fixture';
  },
  load(id: string) {
    if (id === '\0rpc-close-client-fixture') {
      return 'export const client = { ws: window.__RPC_DIAGNOSTIC_SOCKETS__[0] };';
    }
  }
};

declare global {
  interface Window {
    __RPC_DIAGNOSTIC_SOCKETS__: WebSocket[];
  }
}

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;
let server: ViteDevServer;
let origin: string;
let cacheDir: string;
let observer: ReturnType<typeof createBrowserRPCObserver>;

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  cacheDir = await mkdtemp(join(tmpdir(), 'rsuite-rpc-diagnostics-'));
  server = await createServer({
    appType: 'custom',
    configFile: false,
    logLevel: 'silent',
    cacheDir,
    optimizeDeps: { noDiscovery: true, entries: [] },
    plugins: [rpcClientFixture],
    server: { host: '127.0.0.1', port: 0, hmr: { path: '/__vitest_browser_api__' } }
  });
  server.middlewares.use((_request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end('<!doctype html><title>RPC diagnostics</title>');
  });
  await server.listen();
  origin = `http://127.0.0.1:${(server.httpServer?.address() as AddressInfo).port}`;
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[RPC diagnostics browser]', engine, browser.version());
});

beforeEach(async () => {
  observer = createBrowserRPCObserver();
  server.httpServer?.on('upgrade', observer.observeConnection);
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(origin);
  await page.evaluate(() => {
    window.__RPC_DIAGNOSTIC_SOCKETS__ = [];
  });
});

afterEach(async () => {
  server.httpServer?.off('upgrade', observer.observeConnection);
  observer.dispose();
  await context?.close();
  await expect.poll(() => server.ws.clients.size).toBe(0);
});

afterAll(async () => {
  try {
    await browser?.close();
  } finally {
    try {
      await server?.close();
    } finally {
      if (cacheDir) await rm(cacheDir, { recursive: true, force: true });
    }
  }
});

async function connect(role = 'tester', count = 1) {
  const url = new URL('/__vitest_browser_api__', origin.replace('http:', 'ws:'));
  url.searchParams.set('token', server.config.webSocketToken);
  url.searchParams.set('type', role);
  url.searchParams.set('sessionId', 'private-session-value');
  url.searchParams.set('private', 'private-query-value');
  await page.evaluate(
    async ({ url, count }) => {
      await Promise.all(
        Array.from(
          { length: count },
          () =>
            new Promise<void>((resolve, reject) => {
              const socket = new WebSocket(url, 'vite-hmr');
              window.__RPC_DIAGNOSTIC_SOCKETS__.push(socket);
              socket.onopen = () => resolve();
              socket.onerror = () => reject(new Error('Fixture connection failed'));
            })
        )
      );
    },
    { url: url.href, count }
  );
}

async function installCloseDiagnostic() {
  const errors: string[] = [];
  const onError = (error: Error) => errors.push(error.message);
  page.on('pageerror', onError);
  try {
    await page.addScriptTag({
      type: 'module',
      url: `${origin}/test/browser/browserRPCClose.orchestrator.js`
    });
    expect(errors).toEqual([]);
  } finally {
    page.off('pageerror', onError);
  }
}

describe('Browser RPC transport diagnostics', () => {
  it('retains the plugin snapshot when Vite stops before the browser page', async () => {
    const { plugin } = createBrowserModuleDiagnostics();
    const fixture = await createServer({
      appType: 'custom',
      configFile: false,
      logLevel: 'silent',
      cacheDir: join(cacheDir, 'shutdown'),
      optimizeDeps: { noDiscovery: true, entries: [] },
      plugins: [plugin],
      server: { host: '127.0.0.1', port: 0, hmr: { path: '/__vitest_browser_api__' } }
    });
    try {
      await fixture.listen();
      const address = fixture.httpServer?.address() as AddressInfo;
      const url = `ws://127.0.0.1:${address.port}/__vitest_browser_api__?type=orchestrator&sessionId=private-session&token=${fixture.config.webSocketToken}`;
      await page.evaluate(
        url =>
          new Promise<void>((resolve, reject) => {
            const socket = new WebSocket(url, 'vite-hmr');
            window.__RPC_DIAGNOSTIC_SOCKETS__.push(socket);
            socket.onopen = () => resolve();
            socket.onerror = () => reject(new Error('Fixture connection failed'));
          }),
        url
      );
      expect(plugin.api?.rpc.snapshot().active).toHaveLength(1);
      const diagnostics: (BrowserLifecycleDiagnostic & { stoppedAt: number | null })[] = [];
      observeBrowserLifecycle(page, origin, diagnostic => {
        diagnostics.push({ ...diagnostic, stoppedAt: plugin.api!.rpc.snapshot().stoppedAt });
      });
      await installCloseDiagnostic();
      await fixture.close();
      await expect
        .poll(() => diagnostics.filter(event => event.event === 'rpc-close').length)
        .toBe(1);
      const close = diagnostics.find(event => event.event === 'rpc-close')!;
      expect(close.stoppedAt).toBeGreaterThan(0);
      expect(close.browserConnected).toBe(true);
      const final = plugin.api?.rpc.snapshot();
      expect([...(final?.active || []), ...(final?.closed || [])]).toHaveLength(1);
      expect(final?.stoppedAt).toBeGreaterThan(0);
      expect(page.isClosed()).toBe(false);
      await page.close();
      expect(plugin.api?.rpc.snapshot()).toEqual(final);
    } finally {
      await fixture.close();
    }
  });

  it.each([1000, 1001, 'terminate'] as const)(
    'records the browser close event for %s while the server and page are still running',
    async method => {
      const diagnostics: BrowserLifecycleDiagnostic[] = [];
      const report = (diagnostic: BrowserLifecycleDiagnostic) => diagnostics.push(diagnostic);
      const snapshot = observeBrowserLifecycle(page, origin, report);
      expect(observeBrowserLifecycle(page, origin, report)).toBe(snapshot);
      await connect('orchestrator');
      await installCloseDiagnostic();
      expect(server.ws.clients.size).toBe(1);
      expect(observer.snapshot().active.map(connection => connection.role)).toEqual([
        'orchestrator'
      ]);
      expect(diagnostics).toEqual([]);
      for (const client of server.ws.clients) {
        if (method === 'terminate') client.socket.terminate();
        else client.socket.close(method, 'private-close-reason');
      }
      await expect.poll(() => diagnostics.length).toBe(1);
      expect(diagnostics[0]).toMatchObject({
        event: 'rpc-close',
        code: method === 'terminate' ? 1006 : method,
        wasClean: method !== 'terminate',
        browserConnected: true
      });
      expect(observer.snapshot().stoppedAt).toBeNull();
      expect(page.isClosed()).toBe(false);
      expect(await page.title()).toBe('RPC diagnostics');
      expect(JSON.stringify(diagnostics)).not.toContain('private-');
      expect(JSON.stringify(diagnostics)).not.toContain(server.config.webSocketToken);
    }
  );

  it('captures early orchestrators and testers without recording their URLs or messages', async () => {
    await connect('orchestrator');
    await connect('tester');
    const initial = observer.snapshot();
    expect(initial.active.map(connection => connection.role)).toEqual(['orchestrator', 'tester']);
    expect(new Set(initial.active.map(connection => connection.session)).size).toBe(1);
    expect(initial.active[0].session).toMatch(/^[a-f0-9]{12}$/);

    await page.evaluate(() => {
      window.__RPC_DIAGNOSTIC_SOCKETS__[0].send(
        JSON.stringify({
          type: 'custom',
          event: 'private-message-event',
          data: 'private-message-value'
        })
      );
    });
    for (const client of server.ws.clients) client.socket.send('private-response-value');
    await expect
      .poll(() => observer.snapshot().active[0].bytesRead)
      .toBeGreaterThan(initial.active[0].bytesRead);
    await expect
      .poll(() => observer.snapshot().active[0].bytesWritten)
      .toBeGreaterThan(initial.active[0].bytesWritten);
    const serialized = JSON.stringify(observer.snapshot());
    expect(serialized).not.toContain('private-');
    expect(serialized).not.toContain(server.config.webSocketToken);
    expect(serialized).not.toContain(origin);
    expect(observer.snapshot().closed).toEqual([]);
  });

  it('records a peer close before the healthy page and browser are closed', async () => {
    await connect();
    for (const client of server.ws.clients) client.socket.close(1000, 'private-close-reason');
    await expect.poll(() => observer.snapshot().closed.length).toBe(1);
    const snapshot = observer.snapshot();
    expect(snapshot.active).toEqual([]);
    expect(snapshot.closed[0]).toMatchObject({ role: 'tester', hadError: false });
    expect(snapshot.closed[0].endedAt).toBeGreaterThanOrEqual(snapshot.closed[0].openedAt);
    expect(snapshot.closed[0].closedAt).toBeGreaterThanOrEqual(snapshot.closed[0].endedAt!);
    expect(page.isClosed()).toBe(false);
    expect(browser.isConnected()).toBe(true);
    expect(await page.title()).toBe('RPC diagnostics');
    expect(JSON.stringify(snapshot)).not.toContain('private-');
  });

  it('bounds active and closed records and preserves previously returned snapshots', async () => {
    await connect('orchestrator');
    await connect('tester', 33);
    const initial = observer.snapshot();
    expect(initial.active).toHaveLength(32);
    expect(initial.active[0].role).toBe('orchestrator');
    expect(initial.droppedConnections).toBe(2);
    await page.evaluate(async () => {
      await Promise.all(
        window.__RPC_DIAGNOSTIC_SOCKETS__.map(
          socket =>
            new Promise<void>(resolve => {
              socket.onclose = () => resolve();
              socket.close();
            })
        )
      );
    });
    await expect.poll(() => observer.snapshot().active.length).toBe(0);
    expect(observer.snapshot().closed).toHaveLength(16);
    expect(observer.snapshot().droppedConnections).toBe(2);
    expect(initial.active.every(connection => connection.closedAt === null)).toBe(true);
    await connect();
    expect(observer.snapshot().active).toHaveLength(1);
  });

  it('ignores unrelated upgrade purposes and detaches without closing sockets', async () => {
    await connect('unrelated');
    expect(observer.snapshot().active).toEqual([]);
    await connect();
    expect(observer.snapshot().active).toHaveLength(1);
    observer.dispose();
    const final = observer.snapshot();
    expect(final.active).toHaveLength(1);
    expect(final.stoppedAt).toBeGreaterThanOrEqual(final.active[0].openedAt);
    expect(
      await page.evaluate(() =>
        window.__RPC_DIAGNOSTIC_SOCKETS__.every(socket => socket.readyState === WebSocket.OPEN)
      )
    ).toBe(true);
    for (const client of server.ws.clients) client.socket.close();
    await expect.poll(() => server.ws.clients.size).toBe(0);
    expect(observer.snapshot()).toEqual(final);
    observer.dispose();
    expect(observer.snapshot()).toEqual(final);
  });
});
