import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import TagPicker from '../index';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('TagPicker styles', () => {
  testPickerSize(TagPicker, { maxHeight: 40, subtle: false });
  it('Should render the correct styles', () => {
    render(<TagPicker data={data} open />);
    const itemLabel = screen
      .getByRole('listbox')
      .querySelector('.rs-picker-check-menu-items .rs-checkbox-checker label');

    expect(itemLabel).to.have.style('padding', '8px 12px 8px 38px');
  });
});
