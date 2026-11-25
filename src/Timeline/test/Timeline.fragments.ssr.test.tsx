import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Timeline from '../Timeline';

describe('Timeline fragments SSR', () => {
  it.each([false, true])('renders logical item state and time layout (reverse=%s)', reverse => {
    const html = renderToString(
      <Timeline reverse={reverse}>
        <>
          <Timeline.Item>First event</Timeline.Item>
          <>
            <Timeline.Item time="09:30">Last event</Timeline.Item>
            <>{false}</>
          </>
        </>
      </Timeline>
    );

    expect(html).toContain('rs-timeline-with-time');
    expect(html.match(/rs-timeline-item-active/g)).toHaveLength(1);
    expect(html.match(/rs-timeline-item-last/g)).toHaveLength(1);
    expect(html.indexOf('First event') < html.indexOf('Last event')).toBe(!reverse);
    expect(html).not.toMatch(/INTERNAL_active|<Fragment/);
  });
});
