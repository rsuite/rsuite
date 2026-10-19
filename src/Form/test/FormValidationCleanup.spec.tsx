import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import Schema from '../../Schema';
import type { FormInstance } from '../hooks/useFormRef';

function deferredValidation(adapter: 'resolver' | 'schema') {
  const requests: { value: string; resolve: (valid: boolean) => void }[] = [];
  const validate = (value: string) =>
    new Promise<boolean>(resolve => requests.push({ value, resolve }));
  return {
    requests,
    props:
      adapter === 'resolver'
        ? {
            resolver: async (values: Record<string, any>) => ({
              errors: (await validate(values.username)) ? {} : { username: 'Already taken' }
            })
          }
        : {
            model: Schema.Model({
              username: Schema.Types.StringType().addAsyncRule(validate, 'Already taken')
            })
          }
  };
}

describe.each(['resolver', 'schema'] as const)('Public Form pending lifecycle (%s)', adapter => {
  it('keeps resetErrors state while an older whole-form promise returns its own result', async () => {
    const { requests, props } = deferredValidation(adapter);
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        {...props}
        ref={ref}
        formDefaultValue={{ username: 'taken' }}
        onCheck={onCheck}
        onError={onError}
      >
        <Form.Control name="username" aria-label="Username" checkAsync />
      </Form>
    );
    let pending: Promise<unknown>;
    act(() => {
      pending = ref.current!.checkAsync();
    });
    await waitFor(() => expect(requests).toHaveLength(1));
    act(() => ref.current!.resetErrors({ username: 'Server error' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Server error');
    await act(async () => requests[0].resolve(false));
    expect(await pending!).toEqual({ hasError: true, formError: { username: 'Already taken' } });
    expect(screen.getByRole('alert')).toHaveTextContent('Server error');
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('does not restore the pre-reset error after resetting to the default value', async () => {
    const { requests, props } = deferredValidation(adapter);
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const onReset = vi.fn();
    render(
      <Form
        {...props}
        ref={ref}
        formDefaultValue={{ username: 'default' }}
        onCheck={onCheck}
        onError={onError}
        onReset={onReset}
      >
        <Form.Control name="username" aria-label="Username" checkAsync />
      </Form>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'taken' } });
    await waitFor(() => expect(requests.map(request => request.value)).toEqual(['taken']));
    act(() => ref.current!.reset());
    expect(input).toHaveValue('default');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(onReset).toHaveBeenCalledExactlyOnceWith({ username: 'default' }, undefined);
    await act(async () => requests[0].resolve(false));
    expect(input).toHaveValue('default');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('accepts a newly requested validation after reset', async () => {
    const { requests, props } = deferredValidation(adapter);
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        {...props}
        ref={ref}
        formDefaultValue={{ username: 'default' }}
        onCheck={onCheck}
        onError={onError}
      >
        <Form.Control name="username" aria-label="Username" checkAsync />
      </Form>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'older' } });
    act(() => ref.current!.reset());
    fireEvent.change(input, { target: { value: 'fresh' } });
    await waitFor(() => expect(requests.map(request => request.value)).toEqual(['older', 'fresh']));
    await act(async () => requests[1].resolve(false));
    await act(async () => requests[0].resolve(true));
    expect(input).toHaveValue('fresh');
    expect(screen.getByRole('alert')).toHaveTextContent('Already taken');
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ username: 'Already taken' });
    expect(onError).toHaveBeenCalledExactlyOnceWith({ username: 'Already taken' });
  });

  it('does not restore an error removed by shouldResetWithUnmount', async () => {
    const { requests, props } = deferredValidation(adapter);
    const onCheck = vi.fn();
    const onError = vi.fn();
    const onChange = vi.fn();
    const formProps = {
      ...props,
      formDefaultValue: { username: 'default' },
      onCheck,
      onError,
      onChange
    };
    const { rerender } = render(
      <Form {...formProps}>
        <Form.Control name="username" aria-label="Username" checkAsync shouldResetWithUnmount />
      </Form>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'taken' } });
    await waitFor(() => expect(requests).toHaveLength(1));
    rerender(<Form {...formProps} />);
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(onChange).toHaveBeenLastCalledWith({});
    onCheck.mockClear();
    await act(async () => requests[0].resolve(false));
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('preserves a retained field validation when shouldResetWithUnmount is false', async () => {
    const { requests, props } = deferredValidation(adapter);
    const onCheck = vi.fn();
    const onError = vi.fn();
    const onChange = vi.fn();
    const formProps = {
      ...props,
      formDefaultValue: { username: 'default' },
      onCheck,
      onError,
      onChange
    };
    const { rerender } = render(
      <Form {...formProps}>
        <Form.Control name="username" aria-label="Username" checkAsync />
      </Form>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'taken' } });
    await waitFor(() => expect(requests).toHaveLength(1));
    rerender(<Form {...formProps} />);
    await act(async () => requests[0].resolve(false));
    expect(onChange).toHaveBeenCalledExactlyOnceWith({ username: 'taken' }, expect.anything());
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ username: 'Already taken' });
    expect(onError).toHaveBeenCalledExactlyOnceWith({ username: 'Already taken' });
  });
});

describe('Form removed-field validation ownership', () => {
  it('does not restore a removed field through a still-mounted field proxy', async () => {
    let resolve: (valid: boolean) => void;
    const model = Schema.Model({
      username: Schema.Types.StringType()
        .addAsyncRule(
          () =>
            new Promise<boolean>(res => {
              resolve = res;
            })
        )
        .proxy(['email']),
      email: Schema.Types.StringType().isRequired('Email required')
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const props = {
      ref,
      model,
      formDefaultValue: { username: 'user', email: '' },
      onCheck,
      onError
    };
    const { rerender } = render(
      <Form {...props}>
        <Form.Control key="username" name="username" aria-label="Username" />
        <Form.Control key="email" name="email" aria-label="Email" shouldResetWithUnmount />
      </Form>
    );
    let pending: Promise<unknown>;
    act(() => {
      pending = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(resolve).toBeTypeOf('function'));
    rerender(
      <Form {...props}>
        <Form.Control key="username" name="username" aria-label="Username" />
      </Form>
    );
    onCheck.mockClear();
    await act(async () => resolve(true));
    expect(await pending!).toMatchObject({ hasError: false });
    expect(screen.queryByRole('alert')).toBeNull();
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(onError).not.toHaveBeenCalled();

    // Removing a control only cancels older results, not a new explicit schema check.
    onCheck.mockClear();
    act(() => {
      expect(ref.current!.checkForField('email')).toBe(false);
    });
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ email: 'Email required' });
    expect(onError).toHaveBeenCalledExactlyOnceWith({ email: 'Email required' });
  });

  it('preserves another field request and both promises own results after removal', async () => {
    const requests: Record<string, (valid: boolean) => void> = {};
    const model = Schema.Model({
      username: Schema.Types.StringType().addAsyncRule(
        () =>
          new Promise<boolean>(resolve => {
            requests.username = resolve;
          }),
        'Username invalid'
      ),
      email: Schema.Types.StringType().addAsyncRule(
        () =>
          new Promise<boolean>(resolve => {
            requests.email = resolve;
          }),
        'Email invalid'
      )
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const props = {
      ref,
      model,
      formDefaultValue: { username: 'user', email: 'mail' },
      onCheck,
      onError
    };
    const { rerender } = render(
      <Form {...props}>
        <Form.Control key="username" name="username" aria-label="Username" shouldResetWithUnmount />
        <Form.Control key="email" name="email" aria-label="Email" />
      </Form>
    );
    let username: Promise<unknown>, email: Promise<unknown>;
    act(() => {
      username = ref.current!.checkForFieldAsync('username');
      email = ref.current!.checkForFieldAsync('email');
    });
    await waitFor(() => expect(Object.keys(requests)).toEqual(['username', 'email']));
    rerender(
      <Form {...props}>
        <Form.Control key="email" name="email" aria-label="Email" />
      </Form>
    );
    onCheck.mockClear();
    await act(async () => requests.email(false));
    await act(async () => requests.username(false));
    expect(await username!).toEqual({ hasError: true, errorMessage: 'Username invalid' });
    expect(await email!).toEqual({ hasError: true, errorMessage: 'Email invalid' });
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(screen.getByRole('alert')).toHaveTextContent('Email invalid');
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ email: 'Email invalid' });
    expect(onError).toHaveBeenCalledExactlyOnceWith({ email: 'Email invalid' });
  });

  it('does not publish an older whole-form result after a field is removed', async () => {
    const { requests, props: validation } = deferredValidation('schema');
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const props = { ...validation, ref, formDefaultValue: { username: 'taken' }, onCheck, onError };
    const { rerender } = render(
      <Form {...props}>
        <Form.Control name="username" shouldResetWithUnmount />
      </Form>
    );
    let pending: Promise<unknown>;
    act(() => {
      pending = ref.current!.checkAsync();
    });
    await waitFor(() => expect(requests).toHaveLength(1));
    rerender(<Form {...props} />);
    onCheck.mockClear();
    await act(async () => requests[0].resolve(false));
    expect(await pending!).toEqual({ hasError: true, formError: { username: 'Already taken' } });
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });
});
