import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import NavbarBrand from '../NavbarBrand';

describe('NavbarBrand', () => {
  testStandardProps(<NavbarBrand />);

  it('Should render a link', () => {
    let title = 'RSUITE';
    let instance = getDOMNode(<NavbarBrand href="/">{title}</NavbarBrand>);
    assert.equal(instance.tagName, 'A');
    assert.equal(instance.getAttribute('href'), '/');
    assert.equal(instance.textContent, title);
  });
});
