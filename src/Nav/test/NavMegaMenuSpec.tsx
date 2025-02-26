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

  it('Should throw error if rendered outside of Navbar context', () => {
    sinon.stub(console, 'error').callsFake(() => null);

    expect(() => {
      render(<NavMegaMenu title="Mega Menu" />);
    }).to.throw();

    expect(() => {
      render(
        <Nav>
          <NavMegaMenu title="Mega Menu" />
        </Nav>
      );
    }).to.throw();

    (console.error as sinon.SinonStub).restore();
  });
});
