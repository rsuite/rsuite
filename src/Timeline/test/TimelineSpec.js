import React from 'react';
import { getDOMNode, innerText } from '@test/testUtils';

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

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Timeline classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
