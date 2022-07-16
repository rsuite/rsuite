import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import SidenavToggle from '../SidenavToggle';
import Sidenav from '../Sidenav';

describe('Sidenav.Toggle', () => {
  testStandardProps(<SidenavToggle />, {
    renderOptions: {
      wrapper: Sidenav
    }
  });

  it('Should have rs-sidenav-toggle className', () => {
    const { getByTestId } = render(<SidenavToggle data-testid="toggle" />, { wrapper: Sidenav });

    expect(getByTestId('toggle')).to.have.class('rs-sidenav-toggle');
  });

  it('Should render a "Collapse" button when Sidenav is expanded', () => {
    const { getByRole } = render(<SidenavToggle />, {
      wrapper: ({ children }) => <Sidenav expanded>{children}</Sidenav>
    });

    expect(getByRole('button', { name: 'Collapse' })).to.exist;
  });

  it('Should render an "Expand" button when Sidenav is collapsed', () => {
    const { getByRole } = render(<SidenavToggle />, {
      wrapper: ({ children }) => <Sidenav expanded={false}>{children}</Sidenav>
    });

    expect(getByRole('button', { name: 'Expand' })).to.exist;
  });

  it('Should call onToggle callback', () => {
    const onToggle = sinon.spy();
    const { getByRole } = render(<SidenavToggle onToggle={onToggle} />, {
      wrapper: Sidenav
    });

    fireEvent.click(getByRole('button', { name: 'Collapse' }));

    expect(onToggle).to.have.been.calledWith(false);
  });
});
