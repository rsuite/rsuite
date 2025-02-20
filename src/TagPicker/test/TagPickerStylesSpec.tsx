import React from 'react';
import TagPicker from '../index';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('TagPicker styles', () => {
  testPickerSize(TagPicker, { subtle: false });

  it('Should render the correct styles', () => {
    render(<TagPicker data={data} open />);
    const itemLabel = screen
      .getByTestId('picker-popup')
      .querySelector('.rs-picker-check-menu-items .rs-checkbox-checker label');

    expect(itemLabel).to.have.style('padding', '8px 12px');
  });
});
