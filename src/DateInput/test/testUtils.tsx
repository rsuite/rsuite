import React from 'react';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import DateInput from '../DateInput';
import userEvent from '@testing-library/user-event';
import isMatch from 'date-fns/isMatch';

export function testKeyPress({
  defaultValue = new Date(),
  format = 'yyyy-MM-dd',
  expectedValue,
  expectedDate,
  key
}: {
  defaultValue?: Date;
  format?: string;
  expectedValue: string;
  expectedDate?: Date;
  key: string;
}) {
  const onChange = sinon.spy();
  render(<DateInput onChange={onChange} format={format} defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  userEvent.click(input);
  userEvent.type(input, key);

  expect(input).to.value(expectedValue);

  if (isMatch(expectedValue, format)) {
    expect(onChange).to.be.calledWithMatch(expectedDate || new Date(expectedValue));
  }
}

export function testContinuousKeyPress({
  keySequences,
  defaultValue,
  format
}: {
  format?: string;
  defaultValue?: Date;
  keySequences: {
    key: string;
    expected: string;
  }[];
}) {
  const onChange = sinon.spy();
  render(<DateInput onChange={onChange} format={format} defaultValue={defaultValue} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  userEvent.click(input);

  for (const { key, expected } of keySequences) {
    userEvent.type(input, key);
    expect(input).to.value(expected);
  }
}
