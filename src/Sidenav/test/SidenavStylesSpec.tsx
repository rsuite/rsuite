import React from 'react';
import { render } from '@testing-library/react';
import { getDOMNode, getStyle, getDefaultPalette } from '@test/testUtils';
import Nav from '../../Nav';
import Dropdown from '../../Dropdown';
import Sidenav from '../Sidenav';

import '../styles/index.less';

describe('Sidenav styles', () => {
  context('Default', () => {
    it('Should render the correct styles', () => {
      const instanceRef = React.createRef<HTMLDivElement>();
      render(<Sidenav ref={instanceRef} expanded={false} />);
      const dom = getDOMNode(instanceRef.current);
      assert.equal(getStyle(dom, 'width'), '56px', 'Sidenav width');
    });

    it('Should highlight selected dropdown item', () => {
      const { getByTestId } = render(
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

      expect(getByTestId('item')).to.have.style('color', getDefaultPalette('H700'));
    });
  });

  context('Subtle', () => {
    it('Should highlight selected dropdown item', () => {
      const { getByTestId } = render(
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

      expect(getByTestId('item')).to.have.style('color', getDefaultPalette('H700'));
    });
  });
});
