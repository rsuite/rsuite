import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import Dialog from '../Dialog';

import '../styles/index.scss';

const palette = {
  light: {
    primary: 'rgb(52, 152, 255)',
    severity: 'rgb(244, 67, 54)',
    error: 'rgb(244, 67, 54)'
  },
  dark: {
    primary: 'rgb(22, 157, 224)',
    severity: 'rgb(209, 47, 29)',
    error: 'rgb(240, 79, 67)'
  },
  'high-contrast': {
    primary: 'rgb(255, 255, 0)',
    severity: 'rgb(166, 10, 31)',
    error: 'rgb(189, 23, 50)'
  }
};

describe('useDialog standalone styles', () => {
  let originalDirection: string;
  let originalBodyClass: string;

  beforeEach(() => {
    originalDirection = document.documentElement.dir;
    originalBodyClass = document.body.className;
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    document.documentElement.dir = originalDirection;
    document.body.className = originalBodyClass;
  });

  for (const theme of ['light', 'dark', 'high-contrast'] as const) {
    for (const dir of ['ltr', 'rtl'] as const) {
      it.each(['alert', 'confirm', 'prompt', 'prompt-invalid', 'prompt-custom-color'] as const)(
        `styles %s with the ${theme} theme in ${dir}`,
        kind => {
          document.documentElement.dir = dir;
          const type = kind.startsWith('prompt') ? 'prompt' : (kind as 'alert' | 'confirm');
          render(
            <CustomProvider theme={theme} rtl={dir === 'rtl'} reduceMotion>
              <Dialog
                type={type}
                title="Standalone dialog"
                content={type === 'prompt' ? 'Your name' : 'Dialog body'}
                okText="Continue"
                cancelText="Cancel"
                severity={type === 'confirm' ? 'error' : undefined}
                defaultValue="A"
                validate={() => [false, 'Use three characters']}
                animationTimeout={0}
                autoFocus={false}
                enforceFocus={false}
                style={
                  kind === 'prompt-custom-color'
                    ? ({ '--rs-color-red': '#800080' } as React.CSSProperties)
                    : undefined
                }
              />
            </CustomProvider>
          );
          act(() => vi.advanceTimersByTime(1000));
          const button = screen.getByRole('button', { name: 'Continue' });
          if (kind === 'prompt-invalid' || kind === 'prompt-custom-color') fireEvent.click(button);

          const modal = screen.getByRole('dialog', { name: 'Standalone dialog' });
          const stack = modal.querySelector('.rs-stack') as HTMLElement;
          const stackStyle = getComputedStyle(stack);
          expect(modal.getBoundingClientRect().width).toBeCloseTo(400, 1);
          expect(getComputedStyle(modal).direction).toBe(dir);
          expect(stackStyle.display).toBe('flex');
          expect(stackStyle.flexDirection).toBe('column');
          expect(stackStyle.gap).toBe('6px');
          expect(button.getBoundingClientRect().height).toBeCloseTo(36, 1);
          expect(getComputedStyle(button).backgroundColor).toBe(
            type === 'confirm' ? palette[theme].severity : palette[theme].primary
          );

          if (type === 'prompt') {
            const input = screen.getByRole('textbox', { name: 'Your name' });
            const label = screen.getByText('Your name');
            const bounds = input.getBoundingClientRect();
            expect(bounds.height).toBeCloseTo(36, 1);
            expect(bounds.width).toBeCloseTo(stack.getBoundingClientRect().width, 1);
            expect(bounds.top - label.getBoundingClientRect().bottom).toBeCloseTo(6, 1);
            if (kind === 'prompt-invalid' || kind === 'prompt-custom-color') {
              const error = screen.getByRole('alert');
              expect(error.getBoundingClientRect().top - bounds.bottom).toBeCloseTo(6, 1);
              expect(getComputedStyle(error).color).toBe(
                kind === 'prompt-custom-color' ? 'rgb(128, 0, 128)' : palette[theme].error
              );
              expect(getComputedStyle(error).marginBlockStart).toBe('0px');
            }
          }
        }
      );
    }
  }
});
