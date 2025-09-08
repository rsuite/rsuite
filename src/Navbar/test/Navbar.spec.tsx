import React from 'react';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Whisper from '../../Whisper';
import Tooltip from '../../Tooltip';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { NavbarContext } from '../NavbarContext';

describe('Navbar', () => {
  testStandardProps(<Navbar />);

  it('Should render a navbar', () => {
    const { container } = render(<Navbar />);
    expect(container.firstChild).to.have.class('rs-navbar');
  });

  it('Should render a navbar with default appearance', () => {
    const { container } = render(<Navbar appearance="default" />);
    expect(container.firstChild).to.have.attr('data-appearance', 'default');
  });

  it('Should render a navbar with inverse appearance', () => {
    const { container } = render(<Navbar appearance="inverse" />);
    expect(container.firstChild).to.have.attr('data-appearance', 'inverse');
  });

  it('Should render a navbar with subtle appearance', () => {
    const { container } = render(<Navbar appearance="subtle" />);
    expect(container.firstChild).to.have.attr('data-appearance', 'subtle');
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    render(
      <Navbar>
        <Nav data-testid="nav">1</Nav>
      </Navbar>
    );

    expect(screen.getByTestId('nav')).to.have.class('rs-navbar-nav');
  });

  describe('Nav.Menu within Navbar', () => {
    it('Should open with `trigger="hover"`', () => {
      render(
        <Navbar>
          <Nav>
            <Nav.Menu title="Menu" trigger="hover" data-testid="menu">
              <Nav.Item>Menu item</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Navbar>
      );

      userEvent.hover(screen.getByTestId('menu'));

      expect(screen.getByText('Menu item')).to.be.visible;
    });
  });

  describe('[Deprecated] Use <Dropdown> within <Navbar>', () => {
    it('Should render <Dropdown> as a disclosure containing a list of items', () => {
      render(
        <Navbar>
          <Nav>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(screen.getByText('Company').closest('ul')).to.have.attribute('hidden');

      // Clicking the button opens the disclosure
      fireEvent.click(screen.getByText('About'));
      expect(screen.getByText('Company').closest('ul')).not.to.have.attribute('hidden');
    });

    it('Should work with submenus', () => {
      render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByText('Submenu item').closest('ul')).to.have.attribute('hidden');
      fireEvent.mouseOver(screen.getByText('Submenu'));
      expect(screen.getByText('Submenu item').closest('ul')).not.to.have.attribute('hidden');
    });

    it('Should not get validateDOMNesting warning', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(errorSpy).not.toHaveBeenCalledWith(
        expect.stringMatching(/Warning: validateDOMNesting/)
      );
      errorSpy.mockRestore();
    });

    it('Should close <Dropdown> when clicking an item', () => {
      render(
        <Navbar>
          <Nav>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(screen.getByText('About'));

      fireEvent.click(screen.getByText('Company'));
      expect(screen.getByText('Company').closest('ul')).to.have.attribute('hidden');
    });

    it('Should close dropdown when a submenu item is clicked', () => {
      render(
        <Navbar>
          <Nav>
            <Dropdown title="Menu">
              <Dropdown.Menu title="Submenu">
                <Dropdown.Item>Submenu item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the disclosure
      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByText('Submenu item').closest('ul')).to.have.attribute('hidden');
      fireEvent.mouseOver(screen.getByText('Submenu'));
      fireEvent.click(screen.getByText('Submenu item'));

      expect(screen.getByText('Submenu').closest('ul')).to.have.attribute('hidden');
    });

    it('Should highlight <Dropdown.Item> matching <Nav> `activeKey`', () => {
      render(
        <Navbar>
          <Nav activeKey="2-1">
            <Dropdown title="Dropdown">
              <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
                Dropdown item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      expect(screen.getByTestId('dropdown-item')).to.have.attribute('aria-current', 'true');
    });

    it('Should call <Nav onSelect> with correct eventKey from <Dropdown.Item>', () => {
      const onSelect = vi.fn();
      render(
        <Navbar>
          <Nav activeKey="2-1" onSelect={onSelect}>
            <Dropdown title="Dropdown" data-testid="dropdown">
              <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
                Dropdown item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar>
      );

      // Opens the dropdown
      fireEvent.click(screen.getByTestId('dropdown'));

      fireEvent.click(screen.getByTestId('dropdown-item'));
      expect(onSelect).toHaveBeenCalledWith('2-1', expect.any(Object));
    });
  });

  describe('Issue #2263', () => {
    it('Should render Tooltip at correct position', () => {
      // @see https://codesandbox.io/s/tooltip-in-navbar-94gxk
      render(
        <Navbar>
          <Nav>
            <Whisper
              open
              trigger="hover"
              placement="bottom"
              speaker={<Tooltip data-testid="tooltip">Tooltip</Tooltip>}
            >
              <Nav.Item>Test</Nav.Item>
            </Whisper>
          </Nav>
        </Navbar>
      );

      const tooltip = screen.getByTestId('tooltip');

      expect(tooltip).not.to.have.style('left', '0px').and.not.to.have.style('top', '0px');
    });
  });

  describe('Drawer functionality', () => {
    it('Should render with controlled drawer state', () => {
      const { rerender } = render(<Navbar drawerOpen={false} />);

      // Initial state should be closed
      expect(screen.queryByRole('dialog')).to.be.null;

      rerender(<Navbar drawerOpen={true} />);
      // Note: The drawer itself might not be rendered until NavbarDrawer is used
    });

    it('Should call onDrawerOpenChange when drawer state changes', () => {
      const onDrawerOpenChange = vi.fn();
      render(
        <Navbar onDrawerOpenChange={onDrawerOpenChange}>
          <Navbar.Toggle data-testid="toggle" />
        </Navbar>
      );

      fireEvent.click(screen.getByTestId('toggle'));
      expect(onDrawerOpenChange).toHaveBeenCalledWith(true);
    });

    it('Should handle uncontrolled drawer state', () => {
      const onDrawerOpenChange = vi.fn();
      render(
        <Navbar onDrawerOpenChange={onDrawerOpenChange}>
          <Navbar.Toggle data-testid="toggle" />
        </Navbar>
      );

      // NavbarToggle always calls onToggle(true), but Navbar handles the actual toggling
      // First click should open
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onDrawerOpenChange).toHaveBeenCalledWith(true);

      // Second click should also call with true, but Navbar's internal logic handles toggling
      fireEvent.click(screen.getByTestId('toggle'));
      expect(onDrawerOpenChange).toHaveBeenCalledWith(true);
      expect(onDrawerOpenChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Context provider', () => {
    it('Should provide context with correct values', () => {
      let contextValue: any;
      const TestComponent = () => {
        const context = React.useContext(NavbarContext);
        contextValue = context;
        return <div data-testid="test">Test</div>;
      };

      render(
        <Navbar appearance="inverse" drawerOpen={true}>
          <TestComponent />
        </Navbar>
      );

      expect(contextValue).to.have.property('appearance', 'inverse');
      expect(contextValue).to.have.property('open', true);
      expect(contextValue).to.have.property('navbarId');
      expect(contextValue).to.have.property('onToggle');
      expect(typeof contextValue.onToggle).to.equal('function');
    });

    it('Should generate unique navbar ID', () => {
      const ids: string[] = [];
      const TestComponent = () => {
        const context = React.useContext(NavbarContext);
        if (context?.navbarId) {
          ids.push(context.navbarId);
        }
        return null;
      };

      const { unmount } = render(
        <Navbar>
          <TestComponent />
        </Navbar>
      );
      unmount();

      render(
        <Navbar>
          <TestComponent />
        </Navbar>
      );

      expect(ids).to.have.length(2);
      expect(ids[0]).not.to.equal(ids[1]);
    });

    it('Should update context when props change', () => {
      let contextValue: any;
      const TestComponent = () => {
        const context = React.useContext(NavbarContext);
        contextValue = context;
        return null;
      };

      const { rerender } = render(
        <Navbar appearance="default" drawerOpen={false}>
          <TestComponent />
        </Navbar>
      );

      expect(contextValue.appearance).to.equal('default');
      expect(contextValue.open).to.equal(false);

      rerender(
        <Navbar appearance="subtle" drawerOpen={true}>
          <TestComponent />
        </Navbar>
      );

      expect(contextValue.appearance).to.equal('subtle');
      expect(contextValue.open).to.equal(true);
    });
  });

  describe('Subcomponents', () => {
    it('Should have correct subcomponents', () => {
      expect(Navbar.Brand).to.exist;
      expect(Navbar.Content).to.exist;
      expect(Navbar.Toggle).to.exist;
      expect(Navbar.Drawer).to.exist;
    });
  });

  describe('Custom element type', () => {
    it('Should render as custom element when as prop is provided', () => {
      const { container } = render(<Navbar as="header" />);
      expect(container.firstChild?.nodeName).to.equal('HEADER');
    });

    it('Should render as nav by default', () => {
      const { container } = render(<Navbar />);
      expect(container.firstChild?.nodeName).to.equal('NAV');
    });
  });
});
