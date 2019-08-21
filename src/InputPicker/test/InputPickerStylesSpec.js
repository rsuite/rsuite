import React from 'react';
import ReactDOM from 'react-dom';
import InputPicker from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Developer'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

const { H700 } = getDefaultPalette();

describe('InputPicker styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<InputPicker ref={instanceRef} data={data} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const toggleDom = dom.querySelector('.rs-picker-toggle');
    const toggleInputDom = dom.querySelector('.rs-picker-search-input');
    assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'Picker border');

    toggleDom.click();
    assert.equal(getStyle(dom, 'border'), `1px solid ${H700}`, 'Picker active border');
    assert.equal(getStyle(toggleDom, 'height'), '34px', 'Toggle height');
    assert.equal(getStyle(toggleInputDom, 'border-style'), 'none', 'Toggle input border');
  });
});
