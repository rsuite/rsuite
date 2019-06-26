import React from 'react';
import NavbarHeader from '../NavbarHeader';
import { innerText, getDOMNode } from '@test/testUtils';

describe('NavbarHeader', () => {
  it('Should render a header', () => {
    let title = 'Test';
    let instance = getDOMNode(<NavbarHeader>{title}</NavbarHeader>);
    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\bnavbar-header\b/));
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<NavbarHeader className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<NavbarHeader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<NavbarHeader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
