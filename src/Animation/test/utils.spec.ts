import { afterEach, describe, expect, it, vi } from 'vitest';
import { getAnimationEnd, getTransitionEnd } from '../utils';

function support(style: Record<string, string>) {
  vi.spyOn(document, 'createElement').mockReturnValue({ style } as unknown as HTMLDivElement);
}

describe('Animation event detection', () => {
  afterEach(() => vi.restoreAllMocks());

  it('prefers standard animation events when both properties are supported', () => {
    support({ animation: '', webkitAnimation: '' });
    expect(getAnimationEnd()).toBe('animationend');
  });

  it('retains the WebKit animation fallback without standard support', () => {
    support({ webkitAnimation: '' });
    expect(getAnimationEnd()).toBe('webkitAnimationEnd');
  });

  it('retains the default animation event when no property is detected', () => {
    support({});
    expect(getAnimationEnd()).toBe('animationend');
  });

  it('prefers standard transition events when both properties are supported', () => {
    support({ transition: '', WebkitTransitionProperty: '' });
    expect(getTransitionEnd()).toBe('transitionend');
  });

  it('retains the WebKit transition fallback without standard support', () => {
    support({ WebkitTransitionProperty: '' });
    expect(getTransitionEnd()).toBe('webkitTransitionEnd');
  });

  it('retains the Mozilla transition fallback without standard support', () => {
    support({ MozTransitionProperty: '' });
    expect(getTransitionEnd()).toBe('transitionend');
  });
});
