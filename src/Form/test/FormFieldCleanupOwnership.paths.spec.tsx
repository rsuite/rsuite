import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';

describe.each(['object', 'array row', 'array root'] as const)(
  'Field cleanup of overlapping %s validation',
  shape => {
    it.each([
      ['parent', true],
      ['parent', false],
      ['child', true],
      ['child', false]
    ] as const)(
      'keeps cleanup after the pending %s returns valid=%s',
      async (pendingField, valid) => {
        let release!: (valid: boolean) => void;
        const defer = () => new Promise<boolean>(resolve => (release = resolve));
        const leaf = StringType().addAsyncRule(defer, 'Name invalid');
        const array = ArrayType().of(ObjectType().shape({ name: leaf }));
        if (shape === 'array root') {
          array.addAsyncRule(async () => {
            const accepted = await defer();
            return {
              hasError: !accepted,
              array: [
                {
                  hasError: !accepted,
                  object: {
                    name: { hasError: !accepted, errorMessage: 'Name invalid' }
                  }
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
            model={model}
            nestedField
            onCheck={onCheck}
            onError={onError}
            formDefaultValue={
              shape === 'object' ? { user: { name: 'value' } } : { users: [{ name: 'value' }] }
            }
          >
            <Form.Control name={child} aria-label="Name" />
          </Form>
        );
        let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
        act(() => {
          pending = ref.current!.checkForFieldAsync(pendingField === 'parent' ? parent : child);
        });
        await waitFor(() => expect(release).toBeTypeOf('function'));
        act(() => ref.current!.cleanErrorForField(pendingField === 'parent' ? child : parent));
        await act(async () => {
          release(valid);
          expect((await pending).hasError).toBe(!valid);
        });
        expect(onCheck).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
        expect(screen.queryByRole('alert')).toBeNull();
      }
    );
  }
);

describe.each([
  ['same field', 'users[0].name', 'users.0.name'],
  ['pending parent', 'users[0]', 'users.0.name'],
  ['pending child', 'users[0].name', 'users.0']
] as const)('Cleanup through a numeric alias (%s)', (_label, pendingName, cleanedName) => {
  it.each([true, false])('retires the old request when valid=%s', async valid => {
    let release!: (valid: boolean) => void;
    const model = SchemaModel({
      users: ArrayType().of(
        ObjectType().shape({
          name: StringType().addAsyncRule(
            () =>
              new Promise<boolean>(resolve => {
                release = resolve;
              }),
            'Name invalid'
          )
        })
      )
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        model={model}
        nestedField
        formDefaultValue={{ users: [{ name: 'value' }] }}
        onCheck={onCheck}
        onError={onError}
      >
        <Form.Control name="users[0].name" aria-label="Name" />
      </Form>
    );
    let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      pending = ref.current!.checkForFieldAsync(pendingName);
    });
    await waitFor(() => expect(release).toBeTypeOf('function'));
    act(() => ref.current!.cleanErrorForField(cleanedName));
    await act(async () => {
      release(valid);
      expect((await pending).hasError).toBe(!valid);
    });
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });
});

it.each([
  'object sibling',
  'array sibling',
  'name prefix',
  'literal dotted',
  'leading zero',
  'quoted numeric'
] as const)('preserves an independent %s native request', async shape => {
  let release!: (valid: boolean) => void;
  const rule = StringType().addAsyncRule(() =>
    new Promise<boolean>(resolve => {
      release = resolve;
    }).then(valid => ({ hasError: !valid, errorMessage: '' }))
  );
  const array = ['array sibling', 'leading zero', 'quoted numeric'].includes(shape);
  const cleaned =
    shape === 'object sibling'
      ? 'user.name'
      : shape === 'array sibling'
        ? 'users[0].name'
        : shape === 'leading zero'
          ? 'users.00.name'
          : shape === 'quoted numeric'
            ? 'users["0"].name'
            : 'user';
  const retained =
    shape === 'object sibling'
      ? 'user.email'
      : shape === 'array sibling'
        ? 'users[1].name'
        : array
          ? 'users[0].name'
          : shape === 'name prefix'
            ? 'username'
            : 'user.name';
  const model = SchemaModel<any>(
    shape === 'object sibling'
      ? { user: ObjectType().shape({ name: StringType(), email: rule }) }
      : array
        ? { users: ArrayType().of(ObjectType().shape({ name: rule })) }
        : { user: StringType(), [retained]: rule }
  );
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn();
  const onError = vi.fn();
  render(
    <Form
      ref={ref}
      model={model}
      nestedField={shape !== 'literal dotted'}
      formDefaultValue={
        shape === 'object sibling'
          ? { user: { name: 'value', email: 'value' } }
          : array
            ? { users: [{ name: 'value' }, { name: 'value' }] }
            : { user: 'value', [retained]: 'value' }
      }
      onCheck={onCheck}
      onError={onError}
    >
      <Form.Control name={retained} aria-label="Retained" />
    </Form>
  );
  let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
  act(() => {
    pending = ref.current!.checkForFieldAsync(retained);
  });
  await waitFor(() => expect(release).toBeTypeOf('function'));
  act(() => ref.current!.cleanErrorForField(cleaned));
  await act(async () => {
    release(false);
    expect((await pending).hasError).toBe(true);
  });
  expect(onCheck).toHaveBeenCalledOnce();
  expect(onError).toHaveBeenCalledOnce();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.queryByRole('alert')).toBeNull();
});
