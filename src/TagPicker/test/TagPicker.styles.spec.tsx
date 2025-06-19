import React from 'react';
import TagPicker from '../index';
import type { BasicSize } from '@/internals/types';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/cases';
import { mockGroupData } from '@test/mocks/data-mock';

import '../styles/index.scss';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('TagPicker styles', () => {
  testPickerSize(TagPicker, { subtle: false });

  describe('Textbox', () => {
    const margins = [40, 34, 28, 22];

    ['lg', 'md', 'sm', 'xs'].forEach((size, index) => {
      it(`Should have correct margin-inline-end when size is ${size}`, () => {
        const { container } = render(<TagPicker data={data} size={size as BasicSize} open />);
        const textbox = container.querySelector('.rs-picker-textbox');

        expect(textbox).to.have.style('margin-inline-end', `${margins[index]}px`);
      });
    });
  });

  it('Should render the correct styles', () => {
    render(<TagPicker data={data} open />);
    const itemLabel = screen
      .getByTestId('picker-popup')
      .querySelector('.rs-picker-check-menu-items .rs-checkbox-checker label');

    expect(itemLabel).to.have.style('padding', '8px 12px');
  });
});
