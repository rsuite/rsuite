import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';

type Method = 'check' | 'checkForField' | 'checkAsync' | 'checkForFieldAsync';
type Scenario = 'immediate' | 'reject' | 'committed';
type Values = { name: string; untouched: { key: string } };
const methods: Method[] = ['check', 'checkForField', 'checkAsync', 'checkForFieldAsync'];
const message = 'Name must be after';

function setup(method: Method, scenario: Scenario) {
  const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
  const ref = React.createRef<FormInstance<Values>>();
  const inputs: { value: string; data: Values }[] = [];
  const pending: { resolve: (valid: boolean) => void; valid: boolean }[] = [];
  const proposals: Values[] = [];
  const checks: any[] = [];
  const errors: any[] = [];
  const callbackResults: any[] = [];
  const returns: any[] = [];
  const asynchronous = method === 'checkAsync' || method === 'checkForFieldAsync';
  const type = Schema.Types.StringType();
  if (asynchronous) {
    type.addAsyncRule((value, data) => {
      inputs.push({ value, data: data as Values });
      return new Promise<boolean>(resolve => pending.push({ resolve, valid: value === 'after' }));
    }, message);
  } else {
    type.addRule((value, data) => {
      inputs.push({ value, data: data as Values });
      return value === 'after';
    }, message);
  }
  const model = Schema.Model({ name: type });
  const invoke = () => {
    const form = ref.current!;
    if (method === 'check') returns.push(form.check(result => callbackResults.push(result)));
    if (method === 'checkForField') {
      returns.push(form.checkForField('name', result => callbackResults.push(result)));
    }
    if (method === 'checkAsync') returns.push(form.checkAsync());
    if (method === 'checkForFieldAsync') returns.push(form.checkForFieldAsync('name'));
  };
  render(
    <Form
      ref={ref}
      model={model}
      checkTrigger={null}
      formDefaultValue={initial}
      {...(scenario === 'reject' ? { formValue: initial } : {})}
      onChange={nextValue => {
        proposals.push(nextValue as Values);
        if (scenario !== 'committed') invoke();
      }}
      onCheck={result => checks.push(result)}
      onError={result => errors.push(result)}
    >
      <Form.Group controlId="name">
        <Form.ControlLabel>Name</Form.ControlLabel>
        <Form.Control name="name" />
      </Form.Group>
      <button type="button" onClick={invoke}>
        Check committed
      </button>
    </Form>
  );
  const change = () =>
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'after' }
    });
  const committedCheck = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Check committed' }));
  const complete = async () => {
    if (!asynchronous) return returns[0];
    await waitFor(() => expect(pending).toHaveLength(1));
    expect(returns[0]).toBeInstanceOf(Promise);
    let result: any;
    await act(async () => {
      pending[0].resolve(pending[0].valid);
      result = await returns[0];
    });
    return result;
  };
  return {
    initial,
    inputs,
    proposals,
    checks,
    errors,
    callbackResults,
    returns,
    asynchronous,
    change,
    committedCheck,
    complete
  };
}

async function verify(method: Method, scenario: Scenario) {
  const state = setup(method, scenario);
  state.change();
  if (scenario === 'committed') {
    expect(state.inputs).toEqual([]);
    state.committedCheck();
  }
  const result = await state.complete();
  const valid = scenario !== 'reject';
  const expectedValue = valid ? 'after' : 'before';
  expect(state.proposals).toHaveLength(1);
  expect(state.proposals[0]).toEqual({ name: 'after', untouched: { key: 'unchanged' } });
  expect(state.proposals[0].untouched).toBe(state.initial.untouched);
  expect(state.initial).toEqual({ name: 'before', untouched: { key: 'unchanged' } });
  expect(state.returns).toHaveLength(1);
  expect(state.inputs.map(input => input.value)).toEqual([expectedValue]);
  expect(state.inputs[0].data.name).toBe(expectedValue);
  expect(state.inputs[0].data.untouched).toBe(state.initial.untouched);
  if (state.asynchronous) {
    expect(result.hasError).toBe(!valid);
    if (method === 'checkAsync') expect(result.formError).toEqual(valid ? {} : { name: message });
    if (!valid && method === 'checkForFieldAsync') expect(result.errorMessage).toBe(message);
    expect(state.callbackResults).toEqual([]);
  } else {
    expect(result).toBe(valid);
    expect(state.callbackResults).toEqual([
      method === 'check'
        ? valid
          ? {}
          : { name: message }
        : valid
          ? { hasError: false }
          : { hasError: true, errorMessage: message }
    ]);
  }
  expect(state.checks).toEqual([valid ? {} : { name: message }]);
  expect(state.errors).toEqual(valid ? [] : [{ name: message }]);
  const input = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
  expect(input.value).toBe(expectedValue);
  expect(input.getAttribute('aria-invalid')).toBe(valid ? null : 'true');
  if (valid) {
    expect(screen.queryByText(message)).toBeNull();
    expect(input.getAttribute('aria-errormessage')).toBeNull();
  } else {
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe(message);
    expect(input.getAttribute('aria-errormessage')).toBe(alert.id);
  }
}

describe('Form imperative current values', () => {
  for (const method of methods) {
    it(`${method} validates the accepted change inside onChange`, async () => {
      await verify(method, 'immediate');
    });
    it(`${method} keeps rejected controlled proposals out of validation`, async () => {
      await verify(method, 'reject');
    });
    it(`${method} validates committed values in a later event`, async () => {
      await verify(method, 'committed');
    });
  }
});
