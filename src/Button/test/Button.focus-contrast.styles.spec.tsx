import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import Button from '../Button';
import IconButton from '../../IconButton';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../IconButton/styles/index.scss';

const native = (action: () => Promise<unknown>) => act(async () => void (await action()));
const appearances = ['default', 'primary', 'subtle', 'link', 'ghost'] as const;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const shapes = ['button', 'anchor', 'circle', 'icon-text'] as const;
const colors = (value: string) => {
  const channels = value.match(/[\d.]+/g)!.map(Number);
  const scale = value.startsWith('color(srgb ') ? 255 : 1;
  return [...channels.slice(0, 3).map(channel => channel * scale), channels[3] ?? 1];
};
const luminance = (rgb: number[]) => {
  const linear = rgb.slice(0, 3).map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};
const contrast = (first: number[], second: number[]) => {
  const values = [luminance(first), luminance(second)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};
const background = (element: Element): number[] => {
  const color = colors(getComputedStyle(element).backgroundColor);
  const behind = element.parentElement ? background(element.parentElement) : [255, 255, 255];
  return color
    .slice(0, 3)
    .map((channel, index) => channel * color[3] + behind[index] * (1 - color[3]));
};
const expectIndicator = (button: HTMLElement) => {
  const frame = getComputedStyle(button, '::after');
  expect(frame.content).toBe('""');
  expect(frame.position).toBe('absolute');
  const border = parseFloat(getComputedStyle(button).borderTopWidth);
  expect(parseFloat(frame.inset) + border).toBe(0);
  expect(frame.borderTopWidth).toBe('2px');
  expect(frame.borderTopStyle).toBe('solid');
  expect(frame.pointerEvents).toBe('none');
  expect(Number(frame.zIndex)).toBeGreaterThan(1);
  const shadow = frame.boxShadow.match(/rgba?\([^)]*\)|color\(srgb[^)]*\)/)?.[0];
  expect(shadow).toBeDefined();
  expect(frame.boxShadow).toContain('inset');
  const borderColor = colors(frame.borderTopColor);
  const innerColor = colors(shadow!);
  expect(borderColor[3]).toBe(1);
  expect(innerColor[3]).toBe(1);
  for (const surface of [button, ...button.querySelectorAll('.rs-icon')]) {
    const adjacent = background(surface);
    expect(
      Math.max(contrast(borderColor, adjacent), contrast(innerColor, adjacent))
    ).toBeGreaterThanOrEqual(3);
  }
};

describe.each(['light', 'dark', 'high-contrast'] as const)('Button focus contrast (%s)', theme => {
  describe.each(appearances)('%s appearance', appearance => {
    it.each(sizes)(
      'keeps a visible inset frame at %s size, including while hovered',
      async size => {
        render(
          <CustomProvider theme={theme}>
            {shapes.map(shape => (
              <div key={shape} data-testid={shape}>
                <button>Before</button>
                {shape === 'circle' || shape === 'icon-text' ? (
                  <IconButton
                    data-testid="target"
                    aria-label="Action"
                    appearance={appearance}
                    size={size}
                    circle={shape === 'circle'}
                    icon={<span className="rs-icon">+</span>}
                  >
                    {shape === 'icon-text' ? 'Action' : undefined}
                  </IconButton>
                ) : (
                  <Button
                    data-testid="target"
                    appearance={appearance}
                    size={size}
                    href={shape === 'anchor' ? '#action' : undefined}
                    tabIndex={shape === 'anchor' ? 0 : undefined}
                  >
                    Action
                  </Button>
                )}
                <button>After</button>
              </div>
            ))}
          </CustomProvider>
        );
        for (const shape of shapes) {
          const row = within(screen.getByTestId(shape));
          const button = row.getByTestId('target');
          const initial = button.getBoundingClientRect();
          expect(getComputedStyle(button, '::after').content).toBe('none');
          act(() => row.getByRole('button', { name: 'Before' }).focus());
          await native(() => userEvent.tab());
          expect(button).toHaveFocus();
          expect(button.matches(':focus-visible')).toBe(true);
          expectIndicator(button);
          await native(() => userEvent.hover(button));
          expectIndicator(button);
          const focused = button.getBoundingClientRect();
          expect(focused.width).toBe(initial.width);
          expect(focused.height).toBe(initial.height);
          await native(() => userEvent.tab());
          expect(row.getByRole('button', { name: 'After' })).toHaveFocus();
          expect(getComputedStyle(button, '::after').content).toBe('none');
          await native(() => userEvent.unhover(button));
        }
      }
    );
  });

  it('keeps an explicit button shadow while displaying keyboard focus', async () => {
    render(
      <CustomProvider theme={theme}>
        <button>Before</button>
        <Button style={{ boxShadow: 'rgb(123, 45, 67) 0px 3px 6px' }}>Action</Button>
      </CustomProvider>
    );
    act(() => screen.getByRole('button', { name: 'Before' }).focus());
    await native(() => userEvent.tab());
    const button = screen.getByRole('button', { name: 'Action' });
    expectIndicator(button);
    expect(getComputedStyle(button).boxShadow).toBe('rgb(123, 45, 67) 0px 3px 6px 0px');
  });

  it('does not draw a keyboard frame after a pointer click', async () => {
    render(
      <CustomProvider theme={theme}>
        <Button>Action</Button>
      </CustomProvider>
    );
    const button = screen.getByRole('button', { name: 'Action' });
    await native(() => userEvent.click(button));
    expect(button.matches(':focus-visible')).toBe(false);
    expect(getComputedStyle(button, '::after').content).toBe('none');
  });

  it.each([
    { appearance: 'primary', circle: false },
    { appearance: 'primary', circle: true },
    { appearance: 'ghost', circle: false },
    { appearance: 'ghost', circle: true }
  ] as const)(
    'keeps the XS $appearance loading spinner inside the frame (circle: $circle)',
    async ({ appearance, circle }) => {
      render(
        <CustomProvider theme={theme}>
          <button>Before</button>
          <span style={{ display: 'inline-flex', overflow: 'hidden' }}>
            {circle ? (
              <IconButton
                size="xs"
                appearance={appearance}
                circle
                loading
                aria-label="Action"
                icon={<span className="rs-icon">+</span>}
              />
            ) : (
              <Button size="xs" appearance={appearance} loading>
                Action
              </Button>
            )}
          </span>
          <button>After</button>
        </CustomProvider>
      );
      act(() => screen.getByRole('button', { name: 'Before' }).focus());
      await native(() => userEvent.tab());
      const button = screen.getByRole('button', { name: 'Action' });
      expectIndicator(button);
      const inset = parseFloat(getComputedStyle(button, '::after').inset);
      const rotor = getComputedStyle(button.querySelector('.rs-btn-spin')!, '::after');
      expect(parseFloat(rotor.width) + 2 * (4 + inset)).toBeLessThanOrEqual(button.clientWidth);
      expect(parseFloat(rotor.height) + 2 * (4 + inset)).toBeLessThanOrEqual(button.clientHeight);
      await native(() => userEvent.tab());
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    }
  );

  it('preserves the theme focus color while adding the contrasting frame', async () => {
    render(
      <CustomProvider theme={theme}>
        <button>Before</button>
        <Button style={{ '--rs-focus-ring-color': 'rgb(123, 45, 67)' } as React.CSSProperties}>
          Action
        </Button>
      </CustomProvider>
    );
    act(() => screen.getByRole('button', { name: 'Before' }).focus());
    await native(() => userEvent.tab());
    const button = screen.getByRole('button', { name: 'Action' });
    expect(getComputedStyle(button).outlineColor).toBe('rgb(123, 45, 67)');
    expectIndicator(button);
  });
});
