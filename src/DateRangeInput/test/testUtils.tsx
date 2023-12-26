import React from 'react';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import DateRangeInput from '../DateRangeInput';
import userEvent from '@testing-library/user-event';
import isMatch from 'date-fns/isMatch';
import formatDate from 'date-fns/format';

export function testKeyPress({
  defaultValue = [new Date(), new Date()],
  format = 'yyyy-MM-dd',
  expectedValue,
  key
}: {
  defaultValue?: [Date | null, Date | null] | null;
  format?: string;
  expectedValue: string;
  key: string;
}) {
  const onChange = sinon.spy();
  render(<DateRangeInput onChange={onChange} format={format} defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  userEvent.click(input);
  userEvent.type(input, key);

  expect(input).to.value(expectedValue);

  if (isMatch(expectedValue, format)) {
    expect(formatDate(onChange.args[0][0], format)).to.equal(expectedValue);
  }
}

export function testContinuousKeyPress({
  keySequences,
  defaultValue,
  format
}: {
  format?: string;
  defaultValue?: [Date | null, Date | null] | null;
  keySequences: {
    key: string;
    expected: string;
  }[];
}) {
  const onChange = sinon.spy();
  render(<DateRangeInput onChange={onChange} format={format} defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  userEvent.click(input);

  for (const { key, expected } of keySequences) {
    userEvent.type(input, key);
    expect(input).to.value(expected);
  }
}
