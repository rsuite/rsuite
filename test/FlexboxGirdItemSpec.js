import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FlexboxGirdItem from '../src/FlexboxGirdItem';

describe('FlexboxGirdItem', () => {
  it('Should render a FlexboxGirdItem', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGirdItem>Test</FlexboxGirdItem>);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird-item');
  });

  it('Should be colspan', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGirdItem colspan={1} />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird-item-1');
  });

  it('Should be order', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGirdItem order={1} />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird-item-order-1');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGirdItem className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGirdItem style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
