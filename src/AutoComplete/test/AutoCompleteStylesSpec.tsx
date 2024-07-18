import React from 'react';
import { render, screen } from '@testing-library/react';
import AutoComplete from '../index';
import { toRGB, inChrome } from '@test/utils';
import '../styles/index.less';

describe('AutoComplete styles', () => {
  it('Should render the correct styles', () => {
    render(<AutoComplete data={[]} />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#fff'));
    expect(screen.getByRole('combobox')).to.have.style('color', toRGB('#343434'));
    expect(screen.getByRole('combobox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(screen.getByRole('combobox')).to.have.style('border-radius', '6px');
  });

  it('Should render the correct styles when set `open`', () => {
    render(<AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />);

    const options = screen.getAllByRole('option');

    // Focused option
    const focusedBgColor = inChrome
      ? 'color(srgb 0.8 0.913725 1 / 0.5)'
      : 'color(srgb 0.8 0.913726 1 / 0.5)';
    expect(options[0].firstChild).to.have.style('color', toRGB('#1675e0'));
    expect(options[0].firstChild).to.have.style('background-color', focusedBgColor);

    // Unfocused option
    expect(options[1].firstChild).to.have.style('color', toRGB('#343434'));
    expect(options[1].firstChild).to.have.style('background-color', toRGB('#0000'));
  });

  it('Should render the correct styles when set `disabled`', () => {
    render(<AutoComplete data={[]} disabled />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#f7f7fa'));
    expect(screen.getByRole('combobox')).to.have.style('color', toRGB('#717273'));
  });
});
