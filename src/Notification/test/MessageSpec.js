import React from 'react';
import Message from '../Message';
import { getDOMNode } from '@test/testUtils';
import ReactTestUtils from 'react-dom/test-utils';

describe('Notification - Message', () => {
  it('Should output a message', () => {
    const instance = getDOMNode(<Message classPrefix="rs" />);
    assert.ok(instance.className.match(/\brs-item-wrapper\b/));
  });

  it('Should render content', () => {
    const instance = getDOMNode(<Message classPrefix="rs" content="text" />);
    assert.equal(instance.innerText, 'text');
  });

  it('Should be closable', () => {
    const instance = getDOMNode(<Message classPrefix="rs" closable />);
    assert.ok(instance.querySelector('.rs-item-close'));
  });

  it('Should have a type', () => {
    const instance = getDOMNode(<Message classPrefix="rs" type="abc" />);
    assert.ok(instance.querySelector('.rs-abc'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Message classPrefix="rs" className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Message classPrefix="rs" style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Message classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Message classPrefix="rs" closable onClose={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-item-close'));
  });

  it('Should call onClose callback by duration', done => {
    const doneOp = () => {
      done();
    };
    getDOMNode(<Message classPrefix="rs" duration={100} onClose={doneOp} />);
  });
});
