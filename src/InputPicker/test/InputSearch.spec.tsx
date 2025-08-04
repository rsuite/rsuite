import React from 'react';
import InputAutosize from '../InputAutosize';
import InputSearch from '../InputSearch';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('InputPicker - InputSearch', () => {
  testStandardProps(<InputSearch />);

  it('Should render a div with `rs-picker-search` class', () => {
    const { container } = render(<InputSearch />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-picker-search');
  });

  it('Should render a input', () => {
    render(<InputSearch />);

    expect(screen.getByRole('textbox')).to.exist;
  });

  it('Should have a InputAutosize', () => {
    const { container } = render(<InputSearch as={InputAutosize} />);

    expect(container.querySelector('.rs-picker-search-input')).to.exist;
    expect(container.querySelector('.rs-picker-search-input input')).to.exist;
  });

  it('Should call onChange callback', () => {
    const onChange = vi.fn();
    render(<InputSearch onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
