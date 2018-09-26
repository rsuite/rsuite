import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Message from '../src/Message';

describe('Message', () => {
  it('Should render a Message', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message />);
    assert.include(findDOMNode(instance).className, 'rs-message');
  });

  it('Should render a title', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message title="title" />);
    assert.include(findDOMNode(instance).className, 'rs-message-has-title');
    assert.equal(findDOMNode(instance).innerText, 'title');
  });

  it('Should render a description', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message description="description" />);
    assert.equal(findDOMNode(instance).innerText, 'description');
  });

  it('Should have a type', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message type="info" />);
    assert.include(findDOMNode(instance).className, 'rs-message-info');
  });

  it('Should display icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message showIcon type="info" />);
    assert.ok(findDOMNode(instance).querySelector('.rs-icon'));
    assert.include(findDOMNode(instance).className, 'rs-message-has-icon');
  });

  it('Should be full', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message full />);
    assert.include(findDOMNode(instance).className, 'rs-message-full');
  });

  it('Should be closable', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message closable />);
    assert.ok(findDOMNode(instance).querySelector('.rs-message-btn-close'));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<Message closable onClose={doneOp} />);
    const closeButton = findDOMNode(instance).querySelector('.rs-message-btn-close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Message style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Message classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
