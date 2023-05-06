import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
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
    const instance = getDOMNode(<Checkbox title={title}>Test</Checkbox>);
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal((instance.querySelector('label') as HTMLLabelElement).title, title);
  });

  it('Should have checkbox-inline class', () => {
    const instance = getDOMNode(<Checkbox inline>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-inline\b/));
  });

  it('Should be disabled', () => {
    const { container } = render(<Checkbox disabled>Test</Checkbox>);
    expect(screen.getByLabelText('Test')).to.have.property('disabled', true);
    expect(container.firstChild).to.have.class('rs-checkbox-disabled');
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Checkbox checked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
  });

  it('Should have the underlying input checked', () => {
    render(<Checkbox checked>Test</Checkbox>);

    expect(screen.getByLabelText('Test')).to.be.checked;
  });

  it('Should be defaultChecked', () => {
    const instance = getDOMNode(<Checkbox defaultChecked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
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
    let input;
    getDOMNode(<Checkbox inputRef={ref => (input = ref)}>Test</Checkbox>);
    assert.equal(input.tagName, 'INPUT');
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
