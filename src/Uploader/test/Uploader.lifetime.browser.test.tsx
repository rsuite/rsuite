import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.lifetime.client';

describe('Uploader queue lifetime with native HTTP', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const requests: { scenario: string; body: string; response: ServerResponse }[] = [];
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.lifetime.client.tsx',
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
      'Uploader lifetime browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());
  const uploads = (scenario: string) => requests.filter(request => request.scenario === scenario);
  const modes = [
    'retained true',
    'retained resolve',
    'retained reject',
    'retained pending',
    'approval true',
    'approval false',
    'approval resolve',
    'approval reject',
    'upload',
    'normal'
  ];
  for (const controlled of [false, true])
    for (const strict of [false, true])
      for (const mode of modes) {
        const scenario = `${mode}-${controlled}-${strict}`;
        it(scenario, async () => {
          const page = await source.browser.newPage();
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(error.message));
          const snapshot = () => page.evaluate(() => window.__RSUITE_UPLOAD_LIFETIME__.snapshot());
          try {
            await page.goto(source.url);
            await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_LIFETIME__));
            expect(await page.evaluate(() => window.__RSUITE_UPLOAD_LIFETIME__.runtime)).toEqual({
              react: source.reactVersion,
              reactDOM: source.reactVersion
            });
            await page.evaluate(options => window.__RSUITE_UPLOAD_LIFETIME__.mount(options), {
              scenario,
              mode,
              controlled,
              strict
            });
            if (mode.startsWith('retained'))
              await page.getByRole('button', { name: 'Unmount uploader', exact: true }).click();
            await page.getByRole('button', { name: 'Start queue', exact: true }).click();
            if (mode === 'normal') {
              await expect.poll(() => uploads(scenario).length).toBe(2);
              for (const name of ['alpha', 'beta']) {
                uploads(scenario)
                  .find(request => request.body.includes(`filename="${name}.txt"`))!
                  .response.end('{}');
                await expect
                  .poll(async () =>
                    (await snapshot()).success.some(file => file.name === `${name}.txt`)
                  )
                  .toBe(true);
              }
              await expect
                .poll(async () => (await snapshot()).completions)
                .toEqual([{ completed: ['alpha.txt', 'beta.txt'], failed: [] }]);
              expect((await snapshot()).approvals).toEqual(['alpha.txt', 'beta.txt']);
              expect((await snapshot()).uploads).toEqual(['alpha.txt', 'beta.txt']);
              expect((await snapshot()).success.every(file => file.trusted)).toBe(true);
              expect((await snapshot()).aborts).toEqual([]);
            } else {
              await expect.poll(() => page.locator('output').textContent()).toBe('unmounted');
              expect((await snapshot()).approvals).toEqual(
                mode.startsWith('retained') ? [] : ['alpha.txt']
              );
              expect((await snapshot()).uploads).toEqual(mode === 'upload' ? ['alpha.txt'] : []);
              if (mode === 'upload')
                await expect
                  .poll(async () => (await snapshot()).aborts)
                  .toEqual([{ name: 'alpha.txt', trusted: true }]);
              else expect(uploads(scenario)).toEqual([]);
              expect((await snapshot()).success).toEqual([]);
              expect((await snapshot()).completions).toEqual([]);
            }
            // Cross an event-loop task so a rejected approval would reach pageerror.
            await page.evaluate(() => new Promise<void>(resolve => setTimeout(resolve, 0)));
            expect(errors).toEqual([]);
          } finally {
            uploads(scenario).forEach(request => request.response.destroy());
            await page.close();
          }
        });
      }
});
