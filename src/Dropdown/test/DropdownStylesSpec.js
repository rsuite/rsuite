import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../index';
import { createTestContainer, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Dropdown styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Dropdown title="Default" ref={instanceRef}>
        <Dropdown.Item>1</Dropdown.Item>
        <Dropdown.Item>2</Dropdown.Item>
      </Dropdown>,
      createTestContainer()
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
});
