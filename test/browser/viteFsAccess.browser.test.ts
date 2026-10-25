import { mkdtemp, realpath, rm, writeFile } from 'node:fs/promises';
import { get } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer } from 'vite';
import type { AddressInfo } from 'node:net';
import type { ViteDevServer } from 'vite';

const sentinel = 'task-owned-vite-fs-access-control';
const deniedFiles = ['.env', 'private.pem', 'secret.txt'];
const queries = [
  '',
  '?raw',
  '?import&raw',
  '?raw&unused=1',
  '?url',
  '?import&url',
  '?inline',
  '?import&url&inline'
];
let directory: string;
let server: ViteDevServer | undefined;
let origin: string;

function request(pathname: string) {
  return new Promise<{ status: number | undefined; body: string }>((resolve, reject) => {
    const request = get(origin + pathname, { agent: false }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => {
        body += chunk;
      });
      response.on('end', () => resolve({ status: response.statusCode, body }));
      response.on('error', reject);
    });
    request.setTimeout(5000, () => request.destroy(new Error('Loopback request timed out')));
    request.on('error', reject);
  });
}

beforeAll(async () => {
  directory = await realpath(await mkdtemp(join(tmpdir(), 'rsuite-vite-fs-')));
  await Promise.all(
    [...deniedFiles, 'allowed.txt'].map(file =>
      writeFile(join(directory, file), `${sentinel}:${file}\n`)
    )
  );
  server = await createServer({
    root: directory,
    configFile: false,
    logLevel: 'silent',
    appType: 'custom',
    server: {
      host: '127.0.0.1',
      port: 0,
      strictPort: true,
      fs: {
        strict: true,
        allow: [directory],
        deny: ['**/.env', '**/*.pem', '**/secret.txt']
      }
    }
  });
  await server.listen();
  origin = `http://127.0.0.1:${(server.httpServer!.address() as AddressInfo).port}`;
});

afterAll(async () => {
  try {
    await server?.close();
  } finally {
    if (directory) await rm(directory, { recursive: true, force: true });
  }
});

describe('Vite development server filesystem access', () => {
  it.each(deniedFiles)('denies %s with and without transform queries', async file => {
    for (const pathname of ['/' + file, '/@fs/' + join(directory, file)]) {
      for (const query of queries) {
        const response = await request(pathname + query);
        expect(response.status, pathname + query).toBe(403);
        expect(response.body).not.toContain(sentinel);
      }
    }
  });

  it('still serves allowed files and their raw contents', async () => {
    for (const pathname of ['/allowed.txt', '/@fs/' + join(directory, 'allowed.txt')]) {
      for (const query of queries) {
        const response = await request(pathname + query);
        expect(response.status, pathname + query).toBe(200);
        if (query.includes('raw')) expect(response.body).toContain(sentinel);
      }
    }
  });
});
