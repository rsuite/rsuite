import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Nav from '../src/Nav';
import innerText from './innerText';

describe('Nav', () => {
  it('Should render a nav', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Nav>{title}</Nav>);
    const node = findDOMNode(instance);
    assert.ok(node.className.match(/\bnav\b/));
    assert.equal(innerText(node), title);
  });

  it('Should have a `nav-tabs` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Nav appearance="tabs" />);
    assert.ok(findDOMNode(instance).className.match(/\bnav-tabs\b/));
  });

  it('Should have a `nav-justified` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Nav justified />);
    assert.ok(findDOMNode(instance).className.match(/\bnav-justified\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Nav pullRight />);
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-right\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Nav pullRight />);
    assert.ok(findDOMNode(instance).className.match(/\bnavbar-right\b/));
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    assert.ok(
      findDOMNode(instance)
        .querySelectorAll('li')[1]
        .className.match(/\bnav-item-active\b/)
    );
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 }}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 }}>2</Nav.Item>
      </Nav>
    );
    assert.ok(
      findDOMNode(instance)
        .querySelectorAll('li')[1]
        .className.match(/\bnav-item-active\b/)
    );
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Nav className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Nav style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
