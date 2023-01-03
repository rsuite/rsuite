import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  testStandardProps(<Checkbox />);

  it('Should render a checkbox', () => {
    const instance = getDOMNode(<Checkbox>Test</Checkbox>);
    assert.equal(instance.querySelectorAll('input[type="checkbox"]').length, 1);
  });

  it('Should add title', () => {
    const title = 'Text';
    const instance = getDOMNode(<Checkbox title={title}>Test</Checkbox>);
    assert.equal((instance.querySelector('label') as HTMLLabelElement).title, title);
  });

  it('Should have checkbox-inline class', () => {
    const instance = getDOMNode(<Checkbox inline>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-inline\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Checkbox disabled>Test</Checkbox>);
    assert.ok((instance.querySelector('input') as HTMLInputElement).disabled);
    assert.ok(instance.className.match(/\bcheckbox-disabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Checkbox checked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
  });

  it('Should have the underlying input checked', () => {
    const { getByLabelText } = render(<Checkbox checked>Test</Checkbox>);

    expect(getByLabelText('Test')).to.be.checked;
  });

  it('Should be defaultChecked', () => {
    const instance = getDOMNode(<Checkbox defaultChecked>Test</Checkbox>);
    assert.ok(instance.className.match(/\bcheckbox-checked\b/));
  });

  it('Should have the underlying input checked by default', () => {
    const { getByLabelText } = render(<Checkbox defaultChecked>Test</Checkbox>);

    expect(getByLabelText('Test')).to.be.checked;
  });

  it('Should have a `Test` value', () => {
    const value = 'Test';
    const instance = getDOMNode(<Checkbox defaultValue={value}>Test</Checkbox>);

    assert.equal((instance.querySelector('input') as HTMLInputElement).value, value);
  });

  it('Should support inputRef', () => {
    let input;
    getDOMNode(<Checkbox inputRef={ref => (input = ref)}>Test</Checkbox>);
    assert.equal(input.tagName, 'INPUT');
  });

  it('Should call onChange callback with correct value and checked state', () => {
    const onChange = sinon.spy();

    const { getByLabelText, rerender } = render(
      <Checkbox onChange={onChange} value="Test">
        Checkbox
      </Checkbox>
    );

    fireEvent.click(getByLabelText('Checkbox'));

    expect(onChange).to.have.been.calledWith('Test', true);

    rerender(
      <Checkbox onChange={onChange} value="Test" defaultChecked>
        Checkbox
      </Checkbox>
    );

    fireEvent.click(getByLabelText('Checkbox'));

    expect(onChange).to.have.been.calledWith('Test', false);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    const instance = getDOMNode(<Checkbox onClick={onClick}>Title</Checkbox>);
    ReactTestUtils.Simulate.click(instance.querySelector('label') as HTMLLabelElement);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onBlur callback', () => {
    const onBlur = sinon.spy();
    const instance = getDOMNode(<Checkbox onBlur={onBlur} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('input') as HTMLInputElement);

    expect(onBlur).to.have.been.calledOnce;
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();
    const instance = getDOMNode(<Checkbox onFocus={onFocus} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('input') as HTMLInputElement);

    expect(onFocus).to.have.been.calledOnce;
  });

  describe('Plain text', () => {
    it('Should render its label if checked', () => {
      const label = 'Check me';

      const { getByTestId } = render(
        <Checkbox checked plaintext data-testid="checkbox">
          {label}
        </Checkbox>
      );

      expect(getByTestId('checkbox')).to.have.text(label);
    });
    it('Should render nothing if unchecked', () => {
      const { queryByTestId } = render(
        <Checkbox checked={false} plaintext data-testid="checkbox">
          Check me
        </Checkbox>
      );

      expect(queryByTestId('checkbox')).not.to.exist;
    });
  });
});
