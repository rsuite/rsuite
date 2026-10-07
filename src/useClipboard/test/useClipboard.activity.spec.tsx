import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useClipboard from '..';

// Activity is available in React 19.2+. Keep the same tests usable on React 18/19.0.
const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{
      mode: 'visible' | 'hidden';
      children: React.ReactNode;
    }>;
  }
).Activity;

function CopyButton({
  timeout,
  onCopy
}: {
  timeout: number;
  onCopy?: (operation: Promise<boolean>) => void;
}) {
  const { copied, error, copy, reset } = useClipboard({ timeout });
  return (
    <>
      <button
        onClick={() => {
          const operation = copy('record');
          onCopy?.(operation);
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <button onClick={reset}>Reset</button>
      <span role="status">{error?.message}</span>
    </>
  );
}

describe.skipIf(!Activity)('useClipboard with Activity', () => {
  let originalClipboard: PropertyDescriptor | undefined;
  const writeText = vi.fn<(text: string) => Promise<void>>();

  beforeEach(() => {
    originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });
    writeText.mockReset().mockResolvedValue(undefined);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', originalClipboard);
    } else {
      Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  function ui(
    mode: 'visible' | 'hidden',
    timeout = 100,
    onCopy?: (operation: Promise<boolean>) => void
  ) {
    const ActivityBoundary = Activity!;
    return (
      <ActivityBoundary mode={mode}>
        <CopyButton timeout={timeout} onCopy={onCopy} />
      </ActivityBoundary>
    );
  }

  async function copy() {
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    });
    expect(writeText).toHaveBeenCalledWith('record');
    return screen.getByRole('button', { name: 'Copied' });
  }

  it.each([false, true])('Should reset expired feedback on show (StrictMode=%s)', async strict => {
    const content = (mode: 'visible' | 'hidden') =>
      strict ? <React.StrictMode>{ui(mode)}</React.StrictMode> : ui(mode);
    const { rerender } = render(content('visible'));
    const button = await copy();
    rerender(content('hidden'));
    expect(getComputedStyle(button).display).toBe('none');
    act(() => vi.advanceTimersByTime(101));
    rerender(content('visible'));
    expect(screen.getByRole('button', { name: 'Copy' })).toBe(button);
  });

  it('Should resume only the remaining time when shown before the deadline', async () => {
    const { rerender } = render(ui('visible'));
    await copy();
    act(() => vi.advanceTimersByTime(20));
    rerender(ui('hidden'));
    act(() => vi.advanceTimersByTime(30));
    rerender(ui('visible'));
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(49));
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it('Should preserve feedback with automatic reset disabled', async () => {
    const { rerender } = render(ui('visible', 0));
    const button = await copy();
    rerender(ui('hidden', 0));
    act(() => vi.advanceTimersByTime(10000));
    rerender(ui('visible', 0));
    expect(screen.getByRole('button', { name: 'Copied' })).toBe(button);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByRole('button', { name: 'Copy' })).toBe(button);
  });

  it('Should use a new copy deadline after reset and another hide/show', async () => {
    const { rerender } = render(ui('visible'));
    await copy();
    rerender(ui('hidden'));
    act(() => vi.advanceTimersByTime(50));
    rerender(ui('visible'));
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    await copy();
    rerender(ui('hidden'));
    act(() => vi.advanceTimersByTime(60));
    rerender(ui('visible'));
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(39));
    expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it('Should keep the original deadline when timeout changes while hidden', async () => {
    const { rerender } = render(ui('visible'));
    await copy();
    rerender(ui('hidden', 1000));
    act(() => vi.advanceTimersByTime(50));
    rerender(ui('visible', 1000));
    act(() => vi.advanceTimersByTime(50));
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it('Should ignore a write that finishes while hidden after showing again', async () => {
    let resolve!: () => void;
    writeText.mockImplementationOnce(() => new Promise<void>(done => (resolve = done)));
    const { rerender } = render(ui('visible'));
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    rerender(ui('hidden'));
    await act(async () => resolve());
    rerender(ui('visible'));
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
    await copy();
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it.each(['resolve', 'reject'] as const)(
    'Should ignore an old write that %ss after reconnecting effects',
    async settlement => {
      let resolve!: () => void;
      let reject!: (error: Error) => void;
      let pending!: Promise<boolean>;
      writeText.mockImplementationOnce(
        () =>
          new Promise<void>((done, fail) => {
            resolve = done;
            reject = fail;
          })
      );
      const capture = (operation: Promise<boolean>) => {
        pending = operation;
      };
      const { rerender } = render(ui('visible', 100, capture));
      const button = screen.getByRole('button', { name: 'Copy' });
      fireEvent.click(button);
      rerender(ui('hidden', 100, capture));
      expect(getComputedStyle(button).display).toBe('none');
      rerender(ui('visible', 100, capture));
      expect(screen.getByRole('button', { name: 'Copy' })).toBe(button);

      await act(async () => {
        if (settlement === 'resolve') {
          resolve();
        } else {
          reject(new Error('Old write failed after reconnecting'));
        }
        expect(await pending).toBe(settlement === 'resolve');
      });

      expect(screen.getByRole('button', { name: 'Copy' })).toBe(button);
      expect(screen.getByRole('status').textContent).toBe('');
      expect(vi.getTimerCount()).toBe(0);
      await copy();
      expect(vi.getTimerCount()).toBe(1);
      act(() => vi.advanceTimersByTime(100));
      expect(screen.getByRole('button', { name: 'Copy' })).toBe(button);
    }
  );
});
