import useTimeout from '../useTimeout';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

describe('internals/hooks/useTimeout', () => {
  it('Should return clear and reset functions', () => {
    const { result } = renderHook(() => useTimeout(() => void 0, 10));

    expect(result.current.clear).to.be.a('function');
    expect(result.current.reset).to.be.a('function');
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Should call passed function after given amount of time', () => {
    const callback = vi.fn();

    renderHook(() => useTimeout(callback, 10));

    act(() => {
      vi.advanceTimersByTime(5);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should cancel timeout', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useTimeout(callback, 10));

    act(() => {
      result.current.clear();
    });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('Should reset timeout', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useTimeout(callback, 10));

    act(() => {
      result.current.clear();
    });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      result.current.reset();
    });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should reset timeout on delay change', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(({ delay, cb }) => useTimeout(cb, delay), {
      initialProps: { delay: 20, cb: callback }
    });

    rerender({ delay: 5, cb: callback });

    act(() => {
      vi.advanceTimersByTime(5);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
