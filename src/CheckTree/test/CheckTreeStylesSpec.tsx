import React from 'react';
import { render } from '@testing-library/react';
import CheckTree from '../index';
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

describe('CheckTree styles', () => {
  it('Should render the correct styles', () => {
    render(<CheckTree virtualized={false} data={data} />);
    const itemLabel = document.body.querySelector(
      '.rs-check-tree .rs-check-tree-node'
    ) as HTMLElement;
    inChrome && assert.equal(getStyle(itemLabel, 'padding'), '0px 0px 0px 12px');
  });
});
