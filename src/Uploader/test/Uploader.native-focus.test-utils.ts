import type { Locator, Page } from 'playwright';
import { expect } from 'vitest';
import type {} from './Uploader.native-focus.client';

type Surface = { color: string; parent: Surface | null };

export const snapshot = (page: Page) =>
  page.evaluate(() => window.__RSUITE_UPLOAD_NATIVE_FOCUS__.snapshot());

export const appearance = (trigger: Locator) =>
  trigger.evaluate(element => {
    const style = getComputedStyle(element);
    const frame = getComputedStyle(element, '::after');
    const rect = element.getBoundingClientRect();
    const background = (node: Element): Surface => ({
      color: getComputedStyle(node).backgroundColor,
      parent: node.parentElement ? background(node.parentElement) : null
    });
    return {
      shadow: style.boxShadow,
      position: style.position,
      outline: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      outlineOffset: style.outlineOffset,
      outlineColor: style.outlineColor,
      frameContent: frame.content,
      frameBorder: frame.borderTopWidth,
      frameInset: frame.inset,
      frameColor: frame.borderTopColor,
      frameShadow: frame.boxShadow,
      frameOutline: frame.outlineStyle,
      frameOutlineWidth: frame.outlineWidth,
      frameOutlineColor: frame.outlineColor,
      framePointerEvents: frame.pointerEvents,
      border: style.borderTopWidth,
      width: rect.width,
      height: rect.height,
      background: background(element)
    };
  });

const colors = (value: string) => {
  const values = value.match(/[\d.]+/g)!.map(Number);
  return [
    ...values.slice(0, 3).map(n => (value.startsWith('color(srgb ') ? n * 255 : n)),
    values[3] ?? 1
  ];
};
const luminance = (rgb: number[]) =>
  rgb
    .slice(0, 3)
    .map(channel => {
      const n = channel / 255;
      return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a: number[], b: number[]) => {
  const values = [luminance(a), luminance(b)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};
export function expectContrast(
  state: Awaited<ReturnType<typeof appearance>>,
  framework: boolean,
  forced = false
) {
  const background = (node: typeof state.background | null): number[] => {
    if (!node) return [255, 255, 255];
    const color = colors(node.color),
      behind = background(node.parent);
    return color.slice(0, 3).map((n, i) => n * color[3] + behind[i] * (1 - color[3]));
  };
  const surface = background(state.background);
  if (!framework) expect(contrast(colors(state.outlineColor), surface)).toBeGreaterThanOrEqual(3);
  else {
    const inner = forced
      ? state.frameOutlineColor
      : state.frameShadow.match(/rgba?\([^)]*\)|color\(srgb[^)]*\)/)![0];
    expect(
      Math.max(contrast(colors(state.frameColor), surface), contrast(colors(inner), surface))
    ).toBeGreaterThanOrEqual(3);
  }
}

export async function focusInput(page: Page) {
  await page.locator('[data-before]').focus();
  await page.keyboard.press('Tab');
  expect(await page.locator('input[type=file]').evaluate(e => document.activeElement === e)).toBe(
    true
  );
  expect(await page.locator('input[type=file]').evaluate(e => e.matches(':focus-visible'))).toBe(
    true
  );
}
