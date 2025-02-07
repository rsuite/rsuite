import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import MultiCascader from '../index';
import '../styles/index.less';

const data = mockTreeData([['node-1', ['node-1', 'node-3']]]);

describe('MultiCascader styles', () => {
  testPickerSize(MultiCascader);

  it('Should render the correct caret', () => {
    render(<MultiCascader data={data} open />);

    const tree = screen.getByRole('tree');

    expect(tree.querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '8px 26px 8px 38px'
    );

    expect(tree.querySelector('[aria-label="arrow right line"]')).to.exist;
  });
});
