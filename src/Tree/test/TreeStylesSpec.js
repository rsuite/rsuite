import React from 'react';
import { render } from '@testing-library/react';
import Tree from '../index';
import { getStyle, inChrome } from '@test/testUtils';

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

describe('Tree styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    render(<Tree virtualized={false} data={data} ref={instanceRef} />);

    const itemLabel = instanceRef.current.root.querySelector('.rs-tree .rs-tree-node-label');
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '0px 0px 0px 16px');
  });
});
