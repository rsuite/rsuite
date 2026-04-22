import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('internals/hooks/useClickOutside', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should call handle when clicking outside', () => {
    const isOutside = vi.fn().mockReturnValue(true);
    const handle = vi.fn();

    renderHook(() => useClickOutside({ isOutside, handle }));

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(isOutside).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('Should not call handle when clicking inside', () => {
    const isOutside = vi.fn().mockReturnValue(false);
    const handle = vi.fn();

    renderHook(() => useClickOutside({ isOutside, handle }));

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(isOutside).toHaveBeenCalledTimes(1);
    expect(handle).not.toHaveBeenCalled();
  });

  it('Should not listen when enabled is false', () => {
    const isOutside = vi.fn().mockReturnValue(true);
    const handle = vi.fn();

    renderHook(() => useClickOutside({ enabled: false, isOutside, handle }));

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(isOutside).not.toHaveBeenCalled();
    expect(handle).not.toHaveBeenCalled();
  });

  it('Should default enabled to true', () => {
    const isOutside = vi.fn().mockReturnValue(true);
    const handle = vi.fn();

    renderHook(() => useClickOutside({ isOutside, handle }));

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('Should stop listening after unmount', () => {
    const isOutside = vi.fn().mockReturnValue(true);
    const handle = vi.fn();

    const { unmount } = renderHook(() => useClickOutside({ isOutside, handle }));

    unmount();

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handle).not.toHaveBeenCalled();
  });

  it('Should use the latest version of isOutside and handle callbacks', () => {
    const isOutside1 = vi.fn().mockReturnValue(false);
    const handle1 = vi.fn();
    const isOutside2 = vi.fn().mockReturnValue(true);
    const handle2 = vi.fn();

    const { rerender } = renderHook(
      ({ isOutside, handle }) => useClickOutside({ isOutside, handle }),
      { initialProps: { isOutside: isOutside1, handle: handle1 } }
    );

    rerender({ isOutside: isOutside2, handle: handle2 });

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(isOutside1).not.toHaveBeenCalled();
    expect(handle1).not.toHaveBeenCalled();
    expect(isOutside2).toHaveBeenCalledTimes(1);
    expect(handle2).toHaveBeenCalledTimes(1);
  });

  it('Should re-attach listener when enabled changes from false to true', () => {
    const isOutside = vi.fn().mockReturnValue(true);
    const handle = vi.fn();

    const { rerender } = renderHook(
      ({ enabled }) => useClickOutside({ enabled, isOutside, handle }),
      { initialProps: { enabled: false } }
    );

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handle).not.toHaveBeenCalled();

    rerender({ enabled: true });

    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handle).toHaveBeenCalledTimes(1);
  });
});
