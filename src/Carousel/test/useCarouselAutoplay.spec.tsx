import React from 'react';
import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import useCarouselAutoplay from '../useCarouselAutoplay';
import CustomProvider from '../../CustomProvider';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const createAutoplay = (enabled = true) => {
  const advance = vi.fn();
  const rootRef = { current: document.createElement('div') };
  const hook = renderHook(() => useCarouselAutoplay(enabled, 1000, advance, rootRef), {
    wrapper: ({ children }) => <CustomProvider reduceMotion={false}>{children}</CustomProvider>
  });
  return { ...hook, advance };
};
const tick = (time: number) => act(() => vi.advanceTimersByTime(time));

it.each(['mouse', 'pen', 'touch'])(
  'keeps autoplay scheduled after batched %s enter/leave',
  pointerType => {
    const { result, advance } = createAutoplay();
    act(() => {
      result.current.changeHovered(true, pointerType);
      result.current.changeHovered(false, pointerType);
    });
    expect(result.current.playing).toBe(true);
    tick(999);
    expect(advance).not.toHaveBeenCalled();
    tick(1);
    expect(advance).toHaveBeenCalledTimes(1);
    tick(1000);
    expect(advance).toHaveBeenCalledTimes(1);
  }
);

it('restores a mouse-cancelled timer when a touch event clears hover in the same batch', () => {
  const { result, advance } = createAutoplay();
  act(() => {
    result.current.changeHovered(true, 'mouse');
    result.current.changeHovered(true, 'touch');
  });
  tick(1000);
  expect(advance).toHaveBeenCalledTimes(1);
});

it('does not restart a running interval for touch-only hover events', () => {
  const { result, advance } = createAutoplay();
  tick(600);
  act(() => {
    result.current.changeHovered(true, 'touch');
    result.current.changeHovered(false, 'touch');
  });
  tick(400);
  expect(advance).toHaveBeenCalledTimes(1);
});

it.each([false, true])(
  'does not restart disabled or explicitly paused autoplay (enabled=%s)',
  enabled => {
    const { result, advance } = createAutoplay(enabled);
    if (enabled) act(() => result.current.pause());
    act(() => {
      result.current.changeHovered(true, 'mouse');
      result.current.changeHovered(false, 'mouse');
    });
    tick(2000);
    expect(advance).not.toHaveBeenCalled();
    expect(result.current.playing).toBe(false);
  }
);
