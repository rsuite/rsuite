import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Message from '../Message';

describe('Message', () => {
  testStandardProps(<Message />);

  it('Should render a Message', () => {
    const instance = getDOMNode(<Message />);
    assert.include(instance.className, 'rs-message');
  });

  it('Should render a title', () => {
    const instance = getDOMNode(<Message header="title" />);
    assert.include(instance.className, 'rs-message-has-title');
    assert.equal(instance.textContent, 'title');
  });

  it('Should render a description', () => {
    const instance = getDOMNode(<Message>description</Message>);
    assert.equal(instance.textContent, 'description');
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
    assert.ok(instance.querySelector('.rs-btn-close'));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Message closable onClose={doneOp} />);
    const closeButton = instance.querySelector('.rs-btn-close');
    ReactTestUtils.Simulate.click(closeButton);
  });
});
