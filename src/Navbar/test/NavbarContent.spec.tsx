import React from 'react';
import NavbarContent from '../NavbarContent';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { NavbarContext } from '../NavbarContext';

describe('NavbarContent', () => {
  testStandardProps(<NavbarContent />);

  it('Should render responsive classes', () => {
    render(
      <NavbarContent showFrom="xs" hideFrom="md" data-testid="content">
        Navbar Content
      </NavbarContent>
    );

    const content = screen.getByTestId('content');

    expect(content).to.have.attr('data-visible-from', 'xs');
    expect(content).to.have.attr('data-hidden-from', 'md');
  });

  describe('Children rendering', () => {
    it('Should render static children', () => {
      render(
        <NavbarContent data-testid="content">
          <div>Static Content</div>
        </NavbarContent>
      );

      expect(screen.getByText('Static Content')).to.be.visible;
    });

    it('Should render function children with onClose callback', () => {
      const mockOnToggle = vi.fn();
      const contextValue = {
        appearance: 'default' as const,
        open: true,
        navbarId: 'test-navbar',
        onToggle: mockOnToggle
      };

      render(
        <NavbarContext.Provider value={contextValue}>
          <NavbarContent data-testid="content">
            {({ onClose }) => (
              <button onClick={onClose} data-testid="close-btn">
                Close
              </button>
            )}
          </NavbarContent>
        </NavbarContext.Provider>
      );

      const closeButton = screen.getByTestId('close-btn');
      expect(closeButton).to.be.visible;

      fireEvent.click(closeButton);
      expect(mockOnToggle).toHaveBeenCalledWith(false);
    });

    it('Should handle function children when context is null', () => {
      render(
        <NavbarContent data-testid="content">
          {({ onClose }) => (
            <button onClick={onClose} data-testid="close-btn">
              Close
            </button>
          )}
        </NavbarContent>
      );

      const closeButton = screen.getByTestId('close-btn');
      expect(closeButton).to.be.visible;

      // Should not throw when context is null
      expect(() => fireEvent.click(closeButton)).not.to.throw;
    });
  });

  describe('Context integration', () => {
    it('Should use context onToggle when available', () => {
      const mockOnToggle = vi.fn();
      const contextValue = {
        appearance: 'inverse' as const,
        open: false,
        navbarId: 'test-navbar-2',
        onToggle: mockOnToggle
      };

      render(
        <NavbarContext.Provider value={contextValue}>
          <NavbarContent>
            {({ onClose }) => (
              <button onClick={onClose} data-testid="close-btn">
                Close Drawer
              </button>
            )}
          </NavbarContent>
        </NavbarContext.Provider>
      );

      fireEvent.click(screen.getByTestId('close-btn'));
      expect(mockOnToggle).toHaveBeenCalledWith(false);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('Should work without context provider', () => {
      render(<NavbarContent data-testid="content">Regular content without context</NavbarContent>);

      expect(screen.getByTestId('content')).to.have.class('rs-navbar-content');
      expect(screen.getByText('Regular content without context')).to.be.visible;
    });
  });

  describe('onClose callback', () => {
    it('Should create stable onClose callback', () => {
      const mockOnToggle = vi.fn();
      const contextValue = {
        appearance: 'default' as const,
        open: true,
        navbarId: 'test-navbar',
        onToggle: mockOnToggle
      };

      let onCloseRef1: (() => void) | null = null;
      let onCloseRef2: (() => void) | null = null;

      const TestComponent = ({ renderCount }: { renderCount: number }) => (
        <NavbarContent>
          {({ onClose }) => {
            if (renderCount === 1) onCloseRef1 = onClose;
            if (renderCount === 2) onCloseRef2 = onClose;
            return <div>Render {renderCount}</div>;
          }}
        </NavbarContent>
      );

      const { rerender } = render(
        <NavbarContext.Provider value={contextValue}>
          <TestComponent renderCount={1} />
        </NavbarContext.Provider>
      );

      rerender(
        <NavbarContext.Provider value={contextValue}>
          <TestComponent renderCount={2} />
        </NavbarContext.Provider>
      );

      // onClose should be stable across re-renders
      expect(onCloseRef1).to.equal(onCloseRef2);
    });

    it('Should call onClose multiple times correctly', () => {
      const mockOnToggle = vi.fn();
      const contextValue = {
        appearance: 'default' as const,
        open: true,
        navbarId: 'test-navbar',
        onToggle: mockOnToggle
      };

      render(
        <NavbarContext.Provider value={contextValue}>
          <NavbarContent>
            {({ onClose }) => (
              <button onClick={onClose} data-testid="close-btn">
                Close
              </button>
            )}
          </NavbarContent>
        </NavbarContext.Provider>
      );

      const closeButton = screen.getByTestId('close-btn');

      fireEvent.click(closeButton);
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);

      expect(mockOnToggle).toHaveBeenCalledTimes(3);
      expect(mockOnToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('CSS classes and styling', () => {
    it('Should apply default classPrefix', () => {
      render(<NavbarContent data-testid="content">Content</NavbarContent>);
      expect(screen.getByTestId('content')).to.have.class('rs-navbar-content');
    });

    it('Should apply custom classPrefix', () => {
      render(
        <NavbarContent classPrefix="custom-navbar-content" data-testid="content">
          Content
        </NavbarContent>
      );
      expect(screen.getByTestId('content')).to.have.class('rs-custom-navbar-content');
    });

    it('Should merge custom className with default classes', () => {
      render(
        <NavbarContent className="custom-class" data-testid="content">
          Content
        </NavbarContent>
      );
      const content = screen.getByTestId('content');
      expect(content).to.have.class('rs-navbar-content');
      expect(content).to.have.class('custom-class');
    });
  });
});
