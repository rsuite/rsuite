import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { hydrateRoot, Root } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import Bounce from '../Bounce';
import Slide from '../Slide';
import CustomProvider from '../../CustomProvider';
import Modal from '../../Modal';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Modal/styles/index.scss';
import '../../Drawer/styles/index.scss';
import './fixtures/reduced-motion.scss';

describe('Reduced motion styles', () => {
  for (const [name, Component] of [
    ['Bounce', Bounce],
    ['Slide', Slide]
  ] as const) {
    it(`${name} applies the real system preference to server markup before hydration`, () => {
      const host = document.createElement('div');
      host.innerHTML = renderToString(
        <Component in>
          <div />
        </Component>
      );
      document.body.appendChild(host);
      try {
        const node = host.firstElementChild as HTMLElement;
        expect(node).to.have.attribute('data-rs-motion', 'auto');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        expect(getComputedStyle(node).animationDuration === '0s').toBe(reduced);
        if (reduced) expect(Number(getComputedStyle(node).opacity)).toBe(1);
      } finally {
        host.remove();
      }
    });

    it(`${name} allows animation explicitly even when the system requests reduced motion`, () => {
      const host = document.createElement('div');
      host.innerHTML = renderToString(
        <CustomProvider reduceMotion>
          <Component in reduceMotion={false}>
            <div />
          </Component>
        </CustomProvider>
      );
      document.body.appendChild(host);
      try {
        const node = host.firstElementChild as HTMLElement;
        expect(node).to.have.attribute('data-rs-motion', 'allow');
        expect(parseFloat(getComputedStyle(node).animationDuration)).toBeGreaterThan(0);
      } finally {
        host.remove();
      }
    });
  }

  for (const [name, Component] of [
    ['Modal', Modal],
    ['Drawer', Drawer]
  ] as const) {
    it(`${name} reduces its default dialog and backdrop without suppressing content animations`, () => {
      const sequence: string[] = [];
      const props = {
        reduceMotion: true,
        autoFocus: false,
        enforceFocus: false,
        animationTimeout: 2000,
        onEnter: () => sequence.push('enter'),
        onEntering: () => sequence.push('entering'),
        onEntered: () => sequence.push('entered'),
        onExit: () => sequence.push('exit'),
        onExiting: () => sequence.push('exiting'),
        onExited: () => sequence.push('exited')
      };
      const child = (
        <div data-testid="custom-motion" style={{ animation: 'content-animation 100s' }}>
          content
        </div>
      );
      const { baseElement, rerender } = render(
        <Component {...props} open>
          {child}
        </Component>
      );
      const dialog = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      const backdrop = baseElement.querySelector('[data-testid="backdrop"]') as HTMLElement;
      expect(getComputedStyle(dialog).animationDuration).toBe('0s');
      expect(Number(getComputedStyle(dialog).opacity)).toBe(1);
      expect(getComputedStyle(backdrop).transitionDuration).toBe('0s');
      expect(
        getComputedStyle(dialog.querySelector('[data-testid="custom-motion"]') as HTMLElement)
          .animationName
      ).toBe('content-animation');
      expect(sequence).toEqual(['enter', 'entering', 'entered']);
      rerender(
        <Component {...props} open={false}>
          {child}
        </Component>
      );
      expect(sequence).toEqual(['enter', 'entering', 'entered', 'exit', 'exiting', 'exited']);
      expect(baseElement.querySelector('[role="dialog"]')).toBeNull();
      expect(baseElement.querySelector('[data-testid="backdrop"]')).toBeNull();
    });

    it(`${name} does not start a static-backdrop shake when motion is reduced`, () => {
      const { baseElement } = render(
        <Component open reduceMotion backdrop="static" autoFocus={false} enforceFocus={false} />
      );
      const wrapper = baseElement.querySelector('[data-testid$="-wrapper"]') as HTMLElement;
      fireEvent.mouseDown(wrapper);
      fireEvent.click(wrapper);
      const dialog = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      expect(dialog.className).not.toContain('shake');
      expect(getComputedStyle(dialog.firstElementChild as HTMLElement).animationName).toBe('none');
    });

    it(`${name} cancels an existing shake when reduced motion becomes effective`, () => {
      const props = {
        open: true,
        backdrop: 'static' as const,
        autoFocus: false,
        enforceFocus: false
      };
      const { baseElement, rerender } = render(<Component {...props} reduceMotion={false} />);
      const wrapper = baseElement.querySelector('[data-testid$="-wrapper"]') as HTMLElement;
      const dialog = baseElement.querySelector('[role="dialog"]') as HTMLElement;
      const removeListener = vi.spyOn(dialog, 'removeEventListener');
      fireEvent.mouseDown(wrapper);
      fireEvent.click(wrapper);
      expect(dialog.className).toContain('shake');
      rerender(<Component {...props} reduceMotion />);
      expect(dialog.className).not.toContain('shake');
      expect(removeListener).toHaveBeenCalled();
      rerender(<Component {...props} reduceMotion={false} />);
      expect(dialog.className).not.toContain('shake');
    });
  }

  it('hydrates the automatic policy without a markup mismatch', async () => {
    const host = document.createElement('div');
    const child = (
      <Bounce in>
        <div />
      </Bounce>
    );
    host.innerHTML = renderToString(child);
    document.body.appendChild(host);
    const error = vi.spyOn(console, 'error');
    error.mockClear();
    let root: Root | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(host, child);
      });
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      expect(host.firstElementChild).to.have.attribute(
        'data-rs-motion',
        reduced ? 'reduce' : 'auto'
      );
      expect(error.mock.calls.some(args => /hydrat|did not match/i.test(String(args[0])))).toBe(
        false
      );
    } finally {
      act(() => root?.unmount());
      host.remove();
    }
  });

  it('uses static reduced-motion CSS with a custom prefix and CSP configuration', () => {
    const customAnimation = (reduceMotion: boolean) => (
      <CustomProvider
        classPrefix="custom"
        reduceMotion={reduceMotion}
        csp={{ nonce: 'motion-nonce' }}
        disableInlineStyles
      >
        <Slide in>
          <div />
        </Slide>
      </CustomProvider>
    );
    const { container, rerender } = render(customAnimation(false));
    const node = container.firstElementChild as HTMLElement;
    expect(node).to.have.class('custom-anim-slide-in');
    expect(node).to.have.attribute('data-rs-motion', 'allow');
    expect(node.hasAttribute('style')).toBe(false);
    expect(getComputedStyle(node).animationName).toBe('reduced-motion-test-enter');
    expect(getComputedStyle(node).animationDuration).toBe('2s');
    expect(getComputedStyle(node).animationDelay).toBe('10s');

    rerender(customAnimation(true));
    expect(node).to.have.attribute('data-rs-motion', 'reduce');
    expect(node.hasAttribute('style')).toBe(false);
    expect(getComputedStyle(node).animationName).toBe('reduced-motion-test-enter');
    expect(getComputedStyle(node).animationDuration).toBe('0s');
    expect(getComputedStyle(node).animationDelay).toBe('0s');
    expect(getComputedStyle(node).transitionDuration).toBe('0s');
  });

  it('keeps an opaque custom Modal animation component and forwards its policy', () => {
    const animation = vi.fn(({ children, reduceMotion }: any) =>
      children({ 'data-custom-policy': String(reduceMotion) }, null)
    );
    const { baseElement } = render(
      <Modal open reduceMotion animation={animation} autoFocus={false} enforceFocus={false} />
    );
    expect(animation).toHaveBeenCalled();
    expect(baseElement.querySelector('[role="dialog"]')).to.have.attribute(
      'data-custom-policy',
      'true'
    );
  });
});
