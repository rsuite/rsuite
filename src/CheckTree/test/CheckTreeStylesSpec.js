import React from 'react';
import ReactDOM from 'react-dom';
import CheckTree from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

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

describe('CheckTree styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<CheckTree data={data} ref={instanceRef} />, createTestContainer());
    const itemLabel = document.body.querySelector('.rs-check-tree .rs-checkbox-checker label');
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 58px');
  });
});
