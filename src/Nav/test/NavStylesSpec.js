import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../Nav';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Nav styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<Nav ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'position'), 'relative', 'Nav position');
  });

  it('Should render <Dropdown> as subtle appearance', () => {
    const { getByRole } = render(
      <Nav>
        <Nav.Dropdown title="Dropdown">
          <Nav.Dropdown.Item>Dropdown item</Nav.Dropdown.Item>
        </Nav.Dropdown>
      </Nav>
    );

    expect(getByRole('button')).to.have.style('backgroundColor', 'rgba(0, 0, 0, 0)');
  });
});
