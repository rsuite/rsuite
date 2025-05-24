import React from 'react';
import Radio from '../Radio';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Radio', () => {
  testStandardProps(<Radio />, {
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should render a radio', () => {
    render(<Radio>Radio</Radio>);
    expect(screen.getByRole('radio')).to.exist;
  });

  it('Should have a `title` attribute', () => {
    const { container } = render(<Radio title="My title">Radio</Radio>);

    expect(container.querySelector('label')).to.have.attr('title', 'My title');
  });

  it('Should have radio-inline class', () => {
    const { container } = render(<Radio inline>Test</Radio>);

    expect(container.firstChild).to.have.class('rs-radio-inline');
  });

  it('Should be disabled', () => {
    const { container } = render(<Radio disabled>Test</Radio>);

    expect(screen.getByRole('radio')).to.have.property('disabled', true);
    expect(container.firstChild).to.have.class('rs-radio-disabled');
  });

  it('Should be readOnly', () => {
    render(<Radio readOnly>Test</Radio>);
    expect(screen.getByRole('radio')).to.have.property('readOnly', true);
  });

  it('Should be checked', () => {
    const { container } = render(<Radio checked>Test</Radio>);

    expect(container.firstChild).to.have.class('rs-radio-checked');
    expect(screen.getByRole('radio')).to.be.checked;
  });

  it('Should be checked with defaultChecked', () => {
    const { container } = render(<Radio defaultChecked>Test</Radio>);

    expect(container.firstChild).to.have.class('rs-radio-checked');
    expect(screen.getByRole('radio')).to.be.checked;
  });

  it('Should have a default value', () => {
    render(<Radio defaultValue="Text">Radio</Radio>);

    expect(screen.getByRole('radio')).to.have.value('Text');
  });

  it('Should support inputRef', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Radio inputRef={inputRef}>Test</Radio>);

    expect(inputRef.current).to.be.instanceof(HTMLInputElement);
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();

    const { container } = render(<Radio onClick={onClick}>Title</Radio>);

    fireEvent.click(container.firstChild as HTMLElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = vi.fn();

    render(
      <Radio onChange={onChange} value={'test'}>
        Label
      </Radio>
    );
    fireEvent.click(screen.getByRole('radio'));

    // The onChange handler is called with (value, checked, event)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything());
    expect(onChange.mock.calls[0][0]).toBe('test');
  });

  it('Should call onBlur callback', () => {
    const onBlur = vi.fn();
    render(<Radio onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('radio'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('Should call onFocus callback', () => {
    const onFocus = vi.fn();
    render(<Radio onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('radio'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Should be checked with change', () => {
    const onChange = vi.fn();
    render(
      <Radio onChange={onChange} value="100">
        Title
      </Radio>
    );

    fireEvent.click(screen.getByRole('radio'));

    // The onChange handler is called with (value, checked, event)
    expect(onChange).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything());
    expect(onChange.mock.calls[0][0]).toBe('100');
  });
});
