import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Divider from '../Divider';

describe('Divider', () => {
  it('Should render a Divider', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Divider />);
    const classes = findDOMNode(instance).className;

    assert.include(classes, 'rs-divider');
    assert.include(classes, 'rs-divider-horizontal');
  });

  it('Should be vertical', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Divider vertical />);
    const classes = findDOMNode(instance).className;
    assert.include(classes, 'rs-divider-vertical');
  });

  it('Should hava a children', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Divider>abc</Divider>);
    const classes = findDOMNode(instance).className;
    assert.include(classes, 'rs-divider-with-text');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Divider className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Divider style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Divider classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
