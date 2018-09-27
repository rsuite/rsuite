import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import NavbarHeader from '../src/NavbarHeader';
import innerText from './innerText';

describe('NavbarHeader', () => {
  it('Should render a header', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(<NavbarHeader>{title}</NavbarHeader>);
    assert.equal(findDOMNode(instance).tagName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-header\b/));
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(<NavbarHeader className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(<NavbarHeader style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <NavbarHeader classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
