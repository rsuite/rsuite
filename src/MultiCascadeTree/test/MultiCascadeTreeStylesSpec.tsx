import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiCascadeTree from '../MultiCascadeTree';
import { itChrome } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockTreeData([['1', ['2', '2-1']]]);

describe('MultiCascadeTree styles', () => {
  itChrome('Should render the correct caret', () => {
    render(<MultiCascadeTree data={data} />);

    const tree = screen.getByRole('tree');

    expect(tree.querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '8px 26px 8px 38px'
    );

    expect(tree.querySelector('[aria-label="arrow right line"]')).to.exist;
  });
});
