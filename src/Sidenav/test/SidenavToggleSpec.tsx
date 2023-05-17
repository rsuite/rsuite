import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';
import SidenavToggle from '../SidenavToggle';
import Sidenav from '../Sidenav';

describe('Sidenav.Toggle', () => {
  testStandardProps(<SidenavToggle />, {
    renderOptions: {
      wrapper: Sidenav
    },
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getRootElement: view => view.getByTestId('element')
  });

  it('Should have rs-sidenav-toggle className', () => {
    render(<SidenavToggle data-testid="toggle" />, { wrapper: Sidenav });

    expect(screen.getByTestId('toggle')).to.have.class('rs-sidenav-toggle');
  });

  it('Should render a "Collapse" button when Sidenav is expanded', () => {
    render(<SidenavToggle />, {
      wrapper: ({ children }) => <Sidenav expanded>{children}</Sidenav>
    });

    expect(screen.getByRole('button', { name: 'Collapse' })).to.exist;
  });

  it('Should render an "Expand" button when Sidenav is collapsed', () => {
    render(<SidenavToggle />, {
      wrapper: ({ children }) => <Sidenav expanded={false}>{children}</Sidenav>
    });

    expect(screen.getByRole('button', { name: 'Expand' })).to.exist;
  });

  it('Should call onToggle callback', () => {
    const onToggle = sinon.spy();
    render(<SidenavToggle onToggle={onToggle} />, {
      wrapper: Sidenav
    });

    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    expect(onToggle).to.have.been.calledWith(false);
  });
});
