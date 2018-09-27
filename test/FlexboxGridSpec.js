import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FlexboxGrid from '../src/FlexboxGrid';

describe('FlexboxGrid', () => {
  it('Should render a FlexboxGrid', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid>Test</FlexboxGrid>);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid');
  });

  it('Should be aligned on the top', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid align="top" />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid-top');
  });

  it('Should be justify content on the center', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid justify="center" />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-grid-center');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGrid classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
