import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FlexboxGrid from '../FlexboxGrid';

describe('FlexboxGrid', () => {
  testStandardProps(<FlexboxGrid />);

  it('Should render a FlexboxGrid', () => {
    const instance = getDOMNode(<FlexboxGrid>Test</FlexboxGrid>);
    assert.include(instance.className, 'rs-flex-box-grid');
  });

  it('Should be aligned on the top', () => {
    const instance = getDOMNode(<FlexboxGrid align="top" />);
    assert.include(instance.className, 'rs-flex-box-grid-top');
  });

  it('Should be justify content on the center', () => {
    const instance = getDOMNode(<FlexboxGrid justify="center" />);
    assert.include(instance.className, 'rs-flex-box-grid-center');
  });
});
