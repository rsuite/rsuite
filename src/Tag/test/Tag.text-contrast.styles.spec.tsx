import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Tag from '../Tag';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const colors = [
  undefined,
  'default',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
  '#fff',
  '#000',
  '#3498ff',
  '#ff5733',
  '#f00',
  '#757575',
  '#767676'
];
const sizes = ['sm', 'md', 'lg'] as const;

const luminance = (color: string) => {
  const channels = color
    .match(/[\d.]+/g)!
    .slice(0, 3)
    .map(Number);
  const linear = color.startsWith('color(srgb-linear ')
    ? channels
    : channels.map(channel => {
        const value = color.startsWith('color(srgb ') ? channel : channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

const expectReadable = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  const values = [luminance(style.color), luminance(style.backgroundColor)];
  expect((Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)).toBeGreaterThanOrEqual(4.5);
};

describe.each(['light', 'dark', 'high-contrast'] as const)('Tag text contrast (%s)', theme => {
  it.each(colors)('keeps text readable on %s tags at every size', color => {
    render(
      <CustomProvider theme={theme}>
        {sizes.map(size => (
          <Tag key={size} color={color} size={size} data-testid={size}>
            Alpha
          </Tag>
        ))}
      </CustomProvider>
    );
    for (const size of sizes) expectReadable(screen.getByTestId(size));
  });

  it('updates text contrast when a preset palette token changes without a React render', () => {
    render(
      <CustomProvider theme={theme}>
        <Tag color="blue" data-testid="tag">
          Alpha
        </Tag>
      </CustomProvider>
    );
    const tag = screen.getByTestId('tag');
    const text = within(tag).getByText('Alpha');
    for (const background of ['#fff', '#000', '#757575', '#767676', '#ff5733']) {
      tag.style.setProperty('--rs-blue-500', background);
      expectReadable(tag);
      expect(within(tag).getByText('Alpha')).toBe(text);
    }
  });

  it('preserves an explicit foreground override', () => {
    render(
      <CustomProvider theme={theme}>
        <Tag color="blue" style={{ color: 'magenta' }} data-testid="tag">
          Alpha
        </Tag>
      </CustomProvider>
    );
    expect(getComputedStyle(screen.getByTestId('tag')).color).toBe('rgb(255, 0, 255)');
  });
});
