import React from 'react';
import ToastContainer from '../ToastContainer';
import { getDOMNode } from '@test/utils';

describe('toaster - ToastContainer', () => {
  it('Should output a container', () => {
    const instance = getDOMNode(<ToastContainer />);

    assert.include(instance.className, 'rs-toast-container');
  });

  it('Should output a placement', () => {
    const instance = getDOMNode(<ToastContainer placement="topStart" />);
    assert.include(instance.className, 'rs-toast-container-top-start');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ToastContainer className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ToastContainer style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
