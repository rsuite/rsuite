import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from '../useUpdateEffect';

describe('internals/hooks/useUpdateEffect', () => {
  it('Should not run the effect on initial render', () => {
    const effect = vi.fn();

    renderHook(({ count }) => useUpdateEffect(effect, [count]), {
      initialProps: { count: 0 }
    });

    expect(effect).not.toHaveBeenCalled();
  });

  it('Should run the effect after a dependency changes', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(({ count }) => useUpdateEffect(effect, [count]), {
      initialProps: { count: 0 }
    });

    rerender({ count: 1 });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('Should run the effect on each independent call', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(({ count }) => useUpdateEffect(effect, [count]), {
      initialProps: { count: 0 }
    });

    rerender({ count: 1 });
    rerender({ count: 2 });
    rerender({ count: 3 });

    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('Should not re-run the effect when re-rendered with the same dependency value', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(({ count }) => useUpdateEffect(effect, [count]), {
      initialProps: { count: 0 }
    });

    rerender({ count: 0 });

    expect(effect).not.toHaveBeenCalled();
  });

  it('Should not run the effect on mount even with undefined deps', () => {
    const effect = vi.fn();

    renderHook(() => useUpdateEffect(effect, undefined));

    expect(effect).not.toHaveBeenCalled();
  });
});
