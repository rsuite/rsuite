import React from 'react';
import CloseButton from '../CloseButton';
import { getDOMNode } from '@test/testUtils';

describe('CloseButton', () => {
  it('Should render a button', () => {
    const title = 'Test';
    const instance = getDOMNode(<CloseButton>{title}</CloseButton>);
    assert.include(instance.className, 'rs-btn-close');
    assert.equal(instance.getAttribute('title'), 'Close');
    assert.equal(instance.getAttribute('aria-label'), 'Close');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<CloseButton className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CloseButton style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CloseButton classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
