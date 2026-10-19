import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

describe.each(['object', 'array row', 'array root'] as const)(
  'Form async overlapping %s fields',
  shape => {
    it.each([
      ['parent', true],
      ['parent', false],
      ['child', true],
      ['child', false]
    ] as const)('keeps the newer %s result when valid is %s', async (latestField, valid) => {
      const releases: ((valid: boolean) => void)[] = [];
      const defer = () => new Promise<boolean>(resolve => releases.push(resolve));
      const leaf = StringType().addAsyncRule(defer, 'Name invalid');
      const array = ArrayType().of(ObjectType().shape({ name: leaf }));
      if (shape === 'array root') {
        array.addAsyncRule(async () => {
          const valid = await defer();
          return {
            hasError: !valid,
            array: [
              {
                hasError: !valid,
                object: { name: { hasError: !valid, errorMessage: 'Name invalid' } }
              }
            ]
          };
        });
      }
      const parent = shape === 'object' ? 'user' : shape === 'array row' ? 'users[0]' : 'users';
      const child = shape === 'object' ? 'user.name' : 'users[0].name';
      const model = SchemaModel<any>(
        shape === 'object' ? { user: ObjectType().shape({ name: leaf }) } : { users: array }
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
            shape === 'object' ? { user: { name: 'value' } } : { users: [{ name: 'value' }] }
          }
          onCheck={onCheck}
          onError={onError}
        >
          <Form.Control name={child} aria-label="Name" />
        </Form>
      );
      let older!: ReturnType<FormInstance['checkForFieldAsync']>;
      let newer!: ReturnType<FormInstance['checkForFieldAsync']>;
      act(() => {
        older = ref.current!.checkForFieldAsync(latestField === 'parent' ? child : parent);
      });
      await waitFor(() => expect(releases).toHaveLength(1));
      act(() => {
        newer = ref.current!.checkForFieldAsync(latestField === 'parent' ? parent : child);
      });
      await waitFor(() => expect(releases).toHaveLength(2));
      await act(async () => {
        releases[1](valid);
        expect((await newer).hasError).toBe(!valid);
      });
      expect(onCheck).toHaveBeenCalledOnce();
      const accepted = onCheck.mock.calls[0][0];
      await act(async () => {
        releases[0](!valid);
        expect((await older).hasError).toBe(valid);
      });

      expect(onCheck).toHaveBeenCalledExactlyOnceWith(accepted);
      expect(onError).toHaveBeenCalledTimes(valid ? 0 : 1);
      const input = screen.getByRole('textbox', { name: 'Name' });
      if (valid) {
        expect(input).not.toHaveAttribute('aria-invalid', 'true');
        expect(screen.queryByRole('alert')).toBeNull();
      } else {
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent('Name invalid');
      }
    });
  }
);

it('keeps literal dotted fields independent when nestedField is disabled', async () => {
  const releases: Record<string, (valid: boolean) => void> = {};
  const rule = (name: string) =>
    StringType().addAsyncRule(
      () => new Promise<boolean>(resolve => (releases[name] = resolve)),
      name + ' invalid'
    );
  const model = SchemaModel({ user: rule('user'), 'user.name': rule('user.name') });
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn();
  render(
    <Form
      ref={ref}
      model={model}
      formDefaultValue={{ user: 'value', 'user.name': 'value' }}
      onCheck={onCheck}
    >
      <Form.Control name="user" aria-label="User" />
      <Form.Control name="user.name" aria-label="Name" />
    </Form>
  );
  let older!: ReturnType<FormInstance['checkForFieldAsync']>;
  let newer!: ReturnType<FormInstance['checkForFieldAsync']>;
  act(() => {
    older = ref.current!.checkForFieldAsync('user');
    newer = ref.current!.checkForFieldAsync('user.name');
  });
  await waitFor(() => expect(Object.keys(releases)).toHaveLength(2));
  await act(async () => {
    releases['user.name'](false);
    await newer;
  });
  await act(async () => {
    releases.user(false);
    await older;
  });

  expect(onCheck).toHaveBeenCalledTimes(2);
  expect(onCheck).toHaveBeenLastCalledWith({
    user: 'user invalid',
    'user.name': 'user.name invalid'
  });
  expect(screen.getByRole('textbox', { name: 'User' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
});
