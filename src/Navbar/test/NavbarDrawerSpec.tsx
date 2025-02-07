import React from 'react';
import sinon from 'sinon';
import Navbar from '../Navbar';
import NavbarDrawer from '../NavbarDrawer';
import NavbarToggle from '../NavbarToggle';
import Drawer from '../../Drawer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('NavbarDrawer', () => {
  it('Should not render a drawer by default', () => {
    const { container } = render(<NavbarDrawer />);

    expect(container.firstChild).to.not.exist;
  });

  it('Should render a drawer when NavbarToggle is clicked', async () => {
    const onDrawerOpenChange = sinon.spy();
    render(
      <Navbar onDrawerOpenChange={onDrawerOpenChange}>
        <NavbarToggle />
        <NavbarDrawer>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
          </Drawer.Header>
        </NavbarDrawer>
      </Navbar>
    );

    expect(screen.queryByRole('dialog')).to.not.exist;

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('dialog')).to.be.visible;
    expect(onDrawerOpenChange).to.be.calledWith(true);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).to.not.exist;
    });

    expect(onDrawerOpenChange).to.be.calledWith(false);
  });
});
