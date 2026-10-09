import { createServer } from 'node:http';
import { once } from 'node:events';
import { chromium, firefox } from 'playwright';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createModuleRequestObserver, observeModuleLoads } from './moduleLoadDiagnostics';
import type { AddressInfo } from 'node:net';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { ModuleLoadDiagnostic } from './moduleLoadDiagnostics';

const engine = process.env.BROWSER || 'chromium';
let browser: Browser;
let context: BrowserContext;
let page: Page;
let origin: string;
let failChangedModule = false;
let serverObserver = createModuleRequestObserver();
const requests = new Map<string, number>();
let diagnostics: ModuleLoadDiagnostic[];

const server = createServer((request, response) => {
  serverObserver.middleware(request, response, () => {
    const pathname = new URL(request.url!, 'http://localhost').pathname;
    requests.set(pathname, (requests.get(pathname) || 0) + 1);
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'text/javascript');
    if (pathname === '/') {
      response.setHeader('Content-Type', 'text/html');
      response.end(`<!doctype html><title>Module diagnostics</title><script>
      window.loadModule = async pathname => {
        try {
          return { value: (await import(pathname)).default };
        } catch {
          return { failed: true };
        }
      };
    </script>`);
    } else if (pathname === '/missing.js') {
      response.statusCode = 404;
      response.end('Missing module');
    } else if (pathname === '/html.js') {
      response.setHeader('Content-Type', 'text/html');
      response.setHeader('X-Private-Token', 'fixture-not-for-logs');
      response.end('<!doctype html><title>Wrong module response</title>');
    } else if (pathname === '/interrupted.js') {
      response.setHeader('Content-Length', '10000');
      response.write('export default 42;');
      setImmediate(() => response.destroy());
    } else if (pathname === '/revalidated.js') {
      response.setHeader('Cache-Control', 'no-cache');
      response.setHeader('ETag', 'W/"diagnostic-module"');
      if (failChangedModule) {
        response.statusCode = 503;
        response.end('Temporarily unavailable');
      } else if (request.headers['if-none-match'] === 'W/"diagnostic-module"') {
        response.statusCode = 304;
        response.end();
      } else {
        response.end('export default 42;');
      }
    } else if (pathname === '/changing.js' && failChangedModule) {
      response.statusCode = 503;
      response.end('Temporarily unavailable');
    } else {
      response.end('export default 42;');
    }
  });
});

// Serve the import expression as HTML so Vite's Node transform cannot rewrite it.
const importModule = (pathname: string) =>
  page.evaluate(pathname => (window as any).loadModule(pathname), pathname);

beforeAll(async () => {
  if (!['chromium', 'firefox'].includes(engine)) throw new Error(`Unknown browser: ${engine}`);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  browser = await (engine === 'firefox' ? firefox : chromium).launch({ headless: true });
  console.info('[Module diagnostics browser]', engine, browser.version());
});

beforeEach(async () => {
  requests.clear();
  serverObserver = createModuleRequestObserver();
  failChangedModule = false;
  diagnostics = [];
  context = await browser.newContext();
  page = await context.newPage();
  observeModuleLoads(page, origin, diagnostic => diagnostics.push(diagnostic));
  await page.goto(origin);
});

afterEach(async () => {
  await context?.close();
});

afterAll(async () => {
  await browser?.close();
  if (server.listening) await new Promise<void>(resolve => server.close(() => resolve()));
});

describe('Browser module response diagnostics', () => {
  it('leaves successful module imports unchanged', async () => {
    expect(await importModule('/ok.js')).toEqual({ value: 42 });
    expect(diagnostics).toEqual([]);
    expect(requests.get('/ok.js')).toBe(1);
  });

  it('reports the HTTP status of a missing module without retrying it', async () => {
    observeModuleLoads(page, origin, diagnostic => diagnostics.push(diagnostic));
    expect(await importModule('/missing.js')).toEqual({ failed: true });
    expect(diagnostics.filter(diagnostic => diagnostic.event === 'response')).toHaveLength(1);
    expect(diagnostics).toContainEqual({
      event: 'response',
      url: `${origin}/missing.js`,
      response: {
        status: 404,
        headers: expect.objectContaining({ 'content-type': 'text/javascript' })
      },
      lastSuccessfulResponse: null
    });
    expect(requests.get('/missing.js')).toBe(1);
  });

  it('reports a 200 response with an invalid module type using only diagnostic headers', async () => {
    expect(await importModule('/html.js')).toEqual({ failed: true });
    expect(diagnostics).toContainEqual({
      event: 'response',
      url: `${origin}/html.js`,
      response: {
        status: 200,
        headers: expect.objectContaining({
          'content-type': 'text/html',
          'cache-control': 'no-store'
        })
      },
      lastSuccessfulResponse: null
    });
    expect(JSON.stringify(diagnostics)).not.toContain('fixture-not-for-logs');
    expect(requests.get('/html.js')).toBe(1);
  });

  it('retains the previous complete response when a later import fails', async () => {
    const finished = page.waitForEvent('requestfinished', request =>
      request.url().endsWith('/changing.js')
    );
    const [, result] = await Promise.all([finished, importModule('/changing.js')]);
    expect(result).toEqual({ value: 42 });
    failChangedModule = true;
    await page.reload();
    expect(await importModule('/changing.js')).toEqual({ failed: true });
    expect(diagnostics).toContainEqual({
      event: 'response',
      url: `${origin}/changing.js`,
      response: { status: 503, headers: expect.any(Object) },
      lastSuccessfulResponse: {
        status: 200,
        headers: expect.objectContaining({ 'content-type': 'text/javascript' })
      }
    });
    expect(requests.get('/changing.js')).toBe(2);
  });

  it('observes a valid cached module revalidation without changing it', async () => {
    expect(await importModule('/revalidated.js')).toEqual({ value: 42 });
    await page.reload();
    expect(await importModule('/revalidated.js')).toEqual({ value: 42 });
    expect(requests.get('/revalidated.js')).toBe(2);
    const history = serverObserver.getRecentRequests(`${origin}/revalidated.js`);
    expect(history.map(request => request.status)).toEqual([200, 304]);
    expect(history.every(request => request.finished)).toBe(true);
    expect(history[0].headers['if-none-match']).toBeUndefined();
    expect(history[1].headers['if-none-match']).toBe('W/"diagnostic-module"');
    expect(diagnostics).toEqual([]);
  });

  it('records the server conditional headers when a cached module later fails', async () => {
    await context.setExtraHTTPHeaders({ 'X-Private-Token': 'request-not-for-logs' });
    expect(await importModule('/revalidated.js')).toEqual({ value: 42 });
    failChangedModule = true;
    await page.reload();
    expect(await importModule('/revalidated.js')).toEqual({ failed: true });
    expect(requests.get('/revalidated.js')).toBe(2);
    const history = serverObserver.getRecentRequests(`${origin}/revalidated.js`);
    expect(history.map(request => request.status)).toEqual([200, 503]);
    expect(history[1]).toEqual({
      time: expect.any(Number),
      method: 'GET',
      headers: expect.objectContaining({ 'if-none-match': 'W/"diagnostic-module"' }),
      status: 503,
      finished: true
    });
    expect(JSON.stringify(history)).not.toContain('request-not-for-logs');
    expect(diagnostics).toContainEqual({
      event: 'response',
      url: `${origin}/revalidated.js`,
      response: { status: 503, headers: expect.any(Object) },
      lastSuccessfulResponse: {
        status: 200,
        headers: expect.objectContaining({ etag: 'W/"diagnostic-module"' })
      }
    });
  });

  it('records a transport failure even when the response cannot finish', async () => {
    expect(await importModule('/interrupted.js')).toEqual({ failed: true });
    expect(diagnostics).toContainEqual(
      expect.objectContaining({
        event: 'requestfailed',
        url: `${origin}/interrupted.js`,
        error: expect.any(String)
      })
    );
  });
});
