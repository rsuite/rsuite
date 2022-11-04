import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import NavbarBrand from '../NavbarBrand';

describe('NavbarBrand', () => {
  testStandardProps(<NavbarBrand />);

  it('Should render a link', () => {
    const title = 'RSUITE';
    // FIXME NavbarBrand does not have `href` prop declaration
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = getDOMNode(<NavbarBrand href="/">{title}</NavbarBrand>);
    assert.equal(instance.tagName, 'A');
    assert.equal(instance.getAttribute('href'), '/');
    assert.equal(instance.textContent, title);
  });
});
