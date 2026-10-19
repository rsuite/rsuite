import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';
import { freeze, type Adapter } from './cleanErrorsTestUtils';

describe.each<Adapter>(['schema field', 'schema whole', 'resolver field', 'resolver whole'])(
  '%s synchronous field cleanup',
  adapter => {
    for (const boundary of ['onCheck', 'callback'] as const) {
      for (const controlled of [false, true]) {
        it(`${controlled ? 'rejects controlled' : 'accepts'} cleanup during ${boundary}`, () => {
          const initial = freeze({ name: 'Owner error' });
          const errors = freeze({ name: 'Required' });
          const ref = React.createRef<FormInstance>();
          const cleanup = () => ref.current!.cleanErrorForField('name');
          const onCheck = vi.fn(boundary === 'onCheck' ? cleanup : () => {});
          const callback = vi.fn(boundary === 'callback' ? cleanup : () => {});
          const onError = vi.fn();
          render(
            <Form
              ref={ref}
              model={Schema.Model({ name: Schema.Types.StringType().isRequired('Required') })}
              resolver={adapter.startsWith('resolver') ? () => ({ errors }) : undefined}
              formDefaultValue={{ name: '' }}
              formError={controlled ? initial : undefined}
              onCheck={onCheck}
              onError={onError}
            >
              <Form.Control name="name" aria-label="Name" />
            </Form>
          );
          act(() => {
            const valid = adapter.endsWith('whole')
              ? ref.current!.check(callback)
              : ref.current!.checkForField('name', callback);
            // The invocation still returns its own validation result.
            expect(valid).toBe(false);
          });
          expect(onCheck).toHaveBeenCalledExactlyOnceWith(errors);
          expect(callback).toHaveBeenCalledExactlyOnceWith(
            adapter.endsWith('whole') ? errors : { hasError: true, errorMessage: 'Required' }
          );
          if (controlled) {
            expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
              'aria-invalid',
              'true'
            );
            expect(onError).toHaveBeenCalledExactlyOnceWith(errors);
          } else {
            expect(screen.getByRole('textbox', { name: 'Name' })).not.toHaveAttribute(
              'aria-invalid'
            );
            expect(onError).not.toHaveBeenCalled();
          }
          expect(initial).toEqual({ name: 'Owner error' });
          expect(errors).toEqual({ name: 'Required' });
        });
      }
    }
  }
);
