import React from 'react';
import FormErrorMessage from '../FormErrorMessage';
import { innerText, getDOMNode } from '@test/testUtils';

describe('FormErrorMessage', () => {
  it('Should render a FormErrorMessage', () => {
    const title = 'Test';
    const instance = getDOMNode(<FormErrorMessage show>{title}</FormErrorMessage>);
    assert.include(instance.className, 'rs-form-error-message-wrapper');
    assert.equal(innerText(instance), title);
  });

  it('Should be show', () => {
    const instance = getDOMNode(<FormErrorMessage show />);
    assert.ok(instance.querySelector('.rs-form-error-message.rs-form-error-message-show'));
  });

  it('Should be hide', () => {
    const instance = getDOMNode(<FormErrorMessage show={false} />);
    assert.equal(instance, null);
  });

  it('Should hava a `bottomStart` for placement', () => {
    const instance = getDOMNode(<FormErrorMessage show placement="bottomStart" />);
    assert.include(instance.className, 'rs-form-error-message-placement-bottom-start');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<FormErrorMessage show className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<FormErrorMessage show style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FormErrorMessage show classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
