import React from 'react';
import { getTransitionEnd } from '../utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import Transition from '../Transition';

const transitionClasses = {
  enteringClassName: 'entering',
  enteredClassName: 'entered',
  exitingClassName: 'exiting',
  exitedClassName: 'exited'
};

const advance = (time: number) => act(() => vi.advanceTimersByTime(time));
const endTransition = (node: Element) =>
  act(() => node.dispatchEvent(new Event(getTransitionEnd(), { bubbles: true })));

describe('Transition lifecycle', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('cancels an interrupted enter when exiting', () => {
    const entered = vi.fn();
    const exited = vi.fn();
    const props = { ...transitionClasses, timeout: 100, onEntered: entered, onExited: exited };
    const { container, rerender } = render(
      <Transition {...props}>
        <div />
      </Transition>
    );

    rerender(
      <Transition {...props} in>
        <div />
      </Transition>
    );
    advance(50);
    rerender(
      <Transition {...props} in={false}>
        <div />
      </Transition>
    );
    advance(50);

    expect(entered).not.toHaveBeenCalled();
    expect(exited).not.toHaveBeenCalled();
    expect(container.firstChild).to.have.class('exiting');

    advance(50);
    expect(exited).toHaveBeenCalledTimes(1);
    expect(container.firstChild).to.have.class('exited');
  });

  it('cancels both older transitions when an enter is restarted', () => {
    const enter = vi.fn();
    const entered = vi.fn();
    const exited = vi.fn();
    const props = {
      ...transitionClasses,
      timeout: 100,
      unmountOnExit: true,
      onEnter: enter,
      onEntered: entered,
      onExited: exited
    };
    const { container, rerender } = render(
      <Transition {...props}>
        <div />
      </Transition>
    );

    rerender(
      <Transition {...props} in>
        <div />
      </Transition>
    );
    advance(25);
    rerender(
      <Transition {...props} in={false}>
        <div />
      </Transition>
    );
    advance(25);
    rerender(
      <Transition {...props} in>
        <div />
      </Transition>
    );
    expect(enter).toHaveBeenCalledTimes(2);
    expect(container.firstChild).to.have.class('entering');
    advance(75);

    expect(entered).not.toHaveBeenCalled();
    expect(exited).not.toHaveBeenCalled();
    expect(container.firstChild).to.have.class('entering');

    advance(25);
    expect(entered).toHaveBeenCalledTimes(1);
    expect(exited).not.toHaveBeenCalled();
    expect(container.firstChild).to.have.class('entered');
  });

  it('releases the old listener when a transition is interrupted', () => {
    const ref = React.createRef<Transition>();
    const { container, rerender } = render(
      <Transition ref={ref} timeout={100} in>
        <div />
      </Transition>
    );
    const node = container.firstChild as HTMLElement;
    const removeListener = vi.spyOn(node, 'removeEventListener');

    rerender(
      <Transition ref={ref} timeout={100} in={false}>
        <div />
      </Transition>
    );
    rerender(
      <Transition ref={ref} timeout={100} in>
        <div />
      </Transition>
    );

    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(removeListener.mock.calls[0][0]).toBe(getTransitionEnd());
    expect(vi.getTimerCount()).toBe(1);
  });

  it('ignores bubbled completion events from children', () => {
    const entered = vi.fn();
    const { container } = render(
      <Transition in transitionAppear timeout={100} onEntered={entered}>
        <div>
          <span />
        </div>
      </Transition>
    );
    const node = container.firstChild as HTMLElement;

    endTransition(node.firstChild as Element);
    expect(entered).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(1);

    endTransition(node);
    expect(entered).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('releases the listener and fallback timer after a completion event', () => {
    const entered = vi.fn();
    const { container } = render(
      <Transition in transitionAppear timeout={100} onEntered={entered}>
        <div />
      </Transition>
    );
    const node = container.firstChild as HTMLElement;
    const removeListener = vi.spyOn(node, 'removeEventListener');

    endTransition(node);

    expect(entered).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);

    endTransition(node);
    advance(100);
    expect(entered).toHaveBeenCalledTimes(1);
  });

  it('releases the listener after the fallback timer completes', () => {
    const entered = vi.fn();
    const { container } = render(
      <Transition in transitionAppear timeout={100} onEntered={entered}>
        <div />
      </Transition>
    );
    const node = container.firstChild as HTMLElement;
    const removeListener = vi.spyOn(node, 'removeEventListener');

    advance(100);

    expect(entered).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledTimes(1);
    endTransition(node);
    expect(entered).toHaveBeenCalledTimes(1);
  });

  it('releases pending work when unmounted', () => {
    const entered = vi.fn();
    const { container, unmount } = render(
      <Transition in transitionAppear timeout={100} onEntered={entered}>
        <div />
      </Transition>
    );
    const node = container.firstChild as HTMLElement;
    const removeListener = vi.spyOn(node, 'removeEventListener');

    unmount();

    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
    endTransition(node);
    advance(100);
    expect(entered).not.toHaveBeenCalled();
  });

  it('keeps only the current completion work after StrictMode replays mounting', () => {
    const entered = vi.fn();
    const { container } = render(
      <React.StrictMode>
        <Transition {...transitionClasses} in transitionAppear timeout={100} onEntered={entered}>
          <div />
        </Transition>
      </React.StrictMode>
    );

    expect(vi.getTimerCount()).toBe(1);
    advance(100);
    expect(container.firstChild).to.have.class('entered');
    expect(entered).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  for (const entering of [true, false]) {
    it(`releases pending work when unmounted in on${entering ? 'Entering' : 'Exiting'}`, () => {
      const completed = vi.fn();
      const Fixture = ({ open }: { open: boolean }) => {
        const [mounted, setMounted] = React.useState(true);
        const props = entering
          ? { onEntering: () => setMounted(false), onEntered: completed }
          : { onExiting: () => setMounted(false), onExited: completed };
        return mounted ? (
          <Transition timeout={100} in={open} {...props}>
            <div />
          </Transition>
        ) : null;
      };
      const view = render(<Fixture open={!entering} />);
      const node = view.container.firstChild as HTMLElement;
      const removeListener = vi.spyOn(node, 'removeEventListener');

      view.rerender(<Fixture open={entering} />);

      expect(view.container.firstChild).toBeNull();
      expect(removeListener).toHaveBeenCalledTimes(1);
      expect(removeListener.mock.calls[0][0]).toBe(getTransitionEnd());
      expect(vi.getTimerCount()).toBe(0);
      endTransition(node);
      advance(100);
      expect(completed).not.toHaveBeenCalled();
    });
  }
});
