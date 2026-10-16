import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Timeline from '..';
import CustomProvider from '../../CustomProvider';

describe('Timeline server rendering', () => {
  it.each([false, true])('renders horizontal items in logical order with reverse=%s', reverse => {
    const html = renderToString(
      <Timeline horizontal reverse={reverse} endless>
        <Timeline.Item time="09:00">First event</Timeline.Item>
        <Timeline.Item time="10:00">Second event</Timeline.Item>
      </Timeline>
    );
    expect(html).toContain('<ul class="rs-timeline');
    expect(html).toContain('rs-timeline-horizontal');
    expect(html.match(/<li /g)).toHaveLength(2);
    expect(html.indexOf('First event') < html.indexOf('Second event')).toBe(!reverse);
    expect(html).not.toMatch(/ horizontal=/);
    expect(html.match(/rs-timeline-item-active/g)).toHaveLength(1);
  });

  it('applies RTL and horizontal provider defaults on the server', () => {
    const html = renderToString(
      <CustomProvider rtl components={{ Timeline: { defaultProps: { horizontal: true } } }}>
        <Timeline>
          <Timeline.Item>Event</Timeline.Item>
        </Timeline>
      </CustomProvider>
    );
    expect(html).toContain('rs-timeline-horizontal');
    expect(html).toContain('dir="rtl"');
  });
});
