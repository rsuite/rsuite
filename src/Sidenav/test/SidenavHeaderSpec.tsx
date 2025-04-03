import React from 'react';
import { testStandardProps } from '@test/utils';
import SidenavHeader from '../SidenavHeader';
import { render } from '@testing-library/react';

describe('SidenavHeader', () => {
  testStandardProps(<SidenavHeader />);

  it('Should render a header', () => {
    const { container } = render(<SidenavHeader>header</SidenavHeader>);
    expect(container.firstChild).to.have.class('rs-sidenav-header');
    expect(container.firstChild).to.have.text('header');
  });
});
