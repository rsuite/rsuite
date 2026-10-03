import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useUpdateLayoutEffect from '../hooks/useUpdateLayoutEffect';

describe('useUpdateLayoutEffect', () => {
  it('Should skip effect on mount', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(({ dep }) => useUpdateLayoutEffect(fn, [dep]), {
      initialProps: { dep: 1 }
    });

    expect(fn).not.toHaveBeenCalled();

    rerender({ dep: 2 });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('Should run effect when deps change after mount', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(({ dep }) => useUpdateLayoutEffect(fn, [dep]), {
      initialProps: { dep: 0 }
    });

    expect(fn).not.toHaveBeenCalled();

    rerender({ dep: 1 });
    expect(fn).toHaveBeenCalledTimes(1);

    rerender({ dep: 2 });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('Should call cleanup from previous effect when deps change', () => {
    const cleanup = vi.fn();
    const fn = vi.fn(() => cleanup);

    const { rerender } = renderHook(({ dep }) => useUpdateLayoutEffect(fn, [dep]), {
      initialProps: { dep: 0 }
    });

    expect(fn).not.toHaveBeenCalled();
    expect(cleanup).not.toHaveBeenCalled();

    // First update: effect runs, cleanup registered
    rerender({ dep: 1 });
    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    // Second update: previous cleanup called, then effect runs again
    rerender({ dep: 2 });
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('Should call cleanup on unmount', () => {
    const cleanup = vi.fn();
    const fn = vi.fn(() => cleanup);

    const { rerender, unmount } = renderHook(({ dep }) => useUpdateLayoutEffect(fn, [dep]), {
      initialProps: { dep: 0 }
    });

    // Trigger the effect so cleanup is registered
    rerender({ dep: 1 });
    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
