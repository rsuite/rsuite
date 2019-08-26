import React from 'react';
import ReactDOM from 'react-dom';
import CheckTreePicker from '../index';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

describe('CheckTreePicker styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<CheckTreePicker data={data} ref={instanceRef} />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    toggleDom.click();
    const itemLabel = document.body.querySelector('.rs-check-tree .rs-checkbox-checker label');
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 58px');
  });
});
