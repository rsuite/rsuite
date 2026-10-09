import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './NumberInput.decimal.client';

describe('NumberInput custom decimals with native browser events', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/NumberInput/test/NumberInput.decimal.client.tsx'
    });
    console.info('NumberInput decimal browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });

  afterAll(async () => source?.close());

  it.each(
    [false, true].flatMap(controlled =>
      ['keyboard', 'wheel', 'button'].map(trigger => ({ controlled, trigger }))
    )
  )('steps through $trigger with controlled=$controlled', async ({ controlled, trigger }) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_NUMBER_DECIMAL__));
      expect(await page.evaluate(() => window.__RSUITE_NUMBER_DECIMAL__.runtime)).toEqual({
        react: source.reactVersion,
        reactDOM: source.reactVersion
      });
      await page.evaluate(
        controlled => window.__RSUITE_NUMBER_DECIMAL__.mount(controlled),
        controlled
      );
      const input = page.getByRole('textbox', { name: 'Amount' });
      await input.fill('1,2');
      const before = await page.evaluate(() => window.__RSUITE_NUMBER_DECIMAL__.snapshot());
      expect(before.value).toBe('1,2');
      expect(before.focused).toBe(true);
      expect(before.blurs).toBe(0);
      expect(before.changes).toEqual([{ value: '1,2', trusted: true }]);

      if (trigger === 'keyboard') {
        await input.press('ArrowUp');
      } else if (trigger === 'wheel') {
        await input.hover();
        await page.mouse.wheel(0, -100);
      } else {
        await page.getByRole('button', { name: 'Increment', exact: true }).click();
      }

      await page.waitForFunction(
        () => window.__RSUITE_NUMBER_DECIMAL__.snapshot().changes.length > 1
      );
      const after = await page.evaluate(() => window.__RSUITE_NUMBER_DECIMAL__.snapshot());
      expect(after.value).toBe('1,3');
      expect(after.changes[after.changes.length - 1]).toEqual({ value: '1.3', trusted: true });
      expect(after.changes.every(change => change.trusted)).toBe(true);
      if (trigger !== 'button') {
        expect(after.blurs).toBe(0);
        expect(after.focused).toBe(true);
      }
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
