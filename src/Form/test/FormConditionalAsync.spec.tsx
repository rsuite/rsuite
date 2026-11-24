import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SchemaModel, StringType } from 'schema-typed';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

describe('Form conditional async schema rules', () => {
  it.each(['field', 'form'] as const)(
    'publishes a selected rule failure through a %s check',
    async api => {
      const rule = vi.fn(() => Promise.resolve(false));
      const model = SchemaModel({
        name: StringType().when(() => StringType().addAsyncRule(rule, 'Unavailable', true))
      });
      const ref = React.createRef<FormInstance>();
      const onCheck = vi.fn();
      const onError = vi.fn();
      render(
        <Form
          ref={ref}
          model={model}
          formDefaultValue={{ name: 'blocked' }}
          onCheck={onCheck}
          onError={onError}
        >
          <Form.Control name="name" aria-label="Name" />
        </Form>
      );
      await act(async () => {
        const result =
          api === 'field'
            ? await ref.current!.checkForFieldAsync('name')
            : await ref.current!.checkAsync();
        expect(result).toEqual(
          api === 'field'
            ? { hasError: true, errorMessage: 'Unavailable' }
            : { hasError: true, formError: { name: 'Unavailable' } }
        );
      });
      expect(rule).toHaveBeenCalledOnce();
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({ name: 'Unavailable' });
      expect(onError).toHaveBeenCalledExactlyOnceWith({ name: 'Unavailable' });
      expect(screen.getByRole('alert')).toHaveTextContent('Unavailable');
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
    }
  );

  it.each(['reject', 'throw'] as const)(
    'preserves a selected rule %s and permits a later successful check',
    async mode => {
      const failure = new Error('Conditional validation unavailable');
      let failing = true;
      const rule = vi.fn(() => {
        if (failing) {
          if (mode === 'throw') throw failure;
          return Promise.reject(failure);
        }
        return Promise.resolve(true);
      });
      const model = SchemaModel({
        name: StringType().when(() => StringType().addAsyncRule(rule, 'Unavailable'))
      });
      const ref = React.createRef<FormInstance>();
      const onCheck = vi.fn();
      const onError = vi.fn();
      render(
        <Form
          ref={ref}
          model={model}
          formDefaultValue={{ name: 'value' }}
          onCheck={onCheck}
          onError={onError}
        >
          <Form.Control name="name" aria-label="Name" />
        </Form>
      );
      await act(async () => {
        await expect(ref.current!.checkAsync()).rejects.toBe(failure);
      });
      expect(rule).toHaveBeenCalledOnce();
      expect(onCheck).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('value');
      failing = false;
      await act(async () => {
        await expect(ref.current!.checkAsync()).resolves.toEqual({
          hasError: false,
          formError: {}
        });
      });
      expect(rule).toHaveBeenCalledTimes(2);
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
      expect(onError).not.toHaveBeenCalled();
      expect(screen.queryByRole('alert')).toBeNull();
    }
  );
});
