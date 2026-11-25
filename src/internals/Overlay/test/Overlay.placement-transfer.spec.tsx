import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomProvider from '../../../CustomProvider';
import Whisper from '../../../Whisper';
import Tooltip from '../../../Tooltip';
import SelectPicker from '../../../SelectPicker';
import Popover from '../../../Popover';
import '../../../Tooltip/styles/index.scss';
import '../../../Popover/styles/index.scss';
import '../../../SelectPicker/styles/index.scss';

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

describe('Overlay direction across portals', () => {
  const triggerStyle = { position: 'absolute', left: 300, top: 100, width: 120 } as const;
  const popupStyle = { width: 220 };
  const options = [{ label: 'First option', value: 1 }];

  const expectEdges = (anchor: HTMLElement, popup: HTMLElement, direction: 'ltr' | 'rtl') => {
    const edge = direction === 'rtl' ? 'right' : 'left';
    expect(getComputedStyle(popup).direction).toBe(direction);
    expect(popup.getBoundingClientRect()[edge]).toBeCloseTo(
      anchor.getBoundingClientRect()[edge],
      0
    );
  };

  it('updates the direction and position of an open picker listbox rendered in the body', () => {
    const content = (direction: 'ltr' | 'rtl') => (
      <section dir={direction}>
        <CustomProvider rtl={direction === 'rtl'} reduceMotion>
          <SelectPicker
            aria-label="Options"
            defaultOpen
            placement="bottomStart"
            preventOverflow={false}
            responsive={false}
            popupAutoWidth={false}
            popupStyle={popupStyle}
            style={triggerStyle}
            data={options}
          />
        </CustomProvider>
      </section>
    );

    const view = render(content('rtl'));
    const popup = screen.getByTestId('picker-popup');
    const anchor = screen.getByTestId('picker');
    expect(popup.parentElement).toBe(document.body);
    expectEdges(anchor, popup, 'rtl');

    view.rerender(content('ltr'));
    expect(screen.getByTestId('picker-popup')).toBe(popup);
    expectEdges(anchor, popup, 'ltr');
  });

  it('updates the portaled popover when an open scope switches direction', () => {
    const content = (direction: 'ltr' | 'rtl') => (
      <section dir={direction}>
        <CustomProvider rtl={direction === 'rtl'} reduceMotion>
          <Whisper
            open
            trigger="none"
            placement="bottomStart"
            preventOverflow={false}
            speaker={<Popover style={popupStyle}>Content</Popover>}
          >
            <button style={triggerStyle}>Anchor</button>
          </Whisper>
        </CustomProvider>
      </section>
    );
    const view = render(content('rtl'));
    const anchor = screen.getByRole('button', { name: 'Anchor' });
    const popup = screen.getByRole('dialog');
    expect(popup.parentElement).toBe(document.body);
    expectEdges(anchor, popup, 'rtl');

    view.rerender(content('ltr'));
    expect(screen.getByRole('dialog')).toBe(popup);
    expectEdges(anchor, popup, 'ltr');
  });

  it('preserves an explicit direction on a custom speaker', () => {
    render(
      <section dir="rtl">
        <CustomProvider rtl reduceMotion>
          <Whisper
            open
            trigger="none"
            placement="bottomStart"
            speaker={({ left, top }, ref) => (
              <div role="status" dir="ltr" ref={ref} style={{ position: 'absolute', left, top }}>
                Content
              </div>
            )}
          >
            <button style={triggerStyle}>Anchor</button>
          </Whisper>
        </CustomProvider>
      </section>
    );
    expect(screen.getByRole('status')).toHaveAttribute('dir', 'ltr');
  });

  it.each(['left', 'right'] as const)(
    'keeps the popover arrow on the side beside a %s-positioned RTL trigger',
    placement => {
      render(
        <section dir="rtl">
          <CustomProvider rtl reduceMotion>
            <Whisper open trigger="none" placement={placement} speaker={<Popover>Content</Popover>}>
              <button style={triggerStyle}>Anchor</button>
            </Whisper>
          </CustomProvider>
        </section>
      );
      const popup = screen.getByRole('dialog');
      const arrow = popup.querySelector('.rs-popover-arrow')!;
      const side = popup.dataset.placement === 'left' ? 'right' : 'left';

      expect(getComputedStyle(arrow)[side]).toBe('-6px');
    }
  );
});
