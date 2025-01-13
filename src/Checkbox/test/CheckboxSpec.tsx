import React from 'react';
import sinon from 'sinon';
import Checkbox from '../Checkbox';
import { render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Checkbox', () => {
  testStandardProps(<Checkbox />, {
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  it('Should render a checkbox', () => {
    render(<Checkbox>Test</Checkbox>);

    expect(screen.getByRole('checkbox')).to.exist;
    expect(screen.getByLabelText('Test')).to.exist.and.to.have.attr('type', 'checkbox');
  });

  it('Should have a `title` attribute', () => {
    const { container } = render(<Checkbox title="My title">Test</Checkbox>);
    expect(container.querySelector('label')).to.have.attr('title', 'My title');
  });

  it('Should have checkbox-inline class', () => {
    const { container } = render(<Checkbox inline>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-inline');
  });

  it('Should be disabled', () => {
    const { container } = render(<Checkbox disabled>Test</Checkbox>);
    expect(screen.getByRole('checkbox')).to.have.property('disabled', true);
    expect(container.firstChild).to.have.class('rs-checkbox-disabled');
  });

  it('Should be readOnly', () => {
    render(<Checkbox readOnly>Test</Checkbox>);
    expect(screen.getByRole('checkbox')).to.have.property('readOnly', true);
  });

  it('Should be checked', () => {
    const { container } = render(<Checkbox checked>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-checked');
    expect(screen.getByRole('checkbox')).to.be.checked;
  });

  it('Should be uncheckable', () => {
    const { rerender } = render(<Checkbox checkable={false}> checkable</Checkbox>);

    expect(screen.queryByRole('checkbox')).to.not.exist;

    rerender(<Checkbox checkable> checkable</Checkbox>);

    expect(screen.queryByRole('checkbox')).to.exist;
  });

  it('Should be clickable on the label', () => {
    const onChange = sinon.spy();
    const onCheckboxClick = sinon.spy();

    const { rerender } = render(
      <Checkbox labelClickable={false} onChange={onChange} onCheckboxClick={onCheckboxClick}>
        Label
      </Checkbox>
    );

    fireEvent.click(screen.getByText('Label'));

    expect(onChange).to.not.have.been.called;
    expect(onCheckboxClick).to.not.have.been.called;

    rerender(
      <Checkbox onChange={onChange} onCheckboxClick={onCheckboxClick}>
        Label
      </Checkbox>
    );

    fireEvent.click(screen.getByText('Label'));

    expect(onChange).to.have.been.calledOnce;
    expect(onCheckboxClick).to.have.been.calledOnce;
  });

  it('Should be checked by default', () => {
    const { container } = render(<Checkbox defaultChecked>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-checked');
    expect(screen.getByRole('checkbox')).to.be.checked;
  });

  it('Should be indeterminate', () => {
    const { container } = render(<Checkbox indeterminate>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-indeterminate');
    expect(screen.getByRole('checkbox')).to.be.not.checked;
    expect(screen.getByRole('checkbox')).to.have.attribute('aria-checked', 'mixed');
  });

  it('Should have a value', () => {
    render(<Checkbox value="1">Test</Checkbox>);

    expect(screen.getByRole('checkbox')).to.have.value('1');
  });

  it('Should have a name', () => {
    render(<Checkbox name="1">Test</Checkbox>);

    expect(screen.getByRole('checkbox')).to.have.property('name', '1');
  });

  it('Should have the underlying input checked', () => {
    render(<Checkbox checked>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.be.checked;
  });

  it('Should have the underlying input checked by default', () => {
    render(<Checkbox defaultChecked>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.be.checked;
  });

  it('Should support inputRef', () => {
    const inputRef = React.createRef();
    render(<Checkbox inputRef={inputRef}>Test</Checkbox>);

    expect(inputRef.current).to.be.instanceof(HTMLInputElement);
  });

  it('Should call onChange callback with correct value and checked state', () => {
    const onChange = sinon.spy();

    const { rerender } = render(
      <Checkbox onChange={onChange} value="Test">
        Checkbox
      </Checkbox>
    );

    fireEvent.click(screen.getByLabelText('Checkbox'));

    expect(onChange).to.have.been.calledWith('Test', true);

    rerender(
      <Checkbox onChange={onChange} value="Test" defaultChecked>
        Checkbox
      </Checkbox>
    );

    fireEvent.click(screen.getByLabelText('Checkbox'));

    expect(onChange).to.have.been.calledWith('Test', false);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    const { container } = render(<Checkbox onClick={onClick}>Title</Checkbox>);
    fireEvent.click(container.firstChild as HTMLElement);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onCheckboxClick callback', () => {
    const onCheckboxClick = sinon.spy();

    render(<Checkbox onCheckboxClick={onCheckboxClick} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onCheckboxClick).to.have.been.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    render(<Checkbox onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('checkbox'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();
    render(<Checkbox onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('checkbox'));

    expect(onFocus).to.have.been.calledOnce;
  });

  it('Should inputProps be working', () => {
    render(<Checkbox inputProps={{ className: 'my-checkbox' }} />);

    expect(screen.getByRole('checkbox')).to.have.class('my-checkbox');
  });

  describe('Plain text', () => {
    it('Should render its label if checked', () => {
      const label = 'Check me';

      render(
        <Checkbox checked plaintext data-testid="checkbox">
          {label}
        </Checkbox>
      );

      expect(screen.getByTestId('checkbox')).to.have.text(label);
    });
    it('Should render nothing if unchecked', () => {
      render(
        <Checkbox checked={false} plaintext data-testid="checkbox">
          Check me
        </Checkbox>
      );

      expect(screen.queryByTestId('checkbox')).not.to.exist;
    });
  });
});
