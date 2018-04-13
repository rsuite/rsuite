import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import InputNumber from '../src/InputNumber';
import { getDOMNode, getInstance } from './TestWrapper';

describe('InputNumber', () => {
  it('Should render a input', () => {
    const domNode = getDOMNode(<InputNumber />);
    assert.include(domNode.className, 'rs-input-number');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(<InputNumber disabled />);
    assert.include(domNode.className, 'rs-input-group-disabled');
  });

  it('Should set size', () => {
    const instance = getDOMNode(<InputNumber size="lg" />);
    assert.include(instance.className, 'rs-input-group-lg');
  });

  it('Should be disabled of down button', () => {
    const instance = getDOMNode(<InputNumber min={10} value={10} />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-down.rs-btn-disabled'));
  });

  it('Should be disabled of up button', () => {
    const instance = getDOMNode(<InputNumber max={10} value={10} />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-disabled'));
  });

  it('Should render a prefix', () => {
    const instance = getDOMNode(<InputNumber prefix={<i />} />);
    assert.ok(instance.querySelector('.rs-input-group-addon i'));
  });

  it('Should render a postfix', () => {
    const instance = getDOMNode(<InputNumber postfix={<i />} />);
    assert.ok(instance.querySelector('.rs-input-group-addon i'));
  });

  it('Should call onChange callback when click up button', done => {
    const doneOp = checked => {
      if (checked) {
        done();
      }
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-up'));
  });

  it('Should call onChange callback when click down button', done => {
    const doneOp = checked => {
      if (checked) {
        done();
      }
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-down'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputNumber className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputNumber style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
