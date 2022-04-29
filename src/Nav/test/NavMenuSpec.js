import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';
import userEvent from '@testing-library/user-event';

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

    userEvent.click(getByText('Menu'));
    expect(getByText('Menu item')).to.be.visible;
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

      userEvent.click(getByText('Menu'));
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

      userEvent.click(getByText('Menu'));
      expect(getByText('Menu item')).to.be.visible;
    });
  });
});
