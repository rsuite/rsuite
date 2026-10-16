import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Timeline, { TimelineProps } from '..';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const center = (rect: DOMRect) => ({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
const close = (actual: number, expected: number) =>
  expect(Math.abs(actual - expected)).toBeLessThan(1);

function geometry(item: HTMLElement) {
  const rect = (part: string) =>
    item.querySelector<HTMLElement>(`.rs-timeline-item-${part}`)!.getBoundingClientRect();
  return {
    item: item.getBoundingClientRect(),
    dot: center(rect('dot')),
    tail: rect('tail'),
    content: rect('content'),
    time: item.querySelector('.rs-timeline-item-time') ? rect('time') : null
  };
}

function Example({ rtl = false, ...props }: TimelineProps & { rtl?: boolean; dir?: string }) {
  return (
    <CustomProvider rtl={rtl}>
      <Timeline horizontal style={{ width: 640 }} {...props}>
        <Timeline.Item time="09:00">Order placed</Timeline.Item>
        <Timeline.Item
          time={
            <>
              Tuesday
              <br />
              10:00
              <br />
              Local time
            </>
          }
          dot={<span style={{ display: 'block', width: 28, height: 32 }}>✓</span>}
        >
          Packed
          <br />
          Ready for collection
          <br />
          Awaiting courier
        </Timeline.Item>
        <Timeline.Item time="11:00">Delivered</Timeline.Item>
      </Timeline>
    </CustomProvider>
  );
}

describe('Horizontal Timeline', () => {
  it('aligns unequal labels and custom dots on one horizontal rail', () => {
    render(<Example />);
    const items = screen.getAllByRole('listitem').map(geometry);
    expect(items[1].dot.x).toBeGreaterThan(items[0].dot.x);
    items.forEach(item => close(item.dot.y, items[0].dot.y));
    items.forEach(item => {
      expect(item.time!.bottom).toBeLessThan(item.dot.y);
      expect(item.content.top).toBeGreaterThan(item.dot.y);
    });
  });

  describe.each(['left', 'right', 'alternate'] as const)('align=%s', align => {
    it.each([false, true])('keeps content and rail aligned with rtl=%s', rtl => {
      render(<Example align={align} rtl={rtl} />);
      const items = screen.getAllByRole('listitem').map(geometry);
      items.forEach((item, index) => {
        close(item.dot.y, items[0].dot.y);
        const above = align === 'right' || (align === 'alternate' && index % 2 === 1);
        if (above) {
          expect(item.content.bottom).toBeLessThan(item.dot.y);
          expect(item.time!.top).toBeGreaterThan(item.dot.y);
        } else {
          expect(item.content.top).toBeGreaterThan(item.dot.y);
          expect(item.time!.bottom).toBeLessThan(item.dot.y);
        }
        if (index < items.length - 1) {
          const next = items[index + 1];
          expect(Math.sign(next.dot.x - item.dot.x)).toBe(rtl ? -1 : 1);
          close(center(item.tail).y, item.dot.y);
          expect(item.tail.height).toBeLessThanOrEqual(2);
          close(rtl ? item.tail.right : item.tail.left, item.dot.x);
          close(rtl ? item.tail.left : item.tail.right, next.dot.x);
        }
      });
      expect(items[2].tail.width).toBe(0);
    });
  });

  describe.each([false, true])('reverse=%s', reverse => {
    it.each([false, true])('extends the logical end with rtl=%s', rtl => {
      render(<Example reverse={reverse} endless rtl={rtl} />);
      const nodes = screen.getAllByRole('listitem');
      const items = nodes.map(geometry);
      const terminal = items[reverse ? 0 : 2];
      expect(nodes[reverse ? 0 : 2]).to.have.class('rs-timeline-item-active');
      close(center(terminal.tail).y, terminal.dot.y);
      expect(terminal.tail.height).toBeLessThanOrEqual(2);
      close(
        reverse === rtl ? terminal.tail.right : terminal.tail.left,
        reverse === rtl ? terminal.item.right : terminal.item.left
      );
      if (reverse) {
        close(rtl ? terminal.tail.left : terminal.tail.right, items[1].dot.x);
        expect(items[2].tail.width).toBe(0);
      } else {
        close(rtl ? terminal.tail.right : terminal.tail.left, terminal.dot.x);
      }
    });
  });

  it.each([false, true])('handles one endless item with reverse=%s', reverse => {
    render(
      <Timeline horizontal endless reverse={reverse} style={{ width: 300 }}>
        <Timeline.Item>Only item</Timeline.Item>
      </Timeline>
    );
    const item = geometry(screen.getByRole('listitem'));
    expect(item.tail.width).toBeGreaterThan(0);
    expect(item.tail.height).toBeLessThanOrEqual(2);
    close(center(item.tail).y, item.dot.y);
    close(reverse ? item.tail.right : item.tail.left, item.dot.x);
    close(reverse ? item.tail.left : item.tail.right, reverse ? item.item.left : item.item.right);
  });

  it('wraps narrow content and missing time labels without shifting the rail', () => {
    render(
      <Timeline horizontal align="alternate" style={{ width: 240, fontSize: 24 }}>
        <Timeline.Item time="09:00">An exceptionally long event description</Timeline.Item>
        <Timeline.Item>Another long event without a timestamp</Timeline.Item>
        <Timeline.Item
          time={
            <>
              Next day
              <br />
              10:30
            </>
          }
        >
          Completed
        </Timeline.Item>
      </Timeline>
    );
    const list = screen.getByRole('list').getBoundingClientRect();
    const items = screen.getAllByRole('listitem').map(geometry);
    items.forEach(item => {
      close(item.dot.y, items[0].dot.y);
      expect(item.content.left).toBeGreaterThanOrEqual(list.left);
      expect(item.content.right).toBeLessThanOrEqual(list.right);
    });
  });

  it('realigns when a label changes height', () => {
    const content = (expanded: boolean) => (
      <Timeline horizontal style={{ width: 400 }}>
        <Timeline.Item
          time={
            expanded ? (
              <>
                Monday
                <br />
                Tuesday
                <br />
                Wednesday
              </>
            ) : (
              'Monday'
            )
          }
        >
          First
        </Timeline.Item>
        <Timeline.Item time="Thursday">Second</Timeline.Item>
      </Timeline>
    );
    const { rerender } = render(content(false));
    const before = geometry(screen.getAllByRole('listitem')[0]).dot.y;
    rerender(content(true));
    const items = screen.getAllByRole('listitem').map(geometry);
    expect(items[0].dot.y).toBeGreaterThan(before);
    close(items[0].dot.y, items[1].dot.y);
  });

  it('inherits a local RTL direction and respects an explicit LTR override', () => {
    const { rerender } = render(
      <div dir="rtl">
        <Example />
      </div>
    );
    let items = screen.getAllByRole('listitem').map(geometry);
    expect(items[0].dot.x).toBeGreaterThan(items[1].dot.x);
    rerender(
      <div dir="rtl">
        <Example dir="ltr" rtl />
      </div>
    );
    items = screen.getAllByRole('listitem').map(geometry);
    expect(items[0].dot.x).toBeLessThan(items[1].dot.x);
  });

  it('retains native list semantics and consumes the horizontal prop', () => {
    const { rerender } = render(<Example />);
    expect(screen.getByRole('list').tagName).toBe('UL');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('list')).not.to.have.attribute('horizontal');
    rerender(
      <Timeline horizontal={false}>
        <Timeline.Item>First</Timeline.Item>
        <Timeline.Item>Second</Timeline.Item>
      </Timeline>
    );
    const items = screen.getAllByRole('listitem').map(geometry);
    close(items[0].dot.x, items[1].dot.x);
    expect(items[1].dot.y).toBeGreaterThan(items[0].dot.y);
  });

  it('allows an instance to override horizontal provider defaults', () => {
    const { rerender } = render(
      <CustomProvider components={{ Timeline: { defaultProps: { horizontal: true } } }}>
        <Timeline>
          <Timeline.Item>First</Timeline.Item>
          <Timeline.Item>Second</Timeline.Item>
        </Timeline>
      </CustomProvider>
    );
    let items = screen.getAllByRole('listitem').map(geometry);
    close(items[0].dot.y, items[1].dot.y);
    expect(items[1].dot.x).toBeGreaterThan(items[0].dot.x);
    rerender(
      <CustomProvider components={{ Timeline: { defaultProps: { horizontal: true } } }}>
        <Timeline horizontal={false}>
          <Timeline.Item>First</Timeline.Item>
          <Timeline.Item>Second</Timeline.Item>
        </Timeline>
      </CustomProvider>
    );
    items = screen.getAllByRole('listitem').map(geometry);
    close(items[0].dot.x, items[1].dot.x);
    expect(items[1].dot.y).toBeGreaterThan(items[0].dot.y);
  });
});
