import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import {
  labels,
  controlledLabels,
  makeRow,
  Controls,
  observeErrors,
  expectCleared,
  expectInvalid,
  probeModel
} from './consecutiveErrorCleanupFixtures';

describe('Form consecutive explicit error cleanup', () => {
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
});
