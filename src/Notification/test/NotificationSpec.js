import React from 'react';
import Notification from '../Notification';
import { getDOMNode } from '@test/testUtils';
import ReactTestUtils from 'react-dom/test-utils';

describe('Notification', () => {
  it('Should output a notification', () => {
    const instance = getDOMNode(<Notification />);
    assert.ok(instance.className.match(/\brs-notification\b/));
  });

  it('Should render content', () => {
    const instance = getDOMNode(<Notification>text</Notification>);
    assert.equal(instance.innerText, 'text');
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
    assert.equal(instance.querySelector('.rs-notification-title').innerText, 'header');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Notification className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Notification style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Notification classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Notification closable onClose={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-btn-close'));
  });

  it('Should call onClose callback by duration', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Notification closable onClose={doneOp} duration={1} />);
  });
});
