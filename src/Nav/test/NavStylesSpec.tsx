import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

import '../styles/index.less';

describe('Nav styles', () => {
  it('Should render the correct styles', () => {
    render(<Nav data-testid="nav" />);
    expect(screen.getByTestId('nav')).to.have.style('position', 'relative');
  });

  it('Should render <Dropdown> as subtle appearance', () => {
    render(
      <Nav>
        <Nav.Menu title="Dropdown">
          <Nav.Item>Dropdown item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(screen.getByRole('button')).to.have.style('background-color', 'rgba(0, 0, 0, 0)');
  });

  describe('Issue #2678', () => {
    it('Height of <Nav.Menu> should be consistent with that of <Nav.Item> (36px)', () => {
      render(
        <Nav>
          <Nav.Item>Item A</Nav.Item>
          <Nav.Menu title="Item-B" data-testid="menu">
            <Nav.Item>Item B-A</Nav.Item>
          </Nav.Menu>
        </Nav>
      );

      expect(screen.getByTestId('menu')).to.have.style('height', '36px');
    });
  });
});
