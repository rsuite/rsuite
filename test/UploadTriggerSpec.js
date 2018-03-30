import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import UploadTrigger from '../src/UploadTrigger';

describe('UploadTrigger', () => {
  it('Should output a UploadTrigger', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger />);
    assert.include(findDOMNode(instance).className, 'rs-uploader-trigger');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger disabled />);
    assert.include(findDOMNode(instance).className, 'rs-uploader-trigger-disabled');
  });

  it('Should be multipled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger multiple />);
    assert.ok(findDOMNode(instance).querySelector('input[multiple]'));
  });

  it('Should have a accept', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger accept=".jpg" />);
    assert.ok(findDOMNode(instance).querySelector('input[accept=".jpg"]'));
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger onChange={doneOp} />);
    ReactTestUtils.Simulate.change(findDOMNode(instance).querySelector('input'));
  });

  it('Should have a name', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger name="file" />);
    assert.ok(findDOMNode(instance).querySelector('input[name="file"]'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<UploadTrigger style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).querySelector('button').style.fontSize, fontSize);
  });
});
