import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Route } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Image native callbacks', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Image/test/Image.callbacks.client.tsx'
    });
    console.info('Image callback browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([
      { title: 'load without callbacks', callbacks: 'none', success: true },
      { title: 'load with onLoad', callbacks: 'load', success: true },
      { title: 'fallback without callbacks', callbacks: 'none', fallback: true },
      { title: 'fallback with onError', callbacks: 'error', fallback: true },
      { title: 'fallback with both callbacks', callbacks: 'both', fallback: true },
      { title: 'error without fallback', callbacks: 'error' },
      { title: 'fallback also fails', callbacks: 'both', fallback: true, fallbackError: true },
      { title: 'replace onLoad while loading', callbacks: 'both', success: true, replace: true },
      { title: 'replace onError while loading', callbacks: 'both', fallback: true, replace: true },
      { title: 'load again after source changes', callbacks: 'both', success: true, next: true }
    ])('$title', async scenario => {
      const page = await source.browser.newPage();
      const pending = new Map<string, Route>();
      const pageErrors: string[] = [];
      page.on('pageerror', error => pageErrors.push(String(error)));
      await page.route(`${source.url}/image-callbacks/*`, route => {
        pending.set(new URL(route.request().url()).pathname, route);
      });
      const events: { source: string; type: string; trusted: boolean }[] = [];
      const settle = async (name: string, success: boolean) => {
        const path = `/image-callbacks/${name}.svg`;
        await expect.poll(() => pending.has(path)).toBe(true);
        const route = pending.get(path)!;
        pending.delete(path);
        await route.fulfill({
          contentType: 'image/svg+xml',
          body: success
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="blue"/></svg>'
            : 'invalid image'
        });
        events.push({ source: path, type: success ? 'load' : 'error', trusted: true });
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_IMAGE_CALLBACKS__.snapshot().imageEvents))
          .toEqual(events);
      };

      try {
        const hash = new URLSearchParams({ callbacks: scenario.callbacks });
        if (strict) hash.set('strict', '');
        if (scenario.fallback) hash.set('fallback', '');
        // The test controls image completion, so navigation must not wait for it.
        await page.goto(`${source.url}/#${hash}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__RSUITE_IMAGE_CALLBACKS__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_IMAGE_CALLBACKS__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        expect(await page.getByTestId('placeholder').count()).toBe(1);
        if (scenario.replace) {
          await page.getByRole('button', { name: 'Change callbacks', exact: true }).click();
        }
        await settle('main', Boolean(scenario.success));
        await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);
        if (scenario.fallback) {
          await settle('fallback', !scenario.fallbackError);
        }
        if (scenario.next) {
          await page.getByRole('button', { name: 'Change source', exact: true }).click();
          await expect.poll(() => page.getByTestId('placeholder').count()).toBe(1);
          await settle('next', true);
          await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);
        }

        const img = page.getByRole('img', { name: 'Example' });
        const name = scenario.next ? 'next' : scenario.fallback ? 'fallback' : 'main';
        expect(await img.getAttribute('src')).toBe(
          scenario.success || scenario.fallback ? `/image-callbacks/${name}.svg` : null
        );
        if (scenario.success || (scenario.fallback && !scenario.fallbackError)) {
          expect(await img.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(48);
        }
        const expectedCallbacks = events
          .filter(event => scenario.callbacks === 'both' || scenario.callbacks === event.type)
          .map(event => ({
            ...event,
            handler: scenario.replace ? 'latest' : 'initial',
            sameEvent: true,
            sameTarget: true
          }));
        expect(
          await page.evaluate(() => window.__RSUITE_IMAGE_CALLBACKS__.snapshot().callbacks)
        ).toEqual(expectedCallbacks);
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[image-callback-native-audit]',
          JSON.stringify({
            scenario: scenario.title,
            strict,
            pending: [...pending.keys()],
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_IMAGE_CALLBACKS__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });
});
