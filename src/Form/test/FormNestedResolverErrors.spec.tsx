import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '..';
import Schema from '../../Schema';
import { values, required, projectionRows, Control } from './nestedResolverErrorFixtures';

describe('Form nested resolver error paths', () => {
  for (const row of projectionRows) {
    it(`exposes ${row.label} errors and connects the accessible error message`, () => {
      const errors = row.errors;
      const before = JSON.stringify(errors);
      render(
        <Form
          nestedField={row.nested !== false}
          formValue={row.values || values}
          formError={errors}
          resolver={() => ({ errors })}
        >
          <Control name={row.name} />
        </Form>
      );
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-errormessage',
        'target-error-message'
      );
      expect(screen.getByRole('alert')).toHaveAttribute('id', 'target-error-message');
      expect(screen.getByRole('alert')).toHaveTextContent('Required');
      expect(JSON.stringify(errors)).toBe(before);
    });
  }

  for (const checkAsync of [false, true]) {
    for (const row of [
      projectionRows[0],
      projectionRows[2],
      projectionRows[3],
      projectionRows[4]
    ]) {
      it(`returns the raw ${row.label} field error from ${checkAsync ? 'async' : 'sync'} resolver checks`, async () => {
        const errors = row.errors;
        const expected = row === projectionRows[4] ? required : 'Required';
        const onCheck = vi.fn();
        const onError = vi.fn();
        const callback = vi.fn();
        const ref = React.createRef<FormInstance<Record<string, any>, any>>();
        render(
          <Form
            ref={ref}
            nestedField
            formDefaultValue={values}
            resolver={() => (checkAsync ? Promise.resolve({ errors }) : { errors })}
            onCheck={onCheck}
            onError={onError}
          >
            <Control name={row.name} />
          </Form>
        );
        if (checkAsync) {
          let result: any;
          await act(async () => {
            result = await ref.current?.checkForFieldAsync(row.name);
          });
          expect(result).toEqual({ hasError: true, errorMessage: expected });
          expect(result.errorMessage).toBe(expected);
        } else {
          act(() => {
            expect(ref.current?.checkForField(row.name, callback)).toBe(false);
          });
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback.mock.lastCall?.[0]).toEqual({ hasError: true, errorMessage: expected });
          expect(callback.mock.lastCall?.[0].errorMessage).toBe(expected);
        }
        expect(onCheck).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onCheck.mock.lastCall?.[0]).toEqual(errors);
        expect(onError.mock.lastCall?.[0]).toEqual(errors);
        if (row === projectionRows[4])
          expect(onCheck.mock.lastCall?.[0].profile).toBe(errors.profile);
        expect(screen.getByRole('alert')).toHaveTextContent('Required');
        expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
      });
    }
  }

  it('preserves a resolver React error element in UI and field callback payloads', () => {
    const error = <span>Element error</span>;
    const errors = { 'profile.name': error };
    const callback = vi.fn();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form
        ref={ref}
        nestedField
        formDefaultValue={values}
        resolver={() => ({ errors })}
        onCheck={onCheck}
        onError={onError}
      >
        <Control name="profile.name" />
      </Form>
    );
    act(() => {
      expect(ref.current?.checkForField('profile.name', callback)).toBe(false);
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Element error');
    expect(callback.mock.lastCall?.[0].errorMessage).toBe(error);
    expect(onCheck.mock.lastCall?.[0]['profile.name']).toBe(error);
    expect(onError.mock.lastCall?.[0]['profile.name']).toBe(error);
    expect(errors['profile.name']).toBe(error);
  });

  for (const checkAsync of [false, true]) {
    it(`keeps native object/array schema field errors compatible with ${checkAsync ? 'async' : 'sync'} checks`, async () => {
      const model = Schema.Model({
        profile: Schema.Types.ObjectType().shape({
          name: Schema.Types.StringType().isRequired('Object required')
        }),
        products: Schema.Types.ArrayType().of(
          Schema.Types.ObjectType().shape({
            name: Schema.Types.StringType().isRequired('Array required')
          })
        )
      });
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      render(
        <Form ref={ref} nestedField model={model} formDefaultValue={values}>
          <Control name="profile.name" />
          <Control name="products[0].name" id="array" />
        </Form>
      );
      if (checkAsync) {
        await act(async () => {
          expect((await ref.current?.checkForFieldAsync('profile.name'))?.hasError).toBe(true);
        });
        await act(async () => {
          expect((await ref.current?.checkForFieldAsync('products[0].name'))?.hasError).toBe(true);
        });
      } else {
        act(() => {
          expect(ref.current?.checkForField('profile.name')).toBe(false);
        });
        act(() => {
          expect(ref.current?.checkForField('products[0].name')).toBe(false);
        });
      }
      expect(document.getElementById('target-error-message')).toHaveTextContent('Object required');
      expect(document.getElementById('array-error-message')).toHaveTextContent('Array required');
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByRole('textbox', { name: 'array' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  }
});
