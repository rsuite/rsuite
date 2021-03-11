import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { innerText, getDOMNode } from '@test/testUtils';

import Nav from '../Nav';

describe('Nav', () => {
  it('Should render a nav', () => {
    const title = 'Test';
    const instance = getDOMNode(<Nav>{title}</Nav>);
    const node = instance;
    assert.ok(node.className.match(/\bnav\b/));
    assert.equal(innerText(node), title);
  });

  it('Should have a `nav-tabs` className', () => {
    const instance = getDOMNode(<Nav appearance="tabs" />);
    assert.ok(instance.className.match(/\bnav-tabs\b/));
  });

  it('Should have a `nav-justified` className', () => {
    const instance = getDOMNode(<Nav justified />);
    assert.ok(instance.className.match(/\bnav-justified\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = getDOMNode(<Nav pullRight />);
    assert.ok(instance.className.match(/\bnavbar-right\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = getDOMNode(<Nav pullRight />);
    assert.ok(instance.className.match(/\bnavbar-right\b/));
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    const instance = getDOMNode(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    assert.ok(instance.querySelectorAll('li')[1].className.match(/\bnav-item-active\b/));
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    const instance = getDOMNode(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 }}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 }}>2</Nav.Item>
      </Nav>
    );
    assert.ok(instance.querySelectorAll('li')[1].className.match(/\bnav-item-active\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Nav className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Nav style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Nav classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = getDOMNode(
      <Nav onSelect={doneOp}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-nav-item a')[1]);
  });

  it('Should call onSelect callback on Nav.Item', done => {
    const doneOp = eventKey => {
      if (eventKey === 2) {
        done();
      }
    };
    const instance = getDOMNode(
      <Nav>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2} onSelect={doneOp}>
          2
        </Nav.Item>
      </Nav>
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-nav-item a')[1]);
  });
});
