import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Loader from '../Loader';

describe('Loader', () => {
  testStandardProps(<Loader />);

  it('Should render a Loader', () => {
    let instance = getDOMNode(<Loader />);
    assert.include(instance.className, 'rs-loader');
  });

  it('Should be center', () => {
    let instance = getDOMNode(<Loader center />);
    assert.include(instance.className, 'rs-loader-center');
  });

  it('Should be inverse', () => {
    let instance = getDOMNode(<Loader inverse />);
    assert.include(instance.className, 'rs-loader-inverse');
  });

  it('Should have a backdrop', () => {
    let instance = getDOMNode(<Loader backdrop />);
    assert.include(instance.className, 'rs-loader-backdrop');
  });

  it('Should have content', () => {
    let instance = getDOMNode(<Loader content="content" />);
    assert.equal(instance.textContent, 'content');
  });

  it('Should have a speed', () => {
    let instance = getDOMNode(<Loader speed="fast" />);
    assert.include(instance.className, 'rs-loader-speed-fast');
  });

  it('Should have a size', () => {
    let instance = getDOMNode(<Loader size="lg" />);
    assert.include(instance.className, 'rs-loader-lg');
  });
});
