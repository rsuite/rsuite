import React from 'react';
import { testStandardProps } from '@test/utils';
import SidenavGroupLabel from '../SidenavGroupLabel';
import { render } from '@testing-library/react';

describe('SidenavGroupLabel', () => {
  testStandardProps(<SidenavGroupLabel />);

  it('Should render a group label', () => {
    const { container } = render(<SidenavGroupLabel>group</SidenavGroupLabel>);
    expect(container.firstChild).to.have.class('rs-sidenav-group-label');
    expect(container.firstChild).to.have.text('group');
  });
});
