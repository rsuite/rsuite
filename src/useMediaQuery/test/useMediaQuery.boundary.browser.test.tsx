import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('useMediaQuery native breakpoint boundaries', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/useMediaQuery/test/useMediaQuery.boundary.client.tsx'
    });
    console.info('Media query boundary browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    describe.each([1, 2])('deviceScaleFactor: %s', deviceScaleFactor => {
      it.each([
        { lower: 'xs', upper: 'sm', boundary: 576 },
        { lower: 'sm', upper: 'md', boundary: 768 },
        { lower: 'md', upper: 'lg', boundary: 992 },
        { lower: 'lg', upper: 'xl', boundary: 1200 },
        { lower: 'xl', upper: 'xxl', boundary: 1400 }
      ])('$lower and $upper do not overlap at $boundary px', async ({ lower, upper, boundary }) => {
        const page = await source.browser.newPage({
          viewport: { width: boundary - 1, height: 800 },
          deviceScaleFactor
        });
        page.setDefaultTimeout(5000);
        const pageErrors: string[] = [];
        page.on('pageerror', error => pageErrors.push(String(error)));
        const states: {
          width: number;
          matches: boolean[];
          selected: string;
          queries: string[];
          react: string;
          reactDOM: string;
        }[] = [];
        try {
          const hash = new URLSearchParams({ lower, upper });
          if (strict) hash.set('strict', '');
          await page.goto(`${source.url}/#${hash}`);
          for (const width of [boundary - 1, boundary, boundary + 1, boundary - 1]) {
            await page.setViewportSize({ width, height: 800 });
            const below = width < boundary;
            const expected = [below, below, !below, below];
            await expect
              .poll(async () => JSON.parse((await page.locator('output').textContent())!).matches)
              .toEqual(expected);
            const state = JSON.parse((await page.locator('output').textContent())!);
            expect(state.selected).toBe(below ? 'lower' : 'upper');
            expect(state.react).toBe(source.reactVersion);
            expect(state.reactDOM).toBe(source.reactVersion);
            expect(
              await page.evaluate(() => ({ width: innerWidth, scale: devicePixelRatio }))
            ).toEqual({ width, scale: deviceScaleFactor });
            states.push({ width, ...state });
          }
          expect(pageErrors).toEqual([]);
        } finally {
          console.info(
            '[media-query-boundary-native-audit]',
            JSON.stringify({
              lower,
              upper,
              boundary,
              strict,
              deviceScaleFactor,
              states,
              pageErrors,
              final: await page.locator('output').textContent()
            })
          );
          await page.close();
        }
      });
    });
  });
});
