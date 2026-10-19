import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Locator } from 'playwright';

describe('Carousel inactive content focus', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Carousel/test/Carousel.focus.client.tsx'
    });
    console.info('Carousel content focus browser', {
      browser: source.browserName,
      version: source.browser.version(),
      react: source.reactVersion
    });
  });
  afterAll(async () => source?.close());

  async function open(options: Record<string, string>) {
    const page = await source.browser.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(`${source.url}/#${new URLSearchParams(options)}`);
    await page.waitForFunction(() => window.__RSUITE_CAROUSEL_FOCUS__?.snapshot().ready);
    expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  }
  const focused = (locator: Locator) => locator.evaluate(node => document.activeElement === node);

  describe.each([false, true])('StrictMode: %s', strict => {
    it.each([false, true])(
      'skips hidden controls and preserves input state, controlled: %s',
      async controlled => {
        const { page, errors } = await open({
          ...(strict ? { strict: '' } : {}),
          ...(controlled ? { controlled: '' } : {})
        });
        try {
          const indicators = page.getByTestId('carousel').locator('input[type="radio"]');
          for (const target of [
            'before',
            'first-button',
            'first-input',
            'first-link',
            'first-editable'
          ]) {
            await page.keyboard.press('Tab');
            expect(await focused(page.getByTestId(target))).toBe(true);
            if (target === 'first-input') await page.getByTestId(target).fill('retained input');
          }
          await page.keyboard.press('Tab');
          expect(await focused(indicators.nth(0))).toBe(true);
          await page.getByTestId('second-button').evaluate(node => node.focus());
          expect(await focused(indicators.nth(0))).toBe(true);
          await page.keyboard.press('ArrowRight');
          await expect
            .poll(() => page.getByTestId('second-slide').getAttribute('aria-hidden'))
            .toBe('false');
          await page.keyboard.press('Shift+Tab');
          expect(await focused(page.getByTestId('second-editable'))).toBe(true);
          await page.getByTestId('first-input').evaluate(node => node.focus());
          expect(await focused(page.getByTestId('second-editable'))).toBe(true);
          await page.keyboard.press('Tab');
          expect(await focused(indicators.nth(1))).toBe(true);
          await page.keyboard.press('ArrowLeft');
          await expect
            .poll(() => page.getByTestId('first-slide').getAttribute('aria-hidden'))
            .toBe('false');
          await page.keyboard.press('Shift+Tab');
          expect(await focused(page.getByTestId('first-editable'))).toBe(true);
          expect(await page.getByTestId('first-input').inputValue()).toBe('retained input');
          expect(
            await page.evaluate(() => window.__RSUITE_CAROUSEL_FOCUS__.snapshot().selections)
          ).toEqual([
            { index: 1, trusted: true },
            { index: 0, trusted: true }
          ]);
          expect(errors).toEqual([]);
        } finally {
          await page.close();
        }
      }
    );

    it('keeps the autoplay wrap mask decorative', async () => {
      const { page, errors } = await open({ autoplay: '', ...(strict ? { strict: '' } : {}) });
      try {
        const mask = page.locator('.rs-carousel-slider-after');
        await mask.waitFor({ state: 'attached' });
        const before = page.getByTestId('before');
        await before.focus();
        const copies = mask.locator('button, input, a, [contenteditable]');
        expect(await copies.count()).toBe(8);
        for (const control of await copies.all()) {
          await control.evaluate(node => (node as HTMLElement).focus());
          expect(await focused(before)).toBe(true);
        }
        for (const target of ['first-button', 'first-input', 'first-link', 'first-editable']) {
          await page.keyboard.press('Tab');
          expect(await focused(page.locator('.rs-carousel-slider').getByTestId(target))).toBe(true);
        }
        await page.keyboard.press('Tab');
        expect(
          await focused(page.getByTestId('carousel').locator('input[type="radio"]').nth(0))
        ).toBe(true);
        expect(await mask.getAttribute('aria-hidden')).toBe('true');
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    });
  });

  it('preserves an explicitly inert active slide', async () => {
    const { page, errors } = await open({ preserve: '' });
    try {
      await page.keyboard.press('Tab');
      expect(await focused(page.getByTestId('before'))).toBe(true);
      await page.keyboard.press('Tab');
      expect(
        await focused(page.getByTestId('carousel').locator('input[type="radio"]').nth(0))
      ).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });

  it.each([
    { vector: 'native', placement: 'bottom' },
    { vector: 'custom', placement: 'bottom' },
    { vector: 'native', placement: 'right' },
    { vector: 'custom', placement: 'right' }
  ])(
    'protects $vector SVG slides without changing their size: $placement',
    async ({ vector, placement }) => {
      const { page, errors } = await open({ vector, placement });
      try {
        const carousel = page.getByTestId('carousel');
        const indicators = carousel.locator('input[type="radio"]');
        await page.getByTestId('first-editable').focus();
        await page.keyboard.press('Tab');
        expect(await focused(indicators.nth(0))).toBe(true);
        await page.getByTestId('vector-link').evaluate(node => (node as SVGElement).focus());
        expect(await focused(indicators.nth(0))).toBe(true);
        const bounds = await carousel.boundingBox();
        const slide = await page.getByTestId('second-slide').boundingBox();
        const first = await page.getByTestId('first-slide').boundingBox();
        expect(slide?.width).toBe(bounds?.width);
        expect(slide?.height).toBe(bounds?.height);
        expect(first?.width).toBe(bounds?.width);
        expect(first?.height).toBe(bounds?.height);
        await page.keyboard.press(placement === 'right' ? 'ArrowDown' : 'ArrowRight');
        await expect
          .poll(() => page.getByTestId('second-slide').getAttribute('aria-hidden'))
          .toBe('false');
        await page.keyboard.press('Shift+Tab');
        expect(await focused(page.getByTestId('vector-link'))).toBe(true);
        await page.getByTestId('first-input').evaluate(node => node.focus());
        expect(await focused(page.getByTestId('vector-link'))).toBe(true);
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );
});
