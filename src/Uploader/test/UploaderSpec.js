import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';

import Uploader from '../Uploader';
import Button from '../../Button';

describe('Uploader', () => {
  it('Should output a Uploader', () => {
    const instance = getDOMNode(<Uploader action="" />);
    assert.include(instance.className, 'rs-uploader');
  });

  it('Should be disabled', () => {
    const instance = getInstance(<Uploader action="" disabled />);
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-uploader-trigger-disabled')
    );
  });

  it('Should render picture type', () => {
    const instance = getDOMNode(<Uploader action="" listType="picture" />);
    assert.include(instance.className, 'rs-uploader-picture');
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(
      <Uploader action="" toggleComponentClass={Button} appearance="link" />
    );
    assert.equal(instance.querySelector('.rs-uploader-trigger-btn.rs-btn-link').tagName, 'BUTTON');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Uploader action="" className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Uploader action="" style={{ fontSize }} />);

    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Uploader action="" classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
