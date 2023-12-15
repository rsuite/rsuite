import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled } from '@test/utils';
import userEvent from '@testing-library/user-event';
import Input from '../Input';
import Sinon from 'sinon';

describe('Input', () => {
  testStandardProps(<Input />, { sizes: ['lg', 'md', 'sm', 'xs'] });

  testControlledUnControlled(Input, {
    defaultValue: 'foo',
    value: 'bar',
    changedValue: 'foobar',
    simulateEvent: {
      changeValue: () => {
        const input = screen.getByRole('textbox') as HTMLInputElement;

        userEvent.clear(input);
        userEvent.type(input, 'input');
        return { changedValue: 'input' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByRole('textbox')).to.value(value);
    },
    expectedTextValue: (value: string) => {
      expect(screen.getByRole('text')).to.have.text(value);
    }
  });

  it('Should render a input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).to.have.class('rs-input');
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
