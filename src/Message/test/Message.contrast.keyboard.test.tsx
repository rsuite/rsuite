import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import Message from '../Message';
import Notification from '../../Notification';
import Button from '../../Button';
import CustomProvider from '../../CustomProvider';
import '../../styles/index.scss';

const themes = ['light', 'dark', 'high-contrast'] as const;

function parseColor(value: string) {
  const numbers = value.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number);
  if (value.startsWith('rgb')) {
    return [numbers[0] / 255, numbers[1] / 255, numbers[2] / 255, numbers[3] ?? 1];
  }
  if (value.startsWith('color(srgb ')) {
    return [numbers[0], numbers[1], numbers[2], numbers[3] ?? 1];
  }
  throw new Error(`Unsupported computed color: ${value}`);
}

function composite(foreground: number[], background: number[]) {
  return foreground.slice(0, 3).map((channel, index) => {
    return channel * foreground[3] + background[index] * (1 - foreground[3]);
  });
}

function backgroundOf(element: HTMLElement) {
  const ancestors: HTMLElement[] = [];
  for (let node: HTMLElement | null = element; node; node = node.parentElement) {
    ancestors.unshift(node);
  }
  return ancestors.reduce(
    (background, node) => {
      return [...composite(parseColor(getComputedStyle(node).backgroundColor), background), 1];
    },
    [1, 1, 1, 1]
  );
}

function contrast(color: string, background: number[]) {
  const luminance = (channels: number[]) => {
    const linear = channels.slice(0, 3).map(channel => {
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const first = luminance(composite(parseColor(color), background));
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe('Message error contrast and native link focus', () => {
  it.each(themes)('keeps normal error text readable in the %s theme', theme => {
    const bodyClassName = document.body.className;
    try {
      render(
        <CustomProvider theme={theme}>
          <div style={{ background: 'var(--rs-body)' }}>
            <Message type="error" header="Could not save" duration={0}>
              Check your information. <a href="#fields">Review fields</a>
            </Message>
            <Notification type="error" header="Could not save" duration={0}>
              Check your information.
            </Notification>
          </div>
        </CustomProvider>
      );

      for (const selector of [
        '.rs-message-header',
        '.rs-message-body',
        '.rs-message-body a',
        '.rs-notification-header',
        '.rs-notification-description'
      ]) {
        const element = document.querySelector<HTMLElement>(selector)!;
        expect(
          contrast(getComputedStyle(element).color, backgroundOf(element))
        ).toBeGreaterThanOrEqual(4.5);
      }
    } finally {
      document.body.className = bodyClassName;
    }
  });

  it.each(themes)('distinguishes native inline link focus in the %s theme', async theme => {
    const bodyClassName = document.body.className;
    const keys: { key: string; trusted: boolean }[] = [];
    try {
      render(
        <CustomProvider theme={theme}>
          <div
            data-testid="entry"
            tabIndex={-1}
            style={{ background: 'var(--rs-body)' }}
            onKeyDownCapture={event => {
              keys.push({ key: event.key, trusted: event.nativeEvent.isTrusted });
            }}
          >
            <Message type="error" duration={0}>
              Check your information. <a href="#fields">Review fields</a>
            </Message>
          </div>
        </CustomProvider>
      );
      const link = screen.getByRole('link');
      const before = getComputedStyle(link);
      const beforeColor = before.color;
      const beforeDecoration = before.textDecorationLine;

      act(() => screen.getByTestId('entry').focus());
      await act(async () => userEvent.keyboard('{Tab}'));
      expect(link).toHaveFocus();
      expect(link.matches(':focus-visible')).toBe(true);
      expect(keys).toEqual([{ key: 'Tab', trusted: true }]);

      const focused = getComputedStyle(link);
      const hasOutline = focused.outlineStyle !== 'none' && parseFloat(focused.outlineWidth) > 0;
      expect(
        hasOutline ||
          focused.color !== beforeColor ||
          focused.textDecorationLine !== beforeDecoration
      ).toBe(true);
      if (hasOutline) {
        expect(contrast(focused.outlineColor, backgroundOf(link))).toBeGreaterThanOrEqual(3);
      }
    } finally {
      document.body.className = bodyClassName;
    }
  });

  it.each(themes)('preserves Button anchor appearances in the %s theme', theme => {
    const bodyClassName = document.body.className;
    try {
      render(
        <CustomProvider theme={theme}>
          <div style={{ background: 'var(--rs-body)' }}>
            <Message type="error" duration={0}>
              <Button as="a" href="#fields" data-testid="inside-default">
                Default action
              </Button>
              <Button as="a" appearance="primary" href="#fields" data-testid="inside-primary">
                Primary action
              </Button>
            </Message>
            <Button as="a" href="#fields" data-testid="outside-default">
              Default action
            </Button>
            <Button as="a" appearance="primary" href="#fields" data-testid="outside-primary">
              Primary action
            </Button>
          </div>
        </CustomProvider>
      );
      const messageBody = document.querySelector<HTMLElement>('.rs-message-body')!;
      for (const appearance of ['default', 'primary']) {
        const inside = getComputedStyle(screen.getByTestId(`inside-${appearance}`));
        const outside = getComputedStyle(screen.getByTestId(`outside-${appearance}`));
        expect(inside.backgroundColor).toBe(outside.backgroundColor);
        // Dark Message already makes all anchors inherit its text color.
        expect(inside.color).toBe(
          theme === 'dark' ? getComputedStyle(messageBody).color : outside.color
        );
      }
    } finally {
      document.body.className = bodyClassName;
    }
  });
});
