import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '..';
import { values, required, Control } from './nestedResolverErrorFixtures';

describe('Form nested resolver error paths', () => {
  for (const empty of [undefined, null, '']) {
    it(`lets an own exact ${String(empty)} error suppress aliases and structured fallback`, () => {
      const errors = {
        'products[0].name': empty,
        'products.0.name': 'Old alias',
        products: {
          array: [{ object: { name: { hasError: true, errorMessage: 'Old structured' } } }]
        }
      };
      render(
        <Form nestedField formValue={values} formError={errors}>
          <Control name="products[0].name" />
        </Form>
      );
      expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(Object.prototype.hasOwnProperty.call(errors, 'products[0].name')).toBe(true);
    });
  }

  for (const checkAsync of [false, true]) {
    for (const empty of [undefined, null, '']) {
      it(`installs an own exact ${String(empty)} resolver success consistently after ${checkAsync ? 'async' : 'sync'} field checks`, async () => {
        const sibling = { object: { name: { hasError: true, errorMessage: 'Sibling' } } };
        const email = { hasError: true, errorMessage: 'Email' };
        const errors = {
          'products[0].name': empty,
          'products.0.name': 'Old alias',
          'products[1].name': 'Sibling',
          'products.array[0].object.name': 'Other literal',
          products: {
            hasError: true,
            errorMessage: 'Aggregate',
            array: [{ object: { name: required, email } }, sibling]
          }
        };
        const before = JSON.stringify(errors);
        const callback = vi.fn();
        const onCheck = vi.fn();
        const onError = vi.fn();
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
            <Control name="products[0].name" />
            <Control name="products[1].name" id="sibling" />
          </Form>
        );
        if (checkAsync) {
          let result: any;
          await act(async () => {
            result = await ref.current?.checkForFieldAsync('products[0].name');
          });
          expect(result).toEqual({ hasError: false, errorMessage: empty });
        } else {
          act(() => {
            expect(ref.current?.checkForField('products[0].name', callback)).toBe(true);
          });
          expect(callback).toHaveBeenCalledExactlyOnceWith({ hasError: false });
        }
        expect(onCheck).toHaveBeenCalledTimes(1);
        const next = onCheck.mock.lastCall?.[0];
        expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(next, 'products.0.name')).toBe(false);
        expect(next.products.array[0].object).not.toHaveProperty('name');
        expect(next.products.array[0].object.email).toBe(email);
        expect(next.products.array[1]).toBe(sibling);
        expect(next.products.errorMessage).toBe('Aggregate');
        expect(next['products.array[0].object.name']).toBe('Other literal');
        expect(next['products[1].name']).toBe('Sibling');
        expect(onError).toHaveBeenCalledExactlyOnceWith(next);
        expect(onError.mock.lastCall?.[0]).toBe(next);
        expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
        expect(document.getElementById('target-error-message')).not.toBeInTheDocument();
        expect(document.getElementById('sibling-error-message')).toHaveTextContent('Sibling');
        expect(JSON.stringify(errors)).toBe(before);
        expect(Object.prototype.hasOwnProperty.call(errors, 'products[0].name')).toBe(true);
        expect(errors['products[0].name']).toBe(empty);
      });
    }
  }

  for (const checkAsync of [false, true]) {
    it(`keeps an own exact nonempty error ahead of an empty numeric alias during ${checkAsync ? 'async' : 'sync'} field checks`, async () => {
      const schema = {
        errorMessage: 'Aggregate',
        array: [
          { object: { name: required } },
          { object: { name: { hasError: true, errorMessage: 'Sibling' } } }
        ]
      };
      const errors = {
        'products[0].name': '',
        'products.0.name': 'Exact error',
        'products[1].name': 'Sibling',
        'products.array[0].object.name': 'Other literal',
        products: schema
      };
      const before = JSON.stringify(errors);
      const callback = vi.fn();
      const onCheck = vi.fn();
      const onError = vi.fn();
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
          <Control name="products.0.name" />
          <Control name="products[1].name" id="sibling" />
        </Form>
      );
      const expected = { hasError: true, errorMessage: 'Exact error' };
      if (checkAsync) {
        let result: any;
        await act(async () => {
          result = await ref.current?.checkForFieldAsync('products.0.name');
        });
        expect(result).toEqual(expected);
      } else {
        act(() => {
          expect(ref.current?.checkForField('products.0.name', callback)).toBe(false);
        });
        expect(callback).toHaveBeenCalledExactlyOnceWith(expected);
      }
      expect(onCheck).toHaveBeenCalledTimes(1);
      const next = onCheck.mock.lastCall?.[0];
      expect(next['products.0.name']).toBe('Exact error');
      expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
      expect(next.products).toBe(schema);
      expect(next['products[1].name']).toBe('Sibling');
      expect(next['products.array[0].object.name']).toBe('Other literal');
      expect(onError).toHaveBeenCalledExactlyOnceWith(next);
      expect(onError.mock.lastCall?.[0]).toBe(next);
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(document.getElementById('target-error-message')).toHaveTextContent('Exact error');
      expect(document.getElementById('sibling-error-message')).toHaveTextContent('Sibling');
      expect(JSON.stringify(errors)).toBe(before);
    });
  }
});
