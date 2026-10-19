import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ObjectType, SchemaModel, StringType } from 'schema-typed';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

describe.each(['resolver', 'schema'] as const)('Form async reentry (%s)', adapter => {
  it.each(['form', 'field'] as const)(
    'keeps the result of a synchronous check started by an asynchronous %s onCheck',
    async api => {
      const ref = React.createRef<FormInstance>();
      let valid = false;
      const props =
        adapter === 'resolver'
          ? {
              resolver: () =>
                valid ? { errors: {} } : Promise.resolve({ errors: { name: 'Old error' } })
            }
          : {
              model: SchemaModel({
                name: StringType().addRule(
                  () => valid,
                  () => ''
                )
              })
            };
      const onError = vi.fn();
      const onCheck = vi.fn<(errors: Record<string, unknown>) => void>(() => {
        if (!valid) {
          valid = true;
          expect(ref.current!.checkForField('name')).toBe(true);
        }
      });
      render(
        <Form
          {...props}
          ref={ref}
          formDefaultValue={{ name: 'value' }}
          onCheck={onCheck}
          onError={onError}
        >
          <Form.Control name="name" aria-label="Name" />
        </Form>
      );

      let result: any;
      await act(async () => {
        result = await (api === 'form'
          ? ref.current!.checkAsync()
          : ref.current!.checkForFieldAsync('name'));
      });

      expect(result.hasError).toBe(true);
      expect(onCheck).toHaveBeenCalledTimes(2);
      expect(onCheck.mock.calls[1][0]).toEqual({});
      expect(onError).not.toHaveBeenCalled();
      expect(screen.queryByRole('alert')).toBeNull();
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
    }
  );
});

describe('Form async native result ownership', () => {
  it('preserves native validity when the owner explicitly selects a superseded returned map', async () => {
    const releases: ((valid: boolean) => void)[] = [];
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      name: StringType().addAsyncRule(() =>
        new Promise<boolean>(resolve => releases.push(resolve)).then(valid => ({
          hasError: !valid,
          errorMessage: ''
        }))
      )
    });
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
    let older!: ReturnType<FormInstance['checkAsync']>;
    let newer!: ReturnType<FormInstance['checkAsync']>;
    act(() => {
      older = ref.current!.checkAsync();
      newer = ref.current!.checkAsync();
    });
    await waitFor(() => expect(releases).toHaveLength(2));
    await act(async () => {
      releases[1](true);
      await newer;
    });
    let oldResult: any;
    await act(async () => {
      releases[0](false);
      oldResult = await older;
    });

    expect(oldResult).toEqual({ hasError: true, formError: { name: '' } });
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');

    act(() => ref.current!.resetErrors(oldResult.formError));

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(onCheck).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
  });

  it.each([
    [false, false],
    [true, false],
    [true, true]
  ])(
    'retains another field’s native error (nested: %s, siblings: %s)',
    async (nestedField, siblings) => {
      const ref = React.createRef<FormInstance>();
      const releases: Record<string, (valid: boolean) => void> = {};
      const rule = (key: string) =>
        StringType().addAsyncRule(() =>
          new Promise<boolean>(resolve => (releases[key] = resolve)).then(valid => ({
            hasError: !valid,
            errorMessage: ''
          }))
        );
      const name = nestedField ? 'user.name' : 'name';
      const email = siblings ? 'user.email' : 'email';
      const model = SchemaModel<any>({
        ...(nestedField
          ? {
              user: ObjectType().shape({
                name: rule(name),
                ...(siblings ? { email: rule(email) } : {})
              })
            }
          : { name: rule(name) }),
        ...(siblings ? {} : { email: rule(email) })
      });
      const onCheck = vi.fn();
      render(
        <Form
          ref={ref}
          model={model}
          nestedField={nestedField}
          formDefaultValue={{
            user: { name: 'value', email: 'value' },
            name: 'value',
            email: 'value'
          }}
          onCheck={onCheck}
        >
          <Form.Control name={name} aria-label="Name" />
          <Form.Control name={email} aria-label="Email" />
        </Form>
      );
      let first!: ReturnType<FormInstance['checkForFieldAsync']>;
      let second!: ReturnType<FormInstance['checkForFieldAsync']>;
      act(() => {
        first = ref.current!.checkForFieldAsync(name);
        second = ref.current!.checkForFieldAsync(email);
      });
      await waitFor(() => expect(Object.keys(releases)).toHaveLength(2));
      await act(async () => {
        releases[name](false);
        await first;
      });
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
      await act(async () => {
        releases[email](false);
        await second;
      });

      expect(onCheck).toHaveBeenCalledTimes(2);
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.queryByRole('alert')).toBeNull();
    }
  );
});

describe('Form validation cache isolation', () => {
  it.each(['field', 'asyncField', 'asyncForm'] as const)(
    'keeps caller-owned schema results separate from a %s check',
    async api => {
      const model = SchemaModel({
        name: StringType().isRequired('Name required'),
        email: StringType().isRequired('Email required')
      });
      model.checkForField('email', { name: 'value', email: '' });
      const cachedResults = model.getCheckResult();
      const cachedEmail = model.getCheckResult('email');
      const onCheck = vi.fn();
      const ref = React.createRef<FormInstance>();
      render(
        <Form
          ref={ref}
          model={model}
          formDefaultValue={{ name: 'value', email: 'value' }}
          onCheck={onCheck}
        />
      );

      let result: any;
      await act(async () => {
        result =
          api === 'field'
            ? ref.current!.checkForField('name')
            : await (api === 'asyncField'
                ? ref.current!.checkForFieldAsync('name')
                : ref.current!.checkAsync());
      });

      if (api === 'field') expect(result).toBe(true);
      else expect(result.hasError).toBe(false);
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
      expect(model.getCheckResult()).toBe(cachedResults);
      expect(model.getCheckResult()).toEqual({
        email: { hasError: true, errorMessage: 'Email required' }
      });
      expect(model.getCheckResult('email')).toBe(cachedEmail);
    }
  );
});
