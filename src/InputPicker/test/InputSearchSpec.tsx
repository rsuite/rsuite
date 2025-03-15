import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import InputAutosize from '../InputAutosize';
import InputSearch from '../InputSearch';
import { testStandardProps } from '@test/utils';

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
    const onChange = sinon.spy();
    render(<InputSearch onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(onChange).to.have.been.calledOnce;
  });
});
