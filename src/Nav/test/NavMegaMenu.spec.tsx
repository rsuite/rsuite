import React from 'react';
import sinon from 'sinon';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';
import NavMegaMenu from '../NavMegaMenu';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('NavMegaMenu', () => {
  const navbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Navbar>
      <Nav>{children}</Nav>
    </Navbar>
  );

  it('Should render a mega menu with title', () => {
    render(<NavMegaMenu title="Mega Menu" />, {
      wrapper: navbarWrapper
    });

    expect(screen.getByRole('button', { name: 'Mega Menu' })).to.have.class('rs-navbar-item');
  });

  it('Should render a mega menu with title and description', () => {
    render(
      <NavMegaMenu title="Mega Menu" open>
        {() => {
          return (
            <Sidenav>
              <Nav>
                <Nav.Item>Nav Item</Nav.Item>
                <Nav.Menu title="Submenu"></Nav.Menu>
              </Nav>
            </Sidenav>
          );
        }}
      </NavMegaMenu>,
      {
        wrapper: navbarWrapper
      }
    );

    expect(screen.getByRole('button', { name: 'Nav Item' })).to.have.class('rs-sidenav-item');
    expect(screen.getByRole('button', { name: 'Submenu' })).to.have.class('rs-sidenav-item');
  });

  describe('Error handling', () => {
    let consoleErrorStub;

    beforeEach(() => {
      consoleErrorStub = sinon.stub(console, 'error').callsFake(() => {
        // do nothing
      });
    });

    afterEach(() => {
      consoleErrorStub.restore();
    });

    it('Should throw error if rendered outside of Navbar context', () => {
      render(<NavMegaMenu title="Mega Menu" />);

      expect(consoleErrorStub).to.have.been.calledWith(
        sinon.match(/<Nav.MegaMenu> should be used within a <Navbar> component./)
      );
    });

    it('Should throw error if rendered outside of Navbar context', () => {
      render(
        <Nav>
          <NavMegaMenu title="Mega Menu" />
        </Nav>
      );

      expect(consoleErrorStub).to.have.been.calledWith(
        sinon.match(/<Nav.MegaMenu> should be used within a <Navbar> component./)
      );
    });
  });
});
