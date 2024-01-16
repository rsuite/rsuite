import React from 'react';
import { render } from '@testing-library/react';
import CheckTreePicker from '../index';
import { getStyle, itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTreePicker styles', () => {
  itChrome('Should render the correct styles', () => {
    render(<CheckTreePicker data={data} open />);
    const itemLabel = document.body.querySelector(
      '.rs-check-tree .rs-checkbox-checker label'
    ) as HTMLLabelElement;
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 50px');
  });

  itChrome('Should render the correct styles when data has only one level structure', () => {
    render(<CheckTreePicker data={[{ value: 1, label: 1 }]} open />);
    const itemLabel = document.body.querySelector(
      '.rs-check-tree .rs-checkbox-checker label'
    ) as HTMLLabelElement;
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 32px');
  });

  itChrome('Should render the correct styles when first level data is unchecked', () => {
    render(
      <CheckTreePicker
        data={[
          { value: 1, label: '1', children: [{ value: 2, label: '2' }] },
          { value: 3, label: '3' }
        ]}
        uncheckableItemValues={[1, 3]}
        open
      />
    );
    const itemLabel = document.body.querySelector(
      '.rs-check-tree .rs-checkbox-checker label'
    ) as HTMLLabelElement;
    assert.equal(getStyle(itemLabel, 'padding'), '8px 12px 8px 22px');
  });
});
