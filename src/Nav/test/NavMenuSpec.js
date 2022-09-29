import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<Nav.Menu>', () => {
  it('Should render a nav item with given title text that shows more items when clicked', () => {
    const { getByText } = render(
      <Nav>
        <Nav.Menu title="Menu">
          <Nav.Item>Menu item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(getByText('Menu')).to.exist;

    act(() => {
      fireEvent.click(getByText('Menu'));
    });

    expect(getByText('Menu item')).to.be.visible;
  });

  context('Within another <Nav.Menu>', () => {
    it('Should render a menu item that opens a submenu when hovered ', () => {
      const { getByText } = render(
        <Nav.Menu title="Menu">
          <Nav.Menu title="Submenu">
            <Nav.Item>Submenu item</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>,
        {
          wrapper: Nav
        }
      );

      act(() => {
        fireEvent.click(getByText('Menu'));
      });

      expect(getByText('Submenu')).to.exist;

      act(() => {
        fireEvent.mouseOver(getByText('Submenu'));
      });

      expect(getByText('Submenu item')).to.be.visible;
    });
  });

  context('Within <Navbar>', () => {
    it('Should render a navbar item with given title text that shows more items when clicked', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Nav.Menu title="Menu">
              <Nav.Item>Menu item</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Navbar>
      );

      expect(getByText('Menu')).to.exist;

      act(() => {
        fireEvent.click(getByText('Menu'));
      });

      expect(getByText('Menu item')).to.be.visible;
    });
  });

  context('Within <Sidenav>', () => {
    it('Should render a sidenav item with given title text that shows more items when clicked', () => {
      const { getByText } = render(
        <Sidenav>
          <Nav>
            <Nav.Menu title="Menu">
              <Nav.Item>Menu item</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav>
      );

      expect(getByText('Menu')).to.exist;

      fireEvent.click(getByText('Menu'));
      expect(getByText('Menu item')).to.be.visible;
    });
  });
});
