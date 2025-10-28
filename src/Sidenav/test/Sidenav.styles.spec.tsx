import React from 'react';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Sidenav from '../Sidenav';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getDefaultPalette } from '@test/utils';

import '../styles/index.scss';

describe('Sidenav styles', () => {
  it('Should be collapsed', () => {
    const { container } = render(<Sidenav expanded={false} />);

    expect(container.firstChild).to.have.style('width', '52px');
  });

  it('Should render Nav.Item as block', () => {
    render(
      <Sidenav>
        <Nav>
          <Nav.Menu title="Menu">
            <Nav.Item>Child Item</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByText('Child Item')).to.have.style('display', 'flex');
  });

  it('Should hide collapsed dropdown menu by default', () => {
    render(
      <Sidenav>
        <Nav>
          <Dropdown title="Dropdown">
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    const dropdownMenu = screen.getByText('Dropdown Item').closest('ul');
    expect(dropdownMenu).to.have.class('rs-dropdown-menu-collapse-out');
    expect(dropdownMenu).to.have.style('display', 'none');
  });

  it('Should display expanded dropdown menu', async () => {
    render(
      <Sidenav>
        <Nav>
          <Dropdown title="Dropdown">
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Sidenav>
    );

    fireEvent.click(screen.getByText('Dropdown'));

    const dropdownMenu = screen.getByText('Dropdown Item').closest('ul');

    await waitFor(() => {
      expect(dropdownMenu).to.have.class('rs-dropdown-menu-collapse-in');
    });

    expect(dropdownMenu).to.have.style('display', 'flex');
  });

  describe('Default', () => {
    it('Should highlight selected dropdown item', () => {
      render(
        <Sidenav>
          <Nav>
            <Dropdown title="Dropdown">
              <Dropdown.Item data-testid="item" active>
                Dropdown Item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav>
      );

      expect(screen.getByTestId('item')).to.have.style('color', getDefaultPalette('H700'));
    });
  });

  describe('Subtle', () => {
    it('Should highlight selected dropdown item', () => {
      render(
        <Sidenav appearance="subtle">
          <Nav>
            <Dropdown title="Dropdown">
              <Dropdown.Item data-testid="item" active>
                Dropdown Item
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav>
      );

      expect(screen.getByTestId('item')).to.have.style('color', getDefaultPalette('H700'));
    });
  });
});
