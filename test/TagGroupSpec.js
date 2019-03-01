import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from './TestWrapper';

import TagGroup from '../src/TagGroup';

describe('TagGroup', () => {
  it('Should output a TagGroup', () => {
    const instance = getDOMNode(<TagGroup />);
    assert.equal(instance.className, 'rs-tag-group');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TagGroup className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TagGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TagGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
