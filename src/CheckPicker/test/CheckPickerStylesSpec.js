import React from 'react';
import ReactDOM from 'react-dom';
import CheckPicker from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

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

describe('CheckPicker styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<CheckPicker data={data} ref={instanceRef} />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    toggleDom.click();
    const menuItemLabel = document.body.querySelector(
      '.rs-picker-check-menu-items .rs-checkbox-checker label'
    );
    inChrome && assert.equal(getStyle(menuItemLabel, 'padding'), '8px 12px 8px 38px');
  });
});
