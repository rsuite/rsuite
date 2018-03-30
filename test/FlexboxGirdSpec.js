import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import FlexboxGird from '../src/FlexboxGird';

describe('FlexboxGird', () => {
  it('Should render a FlexboxGird', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGird>Test</FlexboxGird>);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird');
  });

  it('Should be aligned on the top', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGird align="top" />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird-top');
  });

  it('Should be justify content on the center', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGird justify="center" />);
    assert.include(findDOMNode(instance).className, 'rs-flex-box-gird-center');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGird className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<FlexboxGird style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
