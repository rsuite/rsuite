import React from 'react';
import Footer from '../Footer';
import { innerText, getDOMNode } from '@test/testUtils';

describe('Footer', () => {
  it('Should render a Footer', () => {
    const title = 'Test';
    const instance = getDOMNode(<Footer>{title}</Footer>);
    assert.equal(instance.tagName, 'FOOTER');
    assert.include(instance.className, 'rs-footer');
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Footer className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Footer style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Footer classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
