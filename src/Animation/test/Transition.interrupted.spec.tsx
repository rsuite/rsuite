import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getTransitionEnd } from '../utils';
import Transition from '../Transition';

function setup() {
  const callbacks = {
    onEnter: vi.fn(),
    onEntering: vi.fn(),
    onEntered: vi.fn(),
    onExit: vi.fn(),
    onExiting: vi.fn(),
    onExited: vi.fn()
  };
  const element = (open: boolean) => (
    <Transition
      {...callbacks}
      in={open}
      transitionAppear
      timeout={1000}
      enteringClassName="entering"
      enteredClassName="entered"
      exitingClassName="exiting"
      exitedClassName="exited"
    >
      {(props, ref) => (
        <div {...props} ref={ref}>
          <span>Transition child</span>
        </div>
      )}
    </Transition>
  );
  return { callbacks, element, view: render(element(true)) };
}

function withClock(check: (fixture: ReturnType<typeof setup>) => void) {
  vi.useFakeTimers();
  vi.setSystemTime(0);
  let fixture: ReturnType<typeof setup> | undefined;
  try {
    fixture = setup();
    check(fixture);
  } finally {
    fixture?.view.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
  }
}

describe('Transition interrupted lifecycle', () => {
  it('cancels entry when closed before the enter timeout', () => {
    withClock(({ callbacks, element, view }) => {
      expect(view.container.firstChild).to.have.class('entering');
      expect(callbacks.onEntering).toHaveBeenCalledTimes(1);
      act(() => vi.advanceTimersByTime(200));
      view.rerender(element(false));
      expect(view.container.firstChild).to.have.class('exiting');
      expect(callbacks.onExit).toHaveBeenCalledTimes(1);

      act(() => vi.advanceTimersByTime(800));
      expect(callbacks.onEntered).not.toHaveBeenCalled();
      expect(callbacks.onExit).toHaveBeenCalledTimes(1);
      expect(callbacks.onExiting).toHaveBeenCalledTimes(1);
      expect(callbacks.onExited).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(200));
      expect(view.container.firstChild).to.have.class('exited');
      expect(callbacks.onExited).toHaveBeenCalledTimes(1);
      expect(callbacks.onEntered).not.toHaveBeenCalled();
    });
  });

  it('completes one exit when closed after entry', () => {
    withClock(({ callbacks, element, view }) => {
      act(() => vi.advanceTimersByTime(1000));
      expect(view.container.firstChild).to.have.class('entered');
      expect(callbacks.onEntered).toHaveBeenCalledTimes(1);
      view.rerender(element(false));
      act(() => vi.advanceTimersByTime(1000));
      expect(view.container.firstChild).to.have.class('exited');
      for (const callback of Object.values(callbacks)) {
        expect(callback).toHaveBeenCalledTimes(1);
      }
    });
  });

  it('cancels exit when reopened before the exit timeout', () => {
    withClock(({ callbacks, element, view }) => {
      act(() => vi.advanceTimersByTime(1000));
      view.rerender(element(false));
      act(() => vi.advanceTimersByTime(200));
      view.rerender(element(true));
      expect(view.container.firstChild).to.have.class('entering');
      expect(callbacks.onEnter).toHaveBeenCalledTimes(2);

      act(() => vi.advanceTimersByTime(800));
      expect(callbacks.onExited).not.toHaveBeenCalled();
      expect(callbacks.onEnter).toHaveBeenCalledTimes(2);
      expect(callbacks.onEntering).toHaveBeenCalledTimes(2);
      expect(callbacks.onEntered).toHaveBeenCalledTimes(1);

      act(() => vi.advanceTimersByTime(200));
      expect(view.container.firstChild).to.have.class('entered');
      expect(callbacks.onEntered).toHaveBeenCalledTimes(2);
      expect(callbacks.onExit).toHaveBeenCalledTimes(1);
      expect(callbacks.onExiting).toHaveBeenCalledTimes(1);
      expect(callbacks.onExited).not.toHaveBeenCalled();
    });
  });

  it('ignores descendant transition events without consuming the pending callback', () => {
    withClock(({ callbacks, view }) => {
      const node = view.container.firstElementChild as HTMLElement;
      const eventName = getTransitionEnd();
      fireEvent(node.firstElementChild as HTMLElement, new Event(eventName, { bubbles: true }));
      expect(node).to.have.class('entering');
      expect(callbacks.onEntered).not.toHaveBeenCalled();

      fireEvent(node, new Event(eventName, { bubbles: true }));
      expect(node).to.have.class('entered');
      expect(callbacks.onEntered).toHaveBeenCalledTimes(1);
      act(() => vi.advanceTimersByTime(1000));
      expect(callbacks.onEntered).toHaveBeenCalledTimes(1);
    });
  });
});
