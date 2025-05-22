import useMount from '../useMount';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('internals/hooks/useMount', () => {
  it('should call provided callback on mount', () => {
    const callback = vi.fn();

    renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call provided callback on unmount', () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call provided callback on rerender', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
