import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Sidenav from '../src/Sidenav';
import Nav from '../src/Nav';
import Dropdown from '../src/Dropdown';

describe('Sidenav', () => {
  it('Should render a navigation', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav />);
    assert.include(findDOMNode(instance).className, 'rs-sidenav');
  });

  it('Should apply appearance', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav appearance="subtle" />);
    assert.include(findDOMNode(instance).className, 'rs-sidenav-subtle');
  });

  it('Should be expanded', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav expanded />);
    assert.include(findDOMNode(instance).className, 'rs-sidenav-collapse-in');
  });

  it('Should call onSelect callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Sidenav onSelect={doneOp}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
        </Nav>
      </Sidenav>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-nav-item-content'));
  });

  it('Should call onOpenChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Sidenav onOpenChange={doneOp}>
        <Nav>
          <Nav.Item eventKey="1">a</Nav.Item>
          <Nav.Item eventKey="2">b</Nav.Item>
          <Dropdown eventKey="3" title="3">
            <Dropdown.Item eventKey="3-1">3-1</Dropdown.Item>
            <Dropdown.Item eventKey="3-2">3-2</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-dropdown-toggle'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidenav classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

});
