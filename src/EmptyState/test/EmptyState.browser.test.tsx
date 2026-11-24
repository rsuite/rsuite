import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import createSourceBrowser from '../../../test/browser/createSourceBrowser';
import type {} from './EmptyState.browser.client';

const luminance = (color: string) => {
  const values = color.match(/[\d.]+/g)!.map(Number);
  expect(values[3] ?? 1).toBe(1);
  return values
    .slice(0, 3)
    .map(value => {
      const channel = color.startsWith('color(srgb ') ? value : value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
};

describe('EmptyState native layout and actions', () => {
  let source: Awaited<ReturnType<typeof createSourceBrowser>>;
  beforeAll(async () => {
    source = await createSourceBrowser({
      root: resolve(dirname(fileURLToPath(import.meta.url)), '../../..'),
      entry: '/src/EmptyState/test/EmptyState.browser.client.tsx'
    });
    console.info('EmptyState', source.browserName, source.reactVersion);
  });
  afterAll(async () => source?.close());

  it.each(['light', 'dark', 'high-contrast'] as const)(
    'fits narrow layouts and follows reading direction in %s',
    async theme => {
      const page = await source.browser.newPage();
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(String(error)));
      try {
        await page.goto(source.url);
        await page.waitForFunction(() => Boolean(window.__RSUITE_EMPTY_STATE__));
        expect(await page.evaluate(() => window.__RSUITE_EMPTY_STATE__.runtime)).toEqual({
          react: source.reactVersion,
          reactDOM: source.reactVersion
        });
        const sizes: { font: number; padding: number }[] = [];
        for (const size of ['sm', 'md', 'lg'] as const) {
          for (const align of ['center', 'start'] as const) {
            for (const dir of ['ltr', 'rtl'] as const) {
              await page.evaluate(options => window.__RSUITE_EMPTY_STATE__.mount(options), {
                theme,
                size,
                align,
                dir
              });
              const region = page.getByRole('region', { name: 'Projects' });
              expect(await page.getByRole('heading', { level: 2 }).textContent()).toBe(
                'No projects found'
              );
              const layout = await region.evaluate(element => {
                const style = getComputedStyle(element);
                const icon = element.querySelector('.rs-empty-state-icon')!;
                const title = element.querySelector('.rs-empty-state-title')!;
                const description = element.querySelector('.rs-empty-state-description')!;
                const actions = element.querySelector('.rs-empty-state-actions')!;
                const rect = element.getBoundingClientRect();
                const iconRect = icon.getBoundingClientRect();
                const buttons = Array.from(actions.children, child =>
                  child.getBoundingClientRect()
                );
                return {
                  width: rect.width,
                  overflow: element.scrollWidth > element.clientWidth,
                  direction: style.direction,
                  padding: parseFloat(style.paddingLeft),
                  iconStart: iconRect.left - rect.left,
                  iconEnd: rect.right - iconRect.right,
                  font: parseFloat(getComputedStyle(title).fontSize),
                  descriptionOverflows: description.scrollWidth > description.clientWidth,
                  actionsWrap: buttons[1].top > buttons[0].top,
                  visibleActions: buttons.every(
                    button => button.left >= rect.left && button.right <= rect.right
                  ),
                  background: getComputedStyle(document.body).backgroundColor,
                  color: getComputedStyle(description).color
                };
              });
              expect(layout.width).toBe(240);
              expect(layout.overflow).toBe(false);
              expect(layout.descriptionOverflows).toBe(false);
              expect(layout.visibleActions).toBe(true);
              expect(layout.actionsWrap).toBe(true);
              expect(layout.direction).toBe(dir);
              const colors = [luminance(layout.background), luminance(layout.color)];
              expect(
                (Math.max(...colors) + 0.05) / (Math.min(...colors) + 0.05)
              ).toBeGreaterThanOrEqual(4.5);
              if (align === 'center' && dir === 'ltr') sizes.push(layout);
              if (align === 'start') {
                expect(
                  Math.abs((dir === 'ltr' ? layout.iconStart : layout.iconEnd) - layout.padding)
                ).toBeLessThan(1);
              }
            }
          }
        }
        for (let index = 1; index < sizes.length; index++) {
          expect(sizes[index].font).toBeGreaterThan(sizes[index - 1].font);
          expect(sizes[index].padding).toBeGreaterThan(sizes[index - 1].padding);
        }
        expect(errors).toEqual([]);
      } finally {
        await page.close();
      }
    }
  );

  it('keeps actions in the native keyboard order and activates them once', async () => {
    const page = await source.browser.newPage();
    try {
      await page.goto(source.url);
      await page.waitForFunction(() => Boolean(window.__RSUITE_EMPTY_STATE__));
      await page.evaluate(() =>
        window.__RSUITE_EMPTY_STATE__.mount({
          theme: 'light',
          size: 'md',
          align: 'center',
          dir: 'ltr'
        })
      );
      await page.locator('[data-before]').focus();
      await page.keyboard.press('Tab');
      expect(
        await page
          .getByRole('button', { name: 'Create project' })
          .evaluate(e => e === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Enter');
      expect(await page.evaluate(() => window.__RSUITE_EMPTY_STATE__.snapshot())).toEqual([true]);
      // macOS WebKit's default Tab order omits links; Alt+Tab includes them.
      await page.keyboard.press(
        source.browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab'
      );
      expect(
        await page
          .getByRole('link', { name: 'Learn more' })
          .evaluate(e => e === document.activeElement)
      ).toBe(true);
      await page.keyboard.press('Tab');
      expect(await page.locator('[data-after]').evaluate(e => e === document.activeElement)).toBe(
        true
      );
    } finally {
      await page.close();
    }
  });
});
