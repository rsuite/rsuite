import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomProvider from '../../../CustomProvider';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import '../../../Tooltip/styles/index.scss';

describe('Overlay initial placement metadata', () => {
  const cases = [
    { placement: 'bottomStart', attribute: 'bottom-start', margin: 'marginTop', value: '8px' },
    { placement: 'topEnd', attribute: 'top-end', margin: 'marginTop', value: '-8px' },
    { placement: 'left', attribute: 'left', margin: 'marginLeft', value: '-8px' },
    { placement: 'right', attribute: 'right', margin: 'marginLeft', value: '8px' }
  ] as const;

  for (const { placement, attribute, margin, value } of cases) {
    it(`applies ${attribute} arrow spacing before observer delivery`, () => {
      render(
        <CustomProvider reduceMotion>
          <Whisper
            open
            trigger="none"
            placement={placement}
            speaker={<Tooltip data-testid="placement-tooltip">Content</Tooltip>}
          >
            <button>Anchor</button>
          </Whisper>
        </CustomProvider>
      );

      // Synchronous rendering flushes positioning effects, without yielding to ResizeObserver.
      const popup = screen.getByTestId('placement-tooltip');
      expect(popup).to.have.attribute('data-placement', attribute);
      expect(getComputedStyle(popup)[margin]).toBe(value);
    });
  }

  it('positions the speaker before reduced-motion entry completes', () => {
    const anchor = React.createRef<HTMLButtonElement>();
    const entered: Array<{ left: number; top: number; placement?: string }> = [];
    render(
      <CustomProvider reduceMotion>
        <Whisper
          open
          trigger="none"
          placement="bottomStart"
          onEntered={node => {
            const target = anchor.current!.getBoundingClientRect();
            const popup = node.getBoundingClientRect();
            entered.push({
              left: popup.left - target.left,
              top: popup.top - target.bottom,
              placement: node.dataset.placement
            });
          }}
          speaker={<Tooltip>Content</Tooltip>}
        >
          <button ref={anchor} style={{ marginLeft: 120, marginTop: 70, width: 100, height: 28 }}>
            Anchor
          </button>
        </Whisper>
      </CustomProvider>
    );
    expect(entered).toEqual([{ left: 0, top: 10, placement: 'bottom-start' }]);
  });

  it('updates arrow spacing when the placement changes', () => {
    const content = (placement: 'bottomStart' | 'leftStart') => (
      <CustomProvider reduceMotion>
        <Whisper
          open
          trigger="none"
          placement={placement}
          speaker={<Tooltip data-testid="placement-tooltip">Content</Tooltip>}
        >
          <button>Anchor</button>
        </Whisper>
      </CustomProvider>
    );
    const view = render(content('bottomStart'));
    const popup = screen.getByTestId('placement-tooltip');
    expect(getComputedStyle(popup).marginTop).toBe('8px');
    view.rerender(content('leftStart'));
    expect(popup).to.have.attribute('data-placement', 'left-start');
    expect(getComputedStyle(popup).marginTop).toBe('0px');
    expect(getComputedStyle(popup).marginLeft).toBe('-8px');
  });
});
