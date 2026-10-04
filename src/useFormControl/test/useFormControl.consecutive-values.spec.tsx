import React, { startTransition, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '../../Form';
import Schema from '../../Schema';
import useFormControl from '..';

type Values = {
  first?: string;
  second?: string;
  third?: string;
  profile?: { first?: string; second?: string; third?: string };
};
type Route = 'set' | 'change';
type Mode = 'uncontrolled' | 'reject' | 'first' | 'sync';

const createValue = (nested: boolean, first = 'old-a', second = 'old-b'): Values =>
  nested ? { profile: { first, second } } : { first, second };
const label = (value: Values) => {
  const fields = value.profile || value;
  return `${fields.first}/${fields.second}`;
};

function Fields({
  nested,
  routes,
  reset,
  checkAsync = false
}: {
  nested: boolean;
  routes: readonly [Route, Route];
  reset?: () => void;
  checkAsync?: boolean;
}) {
  const first = useFormControl({ name: nested ? 'profile.first' : 'first', checkAsync });
  const second = useFormControl({ name: nested ? 'profile.second' : 'second', checkAsync });

  return (
    <>
      <input aria-label="First" value={first.value || ''} readOnly />
      <input aria-label="Second" value={second.value || ''} readOnly />
      <button
        type="button"
        onClick={event => {
          if (routes[0] === 'set') first.setValue('A', true);
          else first.onChange('A', event);
          reset?.();
          if (routes[1] === 'set') second.setValue('B', true);
          else second.onChange('B', event);
        }}
      >
        Update both
      </button>
      <button type="button" onClick={() => second.setValue('C', true)}>
        Update second
      </button>
    </>
  );
}

function setup(
  nested: boolean,
  routes: readonly [Route, Route] = ['set', 'set'],
  mode: Mode = 'uncontrolled',
  reset = false,
  controlledInitial?: Values
) {
  const initial = createValue(nested);
  const changes: Values[] = [];
  const validations: Values[] = [];
  const events: string[] = [];
  const resets: Values[] = [];

  function Owner() {
    const [value, setValue] = useState(controlledInitial || initial);
    const ref = useRef<FormInstance<Values>>(null);
    return (
      <Form
        ref={ref}
        nestedField={nested}
        formDefaultValue={initial}
        {...(mode === 'uncontrolled' ? {} : { formValue: value })}
        resolver={nextValue => {
          validations.push(nextValue);
          events.push(`validate:${label(nextValue)}`);
          return { errors: {} };
        }}
        onCheck={() => events.push('check')}
        onChange={nextValue => {
          changes.push(nextValue);
          events.push(`change:${label(nextValue)}`);
          if (mode === 'first' && changes.length === 1) setValue(nextValue);
          if (mode === 'sync') flushSync(() => setValue(nextValue));
        }}
        onReset={nextValue => {
          if (nextValue) resets.push(nextValue);
          events.push('reset');
        }}
      >
        <Fields
          nested={nested}
          routes={routes}
          reset={reset ? () => ref.current!.reset() : undefined}
        />
      </Form>
    );
  }

  render(<Owner />);
  const updateBoth = () => fireEvent.click(screen.getByRole('button', { name: 'Update both' }));
  const updateSecond = () => fireEvent.click(screen.getByRole('button', { name: 'Update second' }));
  return { initial, changes, validations, events, resets, updateBoth, updateSecond };
}

function setupCleanup(nested: boolean, accept: boolean) {
  const initial = createValue(nested);
  const changes: Values[] = [];
  const validations: Values[] = [];

  function RemovedField({ name }: { name: string }) {
    const field = useFormControl({ name, shouldResetWithUnmount: true });
    return <input aria-label={name} value={field.value || ''} readOnly />;
  }

  function RemainingField() {
    const field = useFormControl({ name: nested ? 'profile.third' : 'third' });
    return (
      <>
        <input aria-label="Remaining" value={field.value || ''} readOnly />
        <button type="button" onClick={() => field.setValue('C', true)}>
          Update remaining
        </button>
      </>
    );
  }

  function Owner() {
    const [value, setValue] = useState(initial);
    const [visible, setVisible] = useState(true);
    return (
      <Form
        nestedField={nested}
        formValue={value}
        resolver={nextValue => {
          validations.push(nextValue);
          return { errors: {} };
        }}
        onChange={nextValue => {
          changes.push(nextValue);
          if (accept) setValue(nextValue);
        }}
      >
        {visible && (
          <>
            <RemovedField name={nested ? 'profile.first' : 'first'} />
            <RemovedField name={nested ? 'profile.second' : 'second'} />
          </>
        )}
        <RemainingField />
        <button type="button" onClick={() => setVisible(false)}>
          Remove both
        </button>
        <output aria-label="Committed values">{JSON.stringify(value)}</output>
      </Form>
    );
  }

  render(<Owner />);
  const removeBoth = () => fireEvent.click(screen.getByRole('button', { name: 'Remove both' }));
  const updateRemaining = () =>
    fireEvent.click(screen.getByRole('button', { name: 'Update remaining' }));
  return { initial, changes, validations, removeBoth, updateRemaining };
}

describe('useFormControl consecutive values in one event', () => {
  for (const nested of [false, true]) {
    describe(nested ? 'nested fields' : 'flat fields', () => {
      for (const routes of [
        ['set', 'set'],
        ['change', 'change'],
        ['set', 'change'],
        ['change', 'set']
      ] as const) {
        it(`composes uncontrolled ${routes[0]} then ${routes[1]} values and validation inputs`, () => {
          const test = setup(nested, routes);
          test.updateBoth();
          expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
          expect(test.changes).toEqual([createValue(nested, 'A'), createValue(nested, 'A', 'B')]);
          expect(test.validations).toEqual([
            createValue(nested, 'A'),
            createValue(nested, 'A', 'B')
          ]);
          expect(test.initial).toEqual(createValue(nested));
          expect(test.events).toEqual([
            ...(routes[0] === 'set'
              ? ['change:A/old-b', 'validate:A/old-b', 'check']
              : ['validate:A/old-b', 'check', 'change:A/old-b']),
            ...(routes[1] === 'set'
              ? ['change:A/B', 'validate:A/B', 'check']
              : ['validate:A/B', 'check', 'change:A/B'])
          ]);
        });
      }

      it('composes uncontrolled onChange then setValue under StrictMode', () => {
        const initial = createValue(nested);
        const changes: Values[] = [];
        const validations: Values[] = [];
        const events: string[] = [];

        render(
          <React.StrictMode>
            <Form
              nestedField={nested}
              formDefaultValue={initial}
              resolver={nextValue => {
                validations.push(nextValue);
                events.push(`validate:${label(nextValue)}`);
                return { errors: {} };
              }}
              onCheck={() => events.push('check')}
              onChange={nextValue => {
                changes.push(nextValue);
                events.push(`change:${label(nextValue)}`);
              }}
            >
              <Fields nested={nested} routes={['change', 'set']} />
            </Form>
          </React.StrictMode>
        );

        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
        fireEvent.click(screen.getByRole('button', { name: 'Update both' }));
        const proposals = [createValue(nested, 'A'), createValue(nested, 'A', 'B')];
        expect(changes).toEqual(proposals);
        expect(validations).toEqual(proposals);
        expect(events).toEqual([
          'validate:A/old-b',
          'check',
          'change:A/old-b',
          'change:A/B',
          'validate:A/B',
          'check'
        ]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');

        fireEvent.click(screen.getByRole('button', { name: 'Update second' }));
        const next = createValue(nested, 'A', 'C');
        expect(changes).toEqual([...proposals, next]);
        expect(validations).toEqual([...proposals, next]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('C');
        expect(initial).toEqual(createValue(nested));
      });

      it('keeps controlled props authoritative when both proposals are rejected', () => {
        const test = setup(nested, ['set', 'set'], 'reject');
        test.updateBoth();
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
        const proposals = [createValue(nested, 'A'), createValue(nested, 'old-a', 'B')];
        expect(test.changes).toEqual(proposals);
        expect(test.validations).toEqual(proposals);
        expect(test.initial).toEqual(createValue(nested));
      });

      it('uses committed controlled props after an owner accepts only the first proposal', () => {
        const test = setup(nested, ['set', 'set'], 'first');
        test.updateBoth();
        expect(test.changes).toEqual([createValue(nested, 'A'), createValue(nested, 'old-a', 'B')]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
        test.updateSecond();
        expect(test.changes[2]).toEqual(createValue(nested, 'A', 'C'));
        expect(test.validations[2]).toEqual(createValue(nested, 'A', 'C'));
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
      });

      it('uses a controlled flushSync commit for the next same-event update and validation', () => {
        const test = setup(nested, ['set', 'set'], 'sync');
        test.updateBoth();
        const proposals = [createValue(nested, 'A'), createValue(nested, 'A', 'B')];
        expect(test.changes).toEqual(proposals);
        expect(test.validations).toEqual(proposals);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
        expect(test.initial).toEqual(createValue(nested));
        expect(test.events).toEqual([
          'change:A/old-b',
          'validate:A/old-b',
          'check',
          'change:A/B',
          'validate:A/B',
          'check'
        ]);
      });

      it('keeps committed controlled props authoritative during a suspended transition', async () => {
        const initial = createValue(nested);
        const pending = createValue(nested, 'pending-a', 'pending-b');
        const changes: Values[] = [];
        const validations: Values[] = [];
        let pendingRenders = 0;
        const suspended = new Promise<void>(() => {});

        function CommittedField() {
          const field = useFormControl({ name: nested ? 'profile.first' : 'first' });
          return (
            <>
              <input aria-label="Committed first" value={field.value || ''} readOnly />
              <button type="button" onClick={() => field.setValue('A', true)}>
                Update committed field
              </button>
            </>
          );
        }

        function PendingValue({ value }: { value: Values }) {
          if (value === pending) {
            pendingRenders++;
            throw suspended;
          }
          return null;
        }

        function Owner() {
          const [value, setValue] = useState(initial);
          return (
            <>
              <button type="button" onClick={() => startTransition(() => setValue(pending))}>
                Start pending props
              </button>
              <Suspense fallback={<p>Waiting for pending props</p>}>
                <Form
                  nestedField={nested}
                  formValue={value}
                  resolver={nextValue => {
                    validations.push(nextValue);
                    return { errors: {} };
                  }}
                  onChange={nextValue => changes.push(nextValue)}
                >
                  <CommittedField />
                  <PendingValue value={value} />
                </Form>
              </Suspense>
            </>
          );
        }

        render(<Owner />);
        fireEvent.click(screen.getByRole('button', { name: 'Start pending props' }));
        await waitFor(() => expect(pendingRenders).toBeGreaterThan(0));
        expect(screen.getByRole('textbox', { name: 'Committed first' })).toHaveValue('old-a');
        expect(screen.queryByText('Waiting for pending props')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Update committed field' }));
        expect(changes).toEqual([createValue(nested, 'A')]);
        expect(validations).toEqual([createValue(nested, 'A')]);
        expect(screen.getByRole('textbox', { name: 'Committed first' })).toHaveValue('old-a');
        expect(initial).toEqual(createValue(nested));
        expect(pending).toEqual(createValue(nested, 'pending-a', 'pending-b'));
      });

      it('uses new external controlled props in a child layout effect setter and validation', () => {
        const initial = createValue(nested);
        const next = createValue(nested, 'new-a', 'new-b');
        const changes: Values[] = [];
        const validations: Values[] = [];

        function LayoutFields({ value }: { value: Values }) {
          const first = useFormControl({ name: nested ? 'profile.first' : 'first' });
          const second = useFormControl({ name: nested ? 'profile.second' : 'second' });
          useLayoutEffect(() => {
            if (value === next) first.setValue('C', true);
          }, [first.setValue, value]);
          return (
            <>
              <input aria-label="First" value={first.value || ''} readOnly />
              <input aria-label="Second" value={second.value || ''} readOnly />
            </>
          );
        }

        function Owner() {
          const [value, setValue] = useState(initial);
          return (
            <Form
              nestedField={nested}
              formValue={value}
              onChange={nextValue => changes.push(nextValue)}
              resolver={nextValue => {
                validations.push(nextValue);
                return { errors: {} };
              }}
            >
              <LayoutFields value={value} />
              <button type="button" onClick={() => setValue(next)}>
                Commit external props
              </button>
            </Form>
          );
        }

        render(<Owner />);
        fireEvent.click(screen.getByRole('button', { name: 'Commit external props' }));
        const proposed = createValue(nested, 'C', 'new-b');
        expect({ changes, validations }).toEqual({ changes: [proposed], validations: [proposed] });
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('new-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('new-b');
        expect(initial).toEqual(createValue(nested));
        expect(next).toEqual(createValue(nested, 'new-a', 'new-b'));
      });

      for (const accept of [false, true]) {
        it(`preserves accumulated controlled cleanup when the owner ${accept ? 'accepts' : 'rejects'} it`, () => {
          const test = setupCleanup(nested, accept);
          test.removeBoth();
          const emptied = nested ? { profile: {} } : {};
          expect(test.changes).toEqual([
            nested ? { profile: { second: 'old-b' } } : { second: 'old-b' },
            emptied
          ]);
          const committed = accept ? emptied : createValue(nested);
          expect(screen.getByLabelText('Committed values')).toHaveTextContent(
            JSON.stringify(committed)
          );
          test.updateRemaining();
          const next = nested
            ? { profile: { ...(accept ? {} : createValue(true).profile), third: 'C' } }
            : { ...(accept ? {} : createValue(false)), third: 'C' };
          expect(test.changes[2]).toEqual(next);
          expect(test.validations).toEqual([next]);
          expect(test.initial).toEqual(createValue(nested));
          expect(screen.getByRole('textbox', { name: 'Remaining' })).toHaveValue(accept ? 'C' : '');
        });
      }

      it('composes a same-event edit from the values restored by reset', () => {
        const test = setup(nested, ['set', 'set'], 'uncontrolled', true);
        test.updateBoth();
        expect(test.changes).toEqual([
          createValue(nested, 'A'),
          createValue(nested),
          createValue(nested, 'old-a', 'B')
        ]);
        expect(test.resets).toEqual([createValue(nested)]);
        expect(test.events.indexOf('reset')).toBe(test.events.indexOf('change:old-a/old-b') + 1);
        expect(test.validations[1]).toEqual(createValue(nested, 'old-a', 'B'));
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
      });

      it('does not treat a rejected controlled reset as accepted values', () => {
        const test = setup(
          nested,
          ['set', 'set'],
          'reject',
          true,
          createValue(nested, 'accepted-a', 'accepted-b')
        );
        test.updateBoth();
        expect(test.changes).toEqual([
          createValue(nested, 'A', 'accepted-b'),
          createValue(nested),
          createValue(nested, 'accepted-a', 'B')
        ]);
        expect(test.validations[1]).toEqual(createValue(nested, 'accepted-a', 'B'));
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('accepted-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('accepted-b');
      });

      it('composes checkAsync resolver inputs for onChange then setValue', async () => {
        const initial = createValue(nested);
        const changes: Values[] = [];
        const validations: Values[] = [];
        const events: string[] = [];
        const checks: unknown[] = [];
        const errors: unknown[] = [];
        render(
          <Form
            nestedField={nested}
            formDefaultValue={initial}
            resolver={nextValue => {
              validations.push(nextValue);
              events.push(`validate:${label(nextValue)}`);
              return Promise.resolve({ errors: {} });
            }}
            onChange={nextValue => {
              changes.push(nextValue);
              events.push(`change:${label(nextValue)}`);
            }}
            onCheck={formError => {
              checks.push(formError);
              events.push('check');
            }}
            onError={formError => errors.push(formError)}
          >
            <Fields nested={nested} routes={['change', 'set']} checkAsync />
          </Form>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Update both' }));
        await waitFor(() => expect(checks[checks.length - 1]).toEqual({}));
        const proposals = [createValue(nested, 'A'), createValue(nested, 'A', 'B')];
        expect(changes).toEqual(proposals);
        expect(validations).toEqual(proposals);
        expect(events.slice(0, 4)).toEqual([
          'validate:A/old-b',
          'change:A/old-b',
          'change:A/B',
          'validate:A/B'
        ]);
        expect(events.slice(4)).toEqual(checks.map(() => 'check'));
        expect(errors).toEqual([]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
        expect(initial).toEqual(createValue(nested));
      });

      for (const checkAsync of [false, true]) {
        it(`validates native cross-field schema against both updates ${checkAsync ? 'asynchronously' : 'synchronously'}`, async () => {
          const initial = createValue(nested);
          const ruleInputs: { value: string; data: Values }[] = [];
          const events: string[] = [];
          const check = (value: string, data: Values) => {
            ruleInputs.push({ value, data });
            events.push(`rule:${label(data)}`);
            return value === 'B' && (data.profile || data).first === 'A';
          };
          const rule = checkAsync
            ? Schema.Types.StringType().addAsyncRule(
                (value, data) => Promise.resolve(check(value, data)),
                'Both updates are required'
              )
            : Schema.Types.StringType().addRule(check, 'Both updates are required');
          const fields = { first: Schema.Types.StringType(), second: rule };
          const model = nested
            ? Schema.Model({ profile: Schema.Types.ObjectType().shape(fields) })
            : Schema.Model(fields);

          function NativeFields() {
            const first = useFormControl({ name: nested ? 'profile.first' : 'first' });
            const second = useFormControl({
              name: nested ? 'profile.second' : 'second',
              checkAsync
            });
            return (
              <>
                <input aria-label="First" value={first.value || ''} readOnly />
                <input aria-label="Second" value={second.value || ''} readOnly />
                <output aria-label="Second error">{second.error || 'valid'}</output>
                <button
                  type="button"
                  onClick={() => {
                    first.setValue('A');
                    second.setValue('B', true);
                  }}
                >
                  Update native fields
                </button>
              </>
            );
          }

          render(
            <Form
              nestedField={nested}
              formDefaultValue={initial}
              model={model}
              errorFromContext
              onChange={nextValue => events.push(`change:${label(nextValue)}`)}
              onCheck={() => events.push('check')}
            >
              <NativeFields />
            </Form>
          );
          fireEvent.click(screen.getByRole('button', { name: 'Update native fields' }));
          await waitFor(() => expect(events.filter(event => event === 'check')).toHaveLength(1));
          expect(ruleInputs).toEqual([{ value: 'B', data: createValue(nested, 'A', 'B') }]);
          expect(events).toEqual(['change:A/old-b', 'change:A/B', 'rule:A/B', 'check']);
          expect(screen.getByLabelText('Second error')).toHaveTextContent('valid');
          expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
          expect(initial).toEqual(createValue(nested));
        });
      }
    });
  }
});
