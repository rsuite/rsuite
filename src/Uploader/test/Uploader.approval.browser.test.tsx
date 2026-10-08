import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.approval.client';

describe('Uploader approvals with native events and HTTP', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const requests: { scenario: string; body: string; closed: boolean; held: boolean }[] = [];

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.approval.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const upload = {
            scenario: url.searchParams.get('scenario')!,
            body: '',
            closed: false,
            held: url.searchParams.has('hold')
          };
          requests.push(upload);
          request.setEncoding('utf8');
          const chunks: string[] = [];
          request.on('data', chunk => chunks.push(chunk));
          request.on('end', () => {
            upload.body = chunks.join('');
            if (!upload.held) {
              response.setHeader('Content-Type', 'application/json');
              response.end('{"ok":true}');
            }
          });
          response.on('close', () => {
            upload.closed = true;
          });
        });
      }
    });
    console.info('Uploader approval browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_UPLOAD_APPROVAL__.snapshot());
  const click = (page: Page, name: string) =>
    page.getByRole('button', { name, exact: true }).click();
  const uploadsFor = (scenario: string) =>
    requests.filter(request => request.scenario === scenario);
  const completed = (page: Page, count: number) =>
    page.waitForFunction(
      count => window.__RSUITE_UPLOAD_APPROVAL__.snapshot().completions.length === count,
      count
    );
  const nextBatch = async (page: Page, count: number) => {
    await click(page, 'Next batch');
    await page.getByRole('button', { name: 'Remove file: beta.txt' }).waitFor();
    await click(page, 'Start batch');
    await completed(page, count);
    const result = await snapshot(page);
    expect(result.completions[count - 1]).toEqual({ completed: ['beta.txt'], failed: [] });
    expect(result.successes).toContainEqual({ name: 'beta.txt', trusted: true });
  };

  it.each([
    'retained',
    'denied',
    'removed',
    'controlled removal',
    'unmounted',
    'repeated starts',
    'reused key',
    'active abort'
  ] as const)('settles %s without leaking requests or batch ownership', async scenario => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_APPROVAL__));
      expect(await page.evaluate(() => window.__RSUITE_UPLOAD_APPROVAL__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(
        scenario =>
          window.__RSUITE_UPLOAD_APPROVAL__.mount({
            controlled: scenario === 'controlled removal' || scenario === 'reused key',
            strict: scenario === 'unmounted',
            action: `/upload?scenario=${encodeURIComponent(scenario)}${scenario === 'active abort' ? '&hold' : ''}`
          }),
        scenario
      );
      await click(page, 'Start batch');
      expect((await snapshot(page)).approvals).toBe(1);

      if (scenario === 'retained' || scenario === 'active abort') {
        await click(page, 'Approve oldest');
        await expect.poll(() => uploadsFor(scenario).length).toBe(1);
        await expect.poll(() => uploadsFor(scenario)[0].body).toContain('filename="alpha.txt"');
        if (scenario === 'active abort') {
          await page.waitForFunction(
            () => window.__RSUITE_UPLOAD_APPROVAL__.snapshot().progress.length > 0
          );
          await click(page, 'Remove file: alpha.txt');
          await completed(page, 1);
          await expect.poll(() => uploadsFor(scenario)[0].closed).toBe(true);
          const result = await snapshot(page);
          expect(result.aborts).toEqual([{ name: 'alpha.txt', trusted: true }]);
          expect(result.successes).toEqual([]);
          expect(result.completions).toEqual([{ completed: [], failed: ['alpha.txt'] }]);
        } else {
          await completed(page, 1);
          const result = await snapshot(page);
          expect(result.successes).toEqual([{ name: 'alpha.txt', trusted: true }]);
          expect(result.completions).toEqual([{ completed: ['alpha.txt'], failed: [] }]);
        }
        expect(uploadsFor(scenario)[0].body).toContain('filename="alpha.txt"');
        expect(
          (await snapshot(page)).progress.some(event => event.percent > 0 && event.trusted)
        ).toBe(true);
      } else if (scenario === 'denied') {
        await click(page, 'Deny oldest');
        await completed(page, 1);
        expect((await snapshot(page)).completions).toEqual([{ completed: [], failed: [] }]);
        expect((await snapshot(page)).uploads).toEqual([]);
        expect(uploadsFor(scenario)).toEqual([]);
      } else {
        if (scenario === 'repeated starts') {
          await click(page, 'Start batch');
          expect((await snapshot(page)).approvals).toBe(2);
        }
        if (scenario === 'unmounted') {
          await click(page, 'Unmount uploader');
        } else if (scenario === 'controlled removal' || scenario === 'reused key') {
          await click(page, 'Clear controlled queue');
        } else {
          await click(page, 'Remove file: alpha.txt');
          expect((await snapshot(page)).changes).toEqual([{ names: [], trusted: true }]);
          expect((await snapshot(page)).removals).toEqual(['alpha.txt']);
        }
        if (scenario === 'reused key') {
          await click(page, 'Reuse file key');
          await page.getByRole('button', { name: 'Remove file: replacement.txt' }).waitFor();
          await click(page, 'Start batch');
          await click(page, 'Approve oldest');
        } else {
          await click(page, 'Approve all');
        }
        let result = await snapshot(page);
        expect(result.uploads).toEqual([]);
        expect(result.successes).toEqual([]);
        expect(uploadsFor(scenario)).toEqual([]);
        expect(result.completions).toEqual(
          scenario === 'unmounted' ? [] : [{ completed: [], failed: ['alpha.txt'] }]
        );
        if (scenario === 'reused key') {
          await click(page, 'Approve oldest');
          await completed(page, 2);
          result = await snapshot(page);
          expect(result.uploads).toEqual(['replacement.txt']);
          expect(result.completions[1]).toEqual({ completed: ['replacement.txt'], failed: [] });
        } else if (scenario !== 'unmounted') {
          await nextBatch(page, 2);
          expect(uploadsFor(scenario)).toHaveLength(1);
          expect(uploadsFor(scenario)[0].body).toContain('filename="beta.txt"');
        }
      }
      const result = await snapshot(page);
      expect(result.errors).toEqual([]);
      expect(result.clicks.length).toBeGreaterThan(0);
      expect(result.clicks.every(event => event.trusted)).toBe(true);
      expect(result.progress.every(event => event.trusted)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
