import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import CheckPicker from '../index';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('CheckPicker styles', () => {
  testPickerSize(CheckPicker);

  it('Should render the correct styles', () => {
    render(<CheckPicker data={data} open />);

    const menuItemLabel = screen
      .getByRole('listbox')
      .querySelector('.rs-picker-check-menu-items .rs-checkbox-checker label');

    expect(menuItemLabel).to.have.style('padding', '8px 12px 8px 38px');
  });

  it('Should change the width of the virtualized list', () => {
    render(<CheckPicker data={data} style={{ width: 400 }} virtualized />);

    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByRole('listbox').querySelector('.rs-virt-list')).to.have.style(
      'width',
      '400px'
    );
  });
});
