import React from 'react';
import NavbarBrand from '../NavbarBrand';
import { getDOMNode } from '@test/testUtils';

describe('NavbarBrand', () => {
  it('Should render a link', () => {
    let title = 'RSUITE';
    let instance = getDOMNode(<NavbarBrand href="/">{title}</NavbarBrand>);
    assert.equal(instance.tagName, 'A');
    assert.equal(instance.getAttribute('href'), '/');
    assert.equal(instance.textContent, title);
  });
});
