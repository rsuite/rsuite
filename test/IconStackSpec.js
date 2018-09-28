import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import IconStack from '../src/IconStack';
import { getDOMNode } from './TestWrapper';

describe('IconStack', () => {
  it('Should render a span', () => {
    const instance = getDOMNode(<IconStack />);
    assert.equal(instance.tagName, 'SPAN');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <IconStack className="custom">
        <span />
      </IconStack>
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <IconStack style={{ fontSize }}>
        <span />
      </IconStack>
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<IconStack classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
