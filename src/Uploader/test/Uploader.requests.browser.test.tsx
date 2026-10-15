import type { ServerResponse } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.requests.client';

describe('Uploader request ownership with native HTTP', () => {
  const requests: { scenario: string; body: string; response: ServerResponse; closed: boolean }[] =
    [];
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.requests.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const upload = {
            scenario: url.searchParams.get('scenario')!,
            body: '',
            response,
            closed: false
          };
          response.on('close', () => (upload.closed = true));
          request.setEncoding('utf8');
          request.on('data', chunk => (upload.body += chunk));
          request.on('end', () => requests.push(upload));
        });
      }
    });
    console.info(
      'Uploader requests browser',
      source.browserName,
      source.browser.version(),
      source.reactVersion
    );
  });
  afterAll(async () => source?.close());
  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_UPLOAD_REQUESTS__.snapshot());
  const uploads = (scenario: string) => requests.filter(request => request.scenario === scenario);
  const click = (page: Page, name: string) =>
    page.getByRole('button', { name, exact: true }).click();
  const finish = (scenario: string, index: number) => uploads(scenario)[index].response.end('{}');
  const nextBatch = async (page: Page, scenario: string, completions: number) => {
    await click(page, 'Next batch');
    await page.getByRole('button', { name: 'Remove file: beta.txt', exact: true }).waitFor();
    await click(page, 'Start first');
    const beta = () =>
      uploads(scenario).filter(request => request.body.includes('filename="beta.txt"'));
    await expect.poll(() => beta().length).toBe(1);
    beta()[0].response.end('{}');
    await expect.poll(async () => (await snapshot(page)).completions.length).toBe(completions);
    expect((await snapshot(page)).completions[completions - 1]).toEqual({
      completed: ['beta.txt'],
      failed: []
    });
  };
  const modes = [
    'direct remove',
    'approved remove',
    'settled then remove',
    'unmount',
    'external abort',
    'immediate abort',
    'typed keys',
    'replacement',
    'unkeyed unmount'
  ] as const;
  for (const controlled of [false, true])
    for (const strict of [false, true])
      for (const mode of modes) {
        if ((mode === 'replacement' || mode === 'unkeyed unmount') && !controlled) continue;
        const scenario = `${mode}-${controlled}-${strict}`;
        it(scenario, async () => {
          const page = await source.browser.newPage();
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(String(error)));
          try {
            await page.goto(source.url);
            await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_REQUESTS__));
            expect(await page.evaluate(() => window.__RSUITE_UPLOAD_REQUESTS__.runtime)).toEqual({
              react: source.reactVersion,
              reactDOM: source.reactVersion
            });
            await page.evaluate(options => window.__RSUITE_UPLOAD_REQUESTS__.mount(options), {
              scenario,
              controlled,
              strict,
              approval: mode === 'approved remove',
              typed: mode === 'typed keys',
              abortOnUpload: mode === 'immediate abort'
            });
            if (mode === 'immediate abort') {
              await click(page, 'Start first');
              await expect
                .poll(async () => (await snapshot(page)).completions)
                .toEqual([{ completed: [], failed: ['alpha.txt'] }]);
              expect((await snapshot(page)).aborts).toEqual([{ name: 'alpha.txt', trusted: true }]);
              expect((await snapshot(page)).errors).toEqual([]);
              await page.getByRole('button', { name: 'Retry', exact: true }).waitFor();
              await nextBatch(page, scenario, 2);
              return;
            }
            await click(
              page,
              mode === 'replacement'
                ? 'Start first'
                : mode === 'unkeyed unmount'
                  ? 'Start unkeyed'
                  : 'Start twice'
            );
            if (mode === 'approved remove') {
              expect((await snapshot(page)).approvals).toBe(2);
              await click(page, 'Approve all');
            }
            const initialCount = mode === 'replacement' || mode === 'unkeyed unmount' ? 1 : 2;
            await expect.poll(() => uploads(scenario).length).toBe(initialCount);
            if (mode === 'replacement') {
              await click(page, 'Replace blob');
              await page
                .getByRole('button', { name: 'Remove file: gamma.txt', exact: true })
                .waitFor();
              await click(page, 'Start first');
              await expect.poll(() => uploads(scenario).length).toBe(2);
              expect(uploads(scenario)[0].closed).toBe(false);
              expect(uploads(scenario)[1].body).toContain('filename="gamma.txt"');
            }
            if (mode === 'typed keys') {
              await click(page, 'Start other');
              await expect.poll(() => uploads(scenario).length).toBe(3);
            }
            if (mode === 'settled then remove') {
              finish(scenario, 0);
              await expect
                .poll(async () => (await snapshot(page)).successes)
                .toEqual(['alpha.txt']);
              expect((await snapshot(page)).completions).toEqual([]);
            }
            if (mode === 'unmount' || mode === 'unkeyed unmount') {
              await click(page, 'Unmount uploader');
              await expect
                .poll(() => uploads(scenario).every(request => request.closed))
                .toBe(true);
              const count = (await snapshot(page)).uploads.length;
              await click(page, 'Retained start');
              expect((await snapshot(page)).uploads).toHaveLength(count);
              expect((await snapshot(page)).completions).toEqual([]);
              expect((await snapshot(page)).successes).toEqual([]);
              expect((await snapshot(page)).aborts).toHaveLength(initialCount);
              await nextBatch(page, scenario, 1);
            } else if (mode === 'external abort') {
              await click(page, 'Abort first');
              await expect.poll(() => uploads(scenario)[0].closed).toBe(true);
              expect((await snapshot(page)).completions).toEqual([]);
              finish(scenario, 1);
              await expect
                .poll(async () => (await snapshot(page)).completions)
                .toEqual([{ completed: ['alpha.txt'], failed: ['alpha.txt'] }]);
              expect((await snapshot(page)).aborts).toEqual([{ name: 'alpha.txt', trusted: true }]);
              await nextBatch(page, scenario, 2);
            } else {
              const name = mode === 'replacement' ? 'gamma.txt' : 'alpha.txt';
              await click(page, `Remove file: ${name}`);
              await expect
                .poll(() =>
                  uploads(scenario)
                    .slice(0, 2)
                    .every(request => request.closed)
                )
                .toBe(true);
              const expected = {
                completed: mode === 'settled then remove' ? ['alpha.txt'] : [],
                failed: [name]
              };
              if (mode === 'typed keys') {
                expect(uploads(scenario)[2].closed).toBe(false);
                expect((await snapshot(page)).completions).toEqual([]);
                finish(scenario, 2);
                expected.completed.push('gamma.txt');
              }
              await expect.poll(async () => (await snapshot(page)).completions).toEqual([expected]);
              expect((await snapshot(page)).removals).toEqual([name]);
              expect((await snapshot(page)).removalClicks).toEqual([true]);
              expect((await snapshot(page)).aborts).toHaveLength(
                mode === 'settled then remove' ? 1 : 2
              );
              expect((await snapshot(page)).aborts.every(event => event.trusted)).toBe(true);
              await nextBatch(page, scenario, 2);
            }
            expect((await snapshot(page)).errors).toEqual([]);
            expect(errors).toEqual([]);
          } finally {
            uploads(scenario).forEach(request => request.response.destroy());
            await page.close();
          }
        });
      }
});
