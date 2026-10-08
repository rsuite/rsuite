import React, { Suspense, startTransition } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';
import useFormControl from '..';

describe.each([false, true])(
  'Form value ownership during suspended renders (nested=%s)',
  nested => {
    it.each([false, true])(
      'keeps committed ownership (controlled=%s)',
      async initiallyControlled => {
        const values = (first: string, second: string) =>
          nested ? { profile: { first, second } } : { first, second };
        const initial = values('old-a', 'old-b');
        const draft = values('draft-a', 'draft-b');
        if (nested) {
          Object.freeze(initial.profile);
          Object.freeze(draft.profile);
        }
        Object.freeze(initial);
        Object.freeze(draft);
        const changes: unknown[] = [];
        const validations: unknown[] = [];
        let suspended = false;
        const never = new Promise<void>(() => {});

        function Fields() {
          const first = useFormControl({ name: nested ? 'profile.first' : 'first' });
          const second = useFormControl({ name: nested ? 'profile.second' : 'second' });
          return (
            <>
              <input aria-label="First" value={first.value || ''} readOnly />
              <input aria-label="Second" value={second.value || ''} readOnly />
              <button type="button" onClick={() => first.setValue('A', true)}>
                Edit first
              </button>
              <button type="button" onClick={event => second.onChange('B', event)}>
                Edit second
              </button>
            </>
          );
        }
        function SuspendAfterForm({ pending }: { pending: boolean }) {
          if (pending) {
            suspended = true;
            throw never;
          }
          return null;
        }
        function Owner() {
          const [pending, setPending] = React.useState(false);
          const [controlled, setControlled] = React.useState(initiallyControlled);
          const nextControlled = pending ? !controlled : controlled;
          return (
            <>
              <button type="button" onClick={() => startTransition(() => setPending(true))}>
                Suspend ownership change
              </button>
              <button type="button" onClick={() => setPending(false)}>
                Abandon ownership change
              </button>
              <button type="button" onClick={() => setControlled(false)}>
                Commit uncontrolled
              </button>
              <Suspense fallback={<p>Loading</p>}>
                <Form
                  nestedField={nested}
                  formDefaultValue={initial}
                  formValue={nextControlled ? (pending ? draft : initial) : undefined}
                  onChange={next => changes.push(next)}
                  resolver={next => {
                    validations.push(next);
                    return { errors: {} };
                  }}
                >
                  <Fields />
                </Form>
                <SuspendAfterForm pending={pending} />
              </Suspense>
            </>
          );
        }

        render(<Owner />);
        fireEvent.click(screen.getByRole('button', { name: 'Suspend ownership change' }));
        await waitFor(() => expect(suspended).toBe(true));
        expect(screen.queryByText('Loading')).toBeNull();
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        fireEvent.click(screen.getByRole('button', { name: 'Edit first' }));
        expect(changes).toEqual([values('A', 'old-b')]);
        expect(validations).toEqual(changes);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue(
          initiallyControlled ? 'old-a' : 'A'
        );
        fireEvent.click(screen.getByRole('button', { name: 'Abandon ownership change' }));
        fireEvent.click(screen.getByRole('button', { name: 'Edit second' }));
        expect(changes).toEqual([
          values('A', 'old-b'),
          values(initiallyControlled ? 'old-a' : 'A', 'B')
        ]);
        expect(validations).toEqual(changes);
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue(
          initiallyControlled ? 'old-b' : 'B'
        );
        if (initiallyControlled) {
          // Proposals rejected by the controlled owner must not leak into retained local state.
          fireEvent.click(screen.getByRole('button', { name: 'Commit uncontrolled' }));
          expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
          fireEvent.click(screen.getByRole('button', { name: 'Edit second' }));
          expect(changes[2]).toEqual(values('old-a', 'B'));
          expect(validations).toEqual(changes);
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
        }
        expect(initial).toEqual(values('old-a', 'old-b'));
        expect(draft).toEqual(values('draft-a', 'draft-b'));
      }
    );
  }
);
