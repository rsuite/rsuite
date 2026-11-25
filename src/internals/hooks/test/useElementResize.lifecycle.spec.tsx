import React, { StrictMode, useCallback, useRef } from 'react';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useElementResize from '../useElementResize';

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

async function flushObserverFrames() {
  await act(async () => {
    await nextFrame();
    await nextFrame();
  });
}

function Target({
  mode,
  id,
  visible = true,
  onResize
}: {
  mode: 'ref' | 'getter';
  id: number;
  visible?: boolean;
  onResize: ResizeObserverCallback;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const getTarget = useCallback(() => ref.current, []);
  useElementResize(mode === 'ref' ? ref : getTarget, onResize);

  return visible ? (
    <div key={id} ref={ref} data-testid="target" style={{ width: 100 + id, height: 80 }} />
  ) : null;
}

describe.each([false, true])('useElementResize lifecycle (StrictMode=%s)', strict => {
  const wrapper = strict ? StrictMode : React.Fragment;

  it.each(['ref', 'getter'] as const)('follows the current element of a stable %s', async mode => {
    const onResize = vi.fn();
    const view = (id: number) => <Target mode={mode} id={id} onResize={onResize} />;
    const { getByTestId, rerender } = render(view(0), { wrapper });
    const first = getByTestId('target');
    await waitFor(() => expect(onResize).toHaveBeenCalledTimes(1));
    expect(onResize.mock.calls[0][0][0].target).toBe(first);

    rerender(view(1));
    const second = getByTestId('target');
    expect(second).not.toBe(first);
    await waitFor(() => expect(onResize).toHaveBeenCalledTimes(2));
    expect(onResize.mock.calls[1][0][0].target).toBe(second);
    expect(onResize.mock.calls[1][0][0].contentRect.width).toBe(101);

    act(() => {
      second.style.width = '240px';
    });
    await waitFor(() => expect(onResize).toHaveBeenCalledTimes(3));
    expect(onResize.mock.calls[2][0][0].contentRect.width).toBe(240);
  });

  it.each(['ref', 'getter'] as const)(
    'observes a %s attached after mount and releases it when removed',
    async mode => {
      const onResize = vi.fn();
      const view = (visible: boolean, id = 0) => (
        <Target mode={mode} id={id} visible={visible} onResize={onResize} />
      );
      const { getByTestId, rerender, unmount } = render(view(false), { wrapper });
      rerender(view(true));
      const first = getByTestId('target');
      await waitFor(() => expect(onResize).toHaveBeenCalledTimes(1));
      expect(onResize.mock.calls[0][0][0].target).toBe(first);

      rerender(view(false));
      await flushObserverFrames();
      expect(onResize).toHaveBeenCalledTimes(1);
      rerender(view(true, 1));
      const second = getByTestId('target');
      await waitFor(() => expect(onResize).toHaveBeenCalledTimes(2));
      expect(onResize.mock.calls[1][0][0].target).toBe(second);

      // Keep the removed element measurable to catch an observer left subscribed.
      unmount();
      document.body.appendChild(second);
      try {
        second.style.width = '300px';
        await flushObserverFrames();
        expect(onResize).toHaveBeenCalledTimes(2);
      } finally {
        second.remove();
      }
    }
  );

  it('uses the latest listener without reporting an unchanged size again', async () => {
    const firstListener = vi.fn();
    const nextListener = vi.fn();
    const { getByTestId, rerender } = render(
      <Target mode="ref" id={0} onResize={firstListener} />,
      { wrapper }
    );
    await waitFor(() => expect(firstListener).toHaveBeenCalledTimes(1));
    rerender(<Target mode="ref" id={0} onResize={nextListener} />);
    await flushObserverFrames();
    expect(nextListener).not.toHaveBeenCalled();

    act(() => {
      getByTestId('target').style.width = '240px';
    });
    await waitFor(() => expect(nextListener).toHaveBeenCalledTimes(1));
    expect(nextListener.mock.calls[0][0][0].contentRect.width).toBe(240);
    expect(firstListener).toHaveBeenCalledTimes(1);
  });

  it('switches direct targets and disconnects when the target becomes null', async () => {
    const { container } = render(
      <div>
        <div style={{ width: 100, height: 80 }} />
        <div style={{ width: 200, height: 80 }} />
      </div>
    );
    const [first, second] = Array.from(container.firstElementChild!.children);
    const onResize = vi.fn();
    const { rerender } = renderHook(({ target }) => useElementResize(target, onResize), {
      initialProps: { target: first as Element | null },
      wrapper
    });
    await waitFor(() => expect(onResize).toHaveBeenCalledTimes(1));
    rerender({ target: second });
    await waitFor(() => expect(onResize).toHaveBeenCalledTimes(2));
    expect(onResize.mock.calls[1][0][0].target).toBe(second);

    act(() => {
      (first as HTMLElement).style.width = '400px';
    });
    await flushObserverFrames();
    expect(onResize).toHaveBeenCalledTimes(2);
    rerender({ target: null });
    act(() => {
      (second as HTMLElement).style.width = '400px';
    });
    await flushObserverFrames();
    expect(onResize).toHaveBeenCalledTimes(2);
  });
});
