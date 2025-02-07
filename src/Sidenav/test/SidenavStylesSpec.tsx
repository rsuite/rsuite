import React from 'react';
import { render, screen } from '@testing-library/react';
import { getDefaultPalette } from '@test/utils';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Sidenav from '../Sidenav';

import '../styles/index.less';

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
            <Nav.Menu title="Menu">
              <Nav.Item>Child Item</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
        </Nav>
      </Sidenav>
    );

    expect(screen.getByText('Child Item')).to.have.style('display', 'flex');
  });

  context('Default', () => {
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

  context('Subtle', () => {
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
