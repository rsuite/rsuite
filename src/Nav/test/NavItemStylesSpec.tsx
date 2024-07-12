import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../index';
import { toRGB, getDefaultPalette } from '@test/utils';
import '../styles/index.less';

const { H700 } = getDefaultPalette();

describe('NavItem styles', () => {
  it('Default NavItem should render the correct styles', () => {
    render(
      <Nav>
        <Nav.Item>Nav item</Nav.Item>
      </Nav>
    );
    const navItem = screen.getByText('Nav item');

    expect(navItem).to.have.style('padding', '8px 12px');
    expect(navItem).to.have.style('color', toRGB('#343434'));
  });

  it('Default NavItem should render the correct styles when active', () => {
    render(
      <Nav>
        <Nav.Item active>Active nav item</Nav.Item>
      </Nav>
    );
    const navItemActive = screen.getByText('Active nav item');

    expect(navItemActive).to.have.style('color', H700);
  });

  it('Default NavItem should render the correct styles when disabled', () => {
    render(
      <Nav>
        <Nav.Item disabled>Disabled nav item</Nav.Item>
      </Nav>
    );

    const navItemDisabled = screen.getByText('Disabled nav item');

    expect(navItemDisabled).to.have.style('color', toRGB('#717273'));
    expect(navItemDisabled).to.have.style('cursor', 'not-allowed');
  });
});
