import React from 'react';
import MaskedInput from '../MaskedInput';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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
    const onChange = vi.fn();
    render(
      <MaskedInput
        onChange={onChange}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12345' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('(123) 45_-____');
  });
});
