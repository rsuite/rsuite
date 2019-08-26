import React from 'react';
import ReactDOM from 'react-dom';
import TagPicker from '../index';
import { createTestContainer, getStyle, inChrome } from '@test/testUtils';

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
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('TagPicker styles', () => {
  it('Should render the correct styles', () => {
    const containerDom = createTestContainer();
    ReactDOM.render(<TagPicker data={data} />, containerDom);
    const toggleDom = containerDom.querySelector('.rs-picker-input');
    toggleDom.click();
    const itemLabel = document.body.querySelector(
      '.rs-picker-check-menu-items .rs-checkbox-checker label'
    );
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 38px');
  });
});
