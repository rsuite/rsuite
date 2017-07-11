import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavbarCollapse from '../src/NavbarCollapse';

describe('NavbarCollapse', () => {

  it('Should render a collapse', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarCollapse>{title}</NavbarCollapse>
    );
    assert.equal(findDOMNode(instance).tagName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-collapse\b/));
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarCollapse className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavbarCollapse style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
