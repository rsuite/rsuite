import React, { useLayoutEffect, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '..';
import {
  configuration,
  invoke,
  methods,
  type Adapter,
  type Method,
  type Values
} from './formValidationConfigFixtures';

async function checkCommit(
  method: Method,
  adapter: Adapter,
  valid: boolean,
  switchAdapter = false
) {
  const before: Values = Object.freeze({ name: 'before' });
  const after: Values = Object.freeze({ name: 'after' });
  const ref = React.createRef<FormInstance>();
  const inputs: { phase: string; data: Values }[] = [];
  const checks: { phase: string; errors: unknown }[] = [];
  const errors: { phase: string; errors: unknown }[] = [];
  const submissions: { phase: string; data: Values; event: unknown }[] = [];
  const first = configuration('before', inputs);
  const second = configuration('after', inputs, valid);
  let result: any;

  function Probe({ value }: { value: Values }) {
    useLayoutEffect(() => {
      if (value === after) result = invoke(method, saved);
    }, [value]);
    return <Form.Control name="name" aria-label="Name" />;
  }
  function Owner() {
    const [value, setValue] = useState(before);
    const phase = value === before ? 'before' : 'after';
    const config = value === before ? first : second;
    const useResolver =
      value === before && switchAdapter ? adapter !== 'resolver' : adapter === 'resolver';
    return (
      <>
        <button onClick={() => setValue(after)}>Commit values and rules</button>
        <Form
          ref={ref}
          formValue={value}
          model={config.model}
          resolver={useResolver ? config.resolver : undefined}
          onCheck={errors => checks.push({ phase, errors })}
          onError={error => errors.push({ phase, errors: error })}
          onSubmit={(data, event) => submissions.push({ phase, data: data as Values, event })}
        >
          <Probe value={value} />
        </Form>
      </>
    );
  }
  render(<Owner />);
  const saved = ref.current!;
  fireEvent.click(screen.getByRole('button', { name: 'Commit values and rules' }));
  await act(async () => {
    result = await result;
  });

  expect(inputs).toEqual([{ phase: 'after', data: after }]);
  expect(inputs[0].data).toBe(after);
  expect(checks).toEqual([{ phase: 'after', errors: valid ? {} : { name: 'Invalid' } }]);
  expect(errors).toEqual(valid ? [] : [{ phase: 'after', errors: { name: 'Invalid' } }]);
  if (method === 'submit') {
    expect(result).toBeUndefined();
    expect(submissions).toEqual(valid ? [{ phase: 'after', data: after, event: undefined }] : []);
    if (valid) expect(submissions[0].data).toBe(inputs[0].data);
  } else {
    expect(submissions).toEqual([]);
    if (method.endsWith('Async')) expect(result.hasError).toBe(!valid);
    else expect(result).toBe(valid);
  }
  expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('after');
  expect(before).toEqual({ name: 'before' });
  expect(after).toEqual({ name: 'after' });
}

describe.each(['schema', 'resolver'] as const)('Form committed %s configuration', adapter => {
  for (const method of methods) {
    it.each([true, false])(
      `${method} uses committed rules and callbacks from child layout (valid: %s)`,
      valid => checkCommit(method, adapter, valid)
    );
  }
  it('submit selects the newly committed validation adapter', () =>
    checkCommit('submit', adapter, true, true));
});
