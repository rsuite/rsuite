import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { WheelOptions } from './NumberInput.wheel.client';

const scenarios = [
  { name: 'wheel opt-out while focused', options: { scrollable: false }, focus: true, scroll: 'y' },
  {
    name: 'wheel opt-out without focus',
    options: { scrollable: false },
    focus: false,
    scroll: 'y'
  },
  { name: 'consumer cancellation', options: { cancel: true }, focus: true, scroll: false },
  {
    name: 'ancestor native cancellation',
    options: { parentCancel: true },
    focus: true,
    scroll: false
  },
  { name: 'horizontal wheel while focused', options: {}, focus: true, scroll: 'x' },
  { name: 'read-only control', options: { readOnly: true }, focus: true, scroll: 'y' },
  { name: 'unfocused control', options: {}, focus: false, scroll: 'y' },
  { name: 'editable control', options: {}, focus: true, scroll: false }
] as const;

describe('NumberInput native wheel ownership', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/NumberInput/test/NumberInput.wheel.client.tsx'
    });
    console.info('NumberInput wheel browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each(
    [false, true].flatMap(controlled => scenarios.map(scenario => ({ ...scenario, controlled })))
  )('$name with controlled=$controlled', async ({ name, options, focus, scroll, controlled }) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_NUMBER_WHEEL__));
      expect(await page.evaluate(() => window.__RSUITE_NUMBER_WHEEL__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(options => window.__RSUITE_NUMBER_WHEEL__.mount(options), {
        ...options,
        controlled
      } as WheelOptions);
      const input = page.getByRole('textbox', { name: 'Amount' });
      if (focus) await input.focus();
      await input.hover();
      await page.mouse.wheel(scroll === 'x' ? 200 : 0, scroll === 'x' ? 0 : 200);
      await page.waitForFunction(() => window.__RSUITE_NUMBER_WHEEL__.snapshot().native.length > 0);
      let scrolled = false;
      if (scroll) {
        scrolled = await page
          .waitForFunction(
            axis => {
              const state = window.__RSUITE_NUMBER_WHEEL__.snapshot();
              return axis === 'x' ? state.scrollLeft > 0 : state.scrollTop > 0;
            },
            scroll,
            { timeout: 1500 }
          )
          .then(
            () => true,
            () => false
          );
      }
      const state = await page.evaluate(() => window.__RSUITE_NUMBER_WHEEL__.snapshot());
      console.info('[number-wheel-native-audit]', JSON.stringify({ name, controlled, ...state }));
      expect(state.native).toHaveLength(1);
      expect(state.native[0].trusted).toBe(true);
      expect(state.value).toBe(name === 'editable control' ? '49' : '50');
      expect(state.changes).toEqual(
        name === 'editable control' ? [{ value: '49', trusted: true }] : []
      );
      if (scroll) expect(scrolled).toBe(true);
      else expect([state.scrollTop, state.scrollLeft]).toEqual([0, 0]);
      expect(state.callbacks).toHaveLength('scrollable' in options && !options.scrollable ? 0 : 1);
      expect(state.callbacks.every(event => event.trusted)).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
