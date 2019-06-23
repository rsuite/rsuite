import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Loader from '../src/Loader';

describe('Loader', () => {
  it('Should render a Loader', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader />);
    assert.include(findDOMNode(instance).className, 'rs-loader');
  });

  it('Should be center', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader center />);
    assert.include(findDOMNode(instance).className, 'rs-loader-center');
  });

  it('Should be inverse', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader inverse />);
    assert.include(findDOMNode(instance).className, 'rs-loader-inverse');
  });

  it('Should have a backdrop', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader backdrop />);
    assert.include(findDOMNode(instance).className, 'rs-loader-backdrop');
  });

  it('Should have content', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader content="content" />);
    assert.equal(findDOMNode(instance).innerText, 'content');
  });

  it('Should have a speed', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader speed="fast" />);
    assert.include(findDOMNode(instance).className, 'rs-loader-speed-fast');
  });

  it('Should have a size', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader size="lg" />);
    assert.include(findDOMNode(instance).className, 'rs-loader-lg');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Loader className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(<Loader style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Loader classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
