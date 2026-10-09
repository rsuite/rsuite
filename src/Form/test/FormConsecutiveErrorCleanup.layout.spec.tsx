import React, { useState, useLayoutEffect, useRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import {
  controlledLabels,
  makeRow,
  Controls,
  expectInvalid,
  probeModel
} from './consecutiveErrorCleanupFixtures';

describe('Form consecutive explicit error cleanup', () => {
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
