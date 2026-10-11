import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

describe('Picker public keyboard handler composition', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Picker.onKeyDown.client.tsx'
    });
    console.info('Picker public keydown browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(picker: string, mode: string, selected = false) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      const params = new URLSearchParams({ picker, mode });
      if (selected) params.set('selected', 'true');
      await page.goto(`${source.url}/#${params}`);
      await expect
        .poll(() => page.evaluate(() => Boolean(window.__RSUITE_PICKER_KEYDOWN__)))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_PICKER_KEYDOWN__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const combo = page.getByRole('combobox');
      await combo.focus();
      const locked = mode === 'readOnly' || mode === 'loading';
      const keys: string[] = [];
      if (!selected) {
        await page.keyboard.press('Enter');
        keys.push('Enter');
        await expect.poll(() => combo.getAttribute('aria-expanded')).toBe(String(!locked));
        if (mode === 'focus') {
          await expect
            .poll(() =>
              page
                .getByRole('button', { name: 'Outside action' })
                .evaluate(node => node === document.activeElement)
            )
            .toBe(true);
        } else if (!locked) {
          await page.keyboard.press('Escape');
          keys.push('Escape');
          await expect.poll(() => combo.getAttribute('aria-expanded')).toBe('false');
        }
      }
      if (locked) {
        if (selected) expect(await combo.textContent()).toContain('Alpha');
        await page.keyboard.press('Backspace');
        keys.push('Backspace');
        expect(await combo.getAttribute('aria-expanded')).toBe('false');
        if (selected) expect(await combo.textContent()).toContain('Alpha');
      }
      if (mode !== 'focus') {
        await expect.poll(() => combo.evaluate(node => node === document.activeElement)).toBe(true);
      }
      const state = await page.evaluate(() => window.__RSUITE_PICKER_KEYDOWN__.snapshot());
      expect(state.keys).toEqual(
        mode === 'control' ? [] : keys.map(key => ({ key, trusted: true, originalEvent: true }))
      );
      expect(state.changes).toBe(0);
      expect(state.clean).toBe(0);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }

  for (const picker of [
    'SelectPicker',
    'CheckPicker',
    'TreePicker',
    'CheckTreePicker',
    'Cascader',
    'MultiCascader'
  ]) {
    describe(picker, () => {
      it('opens and closes without a public handler', () => run(picker, 'control'));
      it('opens and closes with its public handler', () => run(picker, 'open'));
      it('preserves focus assigned by its public handler', () => run(picker, 'focus'));
      it.each(['readOnly', 'loading'])('%s reports keys without opening or clearing', mode =>
        run(picker, mode)
      );
    });
  }
  it.each(['readOnly', 'loading'])('%s keeps the selected value on Backspace', mode =>
    run('SelectPicker', mode, true)
  );
});
