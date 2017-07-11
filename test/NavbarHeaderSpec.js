import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavbarHeader from '../src/NavbarHeader';

describe('NavbarHeader', () => {

  it('Should render a header', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarHeader>{title}</NavbarHeader>
    );
    assert.equal(findDOMNode(instance).tagName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-header\b/));
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarHeader className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarHeader style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
