import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Form, { type FormInstance } from '../../Form';
import useFormControl from '..';

export type Values = {
  first?: string;
  second?: string;
  third?: string;
  profile?: { first?: string; second?: string; third?: string };
};

export type Route = 'set' | 'change';

export type Mode = 'uncontrolled' | 'reject' | 'first' | 'sync';

export const createValue = (nested: boolean, first = 'old-a', second = 'old-b'): Values =>
  nested ? { profile: { first, second } } : { first, second };

export const label = (value: Values) => {
  const fields = value.profile || value;
  return `${fields.first}/${fields.second}`;
};

export function Fields({
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

export function setup(
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

export function setupCleanup(nested: boolean, accept: boolean) {
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
