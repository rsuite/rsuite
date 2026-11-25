import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useWillUnmount } from '../useWillUnmount';

describe('internals/hooks/useWillUnmount', () => {
  it('Should call the callback on unmount', () => {
    const fn = vi.fn();

    const { unmount } = renderHook(() => useWillUnmount(fn));

    expect(fn).not.toHaveBeenCalled();

    unmount();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('Should not call the callback on re-render', () => {
    const fn = vi.fn();

    const { rerender } = renderHook(() => useWillUnmount(fn));

    rerender();
    rerender();

    expect(fn).not.toHaveBeenCalled();
  });

  it('Should use the latest version of the callback', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const { rerender, unmount } = renderHook(({ fn }) => useWillUnmount(fn), {
      initialProps: { fn: fn1 }
    });

    rerender({ fn: fn2 });

    unmount();

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('Should call the callback exactly once on unmount', () => {
    const fn = vi.fn();

    const { unmount } = renderHook(() => useWillUnmount(fn));

    unmount();
    unmount();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
