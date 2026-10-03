import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import Transition from '../Transition';
import Fade from '../Fade';
import Bounce from '../Bounce';
import Slide from '../Slide';
import Collapse from '../Collapse';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

function systemPreference(initial = false) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const query = {
    matches: initial,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn((_type, listener) => listeners.add(listener)),
    removeEventListener: vi.fn((_type, listener) => listeners.delete(listener))
  };
  const spy = vi.spyOn(window, 'matchMedia').mockReturnValue(query as unknown as MediaQueryList);
  return {
    query,
    set(matches: boolean) {
      query.matches = matches;
      act(() => listeners.forEach(listener => listener({ matches } as MediaQueryListEvent)));
    },
    restore: () => spy.mockRestore()
  };
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Transition reduced motion', () => {
  for (const [name, Component] of [
    ['Fade', Fade],
    ['Bounce', Bounce],
    ['Slide', Slide],
    ['Collapse', Collapse]
  ] as const) {
    it(`${name} keeps all enter and exit callbacks without waiting for a completion event`, () => {
      vi.useFakeTimers();
      const sequence: string[] = [];
      const props = {
        reduceMotion: true,
        timeout: 2000,
        onEnter: () => sequence.push('enter'),
        onEntering: (node: HTMLElement) => {
          sequence.push('entering');
          expect(getComputedStyle(node).animationDuration).toBe('0s');
          expect(getComputedStyle(node).transitionDuration).toBe('0s');
        },
        onEntered: () => sequence.push('entered'),
        onExit: () => sequence.push('exit'),
        onExiting: () => sequence.push('exiting'),
        onExited: () => sequence.push('exited')
      };
      const child = (
        <div>
          <div style={{ height: 50 }}>content</div>
        </div>
      );
      const { rerender } = render(<Component {...props}>{child}</Component>);
      rerender(
        <Component {...props} in>
          {child}
        </Component>
      );
      expect(sequence).toEqual(['enter', 'entering', 'entered']);
      rerender(
        <Component {...props} in={false}>
          {child}
        </Component>
      );
      expect(sequence).toEqual(['enter', 'entering', 'entered', 'exit', 'exiting', 'exited']);
      expect(vi.getTimerCount()).toBe(0);
    });
  }

  it('finishes an active enter once and releases its listener and fallback', () => {
    vi.useFakeTimers();
    const ref = React.createRef<Transition>();
    const entered = vi.fn();
    const props = { ref, in: true, transitionAppear: true, timeout: 2000, onEntered: entered };
    const { container, rerender } = render(
      <Transition {...props} reduceMotion={false}>
        <div />
      </Transition>
    );
    const node = container.firstElementChild as HTMLElement;
    const removeListener = vi.spyOn(node, 'removeEventListener');
    expect(entered).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(1);
    rerender(
      <Transition {...props} reduceMotion>
        <div />
      </Transition>
    );
    expect(entered).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledWith('transitionend', expect.any(Function), false);
    expect(ref.current?.animationEventListener).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    act(() => node.dispatchEvent(new Event('transitionend', { bubbles: true })));
    act(() => vi.advanceTimersByTime(2000));
    expect(entered).toHaveBeenCalledTimes(1);
  });

  it('finishes an active exit and still unmounts its child', () => {
    vi.useFakeTimers();
    const exited = vi.fn();
    const props = { timeout: 2000, unmountOnExit: true, onExited: exited };
    const { container, rerender } = render(
      <Transition {...props} in reduceMotion={false}>
        <div />
      </Transition>
    );
    rerender(
      <Transition {...props} in={false} reduceMotion={false}>
        <div />
      </Transition>
    );
    expect(container.firstElementChild).not.toBeNull();
    rerender(
      <Transition {...props} in={false} reduceMotion>
        <div />
      </Transition>
    );
    expect(exited).toHaveBeenCalledTimes(1);
    expect(container.firstElementChild).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('uses the system preference and subscribes only while the policy is automatic', () => {
    const system = systemPreference(true);
    try {
      const entered = vi.fn();
      const props = { in: true, transitionAppear: true, onEntered: entered };
      const { container, rerender, unmount } = render(
        <Transition {...props}>
          <div />
        </Transition>
      );
      expect(entered).toHaveBeenCalledTimes(1);
      expect(container.firstElementChild).to.have.attribute('data-rs-motion', 'reduce');
      expect(system.query.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
      rerender(
        <Transition {...props} reduceMotion={false}>
          <div />
        </Transition>
      );
      expect(system.query.removeEventListener).toHaveBeenCalledTimes(1);
      rerender(
        <Transition {...props}>
          <div />
        </Transition>
      );
      expect(system.query.addEventListener).toHaveBeenCalledTimes(2);
      unmount();
      expect(system.query.removeEventListener).toHaveBeenCalledTimes(2);
    } finally {
      system.restore();
    }
  });

  it('keeps a reduced completed animation static until the next direction change', () => {
    vi.useFakeTimers();
    const system = systemPreference(false);
    try {
      const entered = vi.fn();
      const exited = vi.fn();
      const props = { timeout: 2000, onEntered: entered, onExited: exited };
      const { container, rerender } = render(
        <Bounce {...props}>
          <div />
        </Bounce>
      );
      rerender(
        <Bounce {...props} in>
          <div />
        </Bounce>
      );
      const node = container.firstElementChild as HTMLElement;
      expect(entered).not.toHaveBeenCalled();
      system.set(true);
      expect(entered).toHaveBeenCalledTimes(1);
      expect(getComputedStyle(node).animationDuration).toBe('0s');
      system.set(false);
      expect(getComputedStyle(node).animationDuration).toBe('0s');
      expect(vi.getTimerCount()).toBe(0);
      rerender(
        <Bounce {...props} in={false}>
          <div />
        </Bounce>
      );
      expect(node).to.have.attribute('data-rs-motion', 'auto');
      expect(node).to.have.class('rs-anim-bounce-out');
      expect(exited).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(1);
    } finally {
      system.restore();
    }
  });

  it('gives a component policy precedence over the provider and system', () => {
    vi.useFakeTimers();
    const system = systemPreference(true);
    try {
      const allow = vi.fn();
      const reduce = vi.fn();
      render(
        <CustomProvider reduceMotion>
          <Fade in transitionAppear reduceMotion={false} timeout={2000} onEntered={allow}>
            <div />
          </Fade>
        </CustomProvider>
      );
      render(
        <CustomProvider reduceMotion={false}>
          <Fade in transitionAppear reduceMotion timeout={2000} onEntered={reduce}>
            <div />
          </Fade>
        </CustomProvider>
      );
      expect(allow).not.toHaveBeenCalled();
      expect(reduce).toHaveBeenCalledTimes(1);
      expect(system.query.addEventListener).not.toHaveBeenCalled();
    } finally {
      system.restore();
    }
  });

  it('keeps component defaults consistent with the existing provider merge', () => {
    vi.useFakeTimers();
    const entered = vi.fn();
    render(
      <CustomProvider reduceMotion components={{ Fade: { defaultProps: { reduceMotion: false } } }}>
        <Fade in transitionAppear timeout={2000} onEntered={entered}>
          <div />
        </Fade>
      </CustomProvider>
    );
    expect(entered).not.toHaveBeenCalled();
  });

  it('finishes the active request when the provider policy changes', () => {
    vi.useFakeTimers();
    const entered = vi.fn();
    const props = { in: true, transitionAppear: true, timeout: 2000, onEntered: entered };
    const { rerender } = render(
      <CustomProvider reduceMotion={false}>
        <Fade {...props}>
          <div />
        </Fade>
      </CustomProvider>
    );
    expect(entered).not.toHaveBeenCalled();
    rerender(
      <CustomProvider reduceMotion>
        <Fade {...props}>
          <div />
        </Fade>
      </CustomProvider>
    );
    expect(entered).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('preserves the initial entered state without invoking appear callbacks', () => {
    const enter = vi.fn();
    const entered = vi.fn();
    const { container } = render(
      <Bounce in reduceMotion onEnter={enter} onEntered={entered}>
        <div />
      </Bounce>
    );
    expect(enter).not.toHaveBeenCalled();
    expect(entered).not.toHaveBeenCalled();
    expect(getComputedStyle(container.firstElementChild as HTMLElement).animationDuration).toBe(
      '0s'
    );
  });

  it('cleans up when an entering callback unmounts the transition', () => {
    vi.useFakeTimers();
    const entered = vi.fn();
    const system = systemPreference(true);
    try {
      function Host() {
        const [mounted, setMounted] = React.useState(true);
        return mounted ? (
          <Fade in transitionAppear onEntering={() => setMounted(false)} onEntered={entered}>
            <div />
          </Fade>
        ) : null;
      }
      const { container } = render(<Host />);
      expect(container.firstElementChild).toBeNull();
      expect(entered).not.toHaveBeenCalled();
      expect(system.query.removeEventListener).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      system.restore();
    }
  });

  it('cancels an interrupted reduced enter rather than invoking a stale completion', () => {
    const sequence: string[] = [];
    function Host() {
      const [open, setOpen] = React.useState(true);
      return (
        <Fade
          in={open}
          transitionAppear
          reduceMotion
          onEntering={() => {
            sequence.push('entering');
            setOpen(false);
          }}
          onEntered={() => sequence.push('entered')}
          onExiting={() => sequence.push('exiting')}
          onExited={() => sequence.push('exited')}
        >
          <div />
        </Fade>
      );
    }
    render(<Host />);
    expect(sequence).toEqual(['entering', 'exiting', 'exited']);
  });
});
