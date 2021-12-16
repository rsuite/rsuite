import React from 'react';
import { render } from '@testing-library/react';
import { getStyle, inChrome, getGrayScale } from '@test/testUtils';
import Dropdown from '../Dropdown';

import '../styles/index.less';

describe('Dropdown styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(
      <Dropdown title="Default" ref={instanceRef}>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>
    );
    const dom = instanceRef.current;
    const toggleDom = dom.querySelector('.rs-dropdown-toggle');
    assert.equal(getStyle(dom, 'position'), 'relative', 'Dropdown  position');
    inChrome &&
      assert.equal(
        getStyle(toggleDom, 'padding'),
        '8px 32px 8px 12px',
        'Dropdown toggle button  padding'
      );
    assert.isNotNull(
      toggleDom.querySelector('[aria-label="angle down"]'),
      'Dropdown toggle button caret content'
    );
  });

  it('Should render a Button in default appearance', () => {
    const { getByRole } = render(<Dropdown title="Dropdown" />);

    expect(getByRole('button')).to.have.style('backgroundColor', getGrayScale('B050'));
  });
});
