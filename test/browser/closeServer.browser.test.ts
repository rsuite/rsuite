import { once } from 'node:events';
import { createServer, get } from 'node:http';
import { connect } from 'node:net';
import { expect, it } from 'vitest';
import { closeServer } from './closeServer';
import type { AddressInfo } from 'node:net';

it('closes a server after a completed HTTP response', async () => {
  const server = createServer((_request, response) => response.end('fixture'));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const body = await new Promise<string>((resolve, reject) => {
      get(`http://127.0.0.1:${(server.address() as AddressInfo).port}`, response => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', chunk => (body += chunk));
        response.on('end', () => resolve(body));
        response.on('error', reject);
      }).on('error', reject);
    });
    expect(body).toBe('fixture');
  } finally {
    await closeServer(server);
  }
  expect(server.listening).toBe(false);
});

it.each(['', 'GET / HTTP/1.1\r\nHost: localhost\r\n'])(
  'closes a fixture with an unfinished client request: %j',
  async request => {
    const server = createServer((_request, response) => response.end('fixture'));
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const accepted = once(server, 'connection');
    const socket = connect((server.address() as AddressInfo).port, '127.0.0.1');
    let closing: Promise<void> | undefined;
    try {
      const [[serverSocket]] = await Promise.all([accepted, once(socket, 'connect')]);
      if (request) {
        const received = once(serverSocket, 'data');
        socket.write(request);
        await received;
      }
      let closed = false;
      closing = closeServer(server).then(() => {
        closed = true;
      });
      // Closing the listener alone is insufficient: the callback must settle too.
      await expect.poll(() => closed, { timeout: 1000 }).toBe(true);
      expect(server.listening).toBe(false);
      expect(serverSocket.destroyed).toBe(true);
    } finally {
      socket.destroy();
      server.closeAllConnections();
      await (closing || closeServer(server));
    }
  }
);

it('allows cleanup before startup and after shutdown', async () => {
  const server = createServer();
  await closeServer(server);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  await closeServer(server);
  await closeServer(server);
  expect(server.listening).toBe(false);
});
