import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Loader from '../Loader';

describe('Loader', () => {
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
    assert.equal(instance.innerText, 'content');
  });

  it('Should have a speed', () => {
    let instance = getDOMNode(<Loader speed="fast" />);
    assert.include(instance.className, 'rs-loader-speed-fast');
  });

  it('Should have a size', () => {
    let instance = getDOMNode(<Loader size="lg" />);
    assert.include(instance.className, 'rs-loader-lg');
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<Loader className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<Loader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Loader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
