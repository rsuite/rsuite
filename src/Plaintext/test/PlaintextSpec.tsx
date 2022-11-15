import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Plaintext from '../Plaintext';

describe('Plaintext', () => {
  it('Should render a Plaintext', () => {
    const title = 'Test';
    const instance = getDOMNode(<Plaintext>{title}</Plaintext>);
    assert.include(instance.className, 'rs-plaintext');
    assert.equal(instance.textContent, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Plaintext className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Plaintext style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Plaintext classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
