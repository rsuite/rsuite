import type { Server } from 'node:http';

/** Release fixture connections, including sockets that have not sent HTTP headers. */
export function closeServer(server: Server): Promise<void> {
  if (!server.listening) return Promise.resolve();
  return new Promise((resolve, reject) => {
    server.close(error => (error ? reject(error) : resolve()));
    // Stop accepting connections first, then release unfinished fixture requests.
    server.closeAllConnections();
  });
}
