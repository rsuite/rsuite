import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<Nav.Menu>', () => {
  it('Should render a nav item with given title text that shows more items when clicked', () => {
    render(
      <Nav>
        <Nav.Menu title="Menu">
          <Nav.Item>Menu item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(screen.getByText('Menu')).to.exist;

    fireEvent.click(screen.getByText('Menu'));

    expect(screen.getByText('Menu item')).to.be.visible;
  });

  context('Within another <Nav.Menu>', () => {
    it('Should render a menu item that opens a submenu when hovered ', () => {
      render(
        <Nav.Menu title="Menu">
          <Nav.Menu title="Submenu">
            <Nav.Item>Submenu item</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>,
        {
          wrapper: Nav
        }
      );

      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByText('Submenu')).to.exist;

      fireEvent.mouseOver(screen.getByText('Submenu'));

      expect(screen.getByText('Submenu item')).to.be.visible;
    });

    it('Should render a nested submenu without a arrow icon', () => {
      render(
        <Nav.Menu title="Menu">
          <Nav.Menu title="Submenu" noCaret />
        </Nav.Menu>,
        {
          wrapper: Nav
        }
      );

      expect(screen.getByText('Submenu').querySelector('.rs-dropdown-menu-toggle-icon')).to.not
        .exist;
    });
  });

  context('Within <Navbar>', () => {
    it('Should render a navbar item with given title text that shows more items when clicked', () => {
      render(
        <Navbar>
          <Nav>
            <Nav.Menu title="Menu">
              <Nav.Item>Menu item</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Navbar>
      );

      expect(screen.getByText('Menu')).to.exist;

      fireEvent.click(screen.getByText('Menu'));

      expect(screen.getByText('Menu item')).to.be.visible;
    });
  });

  context('Within <Sidenav>', () => {
    it('Should render a sidenav item with given title text that shows more items when clicked', () => {
      render(
        <Sidenav>
          <Nav>
            <Nav.Menu title="Menu">
              <Nav.Item>Menu item</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav>
      );

      expect(screen.getByText('Menu')).to.exist;

      fireEvent.click(screen.getByText('Menu'));
      expect(screen.getByText('Menu item')).to.be.visible;
    });
  });
  context('rendering icon', () => {
    it('Should render an icon', () => {
      render(
        <Nav>
          <Nav.Menu title="Menu">
            <Nav.Item icon={<div data-testid="icon" />} />
          </Nav.Menu>
        </Nav>
      );

      expect(screen.getByTestId('icon')).to.exist;
    });

    it('Should render an icon without overriding className', () => {
      render(
        <Nav>
          <Nav.Menu title="Menu">
            <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
          </Nav.Menu>
        </Nav>
      );
      expect(screen.getByTestId('icon')).to.have.class('custom-icon');
    });

    context('Within <Navbar>', () => {
      it('Should render an icon without overriding className', () => {
        render(
          <Navbar>
            <Nav>
              <Nav.Menu title="Menu">
                <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
              </Nav.Menu>
            </Nav>
          </Navbar>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
    });
    context('Within <Sidenav>', () => {
      it('When expanded is true Should render an icon without overriding className', () => {
        render(
          <Sidenav>
            <Nav>
              <Nav.Menu title="Menu">
                <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
              </Nav.Menu>
            </Nav>
          </Sidenav>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
      it('When expanded is false Should render an icon without overriding className', () => {
        render(
          <Sidenav expanded={false}>
            <Nav>
              <Nav.Menu title="Menu">
                <Nav.Item icon={<div data-testid="icon" className="custom-icon" />} />
              </Nav.Menu>
            </Nav>
          </Sidenav>
        );
        expect(screen.getByTestId('icon')).to.have.class('custom-icon');
      });
    });
  });
});
