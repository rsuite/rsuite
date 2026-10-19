import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Button loading activation', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Button/test/Button.loading.client.tsx'
    });
    console.info('Button loading browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([
      { shape: 'button', key: 'Enter' },
      { shape: 'button', key: 'Space' },
      { shape: 'submit', key: 'Enter' },
      { shape: 'submit', key: 'Space' },
      { shape: 'anchor', key: 'Enter' },
      { shape: 'explicit-anchor', key: 'Enter' },
      { shape: 'custom', key: 'Enter' },
      { shape: 'custom', key: 'Space' },
      { shape: 'icon', key: 'Enter' },
      { shape: 'icon', key: 'Space' },
      { shape: 'custom', key: 'Enter', disabled: true },
      { shape: 'custom', key: 'Space', disabled: true },
      { shape: 'explicit-anchor', key: 'Enter', disabled: true }
    ])('$shape / $key / disabled: $disabled', async ({ shape, key, disabled }) => {
      const page = await source.browser.newPage();
      const pageErrors: string[] = [];
      page.on('pageerror', error => pageErrors.push(String(error)));
      try {
        const hash = new URLSearchParams({ shape });
        if (strict) hash.set('strict', '');
        if (disabled) hash.set('disabled', '');
        await page.goto(`${source.url}/#${hash}`);
        await page.waitForFunction(() => window.__RSUITE_BUTTON_LOADING__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const action = page.getByTestId('action');
        await page.keyboard.press('Tab');
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        if (!disabled) {
          expect(await action.evaluate(element => getComputedStyle(element).pointerEvents)).toBe(
            'none'
          );
        }
        const initialURL = page.url();
        await page.keyboard.press(key);
        await expect
          .poll(() =>
            page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().nativeClicks.length)
          )
          .toBe(1);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().callbacks)
        ).toEqual([]);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().nativeClicks)
        ).toEqual([{ trusted: true, prevented: true }]);
        expect(page.url()).toBe(initialURL);
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        expect(await action.getAttribute('data-active')).toBe(null);
        expect(await action.getAttribute('aria-disabled')).toBe('true');
        expect(await action.getAttribute('aria-busy')).toBe(disabled ? null : 'true');

        await page.getByRole('button', { name: 'Enable action', exact: true }).click();
        await expect.poll(() => action.getAttribute('data-loading')).toBe('false');
        await page.keyboard.press('Shift+Tab');
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        await page.keyboard.press(key);
        const expectedCallbacks = [
          { kind: 'toggle', active: true, trusted: true },
          { kind: 'click', trusted: true },
          { kind: 'ancestor', trusted: true },
          ...(shape === 'submit' ? [{ kind: 'submit', trusted: true }] : [])
        ];
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().callbacks))
          .toEqual(expectedCallbacks);
        expect(await action.getAttribute('data-active')).toBe('true');
        expect(await action.getAttribute('aria-disabled')).toBe(null);
        expect(await action.getAttribute('aria-busy')).toBe(null);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().nativeClicks)
        ).toEqual([
          { trusted: true, prevented: true },
          { trusted: true, prevented: false }
        ]);
        expect(page.url()).toBe(
          shape.includes('anchor') ? `${source.url}/#destination` : initialURL
        );
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[button-loading-native-audit]',
          JSON.stringify({
            shape,
            key,
            strict,
            disabled: !!disabled,
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__?.snapshot()))
          })
        );
        await page.close();
      }
    });

    it.each(['Enter', 'Space'])('enabled control / %s', async key => {
      const page = await source.browser.newPage();
      try {
        const hash = new URLSearchParams({ shape: 'button', ready: '' });
        if (strict) hash.set('strict', '');
        await page.goto(`${source.url}/#${hash}`);
        await page.waitForFunction(() => window.__RSUITE_BUTTON_LOADING__?.snapshot().ready);
        const action = page.getByTestId('action');
        await page.keyboard.press('Tab');
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        await page.keyboard.press(key);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().callbacks)
        ).toEqual([
          { kind: 'toggle', active: true, trusted: true },
          { kind: 'click', trusted: true },
          { kind: 'ancestor', trusted: true }
        ]);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__.snapshot().nativeClicks)
        ).toEqual([{ trusted: true, prevented: false }]);
        expect(await action.getAttribute('data-active')).toBe('true');
      } finally {
        console.info(
          '[button-enabled-native-audit]',
          JSON.stringify({
            key,
            strict,
            ...(await page.evaluate(() => window.__RSUITE_BUTTON_LOADING__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });
});
