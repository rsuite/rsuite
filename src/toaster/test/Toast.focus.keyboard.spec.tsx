import React from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import Message from '../../Message';
import Notification from '../../Notification';
import ToastContext from '../ToastContext';

interface Options {
  strict?: boolean;
  mouseReset?: boolean;
  duration?: number;
  closable?: boolean;
  autoFocus?: boolean;
  as?: 'div' | 'section';
}

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;
  }
).Activity;

let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);

beforeAll(() => {
  const expected = (import.meta as ImportMeta & { env: Record<string, string> }).env
    .VITE_RSUITE_REACT_VERSION;
  console.info('Toast keyboard runtime', { react: React.version, reactDOM: reactDOMVersion });
  if (expected) {
    expect(React.version).toBe(expected);
    expect(reactDOMVersion).toBe(expected);
  }
});

beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  document.removeEventListener('keydown', recordKey, true);
  vi.useRealTimers();
});

function advance(ms: number) {
  act(() => vi.advanceTimersByTime(ms));
}

async function press(key: 'Tab' | 'Enter' = 'Tab') {
  const start = keys.length;
  await act(async () => userEvent.keyboard(`{${key}}`));
  const observed = keys.slice(start);
  expect(observed.some(event => event.key === key)).toBe(true);
  expect(observed.every(event => event.isTrusted)).toBe(true);
}

async function focusFirstAction() {
  await act(async () => userEvent.click(screen.getByRole('button', { name: 'Before toast' })));
  await press();
  expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus();
}

async function leaveFirstAction() {
  await press();
  expect(screen.getByRole('button', { name: 'Second action' })).toHaveFocus();
  await press();
  expect(screen.getByRole('button', { name: 'After toast' })).toHaveFocus();
}

describe.each([
  { name: 'Message', Component: Message },
  { name: 'Notification', Component: Notification }
])('$name keyboard interaction timer', ({ Component }) => {
  const ui = (onClose: () => void, options: Options = {}) => {
    const {
      strict = false,
      mouseReset = true,
      duration = 1000,
      closable = false,
      autoFocus = false,
      as = 'div'
    } = options;
    const content = (
      <div>
        <button>Before toast</button>
        <ToastContext.Provider value={{ usedToaster: true, mouseReset, duration }}>
          <Component as={as} closable={closable} onClose={onClose}>
            <button autoFocus={autoFocus}>First action</button>
            <button>Second action</button>
          </Component>
        </ToastContext.Provider>
        <button>After toast</button>
      </div>
    );
    return strict ? <React.StrictMode>{content}</React.StrictMode> : content;
  };

  it.each([
    { strict: false, mouseReset: true },
    { strict: true, mouseReset: true },
    { strict: false, mouseReset: false },
    { strict: true, mouseReset: false }
  ])('pauses across internal focus moves (%j)', async options => {
    const onClose = vi.fn();
    render(ui(onClose, options));
    advance(600);
    await focusFirstAction();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();

    await press();
    expect(screen.getByRole('button', { name: 'Second action' })).toHaveFocus();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();

    await press();
    expect(screen.getByRole('button', { name: 'After toast' })).toHaveFocus();
    advance(999);
    expect(onClose).not.toHaveBeenCalled();
    advance(1);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps the timer paused when the pointer leaves a focused toast', async () => {
    const onClose = vi.fn();
    render(ui(onClose));
    await focusFirstAction();
    const toast = screen.getByRole('alert');
    await act(async () => userEvent.hover(toast));
    await act(async () => userEvent.unhover(toast));
    expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();

    await leaveFirstAction();
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps the timer paused when focus leaves a hovered toast', async () => {
    const onClose = vi.fn();
    render(ui(onClose));
    await focusFirstAction();
    const toast = screen.getByRole('alert');
    await act(async () => userEvent.hover(toast));
    await leaveFirstAction();
    expect(toast.matches(':hover')).toBe(true);
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => userEvent.unhover(toast));
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps focus paused when duration and callback change', async () => {
    const original = vi.fn();
    const latest = vi.fn();
    const view = render(ui(original, { strict: true }));
    await focusFirstAction();
    view.rerender(ui(latest, { strict: true, duration: 2500 }));
    advance(3000);
    expect(original).not.toHaveBeenCalled();
    expect(latest).not.toHaveBeenCalled();

    await leaveFirstAction();
    advance(2499);
    expect(latest).not.toHaveBeenCalled();
    advance(1);
    expect(latest).toHaveBeenCalledOnce();
    expect(original).not.toHaveBeenCalled();
  });

  it('keeps keyboard pause when hover reset is disabled while focused', async () => {
    const onClose = vi.fn();
    const view = render(ui(onClose));
    await focusFirstAction();
    view.rerender(ui(onClose, { mouseReset: false }));
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    await leaveFirstAction();
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('resumes a hovered toast when hover reset is disabled', async () => {
    const onClose = vi.fn();
    const view = render(ui(onClose));
    await act(async () => userEvent.hover(screen.getByRole('alert')));
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    view.rerender(ui(onClose, { mouseReset: false }));
    advance(999);
    expect(onClose).not.toHaveBeenCalled();
    advance(1);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('pauses when an action already has focus as effects attach', async () => {
    const onClose = vi.fn();
    render(ui(onClose, { strict: true, autoFocus: true }));
    expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus();
    await act(async () => userEvent.hover(screen.getByRole('button', { name: 'Before toast' })));
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    await leaveFirstAction();
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not start a persistent toast timer after focus leaves', async () => {
    const onClose = vi.fn();
    render(ui(onClose, { duration: 0 }));
    await focusFirstAction();
    advance(2000);
    await leaveFirstAction();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('still supports explicit keyboard dismissal while focused', async () => {
    const onClose = vi.fn();
    render(ui(onClose, { closable: true }));
    await focusFirstAction();
    await press();
    await press();
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
    await press('Enter');
    expect(onClose).toHaveBeenCalledOnce();
    await press();
    expect(screen.getByRole('button', { name: 'After toast' })).toHaveFocus();
    advance(3000);
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('preserves the running timer when an unfocused toast rerenders', async () => {
    const original = vi.fn();
    const latest = vi.fn();
    const view = render(ui(original));
    await act(async () => userEvent.hover(screen.getByRole('button', { name: 'Before toast' })));
    advance(600);
    view.rerender(ui(latest));
    advance(399);
    expect(latest).not.toHaveBeenCalled();
    advance(1);
    expect(latest).toHaveBeenCalledOnce();
    expect(original).not.toHaveBeenCalled();
  });

  it('does not restart from retained focus targets after unmount', async () => {
    const onClose = vi.fn();
    const view = render(ui(onClose, { strict: true }));
    await focusFirstAction();
    const retained = screen.getByRole('button', { name: 'First action' });
    view.unmount();
    fireEvent.focusOut(retained, { relatedTarget: document.body });
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('binds keyboard pause to a replacement host element', async () => {
    const onClose = vi.fn();
    const view = render(ui(onClose));
    await focusFirstAction();
    const previous = screen.getByRole('alert');
    view.rerender(ui(onClose, { as: 'section' }));
    expect(screen.getByRole('alert')).not.toBe(previous);
    await focusFirstAction();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    await leaveFirstAction();
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it.skipIf(!Activity)('restores keyboard pause after Activity reconnects', async () => {
    const onClose = vi.fn();
    const Boundary = Activity!;
    const content = (mode: 'visible' | 'hidden') => (
      <Boundary mode={mode}>{ui(onClose, { strict: true })}</Boundary>
    );
    const view = render(content('visible'));
    await focusFirstAction();
    const retained = screen.getByRole('button', { name: 'First action' });
    view.rerender(content('hidden'));
    fireEvent.focusOut(retained, { relatedTarget: document.body });
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    view.rerender(content('visible'));
    await focusFirstAction();
    advance(2000);
    expect(onClose).not.toHaveBeenCalled();
    await leaveFirstAction();
    advance(1000);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
