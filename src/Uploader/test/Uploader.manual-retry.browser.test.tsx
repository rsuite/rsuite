import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.manual-retry.client';

describe('Uploader manual retry batch completion with native HTTP', () => {
  const requests: { scenario: string; body: string; response: ServerResponse }[] = [];
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.manual-retry.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const upload = { scenario: url.searchParams.get('scenario')!, body: '', response };
          request.setEncoding('utf8');
          request.on('data', chunk => (upload.body += chunk));
          request.on('end', () => requests.push(upload));
        });
      }
    });
    console.info('Uploader manual retry browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());
  const snapshot = (page: Page) => page.evaluate(() => window.__RSUITE_MANUAL_RETRY__.snapshot());
  const uploadsFor = (scenario: string) => requests.filter(upload => upload.scenario === scenario);

  for (const listType of ['text', 'picture', 'picture-text'] as const) {
    for (const controlled of [false, true]) {
      for (const startOnRetry of [false, true]) {
        for (const status of [200, 500]) {
          const scenario = `${listType}-${controlled}-${startOnRetry}-${status}`;
          it(`finishes actual attempts and the next batch: ${scenario}`, async () => {
            const page = await source.browser.newPage();
            const errors: string[] = [];
            page.on('pageerror', error => errors.push(String(error)));
            try {
              await page.goto(source.url);
              await page.waitForFunction(() => Boolean(window.__RSUITE_MANUAL_RETRY__));
              expect(await page.evaluate(() => window.__RSUITE_MANUAL_RETRY__.runtime)).toEqual({
                react: source.reactVersion,
                reactDOM: source.reactVersion
              });
              await page.evaluate(options => window.__RSUITE_MANUAL_RETRY__.mount(options), {
                scenario,
                listType,
                controlled,
                startOnRetry
              });
              const retry = page.getByRole('button', { name: 'Retry', exact: true });
              await retry.focus();
              await page.keyboard.press('Enter');
              if (!startOnRetry) {
                await retry.focus();
                await page.keyboard.press('Space');
                const before = await snapshot(page);
                expect(before.uploads).toEqual([]);
                expect(before.completions).toEqual([]);
                expect(uploadsFor(scenario)).toHaveLength(0);
                await page.getByRole('button', { name: 'Start alpha', exact: true }).click();
              }
              await expect.poll(() => uploadsFor(scenario).length).toBe(1);
              expect(uploadsFor(scenario)[0].body).toContain('filename="alpha.txt"');
              expect((await snapshot(page)).completions).toEqual([]);
              uploadsFor(scenario)[0].response.statusCode = status;
              uploadsFor(scenario)[0].response.end('{}');
              await expect
                .poll(async () => (await snapshot(page)).completions)
                .toEqual([
                  status === 200
                    ? { completed: ['alpha.txt'], failed: [] }
                    : { completed: [], failed: ['alpha.txt'] }
                ]);
              const first = await snapshot(page);
              expect(first.retries).toEqual(
                startOnRetry ? ['alpha.txt'] : ['alpha.txt', 'alpha.txt']
              );
              expect(first.retryClicks).toEqual(startOnRetry ? [true] : [true, true]);
              expect(first.uploads).toEqual(['alpha.txt']);
              expect(status === 200 ? first.successes : first.errors).toEqual([
                { name: 'alpha.txt', trusted: true }
              ]);
              await page.getByRole('button', { name: 'Start beta', exact: true }).click();
              await expect.poll(() => uploadsFor(scenario).length).toBe(2);
              expect(uploadsFor(scenario)[1].body).toContain('filename="beta.txt"');
              expect((await snapshot(page)).completions).toHaveLength(1);
              uploadsFor(scenario)[1].response.end('{}');
              await expect.poll(async () => (await snapshot(page)).completions.length).toBe(2);
              expect((await snapshot(page)).completions[1]).toEqual({
                completed: ['beta.txt'],
                failed: []
              });
              expect(errors).toEqual([]);
            } finally {
              uploadsFor(scenario).forEach(upload => upload.response.destroy());
              await page.close();
            }
          });
        }
      }
    }
  }
});
