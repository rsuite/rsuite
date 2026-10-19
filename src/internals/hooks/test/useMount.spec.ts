import React from 'react';
import useMount from '../useMount';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('internals/hooks/useMount', () => {
  it('cleans up the mounted resource even when the callback changes on rerender', () => {
    const dispose = vi.fn();
    const setup = vi.fn(() => dispose);
    const replacement = vi.fn();
    const view = renderHook(({ callback }) => useMount(callback), {
      initialProps: { callback: setup }
    });

    view.rerender({ callback: replacement });
    expect(setup).toHaveBeenCalledTimes(1);
    expect(replacement).not.toHaveBeenCalled();
    expect(dispose).not.toHaveBeenCalled();
    view.unmount();
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(replacement).not.toHaveBeenCalled();
  });

  it('keeps one live resource through StrictMode effect replay and none after unmount', () => {
    const resources = new Set<symbol>();
    const setup = vi.fn(() => {
      const resource = Symbol();
      resources.add(resource);
      return () => {
        resources.delete(resource);
      };
    });
    const view = renderHook(() => useMount(setup), { wrapper: React.StrictMode });

    expect(setup).toHaveBeenCalledTimes(2);
    expect(resources.size).toBe(1);
    view.unmount();
    expect(resources.size).toBe(0);
  });

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
