import React from 'react';
import { getDOMNode } from '@test/testUtils';
import FlexboxGridItem from '../FlexboxGridItem';
import Col from '../../Col';

describe('FlexboxGridItem', () => {
  it('Should render a FlexboxGridItem', () => {
    const instance = getDOMNode(<FlexboxGridItem>Test</FlexboxGridItem>);
    assert.include(instance.className, 'rs-flex-box-grid-item');
  });

  it('Should be colspan', () => {
    const instance = getDOMNode(<FlexboxGridItem colspan={1} />);
    assert.include(instance.className, 'rs-flex-box-grid-item-1');
  });

  it('Should be order', () => {
    const instance = getDOMNode(<FlexboxGridItem order={1} />);
    assert.include(instance.className, 'rs-flex-box-grid-item-order-1');
  });

  it('Should render a col', () => {
    const instance = getDOMNode(<FlexboxGridItem componentClass={Col} md={1} />);
    assert.include(instance.className, 'rs-col');
    assert.include(instance.className, 'rs-col-md-1');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<FlexboxGridItem className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<FlexboxGridItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FlexboxGridItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
