import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FlexboxGridItem from '../FlexboxGridItem';
import Col from '../../Col';

describe('FlexboxGridItem', () => {
  testStandardProps(<FlexboxGridItem />);

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
    const instance = getDOMNode(<FlexboxGridItem as={Col} md={1} />);
    assert.include(instance.className, 'rs-col');
    assert.include(instance.className, 'rs-col-md-1');
  });
});
