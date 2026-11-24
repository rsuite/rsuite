import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Timeline from '../Timeline';
import type { TimelineItemProps } from '../TimelineItem';

const getOrder = () => screen.getAllByRole('listitem').map(item => item.dataset.event);

function EventState({ name }: { name: string }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{`${name}: ${count}`}</button>
      <input aria-label={name} defaultValue={name} />
    </>
  );
}

describe('Timeline fragment children', () => {
  it.each([false, true])('applies item props through nested fragments (reverse=%s)', reverse => {
    render(
      <Timeline reverse={reverse} align="right">
        <>
          <Timeline.Item data-event="first">First</Timeline.Item>
          <>
            <Timeline.Item data-event="second" time="09:30">
              Second
            </Timeline.Item>
            <Timeline.Item data-event="third">Third</Timeline.Item>
          </>
        </>
      </Timeline>
    );

    expect(getOrder()).toEqual(
      reverse ? ['third', 'second', 'first'] : ['first', 'second', 'third']
    );
    expect(screen.getByRole('list')).to.have.class('rs-timeline-with-time');
    const items = screen.getAllByRole('listitem');
    expect(items.filter(item => item.classList.contains('rs-timeline-item-active'))).toHaveLength(
      1
    );
    expect(items.find(item => item.dataset.event === 'third')).to.have.class(
      'rs-timeline-item-active'
    );
    expect(items.find(item => item.dataset.event === 'third')).to.have.class(
      'rs-timeline-item-last'
    );
    expect(screen.getByRole('list')).to.have.class('rs-timeline-align-right');
    expect(console.error).not.toHaveBeenCalled();
  });

  it.each([false, true])(
    'counts visible items through arrays and empty fragments (reverse=%s)',
    reverse => {
      const isItemActive = vi.fn((index: number) => index === 1);

      render(
        <Timeline reverse={reverse} isItemActive={isItemActive}>
          {null}
          <React.Fragment key="empty" />
          {false}
          <React.Fragment key="group">
            <Timeline.Item data-event="first">First</Timeline.Item>
            {[
              null,
              <React.Fragment key="nested">
                {undefined}
                <Timeline.Item data-event="second">Second</Timeline.Item>
                <>{false}</>
              </React.Fragment>
            ]}
          </React.Fragment>
          <Timeline.Item data-event="third">Third</Timeline.Item>
        </Timeline>
      );

      expect(isItemActive.mock.calls).toEqual(
        reverse
          ? [
              [2, 3],
              [1, 3],
              [0, 3]
            ]
          : [
              [0, 3],
              [1, 3],
              [2, 3]
            ]
      );
      const active = screen
        .getAllByRole('listitem')
        .filter(item => item.classList.contains('rs-timeline-item-active'));
      expect(active).toHaveLength(1);
      expect(active[0].dataset.event).toBe('second');
    }
  );

  it('updates the active item and time layout when a conditional fragment disappears', () => {
    const Example = ({ show }: { show: boolean }) => (
      <Timeline>
        <Timeline.Item data-testid="first">First</Timeline.Item>
        <>
          {show && (
            <>
              <Timeline.Item time="09:30">Second</Timeline.Item>
              <Timeline.Item>Third</Timeline.Item>
            </>
          )}
        </>
      </Timeline>
    );
    const { rerender } = render(<Example show />);

    expect(screen.getByRole('list')).to.have.class('rs-timeline-with-time');
    expect(screen.getByText('Third').closest('li')).to.have.class('rs-timeline-item-active');
    rerender(<Example show={false} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('list')).not.to.have.class('rs-timeline-with-time');
    expect(screen.getByTestId('first')).to.have.class('rs-timeline-item-active');
    expect(screen.getByTestId('first')).to.have.class('rs-timeline-item-last');
  });

  it('does not count a zero returned by a conditional item expression', () => {
    const pending: string[] = [];
    const isItemActive = vi.fn(() => true);
    render(
      <Timeline isItemActive={isItemActive}>
        <>
          {pending.length && <Timeline.Item>Pending</Timeline.Item>}
          <Timeline.Item>Completed</Timeline.Item>
        </>
      </Timeline>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(isItemActive).toHaveBeenCalledExactlyOnceWith(0, 1);
    expect(screen.getByRole('listitem')).to.have.class('rs-timeline-item-active');
  });

  it('preserves state, DOM nodes and refs when reversing fragment items', () => {
    const firstRef = React.createRef<HTMLLIElement>();
    const Example = ({ reverse }: { reverse: boolean }) => (
      <Timeline reverse={reverse}>
        <>
          <Timeline.Item as="li" key="first" ref={firstRef} data-event="first">
            <EventState name="First" />
          </Timeline.Item>
          <>
            <Timeline.Item key="second" data-event="second">
              <EventState name="Second" />
            </Timeline.Item>
          </>
        </>
      </Timeline>
    );
    const { rerender } = render(<Example reverse={false} />);
    const first = firstRef.current;
    const input = screen.getByRole('textbox', { name: 'First' });
    fireEvent.change(input, { target: { value: 'Edited' } });
    fireEvent.click(screen.getByRole('button', { name: 'First: 0' }));

    rerender(<Example reverse />);
    expect(getOrder()).toEqual(['second', 'first']);
    expect(firstRef.current).toBe(first);
    expect(screen.getByRole('textbox', { name: 'First' })).toBe(input);
    expect(input).toHaveValue('Edited');
    expect(screen.getByRole('button', { name: 'First: 1' })).toBeInTheDocument();

    rerender(<Example reverse={false} />);
    expect(getOrder()).toEqual(['first', 'second']);
    expect(firstRef.current).toBe(first);
    expect(screen.getByRole('textbox', { name: 'First' })).toBe(input);
    expect(input).toHaveValue('Edited');
  });

  it.each([
    [
      ['first', 'event'],
      ['second', 'event']
    ],
    [
      ['a/.$b', 'c'],
      ['a', 'b/.$c']
    ]
  ])('keeps keyed fragment groups independent when reordered (%j)', (...groups) => {
    const Example = ({ swap }: { swap: boolean }) => (
      <Timeline>
        {(swap ? [...groups].reverse() : groups).map(([group, key]) => (
          <React.Fragment key={group}>
            <Timeline.Item key={key} data-event={group}>
              <EventState name={group} />
            </Timeline.Item>
          </React.Fragment>
        ))}
      </Timeline>
    );
    const firstName = groups[0][0];
    const { rerender } = render(<Example swap={false} />);
    const input = screen.getByRole('textbox', { name: firstName });
    fireEvent.change(input, { target: { value: 'Edited' } });
    fireEvent.click(screen.getByRole('button', { name: `${firstName}: 0` }));

    rerender(<Example swap />);
    expect(getOrder()).toEqual(groups.map(([group]) => group).reverse());
    expect(screen.getByRole('textbox', { name: firstName })).toBe(input);
    expect(input).toHaveValue('Edited');
    expect(screen.getByRole('button', { name: `${firstName}: 1` })).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.to.have.class('rs-timeline-item-active');
    expect(items[1]).to.have.class('rs-timeline-item-active');
  });

  it('does not unwrap fragments inside an item or invoke custom item components', () => {
    const CustomItem = (props: TimelineItemProps) => {
      const [label] = useState('Custom item');
      return <Timeline.Item {...props}>{label}</Timeline.Item>;
    };
    render(
      <Timeline>
        <>
          <Timeline.Item>
            <>Item content</>
          </Timeline.Item>
          <CustomItem time="09:30" />
        </>
      </Timeline>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Custom item').closest('li')).to.have.class('rs-timeline-item-active');
    expect(screen.getByRole('list')).to.have.class('rs-timeline-with-time');
  });
});
