import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

const EmptyControl = () => null;

describe.each(['object', 'array row', 'array root'] as const)(
  'Form removed overlapping %s field',
  shape => {
    it.each([
      ['parent', true],
      ['parent', false],
      ['child', true],
      ['child', false]
    ] as const)('discards the pending %s result when valid is %s', async (pendingField, valid) => {
      let release!: (valid: boolean) => void;
      const defer = () => new Promise<boolean>(resolve => (release = resolve));
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
      const removed = pendingField === 'parent' ? child : parent;
      const model = SchemaModel<any>(
        shape === 'object' ? { user: ObjectType().shape({ name: leaf }) } : { users: array }
      );
      const ref = React.createRef<FormInstance>();
      const onCheck = vi.fn();
      const onError = vi.fn();
      const props = {
        ref,
        model,
        nestedField: true,
        formDefaultValue:
          shape === 'object' ? { user: { name: 'value' } } : { users: [{ name: 'value' }] },
        onCheck,
        onError
      };
      const { rerender } = render(
        <Form {...props}>
          <Form.Control
            key="removed"
            name={removed}
            accepter={EmptyControl}
            shouldResetWithUnmount
          />
          <Form.Control key="retained" name={child} aria-label="Name" />
        </Form>
      );
      let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
      act(() => {
        pending = ref.current!.checkForFieldAsync(pendingField === 'parent' ? parent : child);
      });
      await waitFor(() => expect(release).toBeTypeOf('function'));
      rerender(
        <Form {...props}>
          <Form.Control key="retained" name={child} aria-label="Name" />
        </Form>
      );
      expect(onCheck).toHaveBeenCalledOnce();
      onCheck.mockClear();
      await act(async () => {
        release(valid);
        expect((await pending).hasError).toBe(!valid);
      });

      expect(onCheck).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).toBeNull();
    });
  }
);

it.each(['object sibling', 'array sibling', 'name prefix', 'literal dotted'] as const)(
  'keeps an independent %s request after removal',
  async shape => {
    let release!: (valid: boolean) => void;
    const rule = StringType().addAsyncRule(() =>
      new Promise<boolean>(resolve => (release = resolve)).then(valid => ({
        hasError: !valid,
        errorMessage: ''
      }))
    );
    const nestedField = shape !== 'literal dotted';
    const removed =
      shape === 'object sibling'
        ? 'user.name'
        : shape === 'array sibling'
          ? 'users[0].name'
          : 'user';
    const retained =
      shape === 'object sibling'
        ? 'user.email'
        : shape === 'array sibling'
          ? 'users[1].name'
          : shape === 'name prefix'
            ? 'username'
            : 'user.name';
    const model = SchemaModel<any>(
      shape === 'object sibling'
        ? { user: ObjectType().shape({ name: StringType(), email: rule }) }
        : shape === 'array sibling'
          ? { users: ArrayType().of(ObjectType().shape({ name: rule })) }
          : { user: StringType(), [retained]: rule }
    );
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const props = {
      ref,
      model,
      nestedField,
      formDefaultValue:
        shape === 'object sibling'
          ? { user: { name: 'value', email: 'value' } }
          : shape === 'array sibling'
            ? { users: [{ name: 'value' }, { name: 'value' }] }
            : { user: 'value', [retained]: 'value' },
      onCheck
    };
    const { rerender } = render(
      <Form {...props}>
        <Form.Control key="removed" name={removed} accepter={EmptyControl} shouldResetWithUnmount />
        <Form.Control key="retained" name={retained} aria-label="Retained" />
      </Form>
    );
    let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      pending = ref.current!.checkForFieldAsync(retained);
    });
    await waitFor(() => expect(release).toBeTypeOf('function'));
    rerender(
      <Form {...props}>
        <Form.Control key="retained" name={retained} aria-label="Retained" />
      </Form>
    );
    onCheck.mockClear();
    await act(async () => {
      release(false);
      expect((await pending).hasError).toBe(true);
    });

    expect(onCheck).toHaveBeenCalledOnce();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).toBeNull();
  }
);
