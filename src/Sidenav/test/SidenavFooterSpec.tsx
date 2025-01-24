import React from 'react';
import { testStandardProps } from '@test/utils';
import SidenavFooter from '../SidenavFooter';
import { render } from '@testing-library/react';

describe('SidenavFooter', () => {
  testStandardProps(<SidenavFooter />);

  it('Should render a footer', () => {
    const { container } = render(<SidenavFooter>footer</SidenavFooter>);
    expect(container.firstChild).to.have.class('rs-sidenav-footer');
    expect(container.firstChild).to.have.text('footer');
  });
});
