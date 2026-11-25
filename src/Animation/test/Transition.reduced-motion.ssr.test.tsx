import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import Transition from '../Transition';
import Bounce from '../Bounce';
import CustomProvider from '../../CustomProvider';

describe('Reduced motion SSR', () => {
  it.each([
    [undefined, 'auto'],
    [true, 'reduce'],
    [false, 'allow']
  ] as const)('renders policy %s without querying the browser', (reduceMotion, policy) => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    const entered = vi.fn();
    const markup = renderToString(
      <Bounce in transitionAppear reduceMotion={reduceMotion} onEntered={entered}>
        <div />
      </Bounce>
    );
    expect(markup).toContain(`data-rs-motion="${policy}"`);
    expect(entered).not.toHaveBeenCalled();
  });

  it('resolves the provider policy without replacing an explicit component policy', () => {
    const markup = renderToString(
      <CustomProvider reduceMotion>
        <Transition>
          <div />
        </Transition>
        <Transition reduceMotion={false}>
          <div />
        </Transition>
      </CustomProvider>
    );
    expect(markup).toContain('data-rs-motion="reduce"');
    expect(markup).toContain('data-rs-motion="allow"');
  });
});
