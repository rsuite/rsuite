import React from 'react';
import SidenavToggle from '../SidenavToggle';
import Sidenav from '../Sidenav';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Sidenav.Toggle', () => {
  testStandardProps(<SidenavToggle />, {
    renderOptions: {
      wrapper: Sidenav
    },
    getRootElement: () => screen.getByTestId('element')
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
    const onToggle = vi.fn();
    render(<SidenavToggle onToggle={onToggle} />, {
      wrapper: Sidenav
    });

    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    expect(onToggle).toHaveBeenCalledWith(false, expect.any(Object));
  });

  describe('When rendered outside of Sidenav', () => {
    let errorSpy;

    beforeEach(() => {
      errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errorSpy.mockRestore();
    });

    it('Should throw error', () => {
      render(<SidenavToggle />);

      expect(errorSpy).toHaveBeenCalledWith('<Sidenav.Toggle> must be rendered within a <Sidenav>');
    });
  });
});
