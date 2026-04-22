import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useEventCallback } from '../useEventCallback';

describe('internals/hooks/useEventCallback', () => {
  it('Should return a stable function reference across re-renders', () => {
    const fn = vi.fn();
    const { result, rerender } = renderHook(() => useEventCallback(fn));

    const firstCallback = result.current;

    rerender();

    expect(result.current).to.equal(firstCallback);
  });

  it('Should call the latest version of the wrapped function', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const { result, rerender } = renderHook(({ fn }) => useEventCallback(fn), {
      initialProps: { fn: fn1 }
    });

    const stableCallback = result.current;

    rerender({ fn: fn2 });

    act(() => {
      stableCallback();
    });

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('Should forward arguments to the wrapped function', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useEventCallback(fn));

    act(() => {
      result.current(1, 'hello', { key: 'value' });
    });

    expect(fn).toHaveBeenCalledWith(1, 'hello', { key: 'value' });
  });

  it('Should return the value from the wrapped function', () => {
    const fn = vi.fn().mockReturnValue('result');
    const { result } = renderHook(() => useEventCallback(fn));

    let returnValue: unknown;

    act(() => {
      returnValue = result.current();
    });

    expect(returnValue).to.equal('result');
  });

  it('Should handle an undefined fn gracefully', () => {
    const { result } = renderHook(() => useEventCallback(undefined));

    expect(() => {
      act(() => {
        result.current();
      });
    }).not.toThrow();
  });
});
