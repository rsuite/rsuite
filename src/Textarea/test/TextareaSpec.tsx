import React from 'react';
import sinon from 'sinon';
import Textarea from '../Textarea';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';

describe('Textarea', () => {
  testStandardProps(<Textarea />, { sizes: ['lg', 'md', 'sm', 'xs'] });
  testControlledUnControlled(Textarea);
  testFormControl(Textarea);

  it('Should render a textarea', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox').tagName).to.equal('TEXTAREA');
    expect(screen.getByRole('textbox')).to.have.class('rs-textarea');
  });

  it('Should have rows attribute', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).to.have.attribute('rows', '5');
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    render(<Textarea onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(onChange).to.have.been.calledOnce;
  });

  it('Should support resize style', () => {
    render(<Textarea resize="vertical" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).to.have.attribute('style', '--rs-textarea-resize: vertical;');
  });
});
