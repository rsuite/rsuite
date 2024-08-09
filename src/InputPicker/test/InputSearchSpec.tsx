import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import InputAutosize from '../InputAutosize';
import InputSearch from '../InputSearch';
import Sinon from 'sinon';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('InputPicker - InputSearch', () => {
  testStandardProps(<InputSearch />);

  it('Should render a div with `rs-picker-search` class', () => {
    const { container } = render(<InputSearch />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-picker-search');
  });

  it('Should render a input', () => {
    const { container } = render(<InputSearch />);

    //eslint-disable-next-line
    expect(container.querySelectorAll('.rs-picker-search-input')).to.have.lengthOf(1);
  });

  it('Should have a InputAutosize', () => {
    const { container } = render(<InputSearch as={InputAutosize} />);

    //eslint-disable-next-line
    expect(container.querySelector('.rs-picker-search-input')).to.exist;
    //eslint-disable-next-line
    expect(container.querySelector('.rs-picker-search-input input')).to.exist;
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const { container } = render(<InputSearch onChange={onChange} />);
    //eslint-disable-next-line
    ReactTestUtils.Simulate.change(container.querySelector('input') as HTMLInputElement);

    expect(onChange).to.have.been.calledOnce;
  });
});
