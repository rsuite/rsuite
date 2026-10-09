import React, { startTransition, Suspense, useLayoutEffect, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';
import useFormControl from '..';
import { createValue, setup, setupCleanup, type Values } from './consecutiveValuesTestUtils';

describe('useFormControl consecutive values in one event', () => {
  for (const nested of [false, true]) {
    describe(nested ? 'nested fields' : 'flat fields', () => {
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
    });
  }
});
