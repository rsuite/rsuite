import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

describe('Picker typed option identity with native input', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Picker.identity.client.tsx'
    });
    console.info('Picker typed identity browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(picker: string, mode: string) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      await page.goto(`${source.url}/#${new URLSearchParams({ picker, mode })}`);
      await expect
        .poll(() => page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__?.snapshot().entered))
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      const combo = page.getByRole('combobox');
      const number = page.getByRole('option', { name: 'Number zero', exact: true });
      const string = page.getByRole('option', { name: 'String zero', exact: true });
      if (mode === 'reorder') {
        const originals = [await number.elementHandle(), await string.elementHandle()];
        const revision = await page.evaluate(
          () => window.__RSUITE_PICKER_IDENTITY__.snapshot().revision
        );
        await page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__.reorder());
        await expect
          .poll(() => page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__.snapshot().revision))
          .toBeGreaterThan(revision);
        expect(await number.evaluate((node, original) => node === original, originals[0])).toBe(
          true
        );
        expect(await string.evaluate((node, original) => node === original, originals[1])).toBe(
          true
        );
        expect(
          await page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__.snapshot().changes)
        ).toEqual([]);
      } else {
        await combo.focus();
        await page.keyboard.press('ArrowDown');
        if (mode !== 'disabled') await page.keyboard.press('ArrowDown');
        await expect
          .poll(async () => {
            if (!(await string.isVisible())) return false;
            return (picker === 'InputPicker' || picker === 'TagPicker' ? combo : string).evaluate(
              node => node === document.activeElement
            );
          })
          .toBe(true);
        const stringId = await string.getAttribute('id');
        expect(stringId).toBeTruthy();
        await expect.poll(() => combo.getAttribute('aria-activedescendant')).toBe(stringId);
        expect(await string.evaluate(node => document.getElementById(node.id) === node)).toBe(true);
        const ids = await page.getByRole('option').evaluateAll(nodes => nodes.map(node => node.id));
        expect(new Set(ids).size).toBe(ids.length);
        expect(await string.getAttribute('data-key')).toBe('0');
        if (mode !== 'distant') {
          expect(await number.getAttribute('data-key')).toBe(mode === 'distinct' ? '1' : '0');
          expect(await number.getAttribute('id')).not.toBe(stringId);
        }
        await page.keyboard.press('Enter');
        const state = await page.evaluate(() => window.__RSUITE_PICKER_IDENTITY__.snapshot());
        expect(state.changes).toEqual([
          {
            value: picker === 'CheckPicker' || picker === 'TagPicker' ? ['0'] : '0',
            trusted: true,
            originalEvent: true
          }
        ]);
        expect(state.keys).toEqual(
          (mode === 'disabled' ? ['ArrowDown', 'Enter'] : ['ArrowDown', 'ArrowDown', 'Enter']).map(
            key => ({ key, trusted: true })
          )
        );
      }
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }

  for (const picker of ['SelectPicker', 'CheckPicker', 'InputPicker', 'TagPicker']) {
    describe(picker, () => {
      it.each(['regular', 'custom', 'virtual', 'distant', 'disabled', 'distinct'])(
        'focuses and selects the string value in %s data',
        mode => run(picker, mode)
      );
      it('keeps DOM rows attached to their raw values after reordering', () =>
        run(picker, 'reorder'));
    });
  }
});
