import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Timeline from '../Timeline';

describe('Timeline', () => {
  it('Should output a Timeline', () => {
    const instance = getDOMNode(<Timeline />);
    assert.equal(instance.className, 'rs-timeline');
  });

  it('Should output a div', () => {
    const instance = getDOMNode(<Timeline componentClass={'div'} />);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Timeline className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Timeline style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom width and custom style', () => {
    const fontSize = '12px';
    const timeWidth = 200;
    const instance = getDOMNode(<Timeline timeWidth={timeWidth} style={{ fontSize }}></Timeline>);
    assert.equal(instance.style.fontSize, fontSize);
    assert.equal(instance.style.paddingLeft, `${timeWidth + 12}px`);
  });

  it('Should have a custom mode', () => {
    const instance = getDOMNode(<Timeline mode="left" />);
    assert.ok(instance.className.match(/\brs-timeline-mode-left\b/));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Timeline classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
