import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Navbar from '../src/Navbar';
import Nav from '../src/Nav';

describe('Navbar', () => {
  it('Should render a navbar', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Navbar />);
    assert.include(findDOMNode(instance).className, 'rs-navbar');
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav>1</Nav>
      </Navbar>
    );
    assert.ok(findDOMNode(instance).querySelector('.rs-nav.rs-navbar-nav'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Navbar className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Navbar style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
