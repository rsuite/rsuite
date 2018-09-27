import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Header from '../src/Header';
import innerText from './innerText';

describe('Header', () => {
  it('Should render a Header', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Header>{title}</Header>);
    assert.include(findDOMNode(instance).className, 'rs-header');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Header className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Header style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Header classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
