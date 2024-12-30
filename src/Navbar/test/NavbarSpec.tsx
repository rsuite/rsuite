import React from 'react';
import sinon from 'sinon';
import Navbar from '../Navbar';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Whisper from '../../Whisper';
import Tooltip from '../../Tooltip';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

afterEach(() => {
  sinon.restore();
});

describe('Navbar', () => {
  testStandardProps(<Navbar />);

  it('Should render a navbar', () => {
    const { container } = render(<Navbar />);
    expect(container.firstChild).to.have.class('rs-navbar');
  });

  it('Should have a `navbar-nav` className in `nav`', () => {
    render(
      <Navbar>
        <Nav data-testid="nav">1</Nav>
      </Navbar>
    );

    expect(screen.getByTestId('nav')).to.have.class('rs-navbar-nav');
  });

  context('Nav.Menu within Navbar', () => {
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

  context('[Deprecated] Use <Dropdown> within <Navbar>', () => {
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

      expect(screen.getByText('Company')).not.to.be.visible;

      // Clicking the button opens the disclosure
      fireEvent.click(screen.getByText('About'));
      expect(screen.getByText('Company')).to.be.visible;
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

      expect(screen.getByText('Submenu item')).not.to.be.visible;
      fireEvent.mouseOver(screen.getByText('Submenu'));
      expect(screen.getByText('Submenu item')).to.be.visible;
    });

    it('Should not get validateDOMNesting warning', () => {
      sinon.spy(console, 'error');

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

      expect(console.error).not.to.have.been.calledWith(sinon.match(/Warning: validateDOMNesting/));
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
      expect(screen.getByText('Company')).not.to.be.visible;
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

      expect(screen.getByText('Submenu item')).not.to.be.visible;
      fireEvent.mouseOver(screen.getByText('Submenu'));
      fireEvent.click(screen.getByText('Submenu item'));

      expect(screen.getByText('Submenu')).not.to.be.visible;
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
      const onSelectSpy = sinon.spy();
      render(
        <Navbar>
          <Nav activeKey="2-1" onSelect={onSelectSpy}>
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
      expect(onSelectSpy).to.have.been.calledWith('2-1', sinon.match.any);
    });
  });

  context('Issue #2263', () => {
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
});
