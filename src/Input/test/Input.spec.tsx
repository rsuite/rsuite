import React from 'react';
import Input from '../Input';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/cases';

describe('Input', () => {
  testStandardProps(<Input />, { sizes: ['lg', 'md', 'sm', 'xs'] });
  testControlledUnControlled(Input);
  testFormControl(Input);

  it('Should render a input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).to.have.class('rs-input');
  });

  it('Should have a size attribute on input element', () => {
    render(<Input htmlSize={20} />);
    expect(screen.getByRole('textbox')).to.have.attribute('size', '20');
  });

  it('Should call onChange callback', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = vi.fn();
    render(<Input onKeyDown={onKeyDown} />);
    fireEvent.keyDown(screen.getByRole('textbox'));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('Should call onPressEnter callback', () => {
    const onPressEnter = vi.fn();
    render(<Input onPressEnter={onPressEnter} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });
});
