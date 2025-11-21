import useElementResize from '../useElementResize';
import { describe, expect, it, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

describe('internals/hooks/useElementResize', () => {
  it('should be defined', () => {
    expect(useElementResize).to.be.exist;
  });

  it('should be called after a change in size', async () => {
    const target = document.createElement('div');
    const callbackSpy = vi.fn();

    document.body.appendChild(target);

    renderHook(() => useElementResize(target, callbackSpy));

    act(() => {
      target.style.width = '100px';
      target.style.height = '100px';
    });

    await waitFor(() => {
      // ResizeObserver first fires a resize event
      const { width, height } = callbackSpy.mock.calls[0][0][0].contentRect;

      expect(callbackSpy).toHaveBeenCalledTimes(1);
      expect(width).to.equal(100);
      expect(height).to.equal(100);
    });

    act(() => {
      target.style.width = '200px';
    });

    await waitFor(() => {
      // ResizeObserver second fires a resize event
      const { width, height } = callbackSpy.mock.calls[1][0][0].contentRect;

      expect(callbackSpy).toHaveBeenCalledTimes(2);
      expect(width).to.equal(200);
      expect(height).to.equal(100);
    });
  });
});
