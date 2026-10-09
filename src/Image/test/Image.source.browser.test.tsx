import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Route } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Image cleared source', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Image/test/Image.source.client.tsx'
    });
    console.info('Image source browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([
      { title: 'initially empty', empty: true },
      { title: 'initially fallback only', empty: true, fallback: true },
      { title: 'loaded to undefined', loaded: true },
      { title: 'loaded to empty string', loaded: true, emptyString: true },
      { title: 'pending to undefined' },
      { title: 'pending to empty string', emptyString: true },
      { title: 'loaded to undefined with fallback', loaded: true, fallback: true },
      {
        title: 'loaded to empty string with fallback',
        loaded: true,
        emptyString: true,
        fallback: true
      },
      { title: 'pending to undefined with fallback', fallback: true },
      { title: 'pending to empty string with fallback', emptyString: true, fallback: true }
    ])('$title', async scenario => {
      const page = await source.browser.newPage();
      const pending = new Map<string, Route>();
      const pageErrors: string[] = [];
      let restoredFromCache = false;
      page.on('pageerror', error => pageErrors.push(String(error)));
      await page.route(`${source.url}/image-source/*`, route => {
        pending.set(new URL(route.request().url()).pathname, route);
      });
      const expectedEvents: { source: string; type: string; trusted: boolean }[] = [];
      const fulfill = async (name: string, observe = true) => {
        const path = `/image-source/${name}.svg`;
        await expect.poll(() => pending.has(path)).toBe(true);
        const route = pending.get(path)!;
        pending.delete(path);
        await route.fulfill({
          contentType: 'image/svg+xml',
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="blue"/></svg>'
        });
        if (observe) {
          expectedEvents.push({ source: path, type: 'load', trusted: true });
          await expect
            .poll(() => page.evaluate(() => window.__RSUITE_IMAGE_SOURCE__.snapshot().events))
            .toEqual(expectedEvents);
        }
      };

      try {
        const hash = new URLSearchParams();
        if (strict) hash.set('strict', '');
        if (scenario.empty) hash.set('empty', '');
        if (scenario.fallback) hash.set('fallback', '');
        await page.goto(`${source.url}/#${hash}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__RSUITE_IMAGE_SOURCE__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_IMAGE_SOURCE__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });

        const image = page.getByRole('img', { name: 'Example' });
        if (!scenario.empty) {
          await expect.poll(() => pending.has('/image-source/main.svg')).toBe(true);
          expect(await page.getByTestId('placeholder').count()).toBe(1);
          if (scenario.loaded) await fulfill('main');
          await page
            .getByRole('button', {
              name: scenario.emptyString ? 'Clear to empty string' : 'Clear to undefined',
              exact: true
            })
            .click();
        }

        await expect
          .poll(() => image.getAttribute('src'))
          .toBe(scenario.fallback ? '/image-source/fallback.svg' : null);
        await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);
        if (!scenario.empty && !scenario.loaded) await fulfill('main', false);
        if (scenario.fallback) await fulfill('fallback');
        await page.waitForLoadState('load');
        expect(await image.getAttribute('src')).toBe(
          scenario.fallback ? '/image-source/fallback.svg' : null
        );
        expect(await page.evaluate(() => window.__RSUITE_IMAGE_SOURCE__.snapshot().events)).toEqual(
          expectedEvents
        );

        await page.getByRole('button', { name: 'Restore source', exact: true }).click();
        // Firefox may reuse the already decoded image without another HTTP request.
        await expect
          .poll(async () => {
            const events = await page.evaluate(
              () => window.__RSUITE_IMAGE_SOURCE__.snapshot().events
            );
            return pending.has('/image-source/main.svg') || events.length > expectedEvents.length;
          })
          .toBe(true);
        if (pending.has('/image-source/main.svg')) {
          expect(await page.getByTestId('placeholder').count()).toBe(1);
          await fulfill('main');
        } else {
          restoredFromCache = true;
          expectedEvents.push({ source: '/image-source/main.svg', type: 'load', trusted: true });
        }
        expect(await page.evaluate(() => window.__RSUITE_IMAGE_SOURCE__.snapshot().events)).toEqual(
          expectedEvents
        );
        await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);
        expect(await image.getAttribute('src')).toBe('/image-source/main.svg');
        expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(48);
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[image-source-native-audit]',
          JSON.stringify({
            scenario: scenario.title,
            strict,
            restoredFromCache,
            pending: [...pending.keys()],
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_IMAGE_SOURCE__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });
});
