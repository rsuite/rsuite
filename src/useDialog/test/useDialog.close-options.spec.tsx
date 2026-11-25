import React from 'react';
import { act, cleanup, fireEvent, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import useDialog from '../useDialog';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function setup() {
  return renderHook(() => useDialog(), {
    wrapper: ({ children }) => <CustomProvider>{children}</CustomProvider>
  }).result;
}

async function show(open: () => Promise<any>) {
  let completion: Promise<any>;
  await act(async () => {
    completion = open();
  });
  act(() => vi.advanceTimersByTime(1000));
  return { completion: completion! };
}

function finishClose() {
  act(() => vi.advanceTimersByTime(300));
}

describe('useDialog close options', () => {
  it('calls the alert callback without arguments after closing', async () => {
    const dialog = setup();
    const onClose = vi.fn();
    const { completion } = await show(() => dialog.current.alert('Notice', { onClose }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onClose).not.toHaveBeenCalled();
    finishClose();
    await expect(completion).resolves.toBe(true);
    expect(onClose).toHaveBeenCalledExactlyOnceWith();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([
    ['OK', true],
    ['Cancel', false],
    ['Escape', false]
  ] as const)('passes the confirm result after %s', async (action, expected) => {
    const dialog = setup();
    const onClose = vi.fn();
    const { completion } = await show(() => dialog.current.confirm('Continue?', { onClose }));
    if (action === 'Escape') {
      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    } else {
      fireEvent.click(screen.getByRole('button', { name: action }));
    }
    finishClose();
    await expect(completion).resolves.toBe(expected);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(expected);
  });

  it.each(['Ada', ''])('passes an accepted prompt value %j', async value => {
    const dialog = setup();
    const onClose = vi.fn();
    const { completion } = await show(() =>
      dialog.current.prompt('Name', { defaultValue: value, onClose })
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    finishClose();
    await expect(completion).resolves.toBe(value);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(value);
  });

  it('passes false when a prompt is cancelled', async () => {
    const dialog = setup();
    const onClose = vi.fn();
    const { completion } = await show(() => dialog.current.prompt('Name', { onClose }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    finishClose();
    await expect(completion).resolves.toBe(false);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('does not notify or resolve when prompt validation fails', async () => {
    const dialog = setup();
    const onClose = vi.fn();
    const settled = vi.fn();
    const { completion } = await show(() =>
      dialog.current.prompt('Name', { onClose, validate: () => [false, 'Required'] })
    );
    void completion.then(settled);
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    finishClose();
    await act(async () => {});
    expect(onClose).not.toHaveBeenCalled();
    expect(settled).not.toHaveBeenCalled();
    expect(screen.getByText('Required')).toBeTruthy();
  });

  it('passes the same custom result to the callback and promise', async () => {
    const dialog = setup();
    const onClose = vi.fn();
    const value = { accepted: true };
    const CustomDialog = ({ onClose }: { onClose: (result: typeof value) => void }) => (
      <button onClick={() => onClose(value)}>Finish custom</button>
    );
    const { completion } = await show(() =>
      dialog.current.open(CustomDialog, undefined, { onClose })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Finish custom' }));
    await expect(completion).resolves.toBe(value);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(value);
    expect(screen.queryByRole('button', { name: 'Finish custom' })).toBeNull();
  });

  it('notifies only once when a custom dialog requests multiple closes', async () => {
    const dialog = setup();
    const onClose = vi.fn();
    const CustomDialog = ({ onClose }: { onClose: (result: string) => void }) => (
      <button
        onClick={() => {
          onClose('first');
          onClose('second');
        }}
      >
        Finish custom
      </button>
    );
    const { completion } = await show(() =>
      dialog.current.open(CustomDialog, undefined, { onClose })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Finish custom' }));
    await expect(completion).resolves.toBe('first');
    expect(onClose).toHaveBeenCalledExactlyOnceWith('first');
  });

  it('allows a close callback to open another dialog', async () => {
    const dialog = setup();
    const nextClosed = vi.fn();
    const onClose = vi.fn(() => {
      void dialog.current.alert('Next dialog', { onClose: nextClosed });
    });
    const { completion } = await show(() => dialog.current.confirm('First dialog', { onClose }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    await act(async () => vi.advanceTimersByTime(300));
    await expect(completion).resolves.toBe(true);
    expect(onClose).toHaveBeenCalledExactlyOnceWith(true);
    expect(screen.queryByText('First dialog')).toBeNull();
    expect(screen.getByText('Next dialog')).toBeTruthy();
    expect(nextClosed).not.toHaveBeenCalled();
  });

  it('settles and removes the dialog even when its close callback throws', async () => {
    const dialog = setup();
    const error = new Error('Consumer close callback');
    const onClose = vi.fn(() => {
      throw error;
    });
    let close: (result: string) => void;
    const CustomDialog = ({ onClose }: { onClose: (result: string) => void }) => {
      close = onClose;
      return <div>Custom dialog</div>;
    };
    const { completion } = await show(() =>
      dialog.current.open(CustomDialog, undefined, { onClose })
    );
    let thrown: unknown;
    act(() => {
      try {
        close('accepted');
      } catch (value) {
        thrown = value;
      }
    });
    await expect(completion).resolves.toBe('accepted');
    expect(thrown).toBe(error);
    expect(screen.queryByText('Custom dialog')).toBeNull();
    act(() => close('duplicate'));
    expect(onClose).toHaveBeenCalledExactlyOnceWith('accepted');
  });

  it('preserves closing and promise resolution without a callback', async () => {
    const dialog = setup();
    const { completion } = await show(() => dialog.current.confirm('Continue?'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    finishClose();
    await expect(completion).resolves.toBe(false);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
