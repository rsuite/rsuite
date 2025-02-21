import React from 'react';
import { render, screen } from '@testing-library/react';
import { toRGB, testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import InputPicker from '../index';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InputPicker styles', () => {
  testPickerSize(InputPicker, { maxHeight: 40 });
  it('Should render correct toggle styles', () => {
    const { container } = render(<InputPicker data={data} />);

    expect(container.firstChild).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(container.firstChild).to.have.style('background-color', `${toRGB('#fff')}`);
    expect(screen.getByRole('combobox')).to.have.style('height', '34px');
    expect(screen.getByRole('textbox')).to.have.style('border-style', 'none');
  });

  it('Should have correct height when disabled', () => {
    render(<InputPicker data={data} disabled />);

    expect(screen.getByRole('combobox')).to.have.style('height', '34px');
  });
});
