import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';

import MaskedInput from '../MaskedInput';

describe('MaskedInput', () => {
  it('Should render a input', () => {
    render(
      <MaskedInput
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect(screen.getByRole('textbox')).to.have.class('rs-input');
  });

  it('Should render default value', () => {
    render(
      <MaskedInput
        defaultValue="12345"
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    expect(screen.getByRole('textbox')).to.have.value('(123) 45_-____');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    render(
      <MaskedInput
        onChange={onChange}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12345' } });

    expect(onChange.calledOnce).to.true;
    expect(onChange).to.be.calledWithMatch('(123) 45_-____');
  });
});
