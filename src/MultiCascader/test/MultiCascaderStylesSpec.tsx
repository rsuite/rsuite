import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiCascader from '../index';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockTreeData([['abcde', ['vv-abc', 'vv-abcd']]]);

describe('MultiCascader styles', () => {
  itChrome('Should render the correct caret', () => {
    render(<MultiCascader data={data} open />);

    const tree = screen.getByRole('tree');

    expect(tree.querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '8px 26px 8px 38px'
    );

    expect(tree.querySelector('[aria-label="angle right"]')).to.exist;
  });
});
