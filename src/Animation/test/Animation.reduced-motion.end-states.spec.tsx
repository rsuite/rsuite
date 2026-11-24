import React from 'react';
import { describe, expect, it } from 'vitest';
import { act, render } from '@testing-library/react';
import Bounce from '../Bounce';
import Slide from '../Slide';
import Transition from '../Transition';
import '../styles/index.scss';
import './fixtures/reduced-motion.scss';

const painted = () =>
  act(
    () =>
      new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      })
  );

function expectStatic(node: HTMLElement) {
  const style = getComputedStyle(node);
  expect(style.animationDuration).toBe('0s');
  expect(style.animationDelay).toBe('0s');
  expect(node.getAnimations().filter(animation => animation.playState === 'running')).toHaveLength(
    0
  );
  return { opacity: Number(style.opacity), matrix: new DOMMatrixReadOnly(style.transform) };
}

describe('Reduced motion end states', () => {
  for (const [name, Component] of [
    ['Bounce', Bounce],
    ['Slide', Slide]
  ] as const) {
    it(`${name} keeps its initial exited keyframe without running visible motion`, async () => {
      const { container } = render(
        <Component reduceMotion>
          <div style={{ width: 120, height: 20 }} />
        </Component>
      );
      await painted();
      const end = expectStatic(container.firstElementChild as HTMLElement);
      if (name === 'Bounce') {
        expect(end.opacity).toBe(0);
        expect(end.matrix.a).toBeCloseTo(0.8);
      } else {
        expect(end.matrix.m41).toBeCloseTo(120);
      }
    });

    it(`${name} preserves entered and exited keyframes across direction changes`, async () => {
      const child = <div style={{ width: 120, height: 20 }} />;
      const { container, rerender } = render(<Component reduceMotion>{child}</Component>);
      rerender(
        <Component in reduceMotion>
          {child}
        </Component>
      );
      await painted();
      const node = container.firstElementChild as HTMLElement;
      const entered = expectStatic(node);
      expect(entered.opacity).toBe(1);
      expect(entered.matrix.a).toBe(1);
      expect(entered.matrix.m41).toBe(0);
      rerender(
        <Component in={false} reduceMotion>
          {child}
        </Component>
      );
      await painted();
      const exited = expectStatic(node);
      if (name === 'Bounce') {
        expect(exited.opacity).toBe(0);
        expect(exited.matrix.a).toBeCloseTo(0.8);
      } else {
        expect(exited.matrix.m41).toBeCloseTo(120);
      }
    });
  }

  it('preserves custom keyframe end styles and removes the configured delay', async () => {
    const props = {
      reduceMotion: true,
      animation: true,
      enteredClassName: 'reduced-motion-test-enter',
      exitedClassName: 'reduced-motion-test-exit'
    };
    const { container, rerender } = render(
      <Transition {...props} in>
        <div />
      </Transition>
    );
    await painted();
    const node = container.firstElementChild as HTMLElement;
    const entered = expectStatic(node);
    expect(entered.opacity).toBe(0.75);
    expect(entered.matrix.m41).toBe(7);
    rerender(
      <Transition {...props} in={false}>
        <div />
      </Transition>
    );
    await painted();
    const exited = expectStatic(node);
    expect(exited.opacity).toBe(0);
    expect(exited.matrix.m41).toBe(30);
  });

  it('reduces a custom infinite animation to one completed iteration', async () => {
    const { container } = render(
      <Transition in reduceMotion enteredClassName="reduced-motion-test-loop">
        <div />
      </Transition>
    );
    await painted();
    const node = container.firstElementChild as HTMLElement;
    const end = expectStatic(node);
    expect(getComputedStyle(node).animationIterationCount).toBe('1');
    expect(end.opacity).toBe(0.75);
    expect(end.matrix.m41).toBe(7);
  });
});
