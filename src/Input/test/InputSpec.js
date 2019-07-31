import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Input from '../Input';

describe('Input', () => {
  it('Should render a input', () => {
    const domNode = getDOMNode(<Input />);
    assert.include(domNode.className, 'rs-input');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(<Input disabled />);
    assert.ok(domNode.disabled);
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onChange={doneOp} />);
    ReactTestUtils.Simulate.change(instance);
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onKeyDown={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance);
  });

  it('Should call onPressEnter callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onPressEnter={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should set size', () => {
    const instance = getDOMNode(<Input size="lg" />);
    assert.include(instance.className, 'rs-input-lg');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Input className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Input style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Input classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
