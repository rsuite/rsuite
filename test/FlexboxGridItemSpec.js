import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FlexboxGridItem from '../src/FlexboxGridItem';

describe('FlexboxGridItem', () => {
  it('Should render a FlexboxGridItem', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGridItem>Test</FlexboxGridItem>);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid-item');
  });

  it('Should be colspan', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGridItem colspan={1} />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid-item-1');
  });

  it('Should be order', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGridItem order={1} />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid-item-order-1');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGridItem className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGridItem style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <FlexboxGridItem classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
