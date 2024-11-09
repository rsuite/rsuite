import React from 'react';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';
import Nav from '../../Nav';
import Navbar from '../Navbar';

import '../styles/index.less';

describe('Navbar styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Navbar ref={instanceRef} />);
    const dom = instanceRef.current as Element;
    expect(dom).to.have.style('background-color', toRGB('#f7f7fa'));
  });

  context('Navbar.Item', () => {
    it('Should render an 16px icon with 5px gap against text content', () => {
      render(
        <Navbar>
          <Nav>
            <Nav.Item icon={<i data-testid="icon" />}>Home</Nav.Item>
          </Nav>
        </Navbar>
      );

      expect(screen.getByTestId('icon'))
        .to.have.style('font-size', '16px')
        .and.to.have.style('margin-right', '5px');
    });
  });
});
