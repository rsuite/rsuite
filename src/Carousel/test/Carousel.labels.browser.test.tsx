import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';

describe('Carousel accessible indicator selection', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Carousel/test/Carousel.keyboard.client.tsx'
    });
    console.info('Carousel named indicators browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  it.each([
    { options: '', group: 'Choose slide', first: 'Slide 1 of 3', second: 'Slide 2 of 3' },
    { options: 'zh', group: '选择幻灯片', first: '第 1 张，共 3 张', second: '第 2 张，共 3 张' },
    { options: 'partial', group: 'Choose slide', first: 'Slide 1 of 3', second: 'Slide 2 of 3' },
    {
      options: 'zh&override',
      group: 'Featured stories',
      first: '第 1 张，共 3 张',
      second: '第 2 张，共 3 张'
    },
    { options: 'named', group: 'Choose slide', first: 'Mountain view', second: 'City skyline' }
  ])(
    'selects named indicators with native keys: $options',
    async ({ options, group, first, second }) => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      try {
        await page.goto(`${source.url}/#${options}`);
        await page.waitForFunction(() => window.__RSUITE_CAROUSEL_KEYBOARD__?.snapshot().ready);
        expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_KEYBOARD__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const indicators = page.getByTestId('first').getByRole('radiogroup', { name: group });
        const selected = indicators.getByRole('radio', { name: second, exact: true });
        const previous = indicators.getByRole('radio', { name: first, exact: true });
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        expect(await selected.evaluate(node => document.activeElement === node)).toBe(true);
        await page.keyboard.press('ArrowLeft');
        expect(await previous.evaluate(node => document.activeElement === node)).toBe(true);
        expect(await previous.isChecked()).toBe(true);
        await page.keyboard.press('ArrowRight');
        expect(await selected.evaluate(node => document.activeElement === node)).toBe(true);
        expect(await selected.isChecked()).toBe(true);
        expect(await page.getByTestId('second').getByRole('radio').first().isChecked()).toBe(true);
        expect(
          await page.evaluate(() => window.__RSUITE_CAROUSEL_KEYBOARD__.snapshot().selections)
        ).toEqual([
          { carousel: 'first', index: 0, trusted: true },
          { carousel: 'first', index: 1, trusted: true }
        ]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
