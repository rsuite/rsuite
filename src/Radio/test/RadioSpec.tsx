import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Radio from '../Radio';
import sinon from 'sinon';

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
    const onClick = sinon.spy();

    const { container } = render(<Radio onClick={onClick}>Title</Radio>);

    fireEvent.click(container.firstChild as HTMLElement);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onChange callback with correct value', () => {
    const onChange = sinon.spy();

    render(
      <Radio onChange={onChange} value={'test'}>
        Label
      </Radio>
    );
    fireEvent.click(screen.getByRole('radio'));

    expect(onChange).to.have.been.calledWith('test');
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    render(<Radio onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('radio'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();
    render(<Radio onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('radio'));

    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should be checked with change', () => {
    const onChange = sinon.spy();
    render(
      <Radio onChange={onChange} value="100">
        Title
      </Radio>
    );

    fireEvent.click(screen.getByRole('radio'));

    expect(onChange).to.have.been.calledWith('100');
  });
});
