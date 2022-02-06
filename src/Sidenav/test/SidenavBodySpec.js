import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import SidenavBody from '../SidenavBody';

describe('SidenavBody', () => {
  testStandardProps(<SidenavBody />);

  it('Should render a body', () => {
    const title = 'Test';
    const instance = getDOMNode(<SidenavBody>{title}</SidenavBody>);
    assert.equal(instance.className, 'rs-sidenav-body');
    assert.equal(instance.innerHTML, title);
  });
});
