import React from 'react';
import AutoComplete from '../index';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { toRGB } from '@test/utils';
import '../styles/index.scss';

describe('AutoComplete styles', () => {
  it('Should render the correct styles', () => {
    render(<AutoComplete data={[]} />);

    expect(screen.getByRole('combobox')).to.have.style('background-color', toRGB('#fff'));
    expect(screen.getByRole('combobox')).to.have.style('color', toRGB('#343434'));
    expect(screen.getByRole('combobox')).to.have.style('border', `1px solid ${toRGB('#e5e5ea')}`);
    expect(screen.getByRole('combobox')).to.have.style('border-radius', '6px');
  });

  it('Should render the correct styles when set `open`', () => {
    render(
      <>
        <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />
        <div
          data-testid="focused-background"
          style={{ backgroundColor: 'rgb(from #cce9ff r g b / 50%)' }}
        />
      </>
    );

    const options = screen.getAllByRole('option');

    // Focused option
    // Let each browser serialize the expected color instead of guessing its precision.
    const focusedBgColor = getComputedStyle(
      screen.getByTestId('focused-background')
    ).backgroundColor;
    expect(options[0].firstChild).to.have.style('color', toRGB('#0a5dc2'));
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
