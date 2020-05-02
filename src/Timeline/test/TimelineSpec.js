import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Timeline from '../Timeline';

describe('Timeline', () => {
  it('Should output a Timeline', () => {
    const instance = getDOMNode(<Timeline />);
    assert.ok(instance.className.match(/\brs-timeline\b/));
  });

  it('Should output a div', () => {
    const instance = getDOMNode(<Timeline componentClass={'div'} />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Timeline className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should be endless', () => {
    const instance = getDOMNode(<Timeline endless />);
    assert.ok(instance.className.match(/\bendless\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Timeline style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a with-time className', () => {
    const instance = getDOMNode(
      <Timeline>
        <Timeline.Item time="2018-03-01 16:27:42" />
      </Timeline>
    );
    assert.ok(instance.className.match(/\brs-timeline-with-time\b/));
  });

  it('Should have a custom align', () => {
    const instance = getDOMNode(<Timeline align="left" />);
    assert.ok(instance.className.match(/\brs-timeline-align-left\b/));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Timeline classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
