import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import TimelineItem from '../TimelineItem';

describe('TimelineItem', () => {
  testStandardProps(<TimelineItem />);

  it('Should output a TimelineItem', () => {
    const instance = getDOMNode(<TimelineItem />);
    assert.equal(instance.className, 'rs-timeline-item');
    assert.ok(instance.querySelector('.rs-timeline-item-dot'));
    assert.ok(instance.querySelector('.rs-timeline-item-tail'));
  });

  it('Should render a dot', () => {
    const instance = getDOMNode(<TimelineItem dot={<i>test</i>} />);
    assert.equal(
      (instance.querySelector('.rs-timeline-item-custom-dot') as HTMLElement).textContent,
      'test'
    );
  });

  it('Should render a time', () => {
    const time = '2019-10-21';
    const instance = getDOMNode(<TimelineItem time={time} />);
    assert.equal(
      (instance.querySelector('.rs-timeline-item-time') as HTMLElement).textContent,
      time
    );
  });

  it('Should output the last item', () => {
    const instance = getDOMNode(<TimelineItem last />);
    assert.ok(instance.className.match(/\brs-timeline-item-last\b/));
  });
});
