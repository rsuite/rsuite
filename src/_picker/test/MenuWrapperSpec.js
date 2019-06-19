import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import MenuWrapper from '../MenuWrapper';
import { getDOMNode } from '../../../test/TestWrapper';

describe('MenuWrapper', () => {
  it('Should render a menu', () => {
    const instance = getDOMNode(<MenuWrapper />);
    assert.ok(instance.className.match(/\bpicker-menu\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MenuWrapper className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MenuWrapper style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MenuWrapper classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
