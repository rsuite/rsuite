import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Button automatic loading native activation', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Button/test/Button.auto-loading.client.tsx'
    });
    console.info('Button automatic loading browser', {
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
      { shape: 'icon', key: 'Space' }
    ])('$shape / $key', async ({ shape, key }) => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        const hash = new URLSearchParams({ shape });
        if (strict) hash.set('strict', '');
        await page.goto(`${source.url}/#${hash}`);
        await page.waitForFunction(() => window.__RSUITE_BUTTON_ASYNC__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const action = page.getByTestId('action');
        await page.keyboard.press('Tab');
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        const initialURL = page.url();
        await page.keyboard.press(key);
        await expect.poll(() => action.getAttribute('aria-busy')).toBe('true');
        expect(await action.getAttribute('aria-disabled')).toBe('true');
        expect(await action.getAttribute('disabled')).toBe(null);
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        const callbacks = [
          { kind: 'toggle', active: true, trusted: true },
          { kind: 'click', trusted: true },
          { kind: 'ancestor', trusted: true },
          ...(shape === 'submit' ? [{ kind: 'submit', trusted: true }] : [])
        ];
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot().callbacks)
        ).toEqual(callbacks);
        const expectedURL = shape.includes('anchor') ? `${source.url}/#destination` : initialURL;
        expect(page.url()).toBe(expectedURL);
        await page.keyboard.press(key);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot().callbacks)
        ).toEqual(callbacks);
        expect(
          await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot().nativeClicks)
        ).toEqual([
          { trusted: true, prevented: false },
          { trusted: true, prevented: true }
        ]);
        expect(page.url()).toBe(expectedURL);
        await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.resolve());
        await expect.poll(() => action.getAttribute('aria-busy')).toBe(null);
        expect(await action.evaluate(element => document.activeElement === element)).toBe(true);
        await page.keyboard.press(key);
        await expect
          .poll(
            async () =>
              (
                await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot().callbacks)
              ).filter(x => x.kind === 'click').length
          )
          .toBe(2);
        await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.resolve());
        await expect.poll(() => action.getAttribute('aria-busy')).toBe(null);
        expect(errors).toEqual([]);
      } finally {
        console.info(
          '[button-auto-native-audit]',
          JSON.stringify({
            shape,
            key,
            strict,
            errors,
            ...(await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });

  const errorCases: { flags: Record<string, string>; expected: string | null }[] = [
    { flags: {}, expected: 'Async action failed' },
    { flags: { fallback: '' }, expected: 'Async action failed' },
    { flags: { handled: '', handlerThrows: '' }, expected: 'Error handler failed' },
    { flags: { mode: 'sync' }, expected: 'Synchronous action failed' },
    { flags: { mode: 'accessor' }, expected: 'Then accessor failed' },
    { flags: { mode: 'sync', handled: '' }, expected: null },
    { flags: { mode: 'accessor', handled: '' }, expected: null },
    { flags: { unmount: '' }, expected: 'Async action failed' },
    { flags: { unmount: '', handled: '' }, expected: null }
  ];

  it.each(errorCases)('delivers task failures with $flags', async ({ flags, expected }) => {
    let expectedErrors = expected ? [expected] : [];
    if (flags.mode && !('handled' in flags)) {
      // React versions can report a synchronous event error more than once in development.
      const baseline = await source.browser.newPage();
      const baselineErrors: string[] = [];
      baseline.on('pageerror', error => baselineErrors.push(error.message));
      try {
        await baseline.goto(`${source.url}/#nativeError=&mode=sync`);
        await baseline.waitForFunction(() => window.__RSUITE_BUTTON_ASYNC__?.snapshot().ready);
        await baseline.keyboard.press('Tab');
        await baseline.keyboard.press('Enter');
        await expect.poll(() => baselineErrors.length).toBeGreaterThan(0);
        const snapshot = await baseline.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot());
        expect(snapshot.callbacks.filter(x => x.kind === 'click')).toEqual([
          { kind: 'click', trusted: true }
        ]);
        expect(baselineErrors).toEqual(baselineErrors.map(() => 'Synchronous action failed'));
        expectedErrors = baselineErrors.map(() => expected!);
        console.info(
          '[button-auto-baseline-error-audit]',
          JSON.stringify({ baselineErrors, snapshot })
        );
      } finally {
        await baseline.close();
      }
    }
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      const hash = new URLSearchParams({ shape: 'button', ...flags });
      await page.goto(`${source.url}/#${hash}`);
      await page.waitForFunction(() => window.__RSUITE_BUTTON_ASYNC__?.snapshot().ready);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      if (!flags.mode) {
        await expect.poll(() => page.getByTestId('action').getAttribute('aria-busy')).toBe('true');
        if ('unmount' in flags) await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.unmount());
        await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.reject());
      }
      if (expected) await expect.poll(() => errors).toEqual(expectedErrors);
      if ('handled' in flags) {
        await expect
          .poll(async () =>
            (await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__.snapshot().callbacks)).filter(
              x => x.kind === 'error'
            )
          )
          .toEqual([
            {
              kind: 'error',
              message: `Error: ${flags.mode === 'sync' ? 'Synchronous action failed' : flags.mode === 'accessor' ? 'Then accessor failed' : 'Async action failed'}`,
              trusted: true
            }
          ]);
      }
      if (!('unmount' in flags)) {
        await expect.poll(() => page.getByTestId('action').getAttribute('aria-busy')).toBe(null);
      }
      expect(errors).toEqual(expectedErrors);
    } finally {
      console.info(
        '[button-auto-error-audit]',
        JSON.stringify({
          flags,
          errors,
          ...(await page.evaluate(() => window.__RSUITE_BUTTON_ASYNC__?.snapshot()))
        })
      );
      await page.close();
    }
  });
});
