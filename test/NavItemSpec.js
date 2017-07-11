import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import NavItem from '../src/NavItem';

describe('NavItem', () => {

  it('Should render a li', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem>{title}</NavItem>
    );
    assert.equal(findDOMNode(instance).tagName, 'LI');
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should call onSelect callback', (done) => {
    let key = 'Test';
    let doneOp = (eventKey) => {
      if (eventKey === key) {
        done();
      }
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem onSelect={doneOp} eventKey={key} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
  });

  it('Should call onClick callback', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
  });

  it('Should be active', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem active />
    );
    assert.ok(findDOMNode(instance).className.match(/\bactive\b/));
  });

  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled />
    );
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should not call onSelect callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem onSelect={onHideSpy} disabled />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem onClick={onHideSpy} disabled />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
