import React from 'react';
import sinon from 'sinon';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import NavMegaMenu from '../NavMegaMenu';
import { render, screen } from '@testing-library/react';

describe('NavMegaMenu', () => {
  const navbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Navbar>
      <Nav>{children}</Nav>
    </Navbar>
  );

  it('Should render a mega menu with title', () => {
    render(<NavMegaMenu title="Mega Menu" data-testid="mega-menu" />, {
      wrapper: navbarWrapper
    });

    expect(screen.getByTestId('mega-menu')).to.exist;
    expect(screen.getByText('Mega Menu')).to.exist;
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
