import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../Nav';
import NavMenu from '../NavMenu';
import NavItem from '../AdaptiveNavItem';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<AdaptiveNavItem>', () => {
  it('Should render a standard Nav Item', () => {
    render(
      <Nav>
        <NavItem>Item</NavItem>
      </Nav>
    );

    expect(screen.getByText('Item')).to.have.class('rs-nav-item');
  });

  it('Should render a standard Nav Dropdown Item', () => {
    render(
      <Nav>
        <NavMenu>
          <NavItem>Item</NavItem>
        </NavMenu>
      </Nav>
    );

    expect(screen.getByText('Item')).to.have.class('rs-dropdown-item');
    expect(screen.getByText('Item')).to.have.attr('role', 'menuitem');
  });

  it('Should render a adaptive Navbar Item', () => {
    render(
      <Navbar>
        <Nav>
          <NavItem>Item</NavItem>
        </Nav>
      </Navbar>
    );

    expect(screen.getByText('Item')).to.have.class('rs-navbar-item');
  });

  it('Should render a adaptive Navbar Dropdown Item', () => {
    render(
      <Navbar>
        <Nav>
          <NavMenu>
            <NavItem>Item</NavItem>
          </NavMenu>
        </Nav>
      </Navbar>
    );

    expect(screen.getByText('Item')).to.have.class('rs-dropdown-item');
  });

  it('Should render a adaptive Sidenav Item', () => {
    render(
      <Sidenav>
        <Nav>
          <NavItem>Item</NavItem>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByText('Item')).to.have.class('rs-sidenav-item-title');
  });

  it('Should render a adaptive Sidenav Dropdown Item', () => {
    render(
      <Sidenav>
        <Nav>
          <NavMenu>
            <NavItem>Item</NavItem>
          </NavMenu>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByText('Item')).to.have.class('rs-dropdown-item');
    expect(screen.getByText('Item')).to.have.attr('role', 'button');
  });
});
