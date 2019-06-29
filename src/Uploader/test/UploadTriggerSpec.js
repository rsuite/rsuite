import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import UploadTrigger from '../UploadTrigger';

describe('UploadTrigger', () => {
  it('Should output a UploadTrigger', () => {
    const instance = getDOMNode(<UploadTrigger />);
    assert.include(instance.className, 'rs-uploader-trigger');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<UploadTrigger disabled />);
    assert.include(instance.className, 'rs-uploader-trigger-disabled');
  });

  it('Should be multipled', () => {
    const instance = getDOMNode(<UploadTrigger multiple />);
    assert.ok(instance.querySelector('input[multiple]'));
  });

  it('Should have a accept', () => {
    const instance = getDOMNode(<UploadTrigger accept=".jpg" />);
    assert.ok(instance.querySelector('input[accept=".jpg"]'));
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<UploadTrigger componentClass={'a'} />);
    assert.equal(instance.querySelector('.rs-uploader-trigger-btn').tagName, 'A');
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<UploadTrigger onChange={doneOp} />);
    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should have a name', () => {
    const instance = getDOMNode(<UploadTrigger name="file" />);
    assert.ok(instance.querySelector('input[name="file"]'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<UploadTrigger className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<UploadTrigger style={{ fontSize }} />);
    assert.equal(instance.querySelector('button').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<UploadTrigger classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
