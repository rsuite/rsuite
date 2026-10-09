import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Route } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Image responsive fallback', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Image/test/Image.responsive.client.tsx'
    });
    console.info('Image responsive browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([
      { title: 'density candidate loads', descriptor: '1x', success: true },
      { title: 'width candidate loads', descriptor: '48w', success: true },
      { title: 'density candidate falls back', descriptor: '1x', fallback: 'fallback' },
      { title: 'width candidate falls back', descriptor: '48w', fallback: 'fallback' },
      { title: 'fallback shares src URL', descriptor: '1x', fallback: 'main' },
      { title: 'fallback also fails', descriptor: '1x', fallback: 'fallback', fallbackFails: true },
      { title: 'failed candidate has no fallback', descriptor: '1x' },
      { title: 'srcSet without src', descriptor: '1x', fallback: 'fallback', srcSetOnly: true },
      {
        title: 'src change restores srcSet',
        descriptor: '1x',
        fallback: 'fallback',
        replaceSrc: true
      }
    ])('$title', async scenario => {
      const page = await source.browser.newPage({ deviceScaleFactor: 1 });
      const pending = new Map<string, Route>();
      const requests: string[] = [];
      const pageErrors: string[] = [];
      const expectedEvents: { source: string; type: string; trusted: boolean }[] = [];
      page.on('pageerror', error => pageErrors.push(String(error)));
      await page.route(`${source.url}/image-responsive/*`, route => {
        const path = new URL(route.request().url()).pathname;
        requests.push(path);
        pending.set(path, route);
      });
      const fulfill = async (name: string, fails = false) => {
        const path = `/image-responsive/${name}.svg`;
        await expect.poll(() => pending.has(path)).toBe(true);
        const route = pending.get(path)!;
        pending.delete(path);
        await route.fulfill({
          status: fails ? 404 : 200,
          contentType: 'image/svg+xml',
          headers: { 'Cache-Control': 'no-store' },
          body: fails
            ? 'Missing image'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="blue"/></svg>'
        });
        expectedEvents.push({ source: path, type: fails ? 'error' : 'load', trusted: true });
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_IMAGE_RESPONSIVE__.snapshot().events))
          .toEqual(expectedEvents);
      };

      try {
        const hash = new URLSearchParams({ descriptor: scenario.descriptor });
        if (strict) hash.set('strict', '');
        if (scenario.srcSetOnly) hash.set('srcSetOnly', '');
        if (scenario.fallback) hash.set('fallback', `/image-responsive/${scenario.fallback}.svg`);
        await page.goto(`${source.url}/#${hash}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__RSUITE_IMAGE_RESPONSIVE__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_IMAGE_RESPONSIVE__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const image = page.getByRole('img', { name: 'Responsive example' });
        await expect.poll(() => pending.has('/image-responsive/selected.svg')).toBe(true);
        expect(await page.getByTestId('placeholder').count()).toBe(1);
        await fulfill('selected', !scenario.success);
        await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);

        if (scenario.success) {
          expect(await image.getAttribute('srcset')).toBe(
            `/image-responsive/selected.svg ${scenario.descriptor}`
          );
          expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(48);
          expect(requests).toEqual(['/image-responsive/selected.svg']);
        } else {
          await expect.poll(() => image.getAttribute('srcset')).toBe(null);
          expect(await image.getAttribute('src')).toBe(
            scenario.fallback ? `/image-responsive/${scenario.fallback}.svg` : null
          );
          if (scenario.fallback) await fulfill(scenario.fallback, scenario.fallbackFails);
          expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(
            scenario.fallback && !scenario.fallbackFails ? 48 : 0
          );
          expect(await image.getAttribute('srcset')).toBe(null);
          expect(requests).toEqual([
            '/image-responsive/selected.svg',
            ...(scenario.fallback ? [`/image-responsive/${scenario.fallback}.svg`] : [])
          ]);

          await page
            .getByRole('button', {
              name: scenario.replaceSrc ? 'Replace source' : 'Replace source set',
              exact: true
            })
            .click();
          const next = scenario.replaceSrc ? 'selected' : 'recovered';
          await expect.poll(() => pending.has(`/image-responsive/${next}.svg`)).toBe(true);
          expect(await page.getByTestId('placeholder').count()).toBe(1);
          await fulfill(next);
          await expect.poll(() => page.getByTestId('placeholder').count()).toBe(0);
          expect(await image.getAttribute('srcset')).toBe(
            `/image-responsive/${next}.svg ${scenario.descriptor}`
          );
          expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(48);
        }
        expect(await image.getAttribute('sizes')).toBe('48px');
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[image-responsive-native-audit]',
          JSON.stringify({
            scenario: scenario.title,
            strict,
            requests,
            pending: [...pending.keys()],
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_IMAGE_RESPONSIVE__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });
});
