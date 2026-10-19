import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type { Locator, Page } from 'playwright';

describe('Carousel native keyboard indicators', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;

  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/Carousel/test/Carousel.keyboard.client.tsx'
    });
    console.info('Carousel keyboard browser', {
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
    await page.waitForFunction(() => window.__RSUITE_CAROUSEL_KEYBOARD__?.snapshot().ready);
    expect(await page.evaluate(() => window.__RSUITE_CAROUSEL_KEYBOARD__.runtime)).toEqual({
      react: source.reactVersion,
      reactDOM: source.reactVersion
    });
    return { page, errors };
  }

  async function expectFocus(locator: Locator) {
    await expect.poll(() => locator.evaluate(node => document.activeElement === node)).toBe(true);
  }

  async function expectSelection(page: Page, carousel: string, index: number) {
    const root = page.getByTestId(carousel);
    await expect
      .poll(() =>
        root
          .locator('input')
          .evaluateAll(inputs => inputs.map(input => (input as HTMLInputElement).checked))
      )
      .toEqual(Array.from({ length: carousel === 'first' ? 3 : 2 }, (_, i) => i === index));
    await expect
      .poll(() =>
        root
          .locator('.rs-carousel-slider > div')
          .evaluateAll(slides => slides.map(slide => slide.getAttribute('aria-hidden')))
      )
      .toEqual(Array.from({ length: carousel === 'first' ? 3 : 2 }, (_, i) => String(i !== index)));
  }

  describe.each([false, true])('StrictMode: %s', strict => {
    describe.each([false, true])('controlled: %s', controlled => {
      it.each(['bottom', 'right'])(
        'tabs through groups and selects with arrows: %s',
        async placement => {
          const { page, errors } = await open({
            placement,
            ...(strict ? { strict: '' } : {}),
            ...(controlled ? { controlled: '' } : {})
          });
          try {
            const first = page.getByTestId('first').locator('input');
            const second = page.getByTestId('second').locator('input');
            await page.keyboard.press('Tab');
            await expectFocus(page.getByRole('button', { name: 'Before', exact: true }));
            await page.keyboard.press('Tab');
            await expectFocus(first.nth(1));
            const forward = placement === 'right' ? 'ArrowDown' : 'ArrowRight';
            const backward = placement === 'right' ? 'ArrowUp' : 'ArrowLeft';
            await page.keyboard.press(forward);
            await expectSelection(page, 'first', 2);
            await expectFocus(first.nth(2));
            await expectSelection(page, 'second', 0);
            await page.keyboard.press(forward);
            await expectSelection(page, 'first', 0);
            await page.keyboard.press(backward);
            await expectSelection(page, 'first', 2);
            await page.keyboard.press('Tab');
            await expectFocus(page.getByRole('button', { name: 'Between', exact: true }));
            await page.keyboard.press('Shift+Tab');
            await expectFocus(first.nth(2));
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await expectFocus(second.nth(0));
            await page.keyboard.press(forward);
            await expectSelection(page, 'second', 1);
            await expectSelection(page, 'first', 2);
            await page.keyboard.press('Tab');
            await expectFocus(page.getByRole('button', { name: 'After', exact: true }));
            await page.keyboard.press('Shift+Tab');
            await expectFocus(second.nth(1));
            expect(
              await page.evaluate(() => window.__RSUITE_CAROUSEL_KEYBOARD__.snapshot().selections)
            ).toEqual([
              { carousel: 'first', index: 2, trusted: true },
              { carousel: 'first', index: 0, trusted: true },
              { carousel: 'first', index: 2, trusted: true },
              { carousel: 'second', index: 1, trusted: true }
            ]);
            expect(errors).toEqual([]);
          } finally {
            await page.close();
          }
        }
      );
    });
  });

  it.each(['dot', 'bar'])('shows a visible focus ring on the %s indicator', async shape => {
    const { page, errors } = await open({ shape });
    try {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const ring = await page.evaluate(() => {
        const label = document.activeElement?.parentElement?.querySelector('label');
        if (!label) throw new Error('Focused indicator label is missing');
        const style = getComputedStyle(label);
        const rect = label.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          outline: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          color: style.outlineColor
        };
      });
      expect(ring.width).toBeGreaterThan(0);
      expect(ring.height).toBeGreaterThan(0);
      expect(ring.outline).toBe('solid');
      expect(ring.outlineWidth).toBe('2px');
      expect(ring.color).toBe('rgb(1, 2, 3)');
      expect(errors).toEqual([]);
    } finally {
      await page.close();
    }
  });
});
