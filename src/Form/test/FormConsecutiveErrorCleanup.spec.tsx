import React, { StrictMode, useLayoutEffect, useRef, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '../index';
import Schema from '../../Schema';

type Row = {
  label: string;
  nested: boolean;
  first: string;
  second: string;
  keep: string;
  values: Record<string, any>;
  errors: Record<string, any>;
  remaining: Record<string, any>;
  retained: (next: Record<string, any>) => void;
};

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

const leaf = (message: string) => ({ hasError: true, errorMessage: message });

function makeRow(label: string, prefix = 'Initial'): Row {
  const metadata = { hasError: true, errorMessage: `${prefix} metadata` };
  const first = leaf(`${prefix} first`);
  const second = leaf(`${prefix} second`);
  const keep = leaf(`${prefix} keep`);
  const extra = leaf(`${prefix} extra`);
  const common = {
    label,
    nested: true,
    retained: (next: any) => expect(next.metadata).toBe(metadata)
  };

  if (label === 'flat fields') {
    return freeze({
      ...common,
      nested: false,
      first: 'first',
      second: 'second',
      keep: 'keep',
      values: { first: '', second: '', keep: '', probe: 'ok' },
      errors: {
        first: first.errorMessage,
        second: second.errorMessage,
        keep: keep.errorMessage,
        metadata
      },
      remaining: { keep: keep.errorMessage, metadata }
    });
  }

  if (label === 'structured object') {
    const errors = {
      profile: {
        hasError: true,
        errorMessage: `${prefix} aggregate`,
        object: { first, second, keep, extra }
      },
      'profile.object.first': `${prefix} unrelated literal`,
      metadata
    };
    return freeze({
      ...common,
      first: 'profile.first',
      second: 'profile.second',
      keep: 'profile.keep',
      values: { profile: { first: '', second: '', keep: '' }, probe: 'ok' },
      errors,
      remaining: { ...errors, profile: { ...errors.profile, object: { keep, extra } } },
      retained: next => {
        expect(next.metadata).toBe(metadata);
        expect(next.profile.object.keep).toBe(keep);
        expect(next.profile.object.extra).toBe(extra);
      }
    });
  }

  if (label === 'numeric aliases and schema leaves') {
    const sibling = { object: { name: keep } };
    const errors = {
      'rows[0].name': first.errorMessage,
      'rows.0.name': `${prefix} first alias`,
      'rows.1.name': second.errorMessage,
      'rows[1].name': `${prefix} second alias`,
      'rows[2].name': keep.errorMessage,
      'rows.01.name': `${prefix} leading zero literal`,
      'rows.array[0].object.name': `${prefix} unrelated literal`,
      rows: {
        hasError: true,
        errorMessage: `${prefix} aggregate`,
        array: [{ object: { name: first, email: extra } }, { object: { name: second } }, sibling]
      },
      metadata
    };
    const remaining = {
      'rows[2].name': keep.errorMessage,
      'rows.01.name': errors['rows.01.name'],
      'rows.array[0].object.name': errors['rows.array[0].object.name'],
      rows: { ...errors.rows, array: [{ object: { email: extra } }, { object: {} }, sibling] },
      metadata
    };
    return freeze({
      ...common,
      first: 'rows[0].name',
      second: 'rows.1.name',
      keep: 'rows[2].name',
      values: { rows: [{ name: '' }, { name: '' }, { name: '' }], probe: 'ok' },
      errors,
      remaining,
      retained: next => {
        expect(next.metadata).toBe(metadata);
        expect(next.rows.array[0].object.email).toBe(extra);
        expect(next.rows.array[2]).toBe(sibling);
      }
    });
  }

  const profile = { object: { name: first, email: second } };
  return freeze({
    ...common,
    nested: false,
    first: 'profile.name',
    second: 'profile.email',
    keep: 'keep',
    values: { 'profile.name': '', 'profile.email': '', keep: '', probe: 'ok' },
    errors: {
      'profile.name': first.errorMessage,
      'profile.email': second.errorMessage,
      keep: keep.errorMessage,
      profile,
      metadata
    },
    remaining: { keep: keep.errorMessage, profile, metadata },
    retained: next => {
      expect(next.metadata).toBe(metadata);
      expect(next.profile).toBe(profile);
    }
  });
}

const labels = [
  'flat fields',
  'structured object',
  'numeric aliases and schema leaves',
  'nonnested literal dotted keys'
];
const controlledLabels = [labels[0], labels[2]];
const probeModel = () => Schema.Model({ probe: Schema.Types.StringType() });
type Ref = React.RefObject<FormInstance<Record<string, any>, any> | null>;

function Controls({ row }: { row: Row }) {
  return (
    <>
      <Form.Control name={row.first} id="first-field" aria-label="first" />
      <Form.Control name={row.second} id="second-field" aria-label="second" />
      <Form.Control name={row.keep} id="keep-field" aria-label="keep" />
    </>
  );
}

function observeErrors(ref: Ref, onCheck: ReturnType<typeof vi.fn>) {
  act(() => {
    expect(ref.current?.checkForField('probe')).toBe(true);
  });
  const observed = onCheck.mock.lastCall?.[0];
  expect(observed).toBeDefined();
  // The valid probe is the public observer, and nested validation installs its result.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { probe: _, ...errors } = observed;
  return { observed, errors };
}

function expectCleared(id: string, label: string) {
  expect(screen.getByRole('textbox', { name: label })).not.toHaveAttribute('aria-invalid');
  expect(document.getElementById(`${id}-error-message`)).not.toBeInTheDocument();
}

function expectInvalid(id: string, label: string, message: string) {
  const input = screen.getByRole('textbox', { name: label });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-errormessage', `${id}-error-message`);
  expect(document.getElementById(`${id}-error-message`)).toHaveTextContent(message);
}

function cleanupCase(label: string, operation: string, strict = false) {
  const initial = makeRow(label);
  const reset = makeRow(label, 'Reset');
  const initialJson = JSON.stringify(initial.errors);
  const resetJson = JSON.stringify(reset.errors);
  const ref = React.createRef<FormInstance<Record<string, any>, any>>();
  const onCheck = vi.fn();
  const onError = vi.fn();
  const onChange = vi.fn();
  const form = (
    <Form
      ref={ref}
      nestedField={initial.nested}
      formDefaultValue={initial.values}
      model={probeModel()}
      onCheck={onCheck}
      onError={onError}
      onChange={onChange}
    >
      <Controls row={initial} />
      <button
        type="button"
        onClick={() => {
          if (operation === 'reset then clear twice') ref.current?.resetErrors(reset.errors);
          if (operation === 'clear all then clear field') ref.current?.cleanErrors();
          if (operation === 'default reset then clear field') ref.current?.resetErrors();
          ref.current?.cleanErrorForField(initial.first);
          if (operation === 'clear twice' || operation === 'reset then clear twice')
            ref.current?.cleanErrorForField(initial.second);
        }}
      >
        perform cleanup
      </button>
      <button type="button" onClick={() => ref.current?.cleanErrorForField(initial.second)}>
        clear second separately
      </button>
    </Form>
  );
  render(strict ? <StrictMode>{form}</StrictMode> : form);
  act(() => {
    ref.current?.resetErrors(initial.errors);
  });
  expectInvalid('first-field', 'first', 'Initial first');
  expectInvalid('second-field', 'second', 'Initial second');
  const before = observeErrors(ref, onCheck).observed;
  const beforeJson = JSON.stringify(before);
  onCheck.mockClear();

  fireEvent.click(screen.getByRole('button', { name: 'perform cleanup' }));
  if (operation === 'separate events') {
    expectCleared('first-field', 'first');
    expectInvalid('second-field', 'second', 'Initial second');
    fireEvent.click(screen.getByRole('button', { name: 'clear second separately' }));
  }
  expectCleared('first-field', 'first');
  expectCleared('second-field', 'second');
  expect(onCheck).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  const clearsAll =
    operation === 'clear all then clear field' || operation === 'default reset then clear field';
  const expected = operation === 'reset then clear twice' ? reset : initial;
  if (clearsAll) expectCleared('keep-field', 'keep');
  else
    expectInvalid(
      'keep-field',
      'keep',
      `${operation === 'reset then clear twice' ? 'Reset' : 'Initial'} keep`
    );
  const after = observeErrors(ref, onCheck).errors;
  expect(after).toEqual(clearsAll ? {} : expected.remaining);
  if (!clearsAll) expected.retained(after);
  expect(onCheck).toHaveBeenCalledTimes(1);
  expect(onError).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(JSON.stringify(initial.errors)).toBe(initialJson);
  expect(JSON.stringify(reset.errors)).toBe(resetJson);
  expect(JSON.stringify(before)).toBe(beforeJson);
}

describe('Form consecutive explicit error cleanup', () => {
  for (const label of labels) {
    for (const operation of [
      'clear twice',
      'reset then clear twice',
      'clear all then clear field',
      'default reset then clear field',
      'separate events'
    ]) {
      it(`${operation} preserves the accepted snapshot for ${label}`, () =>
        cleanupCase(label, operation));
    }
  }

  for (const label of controlledLabels) {
    for (const accepted of [false, true]) {
      it(`${accepted ? 'accepts an explicit owner prop update' : 'retains a rejected controlled snapshot'} for ${label}`, () => {
        const row = makeRow(label);
        const before = JSON.stringify(row.errors);
        const ref = React.createRef<FormInstance<Record<string, any>, any>>();
        const onCheck = vi.fn();
        const onError = vi.fn();
        const onChange = vi.fn();
        function Owner() {
          const [errors, setErrors] = useState(row.errors);
          return (
            <Form
              ref={ref}
              nestedField={row.nested}
              formDefaultValue={row.values}
              formError={errors}
              model={probeModel()}
              onCheck={onCheck}
              onError={onError}
              onChange={onChange}
            >
              <Controls row={row} />
              <button
                type="button"
                onClick={() => {
                  ref.current?.cleanErrorForField(row.first);
                  ref.current?.cleanErrorForField(row.second);
                  ref.current?.cleanErrors();
                  ref.current?.resetErrors(row.remaining);
                  if (accepted) setErrors(row.remaining);
                }}
              >
                perform cleanup
              </button>
              <button type="button" onClick={() => ref.current?.cleanErrorForField(row.keep)}>
                clear keep
              </button>
            </Form>
          );
        }
        render(<Owner />);
        fireEvent.click(screen.getByRole('button', { name: 'perform cleanup' }));
        if (accepted) {
          expectCleared('first-field', 'first');
          expectCleared('second-field', 'second');
        } else {
          expectInvalid('first-field', 'first', 'Initial first');
          expectInvalid('second-field', 'second', 'Initial second');
        }
        fireEvent.click(screen.getByRole('button', { name: 'clear keep' }));
        expectInvalid('keep-field', 'keep', 'Initial keep');
        expect(onCheck).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        const next = observeErrors(ref, onCheck).errors;
        expect(next).toEqual(accepted ? row.remaining : row.errors);
        row.retained(next);
        expect(JSON.stringify(row.errors)).toBe(before);
      });
    }
  }

  for (const label of controlledLabels) {
    it(`composes consecutive cleanup in StrictMode for ${label}`, () =>
      cleanupCase(label, 'clear twice', true));
  }

  it('uses a newly controlled owner snapshot after earlier uncontrolled cleanup proposals', () => {
    const initial = makeRow(labels[0]);
    const controlled = makeRow(labels[0], 'Owner');
    const initialJson = JSON.stringify(initial.errors);
    const controlledJson = JSON.stringify(controlled.errors);
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const onChange = vi.fn();
    function Owner() {
      const [errors, setErrors] = useState<Record<string, any>>();
      return (
        <Form
          ref={ref}
          formDefaultValue={initial.values}
          formError={errors}
          model={probeModel()}
          onCheck={onCheck}
          onError={onError}
          onChange={onChange}
        >
          <Controls row={initial} />
          <button
            type="button"
            onClick={() => {
              ref.current?.cleanErrorForField(initial.first);
              ref.current?.cleanErrorForField(initial.second);
              setErrors(controlled.errors);
            }}
          >
            accept controlled errors
          </button>
          <button
            type="button"
            onClick={() => {
              ref.current?.cleanErrorForField(initial.first);
              ref.current?.cleanErrors();
            }}
          >
            reject cleanup
          </button>
        </Form>
      );
    }
    render(<Owner />);
    act(() => {
      ref.current?.resetErrors(initial.errors);
    });
    fireEvent.click(screen.getByRole('button', { name: 'accept controlled errors' }));
    fireEvent.click(screen.getByRole('button', { name: 'reject cleanup' }));
    expectInvalid('first-field', 'first', 'Owner first');
    expectInvalid('second-field', 'second', 'Owner second');
    expectInvalid('keep-field', 'keep', 'Owner keep');
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(observeErrors(ref, onCheck).errors).toEqual(controlled.errors);
    expect(JSON.stringify(initial.errors)).toBe(initialJson);
    expect(JSON.stringify(controlled.errors)).toBe(controlledJson);
  });

  for (const label of controlledLabels) {
    for (const operation of ['clear field', 'clear all', 'reset errors']) {
      it(`keeps owner errors authoritative in child layout after ${operation} for ${label}`, () => {
        const initial = makeRow(label);
        const owner = makeRow(label, 'Owner');
        const initialJson = JSON.stringify(initial.errors);
        const ownerJson = JSON.stringify(owner.errors);
        const ref = React.createRef<FormInstance<Record<string, any>, any>>();
        const savedApi = { current: null as FormInstance<Record<string, any>, any> | null };
        const onCheck = vi.fn();
        const onError = vi.fn();
        const onChange = vi.fn();
        function Child({ controlled }: { controlled: boolean }) {
          const [showProbe, setShowProbe] = useState(true);
          const records = useRef({ onCheck, onChange, onError });
          useLayoutEffect(() => {
            if (!controlled) return;
            expect(savedApi.current).not.toBeNull();
            if (operation === 'clear field') savedApi.current?.cleanErrorForField(initial.first);
            if (operation === 'clear all') savedApi.current?.cleanErrors();
            if (operation === 'reset errors') savedApi.current?.resetErrors(initial.remaining);
            expect(records.current.onCheck).not.toHaveBeenCalled();
            expect(records.current.onChange).not.toHaveBeenCalled();
            expect(records.current.onError).not.toHaveBeenCalled();
            // This child-only update avoids a Form render overwriting its private error ref.
            // The public unmount callbacks observe authority after the explicit cleanup.
            setShowProbe(false);
          }, [controlled]);
          return showProbe ? (
            <Form.Control
              name="cleanupObserver"
              aria-label="cleanup observer"
              shouldResetWithUnmount
            />
          ) : null;
        }
        function Owner() {
          const [controlled, setControlled] = useState(false);
          return (
            <Form
              ref={ref}
              nestedField={initial.nested}
              formValue={initial.values}
              formError={controlled ? owner.errors : undefined}
              model={probeModel()}
              onCheck={onCheck}
              onError={onError}
              onChange={onChange}
            >
              <Controls row={initial} />
              <Child controlled={controlled} />
              <button
                type="button"
                onClick={() => {
                  savedApi.current = ref.current;
                  setControlled(true);
                }}
              >
                accept controlled errors
              </button>
            </Form>
          );
        }
        render(<Owner />);
        act(() => {
          ref.current?.resetErrors(initial.errors);
        });
        expectInvalid('first-field', 'first', 'Initial first');
        fireEvent.click(screen.getByRole('button', { name: 'accept controlled errors' }));
        expectInvalid('first-field', 'first', 'Owner first');
        expectInvalid('second-field', 'second', 'Owner second');
        expectInvalid('keep-field', 'keep', 'Owner keep');
        expect(onCheck).toHaveBeenCalledTimes(1);
        const observed = onCheck.mock.calls[0][0];
        expect(observed).toEqual(owner.errors);
        owner.retained(observed);
        expect(onError).not.toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledExactlyOnceWith(initial.values);
        expect(onChange.mock.calls[0][0]).not.toBe(initial.values);
        expect(JSON.stringify(initial.errors)).toBe(initialJson);
        expect(JSON.stringify(owner.errors)).toBe(ownerJson);
      });
    }
  }
});
