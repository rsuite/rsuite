import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Message from '../Message';

describe('Message', () => {
  it('Should render a Message', () => {
    const instance = getDOMNode(<Message />);
    assert.include(instance.className, 'rs-message');
  });

  it('Should render a title', () => {
    const instance = getDOMNode(<Message title="title" />);
    assert.include(instance.className, 'rs-message-has-title');
    assert.equal(instance.innerText, 'title');
  });

  it('Should render a description', () => {
    const instance = getDOMNode(<Message description="description" />);
    assert.equal(instance.innerText, 'description');
  });

  it('Should have a type', () => {
    const instance = getDOMNode(<Message type="info" />);
    assert.include(instance.className, 'rs-message-info');
  });

  it('Should display icon', () => {
    const instance = getDOMNode(<Message showIcon type="info" />);
    assert.ok(instance.querySelector('.rs-icon'));
    assert.include(instance.className, 'rs-message-has-icon');
  });

  it('Should be full', () => {
    const instance = getDOMNode(<Message full />);
    assert.include(instance.className, 'rs-message-full');
  });

  it('Should be closable', () => {
    const instance = getDOMNode(<Message closable />);
    assert.ok(instance.querySelector('.rs-message-btn-close'));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Message closable onClose={doneOp} />);
    const closeButton = instance.querySelector('.rs-message-btn-close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Message className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Message style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Message classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
