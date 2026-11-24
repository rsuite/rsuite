import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './Uploader.keyboard.client';

describe('Uploader file actions with native keyboard events', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  const requests: { scenario: string; body: string }[] = [];

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Uploader/test/Uploader.keyboard.client.tsx',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost');
          if (url.pathname !== '/upload') return next();
          const upload = { scenario: url.searchParams.get('scenario')!, body: '' };
          requests.push(upload);
          request.setEncoding('utf8');
          request.on('data', chunk => (upload.body += chunk));
          request.on('end', () => {
            response.setHeader('Content-Type', 'application/json');
            response.end('{"ok":true}');
          });
        });
      }
    });
    console.info('Uploader keyboard browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  const snapshot = (page: Page) =>
    page.evaluate(() => window.__RSUITE_UPLOAD_KEYBOARD__.snapshot());
  const activeLabel = (page: Page) =>
    page.evaluate(
      () =>
        document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent
    );
  const tabThrough = async (page: Page, target = 'After uploader') => {
    await page.getByRole('button', { name: 'Before uploader', exact: true }).click();
    const labels: (string | null | undefined)[] = [];
    for (let index = 0; index < 12; index++) {
      await page.keyboard.press('Tab');
      const label = await activeLabel(page);
      labels.push(label);
      if (label === target || label === 'After uploader') break;
    }
    return labels;
  };

  describe.each(['text', 'picture-text', 'picture'] as const)('%s layout', listType => {
    for (const action of ['remove', 'retry'] as const) {
      it.each(['Enter', 'Space'])(
        `${action} activates once with %s without submitting`,
        async key => {
          const page = await source.browser.newPage();
          const errors: string[] = [];
          page.on('pageerror', error => errors.push(String(error)));
          const scenario = `${listType}-${action}-${key}`;
          try {
            await page.emulateMedia({ forcedColors: key === 'Space' ? 'active' : 'none' });
            await page.goto(source.url);
            await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_KEYBOARD__));
            expect(await page.evaluate(() => window.__RSUITE_UPLOAD_KEYBOARD__.runtime)).toEqual({
              react: source.reactVersion,
              reactDOM: source.reactVersion
            });
            await page.evaluate(options => window.__RSUITE_UPLOAD_KEYBOARD__.mount(options), {
              listType,
              scenario,
              controlled: key === 'Space'
            });
            const label = action === 'remove' ? 'Remove file: alpha.png' : 'Retry';
            await tabThrough(page, label);
            expect(await activeLabel(page)).toBe(label);
            const button = page.getByRole('button', { name: label, exact: true });
            await expect.poll(() => button.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
            expect(await button.evaluate(el => getComputedStyle(el).visibility)).toBe('visible');
            expect(
              await button.evaluate(el => {
                const style = getComputedStyle(el);
                return (
                  (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
                  style.boxShadow !== 'none'
                );
              })
            ).toBe(true);
            expect(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)).toBe(
              key === 'Space'
            );

            await page.keyboard.press(key);
            if (action === 'retry') {
              await page.waitForFunction(
                () => window.__RSUITE_UPLOAD_KEYBOARD__.snapshot().successes.length === 1
              );
              expect(requests.filter(request => request.scenario === scenario)).toHaveLength(1);
              expect(requests.find(request => request.scenario === scenario)!.body).toContain(
                'filename="alpha.png"'
              );
              expect((await snapshot(page)).retries).toEqual(['alpha.png']);
              expect((await snapshot(page)).successes).toEqual([
                { name: 'alpha.png', trusted: true }
              ]);
            } else {
              expect((await snapshot(page)).removals).toEqual(['alpha.png']);
              expect((await snapshot(page)).changes).toEqual([{ names: [], trusted: true }]);
              expect(await page.locator('.rs-uploader-file-item').count()).toBe(0);
              expect(requests.filter(request => request.scenario === scenario)).toEqual([]);
            }
            expect((await snapshot(page)).clicks).toEqual([{ name: label, trusted: true }]);
            expect((await snapshot(page)).submissions).toBe(0);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );
    }

    it('keeps unavailable file actions out of sequential focus', async () => {
      const page = await source.browser.newPage();
      try {
        await page.goto(source.url);
        await page.waitForFunction(() => Boolean(window.__RSUITE_UPLOAD_KEYBOARD__));
        for (const mode of ['disabledFileItem', 'readOnly', 'plaintext', 'removable'] as const) {
          await page.evaluate(options => window.__RSUITE_UPLOAD_KEYBOARD__.mount(options), {
            listType,
            scenario: `${listType}-${mode}`,
            [mode]: mode !== 'removable'
          });
          const labels = await tabThrough(page);
          expect(labels.at(-1)).toBe('After uploader');
          expect(labels).not.toContain('Remove file: alpha.png');
          if (mode !== 'removable') expect(labels).not.toContain('Retry');
          expect((await snapshot(page)).removals).toEqual([]);
          expect((await snapshot(page)).retries).toEqual([]);
          expect((await snapshot(page)).submissions).toBe(0);
        }
      } finally {
        await page.close();
      }
    });
  });
});
