import React, { Suspense, startTransition } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '../index';

describe.each(['resolver whole', 'schema field'] as const)(
  'Form cleanErrors during a suspended %s transition',
  adapter => {
    it.each([true, false])(
      'keeps committed ownership and errors (controlled=%s)',
      async initiallyControlled => {
        const ref = React.createRef<FormInstance>();
        const ownerErrors = Object.freeze({ name: 'Owner error', keep: 'Owner keep' });
        const initialErrors = Object.freeze({ name: 'Initial error', keep: 'Initial keep' });
        const onCheck = vi.fn();
        const onError = vi.fn();
        const releases: (() => void)[] = [];
        const validate = () => new Promise<false>(resolve => releases.push(() => resolve(false)));
        const props =
          adapter === 'resolver whole'
            ? {
                resolver: async () => {
                  await validate();
                  return { errors: { name: 'Delayed error' } };
                }
              }
            : {
                model: SchemaModel({ name: StringType().addAsyncRule(validate, 'Delayed error') })
              };
        let suspended = false;
        const never = new Promise<void>(() => {});
        function SuspendAfterForm({ pending }: { pending: boolean }) {
          if (pending) {
            suspended = true;
            throw never;
          }
          return null;
        }
        function Owner() {
          const [pending, setPending] = React.useState(false);
          const controlled = pending ? !initiallyControlled : initiallyControlled;
          return (
            <>
              <button type="button" onClick={() => startTransition(() => setPending(true))}>
                Suspend
              </button>
              <button type="button" onClick={() => setPending(false)}>
                Cancel transition
              </button>
              <button type="button" onClick={() => ref.current!.cleanErrors()}>
                Clear
              </button>
              <Suspense fallback={<p>Loading</p>}>
                <Form
                  {...props}
                  ref={ref}
                  formDefaultValue={{ name: 'value', keep: 'value' }}
                  formError={controlled ? ownerErrors : undefined}
                  onCheck={onCheck}
                  onError={onError}
                >
                  <Form.Control name="name" aria-label="Name" />
                  <Form.Control name="keep" aria-label="Keep" />
                </Form>
                <SuspendAfterForm pending={pending} />
              </Suspense>
            </>
          );
        }
        const check = () =>
          adapter === 'resolver whole'
            ? ref.current!.checkAsync()
            : ref.current!.checkForFieldAsync('name');
        render(<Owner />);
        if (!initiallyControlled) act(() => ref.current!.resetErrors(initialErrors));
        expect(
          screen.getByText(initiallyControlled ? 'Owner error' : 'Initial error')
        ).toBeVisible();
        let pending!: Promise<any>;
        act(() => {
          pending = check();
        });
        await waitFor(() => expect(releases).toHaveLength(1));
        fireEvent.click(screen.getByRole('button', { name: 'Suspend' }));
        await waitFor(() => expect(suspended).toBe(true));
        expect(screen.queryByText('Loading')).toBeNull();
        fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
        if (!initiallyControlled) expect(screen.queryByRole('alert')).toBeNull();
        await act(async () => {
          releases[0]();
          expect(await pending).toEqual(
            adapter === 'resolver whole'
              ? { hasError: true, formError: { name: 'Delayed error' } }
              : { hasError: true, errorMessage: 'Delayed error' }
          );
        });
        expect(onCheck).toHaveBeenCalledTimes(initiallyControlled ? 1 : 0);
        expect(onError).toHaveBeenCalledTimes(initiallyControlled ? 1 : 0);
        if (initiallyControlled) {
          expect(screen.getByText('Owner error')).toBeVisible();
          expect(screen.getByText('Owner keep')).toBeVisible();
          expect(onCheck).toHaveBeenCalledWith(
            adapter === 'resolver whole'
              ? { name: 'Delayed error' }
              : { name: 'Delayed error', keep: 'Owner keep' }
          );
        } else {
          expect(screen.queryByRole('alert')).toBeNull();
          expect(screen.getByRole('textbox', { name: 'Name' })).not.toHaveAttribute(
            'aria-invalid',
            'true'
          );
        }

        fireEvent.click(screen.getByRole('button', { name: 'Cancel transition' }));
        onCheck.mockClear();
        onError.mockClear();
        act(() => {
          pending = check();
        });
        await waitFor(() => expect(releases).toHaveLength(2));
        await act(async () => {
          releases[1]();
          expect((await pending).hasError).toBe(true);
        });
        expect(onCheck).toHaveBeenCalledOnce();
        expect(onError).toHaveBeenCalledExactlyOnceWith(onCheck.mock.calls[0][0]);
        expect(
          screen.getByText(initiallyControlled ? 'Owner error' : 'Delayed error')
        ).toBeVisible();
        expect(ownerErrors).toEqual({ name: 'Owner error', keep: 'Owner keep' });
        expect(initialErrors).toEqual({ name: 'Initial error', keep: 'Initial keep' });
      }
    );
  }
);
