import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Navbar from '../src/Navbar';
import Nav from '../src/Nav';
import NavbarToggle from '../src/NavbarToggle';
import NavbarCollapse from '../src/NavbarCollapse';

describe('Navbar', () => {

  it('Should render a navbar', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar\b/));
  });

  it('Should have a `inverse` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar inverse />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-inverse\b/));
    assert.ok(!findDOMNode(instance).className.match(/\bnavbar-default\b/));
  });

  it('Should have a `fixed-top` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedTop />
    );
    assert.ok(findDOMNode(instance).className.match(/\bfixed-top\b/));
  });

  it('Should have a `fixed-bottom` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedBottom />
    );
    assert.ok(findDOMNode(instance).className.match(/\bfixed-bottom\b/));
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav>1</Nav>
      </Navbar>
    );
    assert.ok(findDOMNode(instance).querySelector('ul.navbar-nav'));
  });

  it('Should call onToggle callback', (done) => {

    let doneOp = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar onToggle={doneOp}>
        <NavbarToggle>1</NavbarToggle>
      </Navbar>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button'));

  });

  it('Should be expanded', (done) => {
    let doneOp = () => {
      setTimeout(() => {
        if (findDOMNode(instance).querySelector('.navbar-collapse.in')) {
          done();
        }
      }, 1000);

    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar onToggle={doneOp}>
        <NavbarToggle>1</NavbarToggle>
        <NavbarCollapse>1</NavbarCollapse>
      </Navbar>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('button'));

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
