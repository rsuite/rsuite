import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Button from '../Button';
import IconButton from '../../IconButton';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../IconButton/styles/index.scss';

declare module 'vitest/browser' {
  interface BrowserCommands {
    setForcedColors: (
      forcedColors: 'active' | 'none',
      colorScheme: 'light' | 'dark'
    ) => Promise<void>;
  }
}

const initialForced = matchMedia('(forced-colors: active)').matches ? 'active' : 'none';
const initialScheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const native = (action: () => Promise<unknown>) => act(async () => void (await action()));
beforeEach(() => native(() => commands.setForcedColors('active', 'dark')));
afterEach(async () => {
  cleanup();
  await commands.setForcedColors(initialForced, initialScheme);
});

describe.each(['light', 'dark', 'high-contrast'] as const)(
  'Button forced-color loading (%s)',
  theme => {
    it.each([false, true])(
      'hides original content and preserves focus and its name (circle: %s)',
      async circle => {
        expect(matchMedia('(forced-colors: active)').matches).toBe(true);
        render(
          <CustomProvider theme={theme}>
            <button>Before</button>
            {circle ? (
              <IconButton
                size="xs"
                appearance="primary"
                circle
                loading
                aria-label="Action"
                icon={
                  <svg width="12" height="12" aria-hidden="true">
                    <path d="M1 5h4V1h2v4h4v2H7v4H5V7H1z" />
                  </svg>
                }
              />
            ) : (
              <Button size="xs" appearance="primary" loading>
                <span style={{ color: 'red' }}>Action</span>
              </Button>
            )}
            <button>After</button>
          </CustomProvider>
        );
        const button = screen.getByRole('button', { name: 'Action' });
        act(() => screen.getByRole('button', { name: 'Before' }).focus());
        await native(() => userEvent.tab());
        expect(button).toHaveFocus();
        expect(button.matches(':focus-visible')).toBe(true);
        expect(button).toHaveAccessibleName('Action');
        const style = getComputedStyle(button);
        expect(style.getPropertyValue('-webkit-text-fill-color')).toBe('rgba(0, 0, 0, 0)');
        expect(style.getPropertyValue('forced-color-adjust')).toBe(
          CSS.supports('forced-color-adjust', 'auto') ? 'auto' : ''
        );
        for (const child of button.children) {
          if (!child.classList.contains('rs-btn-spin'))
            expect(getComputedStyle(child).opacity).toBe('0');
        }
        const spinner = button.querySelector('.rs-btn-spin')!;
        expect(getComputedStyle(spinner).opacity).toBe('1');
        expect(parseFloat(getComputedStyle(spinner, '::after').width)).toBeGreaterThan(0);
        await native(() => userEvent.tab());
        expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      }
    );
  }
);
