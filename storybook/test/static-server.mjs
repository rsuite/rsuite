import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

export async function serveStatic(directory) {
  const server = http.createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const file = path.resolve(directory, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(directory + path.sep)) {
        response.writeHead(403).end();
        return;
      }
      const bytes = fs.readFileSync(file);
      response.writeHead(200, {
        'Content-Type': mime[path.extname(file)] || 'application/octet-stream'
      });
      response.end(bytes);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return {
    origin: 'http://127.0.0.1:' + server.address().port,
    close: () => new Promise(resolve => server.close(resolve))
  };
}
