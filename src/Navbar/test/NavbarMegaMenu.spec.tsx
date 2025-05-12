import React from 'react';
import NavbarMegaMenu from '../NavbarMegaMenu';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Navbar>
    <Nav>{children}</Nav>
  </Navbar>
);

describe('NavbarMegaMenu', () => {
  it('Should render a mega menu with title', () => {
    render(<NavbarMegaMenu title="Mega Menu" data-testid="mega-menu" />, {
      wrapper
    });

    expect(screen.getByTestId('mega-menu')).to.exist;
    expect(screen.getByText('Mega Menu')).to.exist;
  });

  it('Should render with arrow down icon', () => {
    render(<NavbarMegaMenu title="Mega Menu" data-testid="mega-menu" />, {
      wrapper
    });

    expect(screen.getByTestId('mega-menu').querySelector('.rs-mega-menu-toggle-icon')).to.exist;
  });

  it('Should open mega menu when clicked', () => {
    render(
      <NavbarMegaMenu title="Mega Menu" data-testid="mega-menu">
        <div data-testid="mega-menu-content">Content</div>
      </NavbarMegaMenu>,
      {
        wrapper
      }
    );

    // Initially the content should not be visible
    expect(screen.queryByTestId('mega-menu-content')).to.not.exist;

    // Click to open the mega menu
    fireEvent.click(screen.getByTestId('mega-menu'));

    // Now the content should be visible
    expect(screen.getByTestId('mega-menu-content')).to.exist;
  });

  it('Should render content from children function', () => {
    render(
      <NavbarMegaMenu title="Mega Menu" data-testid="mega-menu">
        {() => {
          return <div data-testid="mega-menu-content">Function Content</div>;
        }}
      </NavbarMegaMenu>,
      {
        wrapper
      }
    );

    // Click to open the mega menu
    fireEvent.click(screen.getByTestId('mega-menu'));

    // Content should be rendered
    expect(screen.getByTestId('mega-menu-content')).to.exist;
    expect(screen.getByText('Function Content')).to.exist;
  });

  it('Should control open state with open prop', () => {
    render(
      <NavbarMegaMenu title="Mega Menu" data-testid="mega-menu" open>
        <div data-testid="mega-menu-content">Content</div>
      </NavbarMegaMenu>,
      {
        wrapper
      }
    );

    // Content should be visible initially because open=true
    expect(screen.getByTestId('mega-menu-content')).to.exist;
  });

  it('Should have a custom className', () => {
    render(<NavbarMegaMenu title="Mega Menu" className="custom" data-testid="mega-menu" />, {
      wrapper
    });

    expect(screen.getByTestId('mega-menu')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<NavbarMegaMenu title="Mega Menu" style={{ fontSize }} data-testid="mega-menu" />, {
      wrapper
    });
    expect(screen.getByTestId('mega-menu').style.fontSize).to.equal(fontSize);
  });

  it('Should have a custom classPrefix', () => {
    render(
      <NavbarMegaMenu title="Mega Menu" classPrefix="custom-prefix" data-testid="mega-menu" />,
      {
        wrapper
      }
    );

    expect(screen.getByTestId('mega-menu')).to.have.class('rs-custom-prefix');
  });
});
