import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance, type ResolverResult } from '..';
import Schema from '../../Schema';

type Validation = 'native schema' | 'sync resolver' | 'deferred async resolver';
type Scenario = 'check-reset' | 'later-edit' | 'pending-reset' | 'controlled-accept';
type Values = { name: string; untouched: { key: string } };

function setup(validation: Validation, scenario: Scenario) {
  const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
  const ref = React.createRef<FormInstance>();
  const inputs: { value: string; data: Values; valid: boolean }[] = [];
  const pending: { resolve: (result: ResolverResult) => void; result: ResolverResult }[] = [];
  const proposals: Values[] = [];
  const submissions: { payload: Values; event: unknown }[] = [];
  const checks: any[] = [];
  const resets: any[] = [];
  const errors: any[] = [];
  const returns: void[] = [];
  const events: string[] = [];
  let submitted = false;
  let resetFromCheck = false;
  const record = (value: string, data: Values) => {
    const valid = (value === 'before' || value === 'after') && value === data.name;
    inputs.push({ value, data, valid });
    events.push('validate');
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
  function Owner() {
    const [value, setValue] = React.useState(initial);
    return (
      <Form
        ref={ref}
        model={model}
        {...(validation === 'native schema' ? {} : { resolver })}
        checkTrigger={null}
        formDefaultValue={initial}
        {...(scenario === 'controlled-accept' ? { formValue: value } : {})}
        onChange={nextValue => {
          const next = nextValue as Values;
          proposals.push(next);
          events.push(`change:${next.name}`);
          if (scenario === 'controlled-accept') setValue(next);
          if (!submitted) {
            submitted = true;
            returns.push(ref.current!.submit());
          }
        }}
        onCheck={result => {
          checks.push(result);
          events.push('check');
          if (scenario === 'check-reset' && !resetFromCheck) {
            resetFromCheck = true;
            ref.current!.reset();
          }
        }}
        onReset={value => {
          resets.push(value);
          events.push('reset');
        }}
        onError={result => errors.push(result)}
        onSubmit={(payload, event) => {
          submissions.push({ payload: payload as Values, event });
          events.push('submit');
        }}
      >
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>
        <button type="button" onClick={() => ref.current!.reset()}>
          Reset pending submission
        </button>
      </Form>
    );
  }
  render(<Owner />);
  const change = (name: string) =>
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: name } });
  const awaitPending = () => waitFor(() => expect(pending).toHaveLength(1));
  const finish = async () => {
    if (validation === 'deferred async resolver') {
      await awaitPending();
      await act(async () => pending[0].resolve(pending[0].result));
    }
    await waitFor(() => expect(submissions).toHaveLength(1));
  };
  const reset = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Reset pending submission' }));
  return {
    initial,
    inputs,
    proposals,
    submissions,
    checks,
    resets,
    errors,
    returns,
    events,
    change,
    awaitPending,
    finish,
    reset
  };
}

function verifyInvocation(
  state: ReturnType<typeof setup>,
  expected: Values,
  committedName: string,
  publishesCheck = true
) {
  expect(state.inputs).toEqual([{ value: expected.name, data: expected, valid: true }]);
  expect(state.inputs[0].data).toBe(expected);
  expect(state.checks).toEqual(publishesCheck ? [{}] : []);
  expect(state.returns).toEqual([undefined]);
  expect(state.submissions).toHaveLength(1);
  expect(state.submissions[0].event).toBeUndefined();
  expect(state.submissions[0].payload).toEqual(expected);
  expect(state.submissions[0].payload).toBe(state.inputs[0].data);
  expect(state.submissions[0].payload.untouched).toBe(state.initial.untouched);
  expect(state.errors).toEqual([]);
  expect(state.initial).toEqual({ name: 'before', untouched: { key: 'unchanged' } });
  const input = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
  expect(input.value).toBe(committedName);
  expect(input.getAttribute('aria-invalid')).toBeNull();
  expect(input.getAttribute('aria-errormessage')).toBeNull();
  expect(screen.queryByRole('alert')).toBeNull();
}

describe('Form submit value snapshots', () => {
  for (const validation of [
    'native schema',
    'sync resolver',
    'deferred async resolver'
  ] as Validation[]) {
    it(`${validation} retains the validated payload across an onCheck reset`, async () => {
      const state = setup(validation, 'check-reset');
      state.change('after');
      await state.finish();
      expect(state.proposals).toEqual([
        { name: 'after', untouched: { key: 'unchanged' } },
        state.initial
      ]);
      expect(state.resets).toEqual([state.initial]);
      expect(state.events).toEqual([
        'change:after',
        'validate',
        'check',
        'change:before',
        'reset',
        'submit'
      ]);
      verifyInvocation(state, state.proposals[0], 'before');
    });
  }

  it('deferred resolver retains its invocation payload after a later accepted edit', async () => {
    const state = setup('deferred async resolver', 'later-edit');
    state.change('after');
    await state.awaitPending();
    expect(state.submissions).toEqual([]);
    state.change('later');
    expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe('later');
    expect(state.proposals.map(value => value.name)).toEqual(['after', 'later']);
    expect(state.inputs[0].data.name).toBe('after');
    expect(state.resets).toEqual([]);
    await state.finish();
    expect(state.events).toEqual(['change:after', 'validate', 'change:later', 'check', 'submit']);
    verifyInvocation(state, state.proposals[0], 'later');
  });

  it('deferred resolver retains its invocation payload after a pending reset', async () => {
    const state = setup('deferred async resolver', 'pending-reset');
    state.change('after');
    await state.awaitPending();
    expect(state.submissions).toEqual([]);
    state.reset();
    expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
      'before'
    );
    expect(state.proposals).toEqual([
      { name: 'after', untouched: { key: 'unchanged' } },
      state.initial
    ]);
    expect(state.resets).toEqual([state.initial]);
    expect(state.inputs[0].data.name).toBe('after');
    await state.finish();
    expect(state.events).toEqual(['change:after', 'validate', 'change:before', 'reset', 'submit']);
    // Reset invalidates publication, while the submission keeps its own validation result.
    verifyInvocation(state, state.proposals[0], 'before', false);
  });

  it('controlled deferred resolver retains committed payload after queued acceptance commits', async () => {
    const state = setup('deferred async resolver', 'controlled-accept');
    state.change('after');
    await state.awaitPending();
    expect(state.submissions).toEqual([]);
    expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe('after');
    expect(state.proposals).toEqual([{ name: 'after', untouched: { key: 'unchanged' } }]);
    expect(state.inputs[0].data).toBe(state.initial);
    expect(state.resets).toEqual([]);
    await state.finish();
    expect(state.events).toEqual(['change:after', 'validate', 'check', 'submit']);
    verifyInvocation(state, state.initial, 'after');
  });
});
