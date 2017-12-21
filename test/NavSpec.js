import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Nav from '../src/Nav';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';

describe('Nav', () => {

  it('Should render a ul', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav>{title}</Nav>
    );
    assert.equal(findDOMNode(instance).tagName, 'UL');
    assert.equal(findDOMNode(instance).className, `${globalKey}nav`);
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a `nav-tabs` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav tabs />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnav-tabs\b/));
  });

  it('Should have a `nav-pills` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav pills />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnav-pills\b/));
  });

  it('Should have a `nav-justified` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav justified />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnav-justified\b/));
  });

  it('Should have a `nav-stacked` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav stacked />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnav-stacked\b/));
  });

  it('Should have a `navbar-right` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav pullRight />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-right\b/));
  });

  it('Should have a `navbar-right` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav pullRight />
    );
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-right\b/));
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );
    assert.ok(findDOMNode(instance).children[1].className.match(/\bnav-item-active\b/));
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 }}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 }}>2</Nav.Item>
      </Nav>
    );
    assert.ok(findDOMNode(instance).children[1].className.match(/\bnav-item-active\b/));
  });

  it('Should render a Dropdown', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Dropdown>
          <Nav.Item eventKey={2}>2</Nav.Item>
          <Nav.Item eventKey={3}>3</Nav.Item>
        </Nav.Dropdown>
      </Nav>
    );
    assert.ok(findDOMNode(instance).querySelector(`ul.${globalKey}dropdown-menu`));
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
