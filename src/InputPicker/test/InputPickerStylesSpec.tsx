import React from 'react';
import { render, screen } from '@testing-library/react';
import InputPicker from '../index';
import Button from '../../Button';
import { toRGB } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InputPicker styles', () => {
  it('Should render correct toggle styles', () => {
    const { container } = render(<InputPicker data={data} />);

    expect(container.firstChild).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(container.firstChild).to.have.style('background-color', `${toRGB('#fff')}`);
    expect(screen.getByRole('combobox')).to.have.style('height', '34px');
    expect(screen.getByRole('textbox')).to.have.style('border-style', 'none');
  });

  it('Should render correct large size', () => {
    render(<InputPicker toggleAs={Button} size="lg" data={data} />);
    expect(screen.getByRole('combobox')).to.have.class('rs-btn-lg');
    expect(screen.getByRole('combobox')).to.have.style('height', '40px');
  });

  it('Should render correct middle size ', () => {
    render(<InputPicker toggleAs={Button} size="md" data={data} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn-md');
    expect(screen.getByRole('combobox')).to.have.style('height', '34px');
  });

  it('Should render correct small size ', () => {
    render(<InputPicker toggleAs={Button} size="sm" data={data} />);
    expect(screen.getByRole('combobox')).to.have.class('rs-btn-sm');
    expect(screen.getByRole('combobox')).to.have.style('height', '28px');
  });

  it('Should render correct xsmall size ', () => {
    render(<InputPicker toggleAs={Button} size="xs" data={data} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn-xs');
    expect(screen.getByRole('combobox')).to.have.style('height', '22px');
  });

  it('Should have correct height when disabled', () => {
    render(<InputPicker data={data} disabled />);

    expect(screen.getByRole('combobox')).to.have.style('height', '34px');
  });
});
