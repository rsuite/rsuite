import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FormErrorMessage from '../FormErrorMessage';

describe('FormErrorMessage', () => {
  testStandardProps(<FormErrorMessage show />);

  it('Should render a FormErrorMessage', () => {
    const title = 'Test';
    const instance = getDOMNode(<FormErrorMessage show>{title}</FormErrorMessage>);
    assert.include(instance.className, 'rs-form-error-message-wrapper');
    assert.equal(instance.textContent, title);
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
});
