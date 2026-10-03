import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useClipboard from '../useClipboard';

describe('useClipboard', () => {
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

  it.each(['Record 123', ''])('Should report a successful clipboard write for %j', async text => {
    const { result } = renderHook(() => useClipboard());
    let success: boolean | undefined;

    await act(async () => {
      success = await result.current.copy(text);
    });

    expect(writeText).toHaveBeenCalledWith(text);
    expect(success).to.equal(true);
    expect(result.current.copied).to.equal(true);
    expect(result.current.error).to.be.null;

    act(() => vi.advanceTimersByTime(1999));
    expect(result.current.copied).to.equal(true);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.copied).to.equal(false);
  });

  it('Should keep copied feedback until reset when timeout is zero', async () => {
    const { result } = renderHook(() => useClipboard({ timeout: 0 }));

    await act(async () => {
      await result.current.copy('record');
    });
    act(() => vi.advanceTimersByTime(10000));
    expect(result.current.copied).to.equal(true);

    act(() => result.current.reset());
    expect(result.current.copied).to.equal(false);
    expect(result.current.error).to.be.null;
  });

  it('Should restart the configured timeout after a new successful write', async () => {
    const { result } = renderHook(() => useClipboard({ timeout: 1000 }));

    await act(async () => {
      await result.current.copy('first');
    });
    act(() => vi.advanceTimersByTime(500));
    await act(async () => {
      await result.current.copy('second');
    });
    act(() => vi.advanceTimersByTime(999));
    expect(result.current.copied).to.equal(true);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.copied).to.equal(false);
  });

  it('Should clear stale success feedback and expose a rejected write', async () => {
    const { result } = renderHook(() => useClipboard());
    const error = new DOMException('Permission denied', 'NotAllowedError');

    await act(async () => {
      await result.current.copy('first');
    });
    writeText.mockRejectedValueOnce(error);
    await act(async () => {
      expect(await result.current.copy('second')).to.equal(false);
    });

    expect(result.current.copied).to.equal(false);
    expect(result.current.error).to.equal(error);
    expect(vi.getTimerCount()).to.equal(0);

    await act(async () => {
      await result.current.copy('retry');
    });
    expect(result.current.copied).to.equal(true);
    expect(result.current.error).to.be.null;
  });

  it('Should expose an unavailable Clipboard API without rejecting', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      expect(await result.current.copy('record')).to.equal(false);
    });

    expect(result.current.copied).to.equal(false);
    expect(result.current.error?.message).to.equal(
      'The Clipboard API is not available in this environment.'
    );
  });

  it('Should only display feedback for the latest copy request', async () => {
    let resolveFirst!: () => void;
    let rejectSecond!: (error: Error) => void;
    writeText
      .mockImplementationOnce(() => new Promise<void>(resolve => (resolveFirst = resolve)))
      .mockImplementationOnce(() => new Promise<void>((_, reject) => (rejectSecond = reject)));
    const { result } = renderHook(() => useClipboard());
    let first!: Promise<boolean>;
    let second!: Promise<boolean>;

    act(() => {
      first = result.current.copy('first');
      second = result.current.copy('second');
    });
    const error = new Error('Second copy failed');
    await act(async () => {
      rejectSecond(error);
      expect(await second).to.equal(false);
    });
    await act(async () => {
      resolveFirst();
      expect(await first).to.equal(true);
    });

    expect(result.current.error).to.equal(error);
    expect(result.current.copied).to.equal(false);
    expect(vi.getTimerCount()).to.equal(0);
  });

  it('Should preserve the latest success when an earlier write fails', async () => {
    let rejectFirst!: (error: Error) => void;
    writeText.mockImplementationOnce(
      () => new Promise<void>((_, reject) => (rejectFirst = reject))
    );
    const { result } = renderHook(() => useClipboard());
    let first!: Promise<boolean>;

    act(() => {
      first = result.current.copy('first');
    });
    await act(async () => {
      expect(await result.current.copy('second')).to.equal(true);
    });
    await act(async () => {
      rejectFirst(new Error('First copy failed'));
      expect(await first).to.equal(false);
    });

    expect(result.current.copied).to.equal(true);
    expect(result.current.error).to.be.null;
    expect(vi.getTimerCount()).to.equal(1);
  });

  it('Should ignore pending feedback after resetting', async () => {
    let resolve!: () => void;
    writeText.mockImplementationOnce(() => new Promise<void>(done => (resolve = done)));
    const { result } = renderHook(() => useClipboard());
    let pending!: Promise<boolean>;

    act(() => {
      pending = result.current.copy('record');
      result.current.reset();
    });
    await act(async () => {
      resolve();
      await pending;
    });

    expect(result.current.copied).to.equal(false);
    expect(result.current.error).to.be.null;
    expect(vi.getTimerCount()).to.equal(0);
  });

  it('Should cancel the feedback timer on unmount', async () => {
    const { result, unmount } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('record');
    });
    expect(vi.getTimerCount()).to.equal(1);
    unmount();
    expect(vi.getTimerCount()).to.equal(0);
  });

  it('Should not schedule feedback when a write finishes after unmounting', async () => {
    let resolve!: () => void;
    writeText.mockImplementationOnce(() => new Promise<void>(done => (resolve = done)));
    const { result, unmount } = renderHook(() => useClipboard());
    let pending!: Promise<boolean>;

    act(() => {
      pending = result.current.copy('record');
    });
    unmount();
    await act(async () => {
      resolve();
      expect(await pending).to.equal(true);
    });

    expect(vi.getTimerCount()).to.equal(0);
    expect(console.error).not.toHaveBeenCalled();
  });
});
