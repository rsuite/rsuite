import React from 'react';
import NavbarToggle from '../NavbarToggle';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { NavbarContext } from '../NavbarContext';

describe('NavbarToggle', () => {
  testStandardProps(<NavbarToggle />);

  it('Should forward ref to the button', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<NavbarToggle ref={ref} />);
    expect(ref.current).to.exist;
    expect(ref.current?.tagName).to.equal('BUTTON');
  });

  it('Should pass open prop to Burger', () => {
    render(<NavbarToggle open />);
    expect(screen.getByRole('button')).to.have.attr('aria-pressed', 'true');
  });

  it('Should call onToggle and onClick when clicked', () => {
    const onToggle = vi.fn();
    const onClick = vi.fn();
    render(<NavbarToggle onToggle={onToggle} onClick={onClick} />);

    screen.getByRole('button').click();

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call context onToggle if provided', () => {
    const onToggleContext = vi.fn();
    const value = {
      appearance: 'default' as const,
      open: false,
      navbarId: 'nav',
      onToggle: onToggleContext
    };
    render(
      <NavbarContext.Provider value={value}>
        <NavbarToggle />
      </NavbarContext.Provider>
    );

    screen.getByRole('button').click();

    expect(onToggleContext).toHaveBeenCalledTimes(1);
    expect(onToggleContext).toHaveBeenCalledWith(true);
  });

  it('Should set aria-controls according to navbarId', () => {
    const value = {
      appearance: 'default' as const,
      open: false,
      navbarId: 'my-navbar',
      onToggle: () => {}
    };
    render(
      <NavbarContext.Provider value={value}>
        <NavbarToggle />
      </NavbarContext.Provider>
    );

    expect(screen.getByRole('button')).to.have.attr('aria-controls', 'my-navbar-drawer');
  });

  it('Should pass through custom props', () => {
    render(<NavbarToggle title="toggle" tabIndex={2} />);
    const btn = screen.getByRole('button');

    expect(btn).to.have.attr('title', 'toggle');
    expect(btn.getAttribute('tabindex')).to.equal('2');
  });
});
