import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';
import CheckTreePicker from '../index';
import '../styles/index.less';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('CheckTreePicker styles', () => {
  testPickerSize(CheckTreePicker, { data: [] });

  it('Should render the correct styles', () => {
    render(<CheckTreePicker data={data} open />);

    expect(screen.getByRole('tree').querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '2px 2px 2px 38px'
    );
  });

  it('Should render the correct styles when data has only one level structure', () => {
    render(<CheckTreePicker data={[{ value: 1, label: 1 }]} open />);

    expect(screen.getByRole('tree').querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '2px 2px 2px 38px'
    );
  });

  it('Should render the correct styles when first level data is unchecked', () => {
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

    expect(screen.getByRole('tree').querySelector('.rs-checkbox-checker label')).to.have.style(
      'padding',
      '2px'
    );
  });
});
