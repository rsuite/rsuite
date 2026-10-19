import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Page } from 'playwright';

const values = (page: Page) =>
  page
    .getByRole('slider')
    .evaluateAll(nodes => nodes.map(node => Number((node as HTMLInputElement).value)));
const focused = (page: Page, index = 0) =>
  page
    .getByRole('slider')
    .nth(index)
    .evaluate(node => node === document.activeElement);
const rerenderOwner = async (page: Page) => {
  const before = await page.getByTestId('fixture').getAttribute('data-renders');
  await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.renderOwner());
  await expect
    .poll(() => page.getByTestId('fixture').getAttribute('data-renders'))
    .not.toBe(before);
};

describe('RangeSlider controlled input identity', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/RangeSlider/test/RangeSlider.identity.client.tsx'
    });
    console.info('RangeSlider identity browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());
  const open = async (options: Record<string, string> = {}) => {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(source.url + '/#' + new URLSearchParams(options));
    await expect
      .poll(() => page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__?.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  };

  it.each([0, 1])(
    'keeps focused endpoint %s when the owner rejects crossing and renders again',
    async index => {
      const { page, errors } = await open();
      try {
        await page.getByRole('button', { name: 'Before' }).click();
        await page.keyboard.press('Tab');
        if (index) await page.keyboard.press('Tab');
        expect(await focused(page, index)).toBe(true);
        await page.keyboard.press(index ? 'Home' : 'End');
        expect(await values(page)).toEqual([20, 60]);
        await rerenderOwner(page);
        expect(await values(page)).toEqual([20, 60]);
        expect(await focused(page, index)).toBe(true);
        await page.keyboard.press('ArrowUp');
        const state = await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot());
        expect(state.changes).toEqual(
          index
            ? [
                [10, 20],
                [20, 65]
              ]
            : [
                [60, 80],
                [25, 60]
              ]
        );
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('applies a deferred crossing after an unchanged owner render without replacing its input', async () => {
    const { page, errors } = await open({ mode: 'defer' });
    try {
      const first = page.getByRole('slider').first();
      const original = await first.elementHandle();
      await first.focus();
      await page.keyboard.press('End');
      await rerenderOwner(page);
      expect(await values(page)).toEqual([20, 60]);
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.accept());
      await expect.poll(() => values(page)).toEqual([80, 60]);
      expect(await first.evaluate((node, before) => node === before, original)).toBe(true);
      expect(await focused(page)).toBe(true);
      await page.keyboard.press('ArrowDown');
      expect(
        (await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot())).changes
      ).toEqual([
        [60, 80],
        [60, 75]
      ]);
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.accept());
      await expect.poll(() => values(page)).toEqual([75, 60]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each(['normalize-above', 'normalize-below'])(
    'follows the value the owner accepts in %s mode',
    async mode => {
      const { page, errors } = await open({ mode });
      try {
        await page.getByRole('slider').first().focus();
        await page.keyboard.press('End');
        expect(await values(page)).toEqual(mode === 'normalize-above' ? [75, 60] : [55, 60]);
        expect(await focused(page)).toBe(true);
        await page.keyboard.press('ArrowDown');
        expect(await values(page)).toEqual(mode === 'normalize-above' ? [70, 60] : [50, 60]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each([false, true])(
    'follows a crossing pointer in one move, uncontrolled: %s',
    async uncontrolled => {
      const { page, errors } = await open({
        mode: 'accept',
        ...(uncontrolled ? { uncontrolled: '' } : {})
      });
      try {
        const bar = (await page.locator('.rs-slider-bar').boundingBox())!;
        const y = bar.y + bar.height / 2;
        await page.mouse.move(bar.x + bar.width / 7, y);
        await page.mouse.down();
        await page.mouse.move(bar.x + bar.width, y);
        await expect.poll(() => values(page)).toEqual([80, 60]);
        expect(await focused(page)).toBe(true);
        await page.mouse.up();
        expect(
          (await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot())).commits
        ).toEqual([[60, 80]]);
        await page.keyboard.press('ArrowDown');
        expect(await values(page)).toEqual([75, 60]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each([false, true])(
    'moves a coincident thumb without stopping at its peer, uncontrolled: %s',
    async uncontrolled => {
      const { page, errors } = await open({
        mode: 'accept',
        coincident: '',
        ...(uncontrolled ? { uncontrolled: '' } : {})
      });
      try {
        const bar = (await page.locator('.rs-slider-bar').boundingBox())!;
        const y = bar.y + bar.height / 2;
        await page.mouse.move(bar.x + (bar.width * 5) / 7, y);
        await page.mouse.down();
        expect(await focused(page, 1)).toBe(true);
        await page.mouse.move(bar.x, y);
        await expect.poll(() => values(page)).toEqual([60, 10]);
        await page.mouse.up();
        expect(await focused(page, 1)).toBe(true);
        await page.keyboard.press('ArrowUp');
        expect(await values(page)).toEqual([60, 15]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('keeps pointer focus on its endpoint after the owner rejects crossing', async () => {
    const { page, errors } = await open();
    try {
      const bar = (await page.locator('.rs-slider-bar').boundingBox())!;
      const y = bar.y + bar.height / 2;
      await page.mouse.move(bar.x + bar.width / 7, y);
      await page.mouse.down();
      await page.mouse.move(bar.x + bar.width, y);
      await expect
        .poll(
          async () =>
            (await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot())).changes?.length
        )
        .toBe(1);
      await rerenderOwner(page);
      expect(await values(page)).toEqual([20, 60]);
      await page.mouse.up();
      await rerenderOwner(page);
      expect(await focused(page)).toBe(true);
      await page.keyboard.press('ArrowUp');
      const state = await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot());
      expect(state.changes).toEqual([
        [60, 80],
        [25, 60]
      ]);
      expect(state.commits).toEqual([[60, 80]]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
  it('preserves accepted thumb identity through updates while Activity is hidden', async ({
    skip
  }) => {
    const { page, errors } = await open({ mode: 'defer', activity: '' });
    try {
      if (!(await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.activitySupported))) skip();
      const inputs = page.locator('input[type="range"]');
      const original = await inputs.first().elementHandle();
      await inputs.first().focus();
      await page.keyboard.press('End');
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.setActivityMode('hidden'));
      await expect.poll(() => page.getByTestId('fixture').isVisible()).toBe(false);
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.accept());
      await expect.poll(() => inputs.first().inputValue()).toBe('80');
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.update([65, 75]));
      await expect
        .poll(() =>
          inputs.evaluateAll(nodes =>
            nodes.map(node => Number((node as HTMLInputElement).value)).sort((a, b) => a - b)
          )
        )
        .toEqual([65, 75]);
      await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.setActivityMode('visible'));
      await expect.poll(() => page.getByTestId('fixture').isVisible()).toBe(true);
      expect(await values(page)).toEqual([75, 65]);
      expect(await inputs.first().evaluate((node, before) => node === before, original)).toBe(true);
      await page.getByRole('button', { name: 'Before' }).click();
      await page.keyboard.press('Tab');
      expect(await focused(page)).toBe(true);
      await page.keyboard.press('ArrowDown');
      expect(
        (await page.evaluate(() => window.__RSUITE_RANGE_IDENTITY__.snapshot())).changes
      ).toEqual([
        [60, 80],
        [65, 70]
      ]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
