import React from 'react';
import Nav from '../Nav';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

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

  it('Should render subtle vertical Nav as flex column layout', () => {
    render(<Nav vertical appearance="subtle" data-testid="nav-vertical" />);

    const nav = screen.getByTestId('nav-vertical');
    expect(nav).to.have.style('display', 'flex');
    expect(nav).to.have.style('flex-direction', 'column');
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
