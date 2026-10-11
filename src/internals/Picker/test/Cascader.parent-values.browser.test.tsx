import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Page } from 'playwright';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

const item = (page: Page, name: string) => page.getByRole('treeitem', { name, exact: true });
const expectFocus = async (page: Page, name: string) => {
  await expect
    .poll(() =>
      item(page, name).evaluateAll(
        nodes => nodes.length === 1 && nodes[0] === document.activeElement
      )
    )
    .toBe(true);
};

describe('Cascader parent values with native keyboard navigation', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Cascader.parent-values.client.tsx'
    });
    console.info('Cascader parent values browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function run(
    picker: string,
    value: string,
    custom: boolean,
    rtl: boolean,
    child = 'string'
  ) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    try {
      const params = new URLSearchParams({
        picker,
        value,
        child,
        custom: String(custom),
        rtl: String(rtl)
      });
      await page.goto(`${source.url}/#${params}`);
      await expect
        .poll(() =>
          page.evaluate(() => window.__RSUITE_CASCADER_PARENT_VALUES__?.snapshot().entered)
        )
        .toBe(true);
      expect(await page.evaluate(() => window.__RSUITE_CASCADER_PARENT_VALUES__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.getByRole('combobox').focus();
      await page.keyboard.press('ArrowDown');
      await expectFocus(page, 'Parent');
      expect(await item(page, 'Child').isVisible()).toBe(true);
      await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
      await expectFocus(page, 'Child');
      await page.keyboard.press(rtl ? 'ArrowRight' : 'ArrowLeft');
      await expectFocus(page, 'Parent');
      expect(await item(page, 'Child').isVisible()).toBe(true);
      expect(await item(page, 'Parent').getAttribute('data-key')).toBe(
        value === 'zero' ? '0' : value === 'empty' ? '' : 'parent-key'
      );
      await page.keyboard.press('ArrowDown');
      await expectFocus(page, 'Last');
      expect(await item(page, 'Last').getAttribute('data-key')).toBe('last-key');
      const state = await page.evaluate(() => window.__RSUITE_CASCADER_PARENT_VALUES__.snapshot());
      expect(state.parentValue).toBe(value === 'zero' ? 0 : value === 'empty' ? '' : 'parent-key');
      expect(state.childValue).toBe(child === 'numeric' ? 42 : 'child-key');
      expect(state.childPreserved).toBe(true);
      expect(state.changes).toBe(0);
      expect(state.selections).toBe(0);
      expect(state.keys.map(event => event.key)).toEqual([
        'ArrowDown',
        rtl ? 'ArrowLeft' : 'ArrowRight',
        rtl ? 'ArrowRight' : 'ArrowLeft',
        'ArrowDown'
      ]);
      expect(state.keys.every(event => event.trusted)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  }

  for (const picker of ['single', 'multi']) {
    describe(picker, () => {
      for (const custom of [false, true]) {
        it.each(['zero', 'empty', 'nonempty'])(
          `returns to a %s parent with custom fields=${custom}, then navigates root siblings`,
          async value => run(picker, value, custom, false)
        );
      }
      it.each(['zero', 'empty'])('returns to a %s parent with reversed RTL arrows', async value => {
        await run(picker, value, false, true);
      });
      it.each([false, true])('returns from a numeric child with custom fields=%s', async custom =>
        run(picker, 'nonempty', custom, false, 'numeric')
      );
    });
  }
});
