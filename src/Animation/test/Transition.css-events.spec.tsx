import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import Fade from '../Fade';
import Collapse from '../Collapse';
import Modal from '../../Modal';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Modal/styles/index.scss';
import '../../Drawer/styles/index.scss';

function completionEvent(type: 'animationend' | 'transitionend') {
  let resolve: (event: Event) => void;
  const event = new Promise<Event>(complete => {
    resolve = complete;
  });
  return {
    listen(node: HTMLElement) {
      const complete = (event: Event) => {
        if (event.target !== node) return;
        node.removeEventListener(type, complete);
        resolve(event);
      };
      node.addEventListener(type, complete);
    },
    async expectCompleted(callback: ReturnType<typeof vi.fn>) {
      let completed: Event | undefined;
      await act(async () => {
        completed = await event;
      });
      expect(completed?.isTrusted).toBe(true);
      expect(callback).toHaveBeenCalledTimes(1);
    }
  };
}

describe('Transition CSS completion events', () => {
  for (const [name, Component] of [
    ['Modal', Modal],
    ['Drawer', Drawer]
  ] as const) {
    it(`${name} completes from real CSS animation events before its fallback`, async () => {
      const enter = completionEvent('animationend');
      const exit = completionEvent('animationend');
      const entered = vi.fn();
      const exited = vi.fn();
      const props = {
        autoFocus: false,
        enforceFocus: false,
        animationTimeout: 2000,
        style: { animationDuration: '20ms' },
        onEnter: enter.listen,
        onExit: exit.listen,
        onEntered: entered,
        onExited: exited
      };
      const { baseElement, rerender } = render(<Component {...props} open />);
      const node = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      expect(parseFloat(getComputedStyle(node).animationDuration)).toBe(0.02);

      await enter.expectCompleted(entered);

      rerender(<Component {...props} open={false} />);
      await exit.expectCompleted(exited);
      expect(baseElement.querySelector('[role="dialog"]')).toBeNull();
    });
  }

  for (const [name, Component] of [
    ['Fade', Fade],
    ['Collapse', Collapse]
  ] as const) {
    it(`${name} completes from real CSS transition events before its fallback`, async () => {
      const enter = completionEvent('transitionend');
      const exit = completionEvent('transitionend');
      const entered = vi.fn();
      const exited = vi.fn();
      const props = {
        timeout: 2000,
        onEnter: enter.listen,
        onExit: exit.listen,
        onEntered: entered,
        onExited: exited
      };
      const child = (
        <div style={{ transitionDuration: '20ms' }}>
          <div style={{ height: 50 }}>content</div>
        </div>
      );
      const { container, rerender } = render(<Component {...props}>{child}</Component>);
      const node = container.firstElementChild as HTMLElement;
      // Establish the exited style before changing the property that transitions.
      expect(parseFloat(getComputedStyle(node).transitionDuration)).toBe(0.02);

      rerender(
        <Component {...props} in>
          {child}
        </Component>
      );
      await enter.expectCompleted(entered);

      rerender(
        <Component {...props} in={false}>
          {child}
        </Component>
      );
      await exit.expectCompleted(exited);
    });
  }

  it('retains the fallback when an initial Fade has no before-change style', () => {
    vi.useFakeTimers();
    try {
      const entered = vi.fn();
      const transitionEnd = vi.fn();
      render(
        <Fade
          in
          transitionAppear
          timeout={100}
          onEntered={entered}
          onEnter={node => node.addEventListener('transitionend', transitionEnd)}
        >
          <div />
        </Fade>
      );

      act(() => vi.advanceTimersByTime(99));
      expect(entered).not.toHaveBeenCalled();
      expect(transitionEnd).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(1));
      expect(entered).toHaveBeenCalledTimes(1);
    } finally {
      cleanup();
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });
});
