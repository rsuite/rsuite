import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import InputAutosize from '../InputAutosize';
import Sinon from 'sinon';

describe('InputPicker - InputAutosize', () => {
  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputAutosize className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputAutosize style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<InputAutosize onChange={onChange} />);
    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<InputAutosize placeholder="placeholder" />);

    assert.equal(instance.textContent, 'placeholder');
  });
});
