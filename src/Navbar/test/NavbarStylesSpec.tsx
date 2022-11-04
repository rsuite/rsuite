import React from 'react';
import { render } from '@testing-library/react';
import { getDOMNode, getStyle, toRGB } from '@test/testUtils';
import Nav from '../../Nav';
import Navbar from '../Navbar';

import '../styles/index.less';

describe('Navbar styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Navbar ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#f7f7fa'), 'NavBar background-color');
  });

  context('Navbar.Item', () => {
    it('Should render an 16px icon with 5px gap against text content', () => {
      const { getByTestId } = render(
        <Navbar>
          <Nav>
            <Nav.Item icon={<i className="rs-icon" data-testid="icon" />}>Home</Nav.Item>
          </Nav>
        </Navbar>
      );

      expect(getByTestId('icon'))
        .to.have.style('font-size', '16px')
        .and.to.have.style('margin-right', '5px');
    });
  });
});
