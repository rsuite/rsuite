import React from 'react';
import { getDOMNode, testStandardProps } from '@test/utils';
import SidenavHeader from '../SidenavHeader';

describe('SidenavHeader', () => {
  testStandardProps(<SidenavHeader />);

  it('Should render a header', () => {
    const title = 'Test';
    const instance = getDOMNode(<SidenavHeader>{title}</SidenavHeader>);
    assert.equal(instance.className, 'rs-sidenav-header');
    assert.equal(instance.innerHTML, title);
  });
});
