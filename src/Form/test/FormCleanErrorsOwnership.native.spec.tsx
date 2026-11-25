import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '../index';

type Shape = 'flat' | 'object' | 'array';

function nativeFixture(shape: Shape) {
  const releases: ((valid: boolean) => void)[] = [];
  const rule = StringType().addAsyncRule(() =>
    new Promise<boolean>(resolve => releases.push(resolve)).then(valid => ({
      hasError: !valid,
      errorMessage: ''
    }))
  );
  const name = shape === 'flat' ? 'name' : shape === 'object' ? 'user.name' : 'users[0].name';
  return {
    releases,
    name,
    props: {
      nestedField: shape !== 'flat',
      model: SchemaModel<any>(
        shape === 'flat'
          ? { name: rule }
          : shape === 'object'
            ? { user: ObjectType().shape({ name: rule }) }
            : { users: ArrayType().of(ObjectType().shape({ name: rule })) }
      ),
      formDefaultValue:
        shape === 'flat'
          ? { name: 'value' }
          : shape === 'object'
            ? { user: { name: 'value' } }
            : { users: [{ name: 'value' }] }
    }
  };
}

describe.each(['flat', 'object', 'array'] as const)('Form cleanErrors native %s errors', shape => {
  it.each(['pending', 'onCheck'] as const)(
    'keeps a clear made during %s after the native result resolves',
    async when => {
      const { releases, name, props } = nativeFixture(shape);
      const ref = React.createRef<FormInstance>();
      const onError = vi.fn();
      const onCheck = vi.fn(() => {
        if (when === 'onCheck') ref.current!.cleanErrors();
      });
      render(
        <Form {...props} ref={ref} onCheck={onCheck} onError={onError}>
          <Form.Control name={name} aria-label="Name" />
        </Form>
      );
      let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
      act(() => {
        pending = ref.current!.checkForFieldAsync(name);
      });
      await waitFor(() => expect(releases).toHaveLength(1));
      if (when === 'pending') act(() => ref.current!.cleanErrors());
      await act(async () => {
        releases[0](false);
        expect(await pending).toEqual({ hasError: true, errorMessage: '' });
      });

      expect(onCheck).toHaveBeenCalledTimes(when === 'onCheck' ? 1 : 0);
      expect(onError).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).toBeNull();
    }
  );

  it('keeps a controlled native result and onError when onCheck calls cleanErrors', async () => {
    const { releases, name, props } = nativeFixture(shape);
    const ref = React.createRef<FormInstance>();
    const onError = vi.fn();
    const onCheck = vi.fn();
    function Owner() {
      const [errors, setErrors] = React.useState({});
      return (
        <Form
          {...props}
          ref={ref}
          formError={errors}
          onCheck={next => {
            onCheck(next);
            setErrors(next);
            ref.current!.cleanErrors();
          }}
          onError={onError}
        >
          <Form.Control name={name} aria-label="Name" />
        </Form>
      );
    }
    render(<Owner />);
    let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      pending = ref.current!.checkForFieldAsync(name);
    });
    await waitFor(() => expect(releases).toHaveLength(1));
    await act(async () => {
      releases[0](false);
      expect(await pending).toEqual({ hasError: true, errorMessage: '' });
    });

    expect(onCheck).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledExactlyOnceWith(onCheck.mock.calls[0][0]);
    expect(onError.mock.calls[0][0]).toBe(onCheck.mock.calls[0][0]);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

it('preserves a cancelled whole-form result for explicit native error selection', async () => {
  const { releases, props } = nativeFixture('flat');
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn();
  const onError = vi.fn();
  render(
    <Form {...props} ref={ref} onCheck={onCheck} onError={onError}>
      <Form.Control name="name" aria-label="Name" />
    </Form>
  );
  let pending!: ReturnType<FormInstance['checkAsync']>;
  act(() => {
    pending = ref.current!.checkAsync();
  });
  await waitFor(() => expect(releases).toHaveLength(1));
  act(() => ref.current!.cleanErrors());
  let result: any;
  await act(async () => {
    releases[0](false);
    result = await pending;
  });

  expect(result).toEqual({ hasError: true, formError: { name: '' } });
  expect(onCheck).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
  act(() => ref.current!.resetErrors(result.formError));
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.queryByRole('alert')).toBeNull();
  expect(onCheck).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
});

it('does not restore a proxy error after clearing all errors', async () => {
  let release!: (valid: boolean) => void;
  const model = SchemaModel({
    name: StringType()
      .addAsyncRule(() => new Promise<boolean>(resolve => (release = resolve)))
      .proxy(['email']),
    email: StringType().isRequired('Email required')
  });
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn();
  const onError = vi.fn();
  render(
    <Form
      ref={ref}
      model={model}
      formDefaultValue={{ name: 'value', email: '' }}
      onCheck={onCheck}
      onError={onError}
    >
      <Form.Control name="name" aria-label="Name" />
      <Form.Control name="email" aria-label="Email" />
    </Form>
  );
  let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
  act(() => {
    pending = ref.current!.checkForFieldAsync('name');
  });
  await waitFor(() => expect(release).toBeTypeOf('function'));
  act(() => ref.current!.cleanErrors());
  await act(async () => {
    release(true);
    expect(await pending).toEqual({ hasError: false });
  });

  expect(onCheck).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute(
    'aria-invalid',
    'true'
  );
  expect(screen.queryByRole('alert')).toBeNull();
});
