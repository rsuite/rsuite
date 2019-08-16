import React from 'react';
import { getDOMNode } from '@test/testUtils';
import FlexboxGrid from '../FlexboxGrid';

describe('FlexboxGrid', () => {
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

  it('Should have a custom className', () => {
    const instance = getDOMNode(<FlexboxGrid className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<FlexboxGrid style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FlexboxGrid classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
