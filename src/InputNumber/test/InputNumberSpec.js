import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import InputNumber from '../InputNumber';
import { getDOMNode } from '@test/testUtils';

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

  it('Should output a subtle button', () => {
    const instance = getDOMNode(<InputNumber />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-subtle'));
  });

  it('Should render placeholder in input', () => {
    const instance = getDOMNode(<InputNumber placeholder="abc" />);
    assert.equal(instance.querySelector('input').placeholder, 'abc');
  });

  it('Should output a link button', () => {
    const instance = getDOMNode(<InputNumber buttonAppearance="link" />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-link'));
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
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-up'));
  });

  it('Should call onChange callback when click down button', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-down'));
  });

  it('Should return min value  when click up button', done => {
    const doneOp = value => {
      if (value === '10') {
        done();
      }
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} min={10} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-up'));
  });

  it('Should return max value  when click up button', done => {
    const doneOp = value => {
      if (value === '10') {
        done();
      }
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} defaultValue={100} max={10} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-down'));
  });

  it('Should call onChange callback when onblur', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onChange={doneOp} />);
    const input = instance.querySelector('.rs-input');
    input.value = 2;
    ReactTestUtils.Simulate.blur(input);
  });

  it('Should call onChange callback when is control component', () => {
    const onChnageSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChnageSpy} value={2} />);
    const input = instance.querySelector('.rs-input');
    ReactTestUtils.Simulate.change(input);
    assert.ok(onChnageSpy.calledOnce);
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnageSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChnageSpy} />);
    const input = instance.querySelector('.rs-input');
    ReactTestUtils.Simulate.change(input);

    assert.ok(onChnageSpy.calledOnce);
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('.rs-input'));
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('.rs-input'));
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

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputNumber classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
