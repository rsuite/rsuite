import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function serve(root) {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
      const file = path.resolve(root, relative.endsWith('/') ? relative + 'index.html' : relative);
      if (!file.startsWith(path.resolve(root) + path.sep)) throw new Error('Invalid path');
      const bytes = await fs.readFile(file);
      const type = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
      }[path.extname(file)];
      response.writeHead(200, {
        'Content-Type': type ?? 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      response.end(bytes);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return {
    url: 'http://127.0.0.1:' + server.address().port,
    close: () =>
      new Promise((resolve, reject) => server.close(error => (error ? reject(error) : resolve())))
  };
}
