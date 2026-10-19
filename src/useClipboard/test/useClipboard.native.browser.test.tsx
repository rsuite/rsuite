import { randomUUID } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('useClipboard native activation and paste', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/useClipboard/test/useClipboard.native.client.tsx'
    });
    console.info('Clipboard native browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  it.each(
    ['click', 'Enter', 'Space'].flatMap(activation =>
      ['const value = 42;', '组件库 🚀\n第二行\t第三列'].map(text => ({ activation, text }))
    )
  )('copies and pastes $text using $activation', async ({ activation, text }) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      if (source.browserName === 'chromium') {
        // Headless Chromium denies writes by default; Firefox uses the trusted activation.
        await page.context().grantPermissions(['clipboard-write'], { origin: source.url });
      }
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_NATIVE_CLIPBOARD__));
      expect(await page.evaluate(() => window.__RSUITE_NATIVE_CLIPBOARD__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const expected = `${text}\n${randomUUID()}`;
      await page.getByRole('textbox', { name: 'Text to copy' }).fill(expected);
      const button = page.getByRole('button', { name: 'Copy', exact: true });
      if (activation === 'click') {
        await button.click();
      } else {
        await button.focus();
        await page.keyboard.press(activation);
      }
      await page.waitForFunction(() => {
        const state = window.__RSUITE_NATIVE_CLIPBOARD__.snapshot();
        return state.copies[0]?.result !== undefined && state.feedback !== 'Ready';
      });
      const copied = await page.evaluate(() => window.__RSUITE_NATIVE_CLIPBOARD__.snapshot());
      console.info('[clipboard-copy-audit]', JSON.stringify({ activation, ...copied }));
      expect(copied.secure).toBe(true);
      expect(copied.available).toBe(true);
      expect(copied.copies).toEqual([
        { text: expected, result: true, trusted: true, active: true }
      ]);
      expect(copied.copied).toBe(true);
      expect(copied.feedback).toBe('Copied');

      const destination = page.getByRole('textbox', { name: 'Paste destination' });
      await destination.focus();
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
      await page.waitForFunction(
        () => window.__RSUITE_NATIVE_CLIPBOARD__.snapshot().pastes.length > 0
      );
      const state = await page.evaluate(() => window.__RSUITE_NATIVE_CLIPBOARD__.snapshot());
      console.info('[clipboard-native-audit]', JSON.stringify({ activation, ...state }));
      expect(state.pastes).toEqual([{ text: expected, trusted: true }]);
      expect(await destination.inputValue()).toBe(expected);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
