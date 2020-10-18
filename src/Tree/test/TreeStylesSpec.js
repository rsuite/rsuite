import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../index';
import { createTestContainer, getStyle, inChrome } from '@test/testUtils';

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
    ReactDOM.render(
      <Tree virtualized={false} data={data} ref={instanceRef} />,
      createTestContainer()
    );
    const itemLabel = document.body.querySelector('.rs-tree .rs-tree-node-label');
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '0px 0px 0px 16px');
  });
});
