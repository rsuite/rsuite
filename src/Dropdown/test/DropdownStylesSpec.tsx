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
    const dom = instanceRef.current as HTMLElement;
    const toggleDom = dom.querySelector('.rs-dropdown-toggle') as HTMLElement;
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

    expect(getByRole('button')).to.have.style('background-color', getGrayScale('B050'));
  });

  it('Should have 12px right padding given `noCaret=true`', () => {
    const { getByRole } = render(<Dropdown title="Dropdown" noCaret />);

    expect(getByRole('button')).to.have.style('padding-right', '12px');
  });
});
