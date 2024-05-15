import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPicker from '../index';
import { toRGB, itChrome } from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('SelectPicker styles', () => {
  it('Default select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} open />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#fff'));
    expect(screen.getByRole('combobox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(screen.getByRole('combobox')).to.have.style('padding', '7px 32px 7px 11px');
    expect(screen.getByTestId('picker-popup').querySelector('.rs-picker-none')).to.have.style(
      'padding',
      '6px 12px 12px'
    );
  });

  it('Subtle select picker should render correct toggle styles', () => {
    render(<SelectPicker data={[]} appearance="subtle" />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#0000'));
    expect(screen.getByRole('combobox')).to.have.style('border-width', '0px');
    expect(screen.getByRole('combobox')).to.have.style('padding', '8px 32px 8px 12px');
  });

  itChrome('Select picker default toggle should render correct size', () => {
    render(
      <>
        <SelectPicker size="lg" placeholder="Large" data={data} />
        <SelectPicker size="md" placeholder="Medium" data={data} />
        <SelectPicker size="sm" placeholder="Small" data={data} />
        <SelectPicker size="xs" placeholder="Xsmall" data={data} />
      </>
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.style('padding', '9px 36px 9px 15px');
    expect(screen.getAllByRole('combobox')[1]).to.have.style('padding', '7px 32px 7px 11px');
    expect(screen.getAllByRole('combobox')[2]).to.have.style('padding', '4px 30px 4px 9px');
    expect(screen.getAllByRole('combobox')[3]).to.have.style('padding', '1px 28px 1px 7px');
  });

  itChrome('Select picker subtle toggle should render correct size', () => {
    render(
      <>
        <SelectPicker size="lg" appearance="subtle" placeholder="Large" data={data} />
        <SelectPicker size="md" appearance="subtle" placeholder="Medium" data={data} />
        <SelectPicker size="sm" appearance="subtle" placeholder="Small" data={data} />
        <SelectPicker size="xs" appearance="subtle" placeholder="Xsmall" data={data} />
      </>
    );

    expect(screen.getAllByRole('combobox')[0]).to.have.style('padding', '10px 36px 10px 16px');
    expect(screen.getAllByRole('combobox')[1]).to.have.style('padding', '8px 32px 8px 12px');
    expect(screen.getAllByRole('combobox')[2]).to.have.style('padding', '5px 30px 5px 10px');
    expect(screen.getAllByRole('combobox')[3]).to.have.style('padding', '2px 28px 2px 8px');
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

    render(<SelectPicker groupBy="role" data={data} menuClassName="group-test-menu" open />);

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
