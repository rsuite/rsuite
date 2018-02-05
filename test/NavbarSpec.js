import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Navbar from '../src/Navbar';
import Nav from '../src/Nav';

import { globalKey } from '../src/utils/prefix';

describe('Navbar', () => {

  it('Should render a navbar', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar\b/));
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav>1</Nav>
      </Navbar>
    );
    assert.ok(findDOMNode(instance).querySelector(`.nav.${globalKey}navbar-nav`));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
