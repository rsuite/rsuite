import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Transition from '../Transition';
import Fade from '../Fade';
import Bounce from '../Bounce';
import Slide from '../Slide';
import Collapse from '../Collapse';

describe('Animation child refs', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error');
  });
  afterEach(() => {
    cleanup();
    const errors = vi.mocked(console.error).mock.calls;
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    expect(errors).toEqual([]);
  });

  for (const [name, Component] of [
    ['Transition', Transition],
    ['Fade', Fade],
    ['Bounce', Bounce],
    ['Slide', Slide],
    ['Collapse', Collapse]
  ] as const) {
    it(`${name} preserves the child's object ref and its internal transition target`, () => {
      const childRef = React.createRef<HTMLDivElement>();
      const onExit = vi.fn();
      const { container, rerender, unmount } = render(
        <Component in onExit={onExit}>
          <div ref={childRef}>content</div>
        </Component>
      );
      const node = container.firstElementChild;
      expect(childRef.current).toBe(node);

      rerender(
        <Component in={false} onExit={onExit}>
          <div ref={childRef}>content</div>
        </Component>
      );
      expect(onExit).toHaveBeenCalledExactlyOnceWith(node);
      expect(childRef.current).toBe(node);
      unmount();
      expect(childRef.current).toBeNull();
    });
  }

  it('keeps a callback ref attached throughout enter and exit commits', () => {
    const childRef = vi.fn();
    const { container, rerender, unmount } = render(
      <Transition timeout={10}>
        <div ref={childRef} />
      </Transition>
    );
    const node = container.firstElementChild;
    expect(childRef).toHaveBeenCalledExactlyOnceWith(node);

    rerender(
      <Transition in timeout={10}>
        <div ref={childRef} />
      </Transition>
    );
    act(() => vi.advanceTimersByTime(10));
    rerender(
      <Transition in={false} timeout={10}>
        <div ref={childRef} />
      </Transition>
    );
    act(() => vi.advanceTimersByTime(10));
    expect(childRef).toHaveBeenCalledTimes(1);

    unmount();
    expect(childRef.mock.calls).toEqual([[node], [null]]);
  });

  it('replaces the child ref while retaining the Transition instance ref', () => {
    const first = React.createRef<HTMLDivElement>();
    const second = React.createRef<HTMLDivElement>();
    const transition = React.createRef<Transition>();
    const { container, rerender, unmount } = render(
      <Transition in ref={transition}>
        <div ref={first} />
      </Transition>
    );
    const node = container.firstElementChild;
    const instance = transition.current;
    expect(first.current).toBe(node);

    rerender(
      <Transition in ref={transition}>
        <div ref={second} />
      </Transition>
    );
    expect(first.current).toBeNull();
    expect(second.current).toBe(node);
    expect(transition.current).toBe(instance);
    expect(instance?.getChildElement()).toBe(node);
    unmount();
    expect(second.current).toBeNull();
    expect(transition.current).toBeNull();
  });

  it('reattaches a stable callback when unmountOnExit creates a new child', () => {
    const childRef = vi.fn();
    const child = <div ref={childRef} />;
    const { container, rerender, unmount } = render(
      <Transition in unmountOnExit reduceMotion>
        {child}
      </Transition>
    );
    const first = container.firstElementChild;
    expect(childRef.mock.calls).toEqual([[first]]);
    rerender(
      <Transition unmountOnExit reduceMotion>
        {child}
      </Transition>
    );
    expect(container.firstElementChild).toBeNull();
    expect(childRef.mock.calls).toEqual([[first], [null]]);
    rerender(
      <Transition in unmountOnExit reduceMotion>
        {child}
      </Transition>
    );
    const second = container.firstElementChild;
    expect(second).not.toBeNull();
    expect(second).not.toBe(first);
    expect(childRef.mock.calls).toEqual([[first], [null], [second]]);
    unmount();
    expect(childRef.mock.calls).toEqual([[first], [null], [second], [null]]);
  });

  it('preserves a class child ref while passing its DOM target to lifecycle callbacks', () => {
    class Child extends React.Component<{ className?: string }> {
      ref = React.createRef<HTMLDivElement>();
      render() {
        return <div className={this.props.className} ref={this.ref} />;
      }
    }
    const childRef = vi.fn();
    const onExit = vi.fn();
    const { container, rerender, unmount } = render(
      <Transition in onExit={onExit}>
        <Child ref={childRef} />
      </Transition>
    );
    const node = container.firstElementChild;
    const instance = childRef.mock.calls[0]?.[0];
    expect(instance).toBeInstanceOf(Child);
    expect(instance.ref.current).toBe(node);
    rerender(
      <Transition in={false} onExit={onExit}>
        <Child ref={childRef} />
      </Transition>
    );
    expect(onExit).toHaveBeenCalledExactlyOnceWith(node);
    expect(childRef).toHaveBeenCalledTimes(1);
    unmount();
    expect(childRef).toHaveBeenLastCalledWith(null);
    expect(instance.ref.current).toBeNull();
  });

  it.skipIf(Number.parseInt(React.version, 10) < 19)(
    'preserves React 19 callback cleanup without substituting a null callback',
    () => {
      const cleanup = vi.fn();
      const childRef = vi.fn((node: HTMLDivElement | null) => {
        if (!node) throw new Error('A cleanup ref must use its returned cleanup');
        return () => cleanup(node);
      });
      const { container, rerender, unmount } = render(
        <Transition in>
          <div ref={childRef} />
        </Transition>
      );
      const node = container.firstElementChild;
      expect(childRef).toHaveBeenCalledExactlyOnceWith(node);
      rerender(
        <Transition in className="updated">
          <div ref={childRef} />
        </Transition>
      );
      expect(cleanup).not.toHaveBeenCalled();
      unmount();
      expect(cleanup).toHaveBeenCalledExactlyOnceWith(node);
      expect(childRef).toHaveBeenCalledTimes(1);
    }
  );
});
