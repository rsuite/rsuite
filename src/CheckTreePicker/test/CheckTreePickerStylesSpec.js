import React from 'react';
import { render } from '@testing-library/react';
import CheckTreePicker from '../index';
import { getStyle, itChrome } from '@test/testUtils';

import '../styles/index.less';

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
    render(<CheckTreePicker data={data} ref={instanceRef} open />);
    const itemLabel = document.body.querySelector('.rs-check-tree .rs-checkbox-checker label');
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 50px');
  });

  itChrome('Should render the correct styles when data has only one level structure', () => {
    const instanceRef = React.createRef();
    render(<CheckTreePicker data={[{ value: 1, label: 1 }]} ref={instanceRef} open />);
    const itemLabel = document.body.querySelector('.rs-check-tree .rs-checkbox-checker label');
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 32px');
  });

  itChrome('Should render the correct styles when first level data is unchecked', () => {
    const instanceRef = React.createRef();
    render(
      <CheckTreePicker
        data={[
          { value: 1, label: '1', children: [{ value: 2, label: '2' }] },
          { value: 3, label: '3' }
        ]}
        uncheckableItemValues={[1, 3]}
        ref={instanceRef}
        open
      />
    );
    const itemLabel = document.body.querySelector('.rs-check-tree .rs-checkbox-checker label');
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 22px');
  });
});
