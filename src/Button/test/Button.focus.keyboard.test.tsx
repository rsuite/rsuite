import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import Button from '..';
import CustomProvider from '../../CustomProvider';
import Input from '../../Input';
import '../../styles/index.scss';

type Color = [number, number, number, number];

function color(value: string): Color {
  const channels = value.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)?.map(Number) || [];
  if (value.startsWith('rgb')) {
    return [channels[0] / 255, channels[1] / 255, channels[2] / 255, channels[3] ?? 1];
  }
  if (value.startsWith('color(srgb ')) {
    return [channels[0], channels[1], channels[2], channels[3] ?? 1];
  }
  throw new Error(`Unsupported computed color: ${value}`);
}

function composite(foreground: Color, background: Color): Color {
  return [
    foreground[0] * foreground[3] + background[0] * (1 - foreground[3]),
    foreground[1] * foreground[3] + background[1] * (1 - foreground[3]),
    foreground[2] * foreground[3] + background[2] * (1 - foreground[3]),
    1
  ];
}

function background(element: Element): Color {
  const ancestors: Element[] = [];
  for (let node: Element | null = element; node; node = node.parentElement) {
    ancestors.unshift(node);
  }
  return ancestors.reduce(
    (result, node) => composite(color(getComputedStyle(node).backgroundColor), result),
    [1, 1, 1, 1] as Color
  );
}

function luminance(value: Color) {
  return value
    .slice(0, 3)
    .map(channel => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
    .reduce((result, channel, index) => result + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(first: Color, second: Color) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

async function tabTo(element: HTMLElement) {
  await act(async () => {
    await userEvent.keyboard('{Tab}');
  });
  expect(element).toHaveFocus();
  expect(element.matches(':focus-visible')).toBe(true);
  // Read the new computed styles before resolving actual CSS transitions.
  getComputedStyle(element).outlineColor;
  await Promise.all(element.getAnimations().map(animation => animation.finished));
}

describe.each(['light', 'dark', 'high-contrast'] as const)('%s keyboard focus styles', theme => {
  it('contrasts the default button ring with its inner fill and surrounding body surface', async () => {
    const events: KeyboardEvent[] = [];
    const { container } = render(
      <CustomProvider theme={theme}>
        <main tabIndex={-1} onKeyDown={event => events.push(event.nativeEvent)}>
          <Button>Default action</Button>
        </main>
      </CustomProvider>
    );
    const button = screen.getByRole('button', { name: 'Default action' });
    const before = getComputedStyle(button).outlineWidth;
    act(() => (container.querySelector('main') as HTMLElement).focus());
    await tabTo(button);

    const style = getComputedStyle(button);
    const ring = color(style.outlineColor);
    const inside = background(button);
    const outside = background(document.body);
    const ratios = {
      inside: contrast(composite(ring, inside), inside),
      outside: contrast(composite(ring, outside), outside)
    };
    console.info('Default button focus contrast', { theme, color: style.outlineColor, ratios });
    expect(events).toHaveLength(1);
    expect(events[0].key).toBe('Tab');
    expect(events[0].isTrusted).toBe(true);
    expect(before).toBe('0px');
    expect(style.outlineStyle).toBe('solid');
    expect(style.outlineWidth).toBe('2px');
    expect(ratios.inside).toBeGreaterThanOrEqual(3);
    expect(ratios.outside).toBeGreaterThanOrEqual(3);
  });

  it('preserves keyboard focus indications for other button appearances, input, and links', async () => {
    const events: KeyboardEvent[] = [];
    const { container } = render(
      <CustomProvider theme={theme}>
        <main tabIndex={-1} onKeyDown={event => events.push(event.nativeEvent)}>
          <Button appearance="primary">Primary action</Button>
          <Button appearance="ghost">Ghost action</Button>
          <Button as="a" appearance="link" href="#target">
            Button link
          </Button>
          <Input aria-label="Account" defaultValue="Keep information" />
          <a href="#target">Ordinary link</a>
        </main>
      </CustomProvider>
    );
    act(() => (container.querySelector('main') as HTMLElement).focus());
    for (const name of ['Primary action', 'Ghost action']) {
      const button = screen.getByRole('button', { name });
      await tabTo(button);
      expect(getComputedStyle(button).outlineWidth).toBe('2px');
    }
    const buttonLink = screen.getByRole('button', { name: 'Button link' });
    await tabTo(buttonLink);
    expect(getComputedStyle(buttonLink).textDecorationLine).toContain('underline');

    const input = screen.getByRole('textbox', { name: 'Account' });
    await tabTo(input);
    expect(getComputedStyle(input).outlineWidth).toBe('2px');
    expect(getComputedStyle(input).borderTopWidth).toBe('1px');
    expect(input).toHaveValue('Keep information');

    const link = screen.getByRole('link', { name: 'Ordinary link' });
    await tabTo(link);
    expect(getComputedStyle(link).textDecorationLine).toContain('underline');
    expect(events).toHaveLength(5);
    expect(events.every(event => event.key === 'Tab' && event.isTrusted)).toBe(true);
  });
});
