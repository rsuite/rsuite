import React from 'react';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { isMatch } from 'date-fns/isMatch';
import { formatDate } from 'date-fns/format';
import { keyPress } from '@test/utils/simulateEvent';

export function keyPressTests(TestComponent: React.FC<any>) {
  function testKeyPress({
    defaultValue = new Date(),
    format = 'yyyy-MM-dd',
    expectedValue,
    key
  }: {
    defaultValue?: Date | [Date | null, Date | null] | null;
    format?: string;
    expectedValue: string;
    key: string;
  }) {
    const onChange = sinon.spy();
    render(
      <TestComponent
        onChange={onChange}
        format={format}
        defaultValue={defaultValue}
        data-test="true"
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.click(input);

    userEvent.type(input, key);
    expect(input).to.value(expectedValue);

    if (isMatch(expectedValue, format)) {
      expect(formatDate(onChange.args[0][0], format)).to.equal(expectedValue);
    }
  }

  async function testKeyPressAsync({
    defaultValue,
    format = 'yyyy-MM-dd',
    expectedValue,
    keys
  }: {
    defaultValue?: Date | [Date | null, Date | null] | null;
    format?: string;
    expectedValue: string;
    keys: string[] | string;
  }) {
    const onChange = sinon.spy();
    render(<TestComponent onChange={onChange} format={format} defaultValue={defaultValue} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    await keyPress(input, keys);

    expect(input).to.value(expectedValue);

    if (isMatch(expectedValue, format)) {
      expect(formatDate(onChange.lastCall.firstArg, format)).to.equal(expectedValue);
    }
  }

  function testContinuousKeyPress({
    keySequences,
    defaultValue,
    format
  }: {
    format?: string;
    defaultValue?: Date | [Date | null, Date | null];
    keySequences: {
      key: string;
      expected: string;
    }[];
  }) {
    const onChange = sinon.spy();
    render(
      <TestComponent
        onChange={onChange}
        format={format}
        defaultValue={defaultValue}
        data-test="true"
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    userEvent.click(input);

    for (const { key, expected } of keySequences) {
      userEvent.type(input, key);
      expect(input).to.value(expected);
    }
  }

  return { testKeyPress, testKeyPressAsync, testContinuousKeyPress };
}
