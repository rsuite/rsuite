import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEventListener } from '../useEventListener';

describe('internals/hooks/useEventListener', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should attach an event listener to the target', () => {
    const listener = vi.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);

    renderHook(() => useEventListener(target, 'click', listener));

    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(listener).toHaveBeenCalledTimes(1);

    document.body.removeChild(target);
  });

  it('Should accept a function that returns the target', () => {
    const listener = vi.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);

    renderHook(() => useEventListener(() => target, 'click', listener));

    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(listener).toHaveBeenCalledTimes(1);

    document.body.removeChild(target);
  });

  it('Should remove event listener on unmount', () => {
    const listener = vi.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);

    const { unmount } = renderHook(() => useEventListener(target, 'click', listener));

    unmount();

    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(listener).not.toHaveBeenCalled();

    document.body.removeChild(target);
  });

  it('Should listen on window', () => {
    const listener = vi.fn();

    renderHook(() => useEventListener(window, 'resize', listener));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('Should update listener when it changes', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);

    const { rerender } = renderHook(({ listener }) => useEventListener(target, 'click', listener), {
      initialProps: { listener: listener1 }
    });

    rerender({ listener: listener2 });

    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledTimes(1);

    document.body.removeChild(target);
  });

  it('Should not throw when eventTarget is null', () => {
    expect(() => {
      const { unmount } = renderHook(() =>
        useEventListener(null as unknown as EventTarget, 'click', vi.fn())
      );
      unmount();
    }).not.toThrow();
  });

  it('Should not throw when eventTarget function returns null', () => {
    expect(() => {
      const { unmount } = renderHook(() =>
        useEventListener(() => null as unknown as EventTarget, 'click', vi.fn())
      );
      unmount();
    }).not.toThrow();
  });
});
