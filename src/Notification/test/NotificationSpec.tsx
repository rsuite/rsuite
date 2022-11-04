import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import ReactTestUtils from 'react-dom/test-utils';
import Notification from '../Notification';

describe('Notification', () => {
  testStandardProps(<Notification />);

  it('Should output a notification', () => {
    const instance = getDOMNode(<Notification />);
    assert.ok(instance.className.match(/\brs-notification\b/));
  });

  it('Should render content', () => {
    const instance = getDOMNode(<Notification>text</Notification>);
    assert.equal(instance.textContent, 'text');
  });

  it('Should be closable', () => {
    const instance = getDOMNode(<Notification closable />);

    assert.ok(instance.querySelector('.rs-btn-close'));
  });

  it('Should have a type', () => {
    const instance = getDOMNode(<Notification type="info" header="info" />);
    assert.include(instance.className, 'rs-notification-info');
    assert.ok(instance.querySelector('[aria-label="info"]'));
  });

  it('Should have a header', () => {
    const instance = getDOMNode(<Notification header="header" />);
    assert.equal(
      (instance.querySelector('.rs-notification-title') as HTMLElement).textContent,
      'header'
    );
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Notification closable onClose={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-btn-close') as HTMLElement);
  });

  it('Should call onClose callback by duration', done => {
    const doneOp = () => {
      done();
    };
    getDOMNode(<Notification closable onClose={doneOp} duration={1} />);
  });
});
