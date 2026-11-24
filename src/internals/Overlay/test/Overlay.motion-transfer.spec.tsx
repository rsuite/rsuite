import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { commands } from 'vitest/browser';
import Overlay from '../Overlay';
import CustomProvider from '../../../CustomProvider';
import SelectPicker from '../../../SelectPicker';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import '../../../Animation/styles/index.scss';
import '../../../SelectPicker/styles/index.scss';
import '../../../Tooltip/styles/index.scss';

declare module 'vitest/browser' {
  interface BrowserCommands {
    setMotionPreference: (preference: 'reduce' | 'no-preference') => Promise<void>;
  }
}

describe('Overlay motion policy reaches the animated DOM node', () => {
  for (const reduceMotion of [true, false]) {
    it(`forwards provider ${reduceMotion} to a function-rendered picker popup`, () => {
      const entered = vi.fn();
      render(
        <CustomProvider reduceMotion={reduceMotion}>
          <SelectPicker
            data={[{ label: 'Alpha', value: 'a' }]}
            defaultOpen
            responsive={false}
            onEntered={entered}
            popupStyle={{ transition: 'opacity 5s linear' }}
          />
        </CustomProvider>
      );
      const popup = screen.getByTestId('picker-popup');
      expect(getComputedStyle(popup).transitionDuration).toBe(reduceMotion ? '0s' : '5s');
      expect(popup).to.have.attribute('data-rs-motion', reduceMotion ? 'reduce' : 'allow');
      if (reduceMotion) expect(entered).toHaveBeenCalledOnce();
    });

    it(`forwards provider ${reduceMotion} to an element speaker`, () => {
      render(
        <CustomProvider reduceMotion={reduceMotion}>
          <Whisper
            open
            trigger="none"
            speaker={
              <Tooltip
                data-testid="motion-tooltip"
                data-rs-motion="allow"
                style={{ transition: 'opacity 5s linear' }}
              >
                <span data-testid="independent-content" style={{ animation: 'content-motion 5s' }}>
                  Content
                </span>
              </Tooltip>
            }
          >
            <button>Anchor</button>
          </Whisper>
        </CustomProvider>
      );
      const popup = screen.getByTestId('motion-tooltip');
      expect(getComputedStyle(popup).transitionDuration).toBe(reduceMotion ? '0s' : '5s');
      expect(popup).to.have.attribute('data-rs-motion', reduceMotion ? 'reduce' : 'allow');
      expect(getComputedStyle(screen.getByTestId('independent-content')).animationDuration).toBe(
        '5s'
      );
    });
  }

  for (const child of ['picker', 'tooltip'] as const) {
    for (const policy of [undefined, false]) {
      it(`${child} honors ${policy === undefined ? 'the system preference' : 'an explicit override'} across its portal`, async () => {
        let view: ReturnType<typeof render> | undefined;
        try {
          await commands.setMotionPreference('reduce');
          expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
          view = render(
            <CustomProvider reduceMotion={policy}>
              {child === 'picker' ? (
                <SelectPicker
                  data={[{ label: 'Alpha', value: 'a' }]}
                  defaultOpen
                  responsive={false}
                  popupStyle={{ transition: 'opacity 5s linear' }}
                />
              ) : (
                <Whisper
                  open
                  trigger="none"
                  speaker={
                    <Tooltip
                      data-testid="motion-tooltip"
                      style={{ transition: 'opacity 5s linear' }}
                    >
                      Content
                    </Tooltip>
                  }
                >
                  <button>Anchor</button>
                </Whisper>
              )}
            </CustomProvider>
          );
          const popup = screen.getByTestId(child === 'picker' ? 'picker-popup' : 'motion-tooltip');
          expect(popup).to.have.attribute('data-rs-motion', policy === false ? 'allow' : 'reduce');
          expect(getComputedStyle(popup).transitionDuration).toBe(policy === false ? '5s' : '0s');
        } finally {
          view?.unmount();
          await commands.setMotionPreference('no-preference');
        }
      });
    }
  }

  for (const functional of [true, false]) {
    it(`keeps custom animation data on ${functional ? 'function' : 'element'} speakers without exposing private props`, () => {
      const Animation = ({
        children
      }: {
        children: (props: object, ref: null) => React.ReactNode;
      }) => children({ 'data-animation-state': 'entered', internalPhase: 'private' }, null);
      render(
        <Overlay open transition={Animation}>
          {functional ? (
            () => <div data-testid="opaque-speaker" data-animation-state="speaker" />
          ) : (
            <div data-testid="opaque-speaker" data-animation-state="speaker" />
          )}
        </Overlay>
      );
      const popup = screen.getByTestId('opaque-speaker');
      expect(popup).to.have.attribute('data-animation-state', 'entered');
      expect(popup.hasAttribute('internalPhase')).toBe(false);
    });
  }
});
