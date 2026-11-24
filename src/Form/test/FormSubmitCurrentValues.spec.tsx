import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance, type ResolverResult } from '..';
import Schema from '../../Schema';

type Validation = 'native schema' | 'sync resolver' | 'deferred async resolver';
type Scenario = 'immediate' | 'committed' | 'reject' | 'accept';
type Values = { name: string; untouched: { key: string } };
const validations: Validation[] = ['native schema', 'sync resolver', 'deferred async resolver'];
const scenarios: Scenario[] = ['immediate', 'committed', 'reject', 'accept'];

function setup(validation: Validation, scenario: Scenario) {
  const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
  const ref = React.createRef<FormInstance>();
  const inputs: { value: string; data: Values; valid: boolean }[] = [];
  const pending: { resolve: (value: ResolverResult) => void; result: ResolverResult }[] = [];
  const proposals: Values[] = [];
  const submissions: { value: Values; event: unknown }[] = [];
  const checks: any[] = [];
  const errors: any[] = [];
  const returns: void[] = [];
  const record = (value: string, data: Values) => {
    const valid = (value === 'before' || value === 'after') && data.name === value;
    inputs.push({ value, data, valid });
    return valid;
  };
  const model = Schema.Model({
    name: Schema.Types.StringType().addRule(
      (value, data) => record(value, data as Values),
      'Captured input is invalid'
    )
  });
  const resolver = (data: Record<string, any>) => {
    const valid = record(data.name, data as Values);
    const result: ResolverResult = { errors: valid ? {} : { name: 'Captured input is invalid' } };
    if (validation === 'deferred async resolver') {
      return new Promise<ResolverResult>(resolve => pending.push({ resolve, result }));
    }
    return result;
  };
  const submit = () => returns.push(ref.current!.submit());
  function Owner() {
    const [value, setValue] = React.useState(initial);
    return (
      <Form
        ref={ref}
        model={model}
        {...(validation === 'native schema' ? {} : { resolver })}
        checkTrigger={null}
        formDefaultValue={initial}
        {...(scenario === 'reject' || scenario === 'accept' ? { formValue: value } : {})}
        onChange={nextValue => {
          const next = nextValue as Values;
          proposals.push(next);
          if (scenario === 'accept') setValue(next);
          if (scenario !== 'committed') submit();
        }}
        onCheck={result => checks.push(result)}
        onError={result => errors.push(result)}
        onSubmit={(payload, event) => submissions.push({ value: payload as Values, event })}
      >
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>
        <button type="button" onClick={submit}>
          Submit committed
        </button>
      </Form>
    );
  }
  render(<Owner />);
  const change = () =>
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'after' }
    });
  const laterSubmit = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Submit committed' }));
  const finish = async (count: number) => {
    if (validation === 'deferred async resolver') {
      await waitFor(() => expect(pending).toHaveLength(count));
      await act(async () => pending[count - 1].resolve(pending[count - 1].result));
    }
    await waitFor(() => expect(submissions).toHaveLength(count));
    expect(checks).toHaveLength(count);
    expect(inputs).toHaveLength(count);
    expect(returns).toEqual(Array(count).fill(undefined));
  };
  return { initial, inputs, proposals, submissions, checks, errors, change, laterSubmit, finish };
}

function verifySubmission(state: ReturnType<typeof setup>, index: number, expected: Values) {
  expect(state.inputs[index]).toEqual({ value: expected.name, data: expected, valid: true });
  expect(state.inputs[index].data).toBe(expected);
  expect(state.checks[index]).toEqual({});
  expect(state.submissions[index].event).toBeUndefined();
  expect(state.submissions[index].value).toEqual(expected);
  expect(state.submissions[index].value).toBe(state.inputs[index].data);
  expect(state.submissions[index].value.untouched).toBe(state.initial.untouched);
}

describe('Form submit current values', () => {
  for (const validation of validations) {
    for (const scenario of scenarios) {
      const label = {
        immediate: 'submits the accepted change inside onChange',
        committed: 'submits an uncontrolled value in a later committed event',
        reject: 'keeps rejected controlled proposals out of submission',
        accept: 'keeps queued controlled acceptance committed until a later submit'
      }[scenario];
      it(`${validation} ${label}`, async () => {
        const state = setup(validation, scenario);
        state.change();
        if (scenario === 'committed') {
          expect(state.inputs).toEqual([]);
          expect(state.submissions).toEqual([]);
          state.laterSubmit();
        }
        await state.finish(1);
        expect(state.proposals).toHaveLength(1);
        expect(state.proposals[0]).toEqual({ name: 'after', untouched: { key: 'unchanged' } });
        expect(state.proposals[0].untouched).toBe(state.initial.untouched);
        expect(state.initial).toEqual({ name: 'before', untouched: { key: 'unchanged' } });
        verifySubmission(
          state,
          0,
          scenario === 'reject' || scenario === 'accept' ? state.initial : state.proposals[0]
        );
        if (scenario === 'accept') {
          expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
            'after'
          );
          state.laterSubmit();
          await state.finish(2);
          verifySubmission(state, 1, state.proposals[0]);
        }
        expect(state.errors).toEqual([]);
        expect(state.checks).toEqual(scenario === 'accept' ? [{}, {}] : [{}]);
        expect(state.submissions).toHaveLength(scenario === 'accept' ? 2 : 1);
        const input = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
        expect(input.value).toBe(scenario === 'reject' ? 'before' : 'after');
        expect(input.getAttribute('aria-invalid')).toBeNull();
        expect(input.getAttribute('aria-errormessage')).toBeNull();
        expect(screen.queryByRole('alert')).toBeNull();
        expect(state.initial.name).toBe('before');
      });
    }
  }
});
