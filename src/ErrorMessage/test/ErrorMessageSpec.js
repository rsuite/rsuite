import React from 'react';
import ErrorMessage from '../ErrorMessage';
import { innerText, getDOMNode } from '@test/testUtils';

describe('ErrorMessage', () => {
  it('Should render a ErrorMessage', () => {
    const title = 'Test';
    const instance = getDOMNode(<ErrorMessage show>{title}</ErrorMessage>);
    assert.include(instance.className, 'rs-error-message-wrapper');
    assert.equal(innerText(instance), title);
  });

  it('Should be show', () => {
    const instance = getDOMNode(<ErrorMessage show />);
    assert.ok(instance.querySelector('.rs-error-message.rs-error-message-show'));
  });

  it('Should be hide', () => {
    const instance = getDOMNode(<ErrorMessage show={false} />);
    assert.equal(instance, null);
  });

  it('Should hava a `bottomStart` for placement', () => {
    const instance = getDOMNode(<ErrorMessage show placement="bottomStart" />);
    assert.include(instance.className, 'rs-error-message-placement-bottom-start');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ErrorMessage show className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ErrorMessage show style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ErrorMessage show classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
