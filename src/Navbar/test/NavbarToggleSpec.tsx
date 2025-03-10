import React from 'react';
import NavbarToggle from '../NavbarToggle';
import Navbar from '../Navbar';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
describe('NavbarToggle', () => {
  testStandardProps(<NavbarToggle />);

  it('Should render a subtle style button', () => {
    render(<NavbarToggle />);

    expect(screen.getByRole('button')).to.have.class('rs-btn-subtle');
  });

  it('Should change the appearance of NavbarToggle when the appearance of Navbar is `inverse`', () => {
    render(
      <Navbar appearance="inverse">
        <NavbarToggle />
      </Navbar>
    );

    expect(screen.getByRole('button')).to.have.class('rs-btn-primary');
  });

  it('Should cover the inverse property of Navbar', () => {
    render(
      <Navbar appearance="inverse">
        <NavbarToggle appearance="ghost" />
      </Navbar>
    );

    expect(screen.getByRole('button')).to.have.class('rs-btn-ghost');
  });
});
