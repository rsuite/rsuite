import React from 'react';
import { testStandardProps } from '@test/utils';
import SidenavBody from '../SidenavBody';
import { render } from '@testing-library/react';

describe('SidenavBody', () => {
  testStandardProps(<SidenavBody />);

  it('Should render a body', () => {
    const title = 'Test';
    const { container } = render(<SidenavBody>{title}</SidenavBody>);
    expect(container.firstChild).to.have.class('rs-sidenav-body');
    expect(container.firstChild).to.have.text(title);
  });
});
