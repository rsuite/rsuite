import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { toRGB, testPickerSize } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import SelectPicker from '../index';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('SelectPicker styles', () => {
  testPickerSize(SelectPicker);

  it('Default select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} open />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#fff'));
    expect(screen.getByRole('combobox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(screen.getByRole('combobox')).to.have.style('padding', '8px 11px');

    const popup = screen.getByTestId('picker-popup');
    const noneElement = within(popup).getByText('No results found');

    expect(noneElement).to.have.style('padding', '12px');
  });

  it('Subtle select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} appearance="subtle" />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#0000'));
    expect(screen.getByRole('combobox')).to.have.style('border-width', '0px');
    expect(screen.getByRole('combobox')).to.have.style('padding', '8px 12px');
  });

  it('Block select picker should render correct toggle styles', () => {
    const { container } = render(<SelectPicker block data={data} />);

    expect(container.firstChild).to.have.style('display', 'block');
  });

  it('Select picker group should render correct styles', () => {
    const data = [
      {
        label: 'Eugenia',
        value: 'Eugenia',
        role: 'Master'
      },
      {
        label: 'Kariane',
        value: 'Kariane',
        role: 'Developer'
      },
      {
        label: 'Louisa',
        value: 'Louisa',
        role: 'Master'
      }
    ];

    render(<SelectPicker groupBy="role" data={data} open />);

    const groups = screen.getAllByRole('group');

    expect(groups[1]).to.have.style('border-top', `1px solid ${toRGB('#e5e5ea')}`);
    expect(groups[1]).to.have.style('margin-top', '6px');
  });

  it('Disabled select picker should render correct toggle styles', () => {
    const { rerender } = render(<SelectPicker data={[]} disabled />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#f7f7fa'));

    rerender(<SelectPicker data={[]} appearance="subtle" disabled />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#0000'));
  });
});
