import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavbarToggle from '../src/NavbarToggle';

describe('NavbarToggle', () => {

  it('Should render a button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarToggle />
    );
    assert.equal(findDOMNode(instance).tagName, 'BUTTON');
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-toggle\b/));
  });

  it('Should render a div', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarToggle><div>{title}</div></NavbarToggle>
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-toggle\b/));
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarToggle className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarToggle style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
