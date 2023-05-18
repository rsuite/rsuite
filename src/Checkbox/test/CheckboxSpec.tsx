import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  testStandardProps(<Checkbox />);

  it('Should render a checkbox', () => {
    render(<Checkbox>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.exist.and.to.have.attr('type', 'checkbox');
  });

  it('Should add title', () => {
    const title = 'Text';
    const { container } = render(<Checkbox title={title}>Test</Checkbox>);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('label')).to.have.attr('title', title);
  });

  it('Should have checkbox-inline class', () => {
    const { container } = render(<Checkbox inline>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-inline');
  });

  it('Should be disabled', () => {
    const { container } = render(<Checkbox disabled>Test</Checkbox>);
    expect(screen.getByLabelText('Test')).to.have.property('disabled', true);
    expect(container.firstChild).to.have.class('rs-checkbox-disabled');
  });

  it('Should be checked', () => {
    const { container } = render(<Checkbox checked>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-checked');
  });

  it('Should have the underlying input checked', () => {
    render(<Checkbox checked>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.be.checked;
  });

  it('Should be defaultChecked', () => {
    const { container } = render(<Checkbox defaultChecked>Test</Checkbox>);

    expect(container.firstChild).to.have.class('rs-checkbox-checked');
  });

  it('Should have the underlying input checked by default', () => {
    render(<Checkbox defaultChecked>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.be.checked;
  });

  it('Should have a `Test` value', () => {
    const value = 'Test';
    // FIXME-@SevenOutman
    // Is it reasonable to validate `defaultValue` for a checkbox?
    render(<Checkbox defaultValue={value}>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.have.value(value);
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
    ReactTestUtils.Simulate.click(container.firstChild as HTMLElement);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    render(<Checkbox onBlur={onBlur} />);
    ReactTestUtils.Simulate.blur(screen.getByRole('checkbox'));

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();
    render(<Checkbox onFocus={onFocus} />);
    ReactTestUtils.Simulate.focus(screen.getByRole('checkbox'));

    expect(onFocus).to.have.been.calledOnce;
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
