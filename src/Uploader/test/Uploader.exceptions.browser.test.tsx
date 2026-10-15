import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.exceptions.client';

describe('Uploader exceptions with native HTTP', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const requests: { scenario: string; body: string; response: ServerResponse }[] = [];
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.exceptions.client.tsx',
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
    console.info(
      'Uploader exceptions browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());
  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_UPLOAD_EXCEPTIONS__.snapshot());
  const uploads = (scenario: string) => requests.filter(request => request.scenario === scenario);
  const click = (page: Page, name: string) =>
    page.getByRole('button', { name, exact: true }).click();
  const finish = async (scenario: string, name: string, status = 200) => {
    const matching = () =>
      uploads(scenario).filter(request => request.body.includes(`filename="${name}.txt"`));
    await expect.poll(() => matching().length).toBe(1);
    matching()[0].response.statusCode = status;
    matching()[0].response.end('{}');
  };
  const nextBatch = async (page: Page, scenario: string, count: number) => {
    await click(page, 'Start gamma');
    await finish(scenario, 'gamma');
    await expect.poll(async () => (await snapshot(page)).completions.length).toBe(count);
    expect((await snapshot(page)).completions[count - 1]).toEqual({
      completed: ['gamma.txt'],
      failed: []
    });
  };
  const modes = [
    'setup url',
    'setup header',
    'active url',
    'active header',
    'success',
    'error',
    'reentrant success',
    'reentrant error',
    'upload',
    'completion'
  ];
  for (const controlled of [false, true])
    for (const strict of [false, true])
      for (const mode of modes) {
        const scenario = `${mode}-${controlled}-${strict}`;
        it(scenario, async () => {
          const page = await source.browser.newPage();
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(error.message));
          try {
            await page.goto(source.url);
            await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_EXCEPTIONS__));
            expect(await page.evaluate(() => window.__RSUITE_UPLOAD_EXCEPTIONS__.runtime)).toEqual({
              react: source.reactVersion,
              reactDOM: source.reactVersion
            });
            await page.evaluate(options => window.__RSUITE_UPLOAD_EXCEPTIONS__.mount(options), {
              scenario,
              mode,
              controlled,
              strict
            });
            if (mode.startsWith('setup') || mode.startsWith('active')) {
              const active = mode.startsWith('active');
              if (active) {
                await click(page, 'Start alpha');
                await expect.poll(() => uploads(scenario).length).toBe(1);
                await click(page, 'Break configuration');
                await expect.poll(() => page.locator('output').textContent()).toBe('invalid');
              }
              await click(page, 'Start beta');
              expect((await snapshot(page)).thrown).toEqual([
                { name: 'SyntaxError', sameError: false }
              ]);
              expect((await snapshot(page)).uploads).toEqual(active ? ['alpha.txt'] : []);
              expect((await snapshot(page)).completions).toEqual([]);
              await click(page, 'Repair configuration');
              await expect.poll(() => page.locator('output').textContent()).toBe('valid');
              if (active) {
                await finish(scenario, 'alpha');
                await expect
                  .poll(async () => (await snapshot(page)).completions)
                  .toEqual([{ completed: ['alpha.txt'], failed: [] }]);
              }
              await click(page, 'Start beta');
              await finish(scenario, 'beta');
              await expect
                .poll(async () => (await snapshot(page)).completions.length)
                .toBe(active ? 2 : 1);
              expect((await snapshot(page)).completions.at(-1)).toEqual({
                completed: ['beta.txt'],
                failed: []
              });
              expect((await snapshot(page)).error).toEqual([]);
              await nextBatch(page, scenario, active ? 3 : 2);
              expect(errors).toEqual([]);
            } else {
              await click(page, 'Start alpha');
              const failed = mode.endsWith('error');
              await finish(scenario, 'alpha', failed ? 500 : 200);
              if (mode.startsWith('reentrant')) {
                await expect.poll(() => uploads(scenario).length).toBe(2);
                expect((await snapshot(page)).completions).toEqual([]);
                await finish(scenario, 'beta');
              }
              await expect.poll(async () => (await snapshot(page)).completions.length).toBe(1);
              expect((await snapshot(page)).completions[0]).toEqual({
                completed: [
                  ...(failed ? [] : ['alpha.txt']),
                  ...(mode.startsWith('reentrant') ? ['beta.txt'] : [])
                ],
                failed: failed ? ['alpha.txt'] : []
              });
              expect((await snapshot(page))[failed ? 'error' : 'success'][0]).toEqual({
                name: 'alpha.txt',
                trusted: true
              });
              if (mode === 'upload') {
                expect((await snapshot(page)).thrown).toEqual([{ name: 'Error', sameError: true }]);
                expect(errors).toEqual([]);
              } else {
                await expect.poll(() => errors).toEqual([`expected ${mode} callback failure`]);
              }
              await nextBatch(page, scenario, 2);
              expect((await snapshot(page)).success.at(-1)).toEqual({
                name: 'gamma.txt',
                trusted: true
              });
            }
          } finally {
            uploads(scenario).forEach(request => request.response.destroy());
            await page.close();
          }
        });
      }
});
