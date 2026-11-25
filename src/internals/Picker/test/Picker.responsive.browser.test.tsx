import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../../test/browser/createSourceBrowser';

const components = [
  'SelectPicker',
  'CheckPicker',
  'Cascader',
  'MultiCascader',
  'TreePicker',
  'CheckTreePicker',
  'InputPicker',
  'TagPicker',
  'DatePicker',
  'DateRangePicker',
  'TimePicker',
  'TimeRangePicker'
];

describe('Picker responsive media queries', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'),
      entry: '/src/internals/Picker/test/Picker.responsive.client.tsx'
    });
    console.info('Picker responsive browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  describe.each([
    { query: '(max-width: 1279px)', narrow: 1279, wide: 1280, controlled: false, strict: false },
    { query: 'mdDown', narrow: 991, wide: 992, controlled: true, strict: true }
  ])('$query (controlled: $controlled)', mode => {
    it.each(components)('%s changes an open popup at the query boundary', async component => {
      const page = await source.browser.newPage({ viewport: { width: mode.wide, height: 900 } });
      page.setDefaultTimeout(5000);
      page.setDefaultNavigationTimeout(30000);
      const pageErrors: string[] = [];
      page.on('pageerror', error => pageErrors.push(String(error)));
      const states: { width: number; drawer: boolean; focused: string | null }[] = [];
      try {
        const hash = new URLSearchParams({ component, query: mode.query });
        if (mode.controlled) hash.set('controlled', '');
        if (mode.strict) hash.set('strict', '');
        await page.goto(`${source.url}/#${hash}`);
        await page.waitForFunction(() => window.__RSUITE_PICKER_RESPONSIVE__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_PICKER_RESPONSIVE__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const role = /^(Date|Time)/.test(component) ? 'textbox' : 'combobox';
        const owner = page.getByTestId('owner').getByRole(role);
        const popup = page.getByTestId('picker-popup');
        await owner.click();
        await expect.poll(() => popup.isVisible()).toBe(true);
        for (const width of [mode.wide, mode.narrow, mode.wide]) {
          await page.setViewportSize({ width, height: 900 });
          const drawer = width === mode.narrow;
          await expect.poll(() => page.locator('.rs-drawer').count()).toBe(drawer ? 1 : 0);
          await expect.poll(() => popup.isVisible()).toBe(true);
          expect(await popup.count()).toBe(1);
          if (role === 'combobox') expect(await owner.getAttribute('aria-expanded')).toBe('true');
          expect(await page.locator('[responsive]').count()).toBe(0);
          if (component === 'InputPicker' || component === 'TagPicker') {
            const input = drawer ? popup.getByRole('combobox') : owner;
            await expect
              .poll(() => input.evaluate(element => document.activeElement === element))
              .toBe(true);
            expect(await page.locator('#country').count()).toBe(1);
            expect(
              await owner.evaluate(
                element => !!document.getElementById(element.getAttribute('aria-controls') || '')
              )
            ).toBe(true);
          }
          states.push({
            width,
            drawer,
            focused: await page.evaluate(() => document.activeElement?.getAttribute('id') ?? null)
          });
        }
        await page.keyboard.press('Escape');
        await expect.poll(() => popup.isVisible()).toBe(false);
        await expect
          .poll(() => owner.evaluate(element => document.activeElement === element))
          .toBe(true);
        expect(pageErrors).toEqual([]);
      } finally {
        console.info(
          '[picker-responsive-native-audit]',
          JSON.stringify({
            component,
            ...mode,
            states,
            pageErrors,
            ...(await page.evaluate(() => window.__RSUITE_PICKER_RESPONSIVE__?.snapshot()))
          })
        );
        await page.close();
      }
    });
  });

  it.each([
    { component: 'SelectPicker', query: 'true', drawer: true },
    { component: 'SelectPicker', query: undefined, drawer: true },
    { component: 'SelectPicker', query: 'false', drawer: false },
    { component: 'InputPicker', query: undefined, drawer: false },
    { component: 'TagPicker', query: undefined, drawer: false },
    { component: 'AutoComplete', query: undefined, drawer: false }
  ])('preserves $component default / $query', async ({ component, query, drawer }) => {
    const page = await source.browser.newPage({ viewport: { width: 390, height: 844 } });
    page.setDefaultTimeout(5000);
    page.setDefaultNavigationTimeout(30000);
    try {
      const hash = new URLSearchParams({ component });
      if (query) hash.set('query', query);
      await page.goto(`${source.url}/#${hash}`);
      await page.waitForFunction(() => window.__RSUITE_PICKER_RESPONSIVE__?.snapshot().ready);
      const owner = page.getByTestId('owner').getByRole('combobox');
      await owner.click();
      if (component === 'AutoComplete') await owner.fill('A');
      await expect.poll(() => page.getByTestId('picker-popup').isVisible()).toBe(true);
      expect(await page.locator('.rs-drawer').count()).toBe(drawer ? 1 : 0);
      console.info(
        '[picker-responsive-control-audit]',
        JSON.stringify({ component, query, drawer })
      );
    } finally {
      await page.close();
    }
  });
});
