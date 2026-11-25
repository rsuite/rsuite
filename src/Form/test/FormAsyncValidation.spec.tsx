import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import Schema from '../../Schema';
import type { FormInstance } from '../hooks/useFormRef';

function createValidation(adapter: 'resolver' | 'schema') {
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
              username: Schema.Types.StringType().addAsyncRule(validate, 'Already taken'),
              email: Schema.Types.StringType().isRequired('Email required')
            })
          }
  };
}

describe.each(['resolver', 'schema'] as const)('Form async validation (%s)', adapter => {
  it.each([true, false])(
    'retains the latest validation result when the older result is %s',
    async oldValid => {
      const { requests, props } = createValidation(adapter);
      const onCheck = vi.fn();
      const onError = vi.fn();
      render(
        <Form {...props} onCheck={onCheck} onError={onError}>
          <Form.Control name="username" aria-label="Username" checkAsync />
        </Form>
      );
      const input = screen.getByRole('textbox', { name: 'Username' });
      fireEvent.change(input, { target: { value: 'older' } });
      fireEvent.change(input, { target: { value: 'latest' } });
      await waitFor(() =>
        expect(requests.map(request => request.value)).toEqual(['older', 'latest'])
      );

      await act(async () => requests[1].resolve(!oldValid));
      const expectedErrors = oldValid ? { username: 'Already taken' } : {};
      expect(onCheck).toHaveBeenCalledExactlyOnceWith(expectedErrors);
      expect(onError).toHaveBeenCalledTimes(oldValid ? 1 : 0);

      await act(async () => requests[0].resolve(oldValid));
      expect(input).toHaveValue('latest');
      expect(onCheck).toHaveBeenCalledExactlyOnceWith(expectedErrors);
      expect(onError).toHaveBeenCalledTimes(oldValid ? 1 : 0);
      if (oldValid) {
        expect(screen.getByRole('alert')).toHaveTextContent('Already taken');
        expect(input).toHaveAttribute('aria-invalid', 'true');
      } else {
        expect(screen.queryByRole('alert')).toBeNull();
        expect(input).not.toHaveAttribute('aria-invalid', 'true');
      }
    }
  );

  it('returns each explicit field-check result without publishing the superseded result', async () => {
    const { requests, props } = createValidation(adapter);
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const { rerender } = render(
      <Form
        {...props}
        ref={ref}
        formValue={{ username: 'older' }}
        onCheck={onCheck}
        onError={onError}
      />
    );
    let older: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      older = ref.current!.checkForFieldAsync('username');
    });
    rerender(
      <Form
        {...props}
        ref={ref}
        formValue={{ username: 'latest' }}
        onCheck={onCheck}
        onError={onError}
      />
    );
    let latest: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      latest = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(requests).toHaveLength(2));
    await act(async () => requests[1].resolve(true));
    expect(await latest!).toMatchObject({ hasError: false });
    await act(async () => requests[0].resolve(false));
    expect(await older!).toEqual({ hasError: true, errorMessage: 'Already taken' });
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(onError).not.toHaveBeenCalled();
  });

  it('allows an immediately resolved rule to validate the new input value', async () => {
    const onCheck = vi.fn();
    const props =
      adapter === 'resolver'
        ? { resolver: async () => ({ errors: { username: 'Already taken' } }) }
        : {
            model: Schema.Model({
              username: Schema.Types.StringType().addAsyncRule(
                () => Promise.resolve(false),
                'Already taken'
              )
            })
          };
    render(
      <Form {...props} onCheck={onCheck}>
        <Form.Control name="username" aria-label="Username" checkAsync />
      </Form>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new' } });
    expect(await screen.findByRole('alert')).toHaveTextContent('Already taken');
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ username: 'Already taken' });
  });

  it.each(['field', 'form'] as const)(
    'keeps a newer %s check when an older check used the other API',
    async latestAPI => {
      const { requests, props } = createValidation(adapter);
      const ref = React.createRef<FormInstance>();
      const onCheck = vi.fn();
      const onError = vi.fn();
      const { rerender } = render(
        <Form
          {...props}
          ref={ref}
          formValue={{ username: 'older', email: 'valid' }}
          onCheck={onCheck}
          onError={onError}
        />
      );
      let older: Promise<unknown>;
      act(() => {
        older =
          latestAPI === 'field'
            ? ref.current!.checkAsync()
            : ref.current!.checkForFieldAsync('username');
      });
      rerender(
        <Form
          {...props}
          ref={ref}
          formValue={{ username: 'latest', email: 'valid' }}
          onCheck={onCheck}
          onError={onError}
        />
      );
      let latest: Promise<unknown>;
      act(() => {
        latest =
          latestAPI === 'field'
            ? ref.current!.checkForFieldAsync('username')
            : ref.current!.checkAsync();
      });
      await waitFor(() => expect(requests).toHaveLength(2));
      await act(async () => requests[1].resolve(true));
      expect(await latest!).toMatchObject({ hasError: false });
      await act(async () => requests[0].resolve(false));
      expect(await older!).toEqual(
        latestAPI === 'field'
          ? { hasError: true, formError: { username: 'Already taken' } }
          : { hasError: true, errorMessage: 'Already taken' }
      );
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
      expect(onError).not.toHaveBeenCalled();
    }
  );

  it('supersedes an asynchronous field check with a synchronous field check', async () => {
    const { requests, props } = createValidation(adapter);
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const { rerender } = render(
      <Form
        {...props}
        ref={ref}
        formValue={{ username: 'older' }}
        onCheck={onCheck}
        onError={onError}
      />
    );
    let older: Promise<unknown>;
    act(() => {
      older = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(requests).toHaveLength(1));
    rerender(
      <Form
        {...(adapter === 'resolver' ? { resolver: () => ({ errors: {} }) } : props)}
        ref={ref}
        formValue={{ username: 'latest' }}
        onCheck={onCheck}
        onError={onError}
      />
    );
    act(() => {
      expect(ref.current!.checkForField('username')).toBe(true);
    });
    await act(async () => requests[0].resolve(false));
    expect(await older!).toMatchObject({ hasError: true });
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(onError).not.toHaveBeenCalled();
  });
});

describe('Form async schema result isolation', () => {
  it.each(['async', 'sync'] as const)(
    'supersedes an older field request with a newer %s proxy check',
    async proxyAPI => {
      const emailRequests: { value: string; resolve: (valid: boolean) => void }[] = [];
      const model = Schema.Model({
        username: Schema.Types.StringType().proxy(['email']),
        email: Schema.Types.StringType().addAsyncRule(
          value => new Promise<boolean>(resolve => emailRequests.push({ value: value!, resolve })),
          'Old email error'
        )
      });
      const ref = React.createRef<FormInstance>();
      const onCheck = vi.fn();
      const onError = vi.fn();
      const { rerender } = render(
        <Form
          model={model}
          ref={ref}
          onCheck={onCheck}
          onError={onError}
          formValue={{ username: 'user', email: 'older' }}
        />
      );
      let older: Promise<unknown>;
      act(() => {
        older = ref.current!.checkForFieldAsync('email');
      });
      await waitFor(() => expect(emailRequests).toHaveLength(1));
      rerender(
        <Form
          model={model}
          ref={ref}
          onCheck={onCheck}
          onError={onError}
          formValue={{ username: 'user', email: 'latest' }}
        />
      );
      let latest: Promise<unknown> | boolean;
      act(() => {
        latest =
          proxyAPI === 'async'
            ? ref.current!.checkForFieldAsync('username')
            : ref.current!.checkForField('username');
      });
      if (proxyAPI === 'async') {
        await waitFor(() =>
          expect(emailRequests.map(request => request.value)).toEqual(['older', 'latest'])
        );
        await act(async () => emailRequests[1].resolve(true));
        expect(await latest!).toMatchObject({ hasError: false });
      } else {
        expect(latest!).toBe(true);
      }
      await act(async () => emailRequests[0].resolve(false));
      expect(await older!).toMatchObject({ hasError: true });
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
      expect(onError).not.toHaveBeenCalled();
    }
  );

  it('keeps the latest nested field result and its ARIA state', async () => {
    const requests: ((valid: boolean) => void)[] = [];
    const model = Schema.Model({
      user: Schema.Types.ObjectType().shape({
        username: Schema.Types.StringType().addAsyncRule(
          () => new Promise<boolean>(resolve => requests.push(resolve)),
          'Already taken'
        )
      })
    });
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        model={model}
        onCheck={onCheck}
        onError={onError}
        nestedField
        formDefaultValue={{ user: { username: '' } }}
      >
        <Form.Control name="user.username" aria-label="Username" checkAsync />
      </Form>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'older' } });
    fireEvent.change(input, { target: { value: 'latest' } });
    await waitFor(() => expect(requests).toHaveLength(2));
    await act(async () => requests[1](true));
    await act(async () => requests[0](false));
    expect(input).toHaveValue('latest');
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByRole('alert')).toBeNull();
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onError).not.toHaveBeenCalled();
  });

  it('does not overwrite a newer field result through an older proxy check', async () => {
    let resolveUsername: (valid: boolean) => void;
    const emailRequests: { value: string; resolve: (valid: boolean) => void }[] = [];
    const model = Schema.Model({
      username: Schema.Types.StringType()
        .addAsyncRule(() => new Promise<boolean>(resolve => (resolveUsername = resolve)))
        .proxy(['email']),
      email: Schema.Types.StringType().addAsyncRule(
        value => new Promise<boolean>(resolve => emailRequests.push({ value: value!, resolve })),
        'Newest email error'
      )
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const { rerender } = render(
      <Form
        model={model}
        ref={ref}
        onCheck={onCheck}
        formValue={{ username: 'user', email: 'older' }}
      />
    );
    let usernameResult: Promise<unknown>;
    act(() => {
      usernameResult = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(resolveUsername).toBeTypeOf('function'));
    rerender(
      <Form
        model={model}
        ref={ref}
        onCheck={onCheck}
        formValue={{ username: 'user', email: 'latest' }}
      />
    );
    let emailResult: Promise<unknown>;
    act(() => {
      emailResult = ref.current!.checkForFieldAsync('email');
    });
    await waitFor(() => expect(emailRequests).toHaveLength(1));
    await act(async () => emailRequests[0].resolve(false));
    expect(await emailResult!).toMatchObject({ hasError: true });
    await act(async () => resolveUsername(true));
    await waitFor(() =>
      expect(emailRequests.map(request => request.value)).toEqual(['latest', 'older'])
    );
    await act(async () => emailRequests[1].resolve(true));
    expect(await usernameResult!).toMatchObject({ hasError: false });
    expect(onCheck).toHaveBeenLastCalledWith({ email: 'Newest email error' });
  });

  it('does not restore an old synchronous error after async validation clears it', async () => {
    const requests: ((valid: boolean) => void)[] = [];
    const model = Schema.Model({
      username: Schema.Types.StringType()
        .addRule(value => value !== 'invalid', 'Old error')
        .addAsyncRule(() => new Promise<boolean>(resolve => requests.push(resolve))),
      email: Schema.Types.StringType().isRequired('Email required')
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const { rerender } = render(
      <Form model={model} ref={ref} onCheck={onCheck} formValue={{ username: 'invalid' }} />
    );
    act(() => {
      expect(ref.current!.checkForField('username')).toBe(false);
    });
    rerender(<Form model={model} ref={ref} onCheck={onCheck} formValue={{ username: 'valid' }} />);
    let result: Promise<unknown>;
    act(() => {
      result = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(requests).toHaveLength(1));
    await act(async () => requests[0](true));
    expect(await result!).toMatchObject({ hasError: false });
    expect(onCheck).toHaveBeenLastCalledWith({});
    act(() => {
      ref.current!.checkForField('email');
    });
    expect(onCheck).toHaveBeenLastCalledWith({ email: 'Email required' });
  });

  it('does not import a superseded error when a different field is checked later', async () => {
    const { requests, props } = createValidation('schema');
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    render(
      <Form {...props} ref={ref} onCheck={onCheck}>
        <Form.Control name="username" aria-label="Username" checkAsync />
        <Form.Control name="email" aria-label="Email" checkAsync />
      </Form>
    );
    fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), {
      target: { value: 'older' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), {
      target: { value: 'latest' }
    });
    await waitFor(() => expect(requests).toHaveLength(2));
    await act(async () => requests[1].resolve(true));
    await act(async () => requests[0].resolve(false));
    onCheck.mockClear();

    await act(async () => {
      await ref.current!.checkForFieldAsync('email');
    });
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(screen.getByRole('alert')).toHaveTextContent('Email required');
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ email: 'Email required' });
    expect(screen.getByRole('textbox', { name: 'Username' })).not.toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('retains independently requested errors when separate fields resolve out of order', async () => {
    const requests: Record<string, (valid: boolean) => void> = {};
    const model = Schema.Model({
      username: Schema.Types.StringType().addAsyncRule(
        () => new Promise<boolean>(resolve => (requests.username = resolve)),
        'Username invalid'
      ),
      email: Schema.Types.StringType().addAsyncRule(
        () => new Promise<boolean>(resolve => (requests.email = resolve)),
        'Email invalid'
      )
    });
    const onCheck = vi.fn();
    render(
      <Form model={model} onCheck={onCheck}>
        <Form.Control name="username" aria-label="Username" checkAsync />
        <Form.Control name="email" aria-label="Email" checkAsync />
      </Form>
    );
    fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), {
      target: { value: 'username' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'email' }
    });
    await waitFor(() => expect(Object.keys(requests)).toEqual(['username', 'email']));
    await act(async () => requests.email(false));
    await act(async () => requests.username(false));
    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(onCheck).toHaveBeenLastCalledWith({
      username: 'Username invalid',
      email: 'Email invalid'
    });
  });
});
