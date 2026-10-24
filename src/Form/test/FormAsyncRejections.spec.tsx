import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import Form from '../Form';
import FormControl from '../../FormControl';
import type { FormInstance } from '../hooks/useFormRef';

describe.each(['object', 'array field'] as const)('Form async %s rule failures', shape => {
  describe.each([false, true])('with priority=%s', priority => {
    it.each(['reject', 'throw'] as const)(
      'rejects an imperative check when a nested rule fails via %s and permits a later check',
      async mode => {
        const failure = new Error('Nested validation unavailable');
        let failing = true;
        const rule = vi.fn(() => {
          if (failing) {
            if (mode === 'throw') throw failure;
            return Promise.reject(failure);
          }
          return Promise.resolve(true);
        });
        const item = ObjectType().shape({
          name: StringType().addAsyncRule(rule, 'Invalid name', priority)
        });
        const arrayField = shape === 'array field';
        const model = SchemaModel<any>(
          arrayField ? { products: ArrayType().of(item) } : { product: item }
        );
        const ref = React.createRef<FormInstance>();
        const onCheck = vi.fn();
        const onError = vi.fn();
        render(
          <Form
            ref={ref}
            nestedField
            model={model}
            formDefaultValue={
              arrayField ? { products: [{ name: 'Suite' }] } : { product: { name: 'Suite' } }
            }
            onCheck={onCheck}
            onError={onError}
          >
            <FormControl
              name={arrayField ? 'products[0].name' : 'product.name'}
              aria-label="Product name"
            />
          </Form>
        );

        const check = () =>
          arrayField
            ? ref.current!.checkForFieldAsync('products[0].name')
            : ref.current!.checkAsync();
        await act(async () => {
          await expect(check()).rejects.toBe(failure);
        });
        expect(rule).toHaveBeenCalledOnce();
        expect(onCheck).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(screen.getByRole('textbox', { name: 'Product name' })).to.have.value('Suite');

        failing = false;
        await act(async () => {
          await expect(check()).resolves.toEqual(
            arrayField ? { hasError: false } : { hasError: false, formError: {} }
          );
        });
        expect(rule).toHaveBeenCalledTimes(2);
        expect(onCheck).toHaveBeenCalledOnce();
        expect(onCheck).toHaveBeenCalledWith(
          arrayField ? { products: { array: [{ object: { name: { hasError: false } } }] } } : {}
        );
        expect(onError).not.toHaveBeenCalled();
      }
    );
  });
});
