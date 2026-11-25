import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import CloseButton from '../CloseButton';
import IconButton from '../../../IconButton';
import CustomProvider from '../../../CustomProvider';
import '../styles/index.scss';

const native = (action: () => Promise<unknown>) => act(async () => void (await action()));
const variants = [
  { name: 'native', as: 'button' as const },
  { name: 'IconButton', as: IconButton }
];

describe.each(variants)('CloseButton visible focus ($name)', ({ as }) => {
  it.each(['light', 'dark', 'high-contrast'] as const)(
    'shows the theme focus ring after native Tab in %s',
    async theme => {
      const onClick = vi.fn();
      const onSubmit = vi.fn();
      render(
        <CustomProvider theme={theme}>
          <form
            onSubmit={event => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <button type="button">Before</button>
            <CloseButton as={as} onClick={onClick} />
            <span data-testid="focus-color" style={{ color: 'var(--rs-focus-ring-color)' }} />
            <button type="button">After</button>
          </form>
        </CustomProvider>
      );
      const close = screen.getByRole('button', { name: 'Close' });
      act(() => screen.getByRole('button', { name: 'Before' }).focus());
      await native(() => userEvent.tab());
      expect(close).toHaveFocus();
      expect(close.matches(':focus-visible')).toBe(true);
      const style = getComputedStyle(close);
      expect(style.outlineStyle).toBe('solid');
      expect(style.outlineWidth).toBe('2px');
      expect(style.outlineColor).toBe(getComputedStyle(screen.getByTestId('focus-color')).color);
      await native(() => userEvent.keyboard('{Enter}'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
      expect(onSubmit).not.toHaveBeenCalled();
      await native(() => userEvent.tab());
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(getComputedStyle(close).outlineStyle).toBe('none');
    }
  );

  it('keeps the focus ring hidden for pointer interaction', async () => {
    const onClick = vi.fn();
    render(<CloseButton as={as} onClick={onClick} />);
    const close = screen.getByRole('button', { name: 'Close' });
    await native(() => userEvent.click(close));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    expect(close.matches(':focus-visible')).toBe(false);
    expect(getComputedStyle(close).outlineStyle).toBe('none');
  });

  it('leaves a disabled close button out of the tab order', async () => {
    render(
      <>
        <button>Before</button>
        <CloseButton as={as} disabled />
        <button>After</button>
      </>
    );
    act(() => screen.getByRole('button', { name: 'Before' }).focus());
    await native(() => userEvent.tab());
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  });
});
