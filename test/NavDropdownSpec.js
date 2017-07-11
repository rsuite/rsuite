import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavDropdown from '../src/NavDropdown';

describe('NavDropdown', () => {

  it('Should render a li', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown>{title}</NavDropdown>
    );
    assert.equal(findDOMNode(instance).tagName, 'LI');
    assert.equal(findDOMNode(instance).innerText, title);
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavDropdown style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
