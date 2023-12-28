import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';
import Input from '../Input';
import Sinon from 'sinon';

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
    const onChange = Sinon.spy();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = Sinon.spy();
    render(<Input onKeyDown={onKeyDown} />);
    fireEvent.keyDown(screen.getByRole('textbox'));

    expect(onKeyDown).to.have.been.calledOnce;
  });

  it('Should call onPressEnter callback', () => {
    const onPressEnter = Sinon.spy();
    render(<Input onPressEnter={onPressEnter} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(onPressEnter).to.have.been.calledOnce;
  });
});
