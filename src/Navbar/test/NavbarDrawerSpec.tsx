import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import NavbarDrawer from '../NavbarDrawer';
import NavbarToggle from '../NavbarToggle';

describe('NavbarDrawer', () => {
  it('Should render a drawer when NavbarToggle is clicked', () => {
    render(
      <Navbar>
        <NavbarToggle />
        <NavbarDrawer />
      </Navbar>
    );

    expect(screen.queryByRole('dialog')).to.not.exist;

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('dialog')).to.be.visible;
  });
});
