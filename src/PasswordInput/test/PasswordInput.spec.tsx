import React from 'react';
import PasswordInput from '../PasswordInput';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('PasswordInput', () => {
  testStandardProps(<PasswordInput />);

  it('Should be disabled', () => {
    render(<PasswordInput disabled placeholder="disabled-input" />);
    expect(screen.getByPlaceholderText('disabled-input')).to.have.property('disabled', true);
    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('Should be read only', () => {
    render(<PasswordInput readOnly placeholder="readonly-input" />);
    expect(screen.getByPlaceholderText('readonly-input')).to.have.property('readOnly', true);
  });

  it('Should render an input of type password by default', () => {
    render(<PasswordInput placeholder="test-password" />);

    const input = screen.getByPlaceholderText('test-password');

    expect(input).to.exist;
    expect(input).to.have.attr('type', 'password');
  });

  it('Should toggle to type text when visibility icon is clicked', () => {
    render(<PasswordInput placeholder="visible-toggle" />);
    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText('visible-toggle');
    // Default is password
    expect(input).to.have.attr('type', 'password');

    fireEvent.click(button);
    expect(input).to.have.attr('type', 'text');

    fireEvent.click(button);
    expect(input).to.have.attr('type', 'password');
  });

  it('Should call onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<PasswordInput onChange={handleChange} placeholder="change-input" />);

    const input = screen.getByPlaceholderText('change-input');

    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledWith('123', expect.any(Object));
  });

  it('Should call onVisibleChange when toggled', () => {
    const handleVisibleChange = vi.fn();

    render(<PasswordInput onVisibleChange={handleVisibleChange} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleVisibleChange).toHaveBeenCalledWith(true);

    fireEvent.click(button);
    expect(handleVisibleChange).toHaveBeenCalledWith(false);
  });

  it('Should render custom visibility icon', () => {
    render(
      <PasswordInput
        renderVisibilityIcon={visible => <span>{visible ? '🙈' : '👀'}</span>}
        placeholder="icon-input"
      />
    );

    // Default: not visible
    expect(screen.getByText('👀')).to.exist;
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('🙈')).to.exist;
  });

  it('Should be disabled', () => {
    render(<PasswordInput disabled placeholder="disabled-input" />);
    expect(screen.getByPlaceholderText('disabled-input')).to.have.property('disabled', true);
    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('Should accept value and update', () => {
    render(<PasswordInput value="abc" onChange={() => {}} placeholder="controlled-input" />);
    expect(screen.getByPlaceholderText('controlled-input')).to.have.value('abc');
  });

  it('Should render with custom className', () => {
    render(<PasswordInput className="custom-password-input" placeholder="class-input" />);
    expect(screen.getByPlaceholderText('class-input').parentElement).to.have.class(
      'custom-password-input'
    );
  });

  it('Should pass id to input', () => {
    render(<PasswordInput id="my-password-id" placeholder="id-input" />);
    expect(screen.getByPlaceholderText('id-input')).to.have.attr('id', 'my-password-id');
  });

  it('Should pass name to input', () => {
    render(<PasswordInput name="my-password-name" placeholder="name-input" />);
    expect(screen.getByPlaceholderText('name-input')).to.have.attr('name', 'my-password-name');
  });

  it('Should access the underlying <input> element via inputRef', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<PasswordInput inputRef={inputRef} placeholder="ref-input" />);
    expect(inputRef.current).to.be.instanceOf(HTMLInputElement);
    expect(inputRef.current?.placeholder).to.equal('ref-input');
  });

  it('Should render startIcon', () => {
    render(
      <PasswordInput
        startIcon={<span data-testid="start-icon">S</span>}
        placeholder="start-icon-input"
      />
    );
    expect(screen.getByTestId('start-icon')).to.exist;
    expect(screen.getByTestId('start-icon')).to.have.text('S');
    expect(screen.queryByRole('button', { name: 'Toggle password visibility' })).to.exist;
  });

  it('Should render endIcon', () => {
    render(
      <PasswordInput endIcon={<span data-testid="end-icon">E</span>} placeholder="end-icon-input" />
    );
    expect(screen.getByTestId('end-icon')).to.exist;
    expect(screen.getByTestId('end-icon')).to.have.text('E');
    expect(screen.queryByRole('button', { name: 'Toggle password visibility' })).to.not.exist;
  });
});
