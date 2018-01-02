import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Loader from '../src/Loader';
import { globalKey } from '../src/utils/prefix';

describe('Loader', () => {

  it('Should render a Loader', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader\b/));
  });

  it('Should be center', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader center />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader-center\b/));
  });

  it('Should be inverse', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader inverse />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader-inverse\b/));
  });

  it('Should have a backdrop', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader backdrop />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader-backdrop\b/));
  });

  it('Should have content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader content="content" />
    );
    assert.equal(findDOMNode(instance).innerText, 'content');
  });

  it('Should have a speed', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader speed="fast" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader-speed-fast\b/));
  });

  it('Should have a size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader size="lg" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bloader-lg\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Loader style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
