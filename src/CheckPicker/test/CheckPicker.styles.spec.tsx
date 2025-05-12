import React from 'react';
import CheckPicker from '../index';
import { getWidth } from 'dom-lib';
import { describe, expect, it } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';

import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('CheckPicker styles', () => {
  testPickerSize(CheckPicker);

  it('Should render the correct styles', () => {
    render(<CheckPicker data={data} open />);

    const menuItemLabel = screen
      .getByRole('listbox')
      .querySelector('.rs-picker-check-menu-items .rs-checkbox-checker label');

    expect(menuItemLabel).to.have.style('padding', '8px 12px');
  });

  it('Should change the width of the virtualized list', () => {
    render(<CheckPicker data={data} style={{ width: 400 }} virtualized />);

    fireEvent.click(screen.getByRole('combobox'));

    const virtList = screen.getByRole('listbox').querySelector('.rs-virt-list');
    expect(virtList).to.exist;
    const computedWidth = getWidth(virtList as Element);

    // Check that the width is approximately 400px (allow for small differences in browser rendering)
    expect(computedWidth).to.be.closeTo(400, 15);
  });
});
