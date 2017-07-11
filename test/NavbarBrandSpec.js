import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavbarBrand from '../src/NavbarBrand';

describe('NavbarBrand', () => {

  it('Should render a Brand', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand>{title}</NavbarBrand>
    );
    assert.equal(findDOMNode(instance).tagName, 'SPAN');
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should render a Brand', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand><div>{title}</div></NavbarBrand>
    );
    assert.equal(findDOMNode(instance).tagName, 'DIV');
    assert.equal(findDOMNode(instance).innerText, title);
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarBrand style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
