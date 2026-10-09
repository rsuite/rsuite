import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Message from '../../Message';
import Notification from '../../Notification';
import ToastContext from '../ToastContext';

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{
      mode: 'visible' | 'hidden';
      children: React.ReactNode;
    }>;
  }
).Activity;

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe.each([
  { name: 'Message', Component: Message },
  { name: 'Notification', Component: Notification }
])('$name toast effect lifecycle', ({ Component }) => {
  const ui = (onClose: () => void, strict = false, mouseReset = true, duration = 1000) => {
    const content = (
      <ToastContext.Provider value={{ usedToaster: true, mouseReset, duration }}>
        <Component onClose={onClose}>Toast content</Component>
      </ToastContext.Provider>
    );
    return strict ? <React.StrictMode>{content}</React.StrictMode> : content;
  };

  it.each([false, true])('removes hover listeners on unmount (StrictMode=%s)', strict => {
    const onClose = vi.fn();
    const view = render(ui(onClose, strict));
    const element = screen.getByRole('alert');
    view.unmount();

    // Retained DOM nodes must not be able to restart a disposed toast's timer.
    fireEvent.mouseLeave(element);
    advance(1000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each([false, true])(
    'pauses on native hover and restarts on exit (StrictMode=%s)',
    async strict => {
      const onClose = vi.fn();
      const trusted: boolean[] = [];
      render(ui(onClose, strict));
      const element = screen.getByRole('alert');
      element.addEventListener('mouseenter', event => trusted.push(event.isTrusted), {
        once: true
      });
      element.addEventListener('mouseleave', event => trusted.push(event.isTrusted), {
        once: true
      });
      advance(600);
      await act(() => userEvent.hover(element));
      advance(2000);
      expect(onClose).not.toHaveBeenCalled();
      await act(() => userEvent.unhover(element));
      expect(trusted).toEqual([true, true]);
      advance(999);
      expect(onClose).not.toHaveBeenCalled();
      advance(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  );

  it('respects disabled hover reset', async () => {
    const onClose = vi.fn();
    render(ui(onClose, true, false));
    await act(() => userEvent.hover(screen.getByRole('alert')));
    advance(1000);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not enable automatic closing when the duration is zero', async () => {
    const onClose = vi.fn();
    render(ui(onClose, true, true, 0));
    const element = screen.getByRole('alert');
    await act(() => userEvent.hover(element));
    await act(() => userEvent.unhover(element));
    advance(10000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it.skipIf(!Activity)(
    'removes listeners while hidden and restores native hover on show',
    async () => {
      const Boundary = Activity!;
      const onClose = vi.fn();
      const content = (mode: 'visible' | 'hidden') => (
        <Boundary mode={mode}>{ui(onClose, true)}</Boundary>
      );
      const view = render(content('visible'));
      const element = screen.getByRole('alert');
      view.rerender(content('hidden'));
      expect(getComputedStyle(element).display).toBe('none');
      fireEvent.mouseLeave(element);
      advance(2000);
      expect(onClose).not.toHaveBeenCalled();

      view.rerender(content('visible'));
      expect(screen.getByRole('alert')).toBe(element);
      await act(() => userEvent.hover(element));
      advance(2000);
      expect(onClose).not.toHaveBeenCalled();
      await act(() => userEvent.unhover(element));
      advance(1000);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  );
});
