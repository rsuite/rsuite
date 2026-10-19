import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import Tag from '../Tag';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const colors = [
  undefined,
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
  '#fff',
  '#000',
  '#3498ff'
];
const sizes = ['sm', 'md', 'lg'] as const;
const native = (action: () => Promise<unknown>) => act(async () => void (await action()));

const rgb = (color: string) => {
  const channels = color.match(/[\d.]+/g)!.map(Number);
  const scale = color.startsWith('color(srgb ') ? 255 : 1;
  return channels.slice(0, 3).map(channel => channel * scale);
};

const luminance = (color: number[]) => {
  const linear = color.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

const contrast = (first: number[], second: number[]) => {
  const values = [luminance(first), luminance(second)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};

describe.each(['light', 'dark', 'high-contrast'] as const)('Tag focus contrast (%s)', theme => {
  it.each(colors)('keeps keyboard focus distinguishable on %s tags at every size', async color => {
    render(
      <CustomProvider theme={theme}>
        {sizes.map(size => (
          <div key={size} data-testid={size}>
            <button>Before</button>
            <Tag closable color={color} size={size}>
              Alpha
            </Tag>
            <button>After</button>
          </div>
        ))}
      </CustomProvider>
    );
    for (const size of sizes) {
      const controls = within(screen.getByTestId(size));
      const close = controls.getByRole('button', { name: 'Remove' });
      const tag = close.closest('.rs-tag')!;
      const initial = tag.getBoundingClientRect();
      act(() => controls.getByRole('button', { name: 'Before' }).focus());
      await native(() => userEvent.tab());
      expect(close).toHaveFocus();
      expect(close.matches(':focus-visible')).toBe(true);
      const style = getComputedStyle(close);
      const background = rgb(getComputedStyle(tag).backgroundColor);
      const outline = rgb(style.outlineColor);
      const outlineAlpha = style.outlineColor.match(/[\d.]+/g)!.map(Number)[3] ?? 1;
      const paintedOutline = outline.map(
        (channel, index) => channel * outlineAlpha + background[index] * (1 - outlineAlpha)
      );
      const shadow = style.boxShadow.match(/rgba?\([^)]*\)|color\(srgb[^)]*\)/)?.[0];
      const ratios = [contrast(paintedOutline, background)];
      if (shadow) ratios.push(contrast(rgb(shadow), background));
      expect(Math.max(...ratios)).toBeGreaterThanOrEqual(3);
      expect(style.outlineStyle).toBe('solid');
      expect(parseFloat(style.outlineWidth)).toBeGreaterThanOrEqual(2);
      const focused = tag.getBoundingClientRect();
      expect(focused.width).toBe(initial.width);
      expect(focused.height).toBe(initial.height);
      await native(() => userEvent.tab());
      expect(controls.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(getComputedStyle(close).outlineStyle).toBe('none');
      expect(getComputedStyle(close).boxShadow).toBe('none');
    }
  });

  it('does not draw a keyboard focus indicator for a pointer click', async () => {
    render(
      <CustomProvider theme={theme}>
        <Tag closable color="blue">
          Alpha
        </Tag>
      </CustomProvider>
    );
    const close = screen.getByRole('button', { name: 'Remove' });
    await native(() => userEvent.click(close));
    expect(close.matches(':focus-visible')).toBe(false);
    expect(getComputedStyle(close).outlineStyle).toBe('none');
    expect(getComputedStyle(close).boxShadow).toBe('none');
  });
});
