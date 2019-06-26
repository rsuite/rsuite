import React from 'react';
import { getDOMNode } from '@test/testUtils';

import NavbarBody from '../NavbarBody';

describe('NavbarBody', () => {
  it('Should render a body', () => {
    const title = 'Test';
    const instance = getDOMNode(<NavbarBody>{title}</NavbarBody>);
    assert.equal(instance.className, 'rs-navbar-body');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<NavbarBody className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<NavbarBody style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<NavbarBody classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
