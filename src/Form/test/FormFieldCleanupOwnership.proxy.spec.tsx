import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';

it.each([true, false])(
  'keeps field cleanup when an older proxy source returns valid=%s',
  async valid => {
    let release!: (valid: boolean) => void;
    const model = Schema.Model({
      username: Schema.Types.StringType()
        .addAsyncRule(
          () =>
            new Promise<boolean>(resolve => {
              release = resolve;
            }),
          'Username invalid'
        )
        .proxy(['email']),
      email: Schema.Types.StringType().isRequired('Email required')
    });
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        model={model}
        formDefaultValue={{ username: 'value', email: '' }}
        onCheck={onCheck}
        onError={onError}
      >
        <Form.Control name="username" aria-label="Username" />
        <Form.Control name="email" aria-label="Email" />
      </Form>
    );
    let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      pending = ref.current!.checkForFieldAsync('username');
    });
    await waitFor(() => expect(release).toBeTypeOf('function'));
    act(() => ref.current!.cleanErrorForField('email'));
    await act(async () => {
      release(valid);
      expect((await pending).hasError).toBe(!valid);
    });
    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-invalid');
    const expected = valid ? {} : { username: 'Username invalid' };
    expect(onCheck).toHaveBeenCalledExactlyOnceWith(expected);
    if (valid) expect(onError).not.toHaveBeenCalled();
    else expect(onError).toHaveBeenCalledExactlyOnceWith(expected);

    // Cleanup retires older proxy results but allows a new explicit check of that field.
    onCheck.mockClear();
    onError.mockClear();
    act(() => {
      expect(ref.current!.checkForField('email')).toBe(false);
    });
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({ ...expected, email: 'Email required' });
    expect(onError).toHaveBeenCalledExactlyOnceWith({ ...expected, email: 'Email required' });
  }
);
