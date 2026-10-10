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

describe('Slider native input focus', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Slider/test/Slider.input.client.tsx'
    });
    console.info('Slider input browser', {
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
      .poll(() => page.evaluate(() => window.__RSUITE_SLIDER_INPUT__?.snapshot().ready))
      .toBe(true);
    expect(await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  };

  it.each([false, true])('focuses the named slider inputs in Tab order, range: %s', async range => {
    const { page, errors } = await open(range ? { range: '' } : {});
    try {
      await page.getByRole('button', { name: 'Before' }).click();
      for (const index of range ? [0, 1] : [0]) {
        await page.keyboard.press('Tab');
        expect(await focused(page, index)).toBe(true);
        const input = page.getByRole('slider', { name: 'Amount' }).nth(index);
        expect(await input.getAttribute('aria-valuenow')).toBe(String(index ? 60 : 20));
        expect(await input.getAttribute('min')).toBe('10');
        expect(await input.getAttribute('max')).toBe('80');
        expect(await input.getAttribute('step')).toBe('5');
        const snapshot = await page.accessibility.snapshot({
          root: (await input.elementHandle())!,
          interestingOnly: false
        });
        expect(snapshot).toMatchObject({ role: 'slider', name: 'Amount', focused: true });
        // Firefox serializes the accessible value as a string and omits numeric bounds.
        expect(Number(snapshot?.value)).toBe(index ? 60 : 20);
        if (source.browserName === 'chromium') {
          expect(snapshot).toMatchObject({ valuemin: 10, valuemax: 80 });
        }
      }
      await page.keyboard.press('Tab');
      expect(
        await page
          .getByRole('button', { name: 'After' })
          .evaluate(node => node === document.activeElement)
      ).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each([false, true])(
    'preserves input identity and Tab order across crossing, controlled: %s',
    async controlled => {
      const { page, errors } = await open({ range: '', ...(controlled ? { controlled: '' } : {}) });
      try {
        await page.getByRole('button', { name: 'Before' }).click();
        await page.keyboard.press('Tab');
        const original = await page.getByRole('slider').first().elementHandle();
        await page.keyboard.press('End');
        expect(await values(page)).toEqual([80, 60]);
        expect(await focused(page)).toBe(true);
        expect(
          await page
            .getByRole('slider')
            .first()
            .evaluate((node, before) => node === before, original)
        ).toBe(true);
        await page.keyboard.press('ArrowDown');
        expect(await values(page)).toEqual([75, 60]);
        await page.keyboard.press('Tab');
        expect(await focused(page, 1)).toBe(true);
        await page.keyboard.press('ArrowUp');
        expect(await values(page)).toEqual([75, 65]);
        expect(
          (await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot())).changes
        ).toEqual([
          [60, 80],
          [60, 75],
          [65, 75]
        ]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('preserves the focused endpoint after a constraint rejects crossing', async () => {
    const { page, errors } = await open({ range: '', constrained: '' });
    try {
      await page.getByRole('button', { name: 'Before' }).click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      expect(await values(page)).toEqual([20, 60]);
      await page.keyboard.press('ArrowUp');
      expect(await values(page)).toEqual([25, 60]);
      expect(await focused(page)).toBe(true);
      expect(
        (await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot())).changes
      ).toEqual([[25, 60]]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each([false, true])(
    'accepts native PageUp changes on the correct input, range: %s',
    async range => {
      const { page, errors } = await open(range ? { range: '' } : {});
      try {
        await page.getByRole('slider').first().focus();
        await page.keyboard.press('PageUp');
        const next = await values(page);
        expect(next[0]).toBeGreaterThan(20);
        if (range) expect(next[1]).toBe(60);
        expect(await page.getByRole('slider').first().getAttribute('aria-valuenow')).toBe(
          String(next[0])
        );
        const state = await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot());
        expect(state.changes).toEqual([range ? next : next[0]]);
        expect(state.commits).toEqual([]);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each([false, true])(
    'focuses the slider input when dragging its thumb, range: %s',
    async range => {
      const { page, errors } = await open(range ? { range: '' } : {});
      try {
        const bar = await page.locator('.rs-slider-bar').boundingBox();
        expect(bar).not.toBeNull();
        const x = bar!.x + bar!.width / 7;
        const y = bar!.y + bar!.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        expect(await focused(page)).toBe(true);
        await page.mouse.move(x + bar!.width / 7, y, { steps: 3 });
        await expect.poll(async () => (await values(page))[0]).toBe(30);
        await page.mouse.up();
        expect(await focused(page)).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('keeps the dragged endpoint when a constraint rejects crossing', async () => {
    const { page, errors } = await open({ range: '', constrained: '' });
    try {
      const bar = (await page.locator('.rs-slider-bar').boundingBox())!;
      const y = bar.y + bar.height / 2;
      await page.mouse.move(bar.x + bar.width / 7, y);
      await page.mouse.down();
      await page.mouse.move(bar.x + bar.width, y, { steps: 3 });
      await page.mouse.up();
      expect(await focused(page)).toBe(true);
      expect(await values(page)).toEqual([20, 60]);
      await page.keyboard.press('ArrowUp');
      expect(await values(page)).toEqual([25, 60]);
      const state = await page.evaluate(() => window.__RSUITE_SLIDER_INPUT__.snapshot());
      expect(state.changes).toEqual([[25, 60]]);
      expect(state.commits).toEqual([]);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each(['light', 'dark', 'high-contrast'])(
    'shows a thumb focus indicator in %s theme',
    async theme => {
      const { page, errors } = await open({ theme });
      try {
        await page.getByRole('button', { name: 'Before' }).click();
        await page.mouse.move(0, 0);
        const handle = page.getByTestId('slider-handle');
        const shadow = () => handle.evaluate(node => getComputedStyle(node, '::before').boxShadow);
        expect(await shadow()).toBe('none');
        await page.keyboard.press('Tab');
        expect(await focused(page)).toBe(true);
        await expect.poll(shadow).not.toBe('none');
        await page.keyboard.press('Tab');
        await expect.poll(shadow).toBe('none');
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it.each([false, true])(
    'keeps RTL keyboard changes on the focused input, vertical: %s',
    async vertical => {
      const { page, errors } = await open({
        range: '',
        rtl: '',
        ...(vertical ? { vertical: '' } : {})
      });
      try {
        await page.getByRole('slider').first().focus();
        await page.keyboard.press(vertical ? 'ArrowUp' : 'ArrowLeft');
        expect(await values(page)).toEqual([25, 60]);
        expect(await focused(page)).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
