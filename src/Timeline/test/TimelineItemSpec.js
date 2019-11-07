import React from 'react';
import { getDOMNode, innerText } from '@test/testUtils';

import TimelineItem from '../TimelineItem';

describe('TimelineItem', () => {
  it('Should output a TimelineItem', () => {
    const instance = getDOMNode(<TimelineItem />);
    assert.equal(instance.className, 'rs-timeline-item');
    assert.ok(instance.querySelector('.rs-timeline-item-dot'));
    assert.ok(instance.querySelector('.rs-timeline-item-tail'));
  });

  it('Should render a dot', () => {
    const instance = getDOMNode(<TimelineItem dot={<i>test</i>} />);
    assert.equal(innerText(instance.querySelector('.rs-timeline-item-custom-dot')), 'test');
  });

  it('Should render a time', () => {
    const time = '2019-10-21';
    const instance = getDOMNode(<TimelineItem time={time} />);
    assert.equal(innerText(instance.querySelector('.rs-timeline-item-time')), time);
  });

  it('Should output the last item', () => {
    const instance = getDOMNode(<TimelineItem last />);
    assert.ok(instance.className.match(/\brs-timeline-item-last\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TimelineItem className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TimelineItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TimelineItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
