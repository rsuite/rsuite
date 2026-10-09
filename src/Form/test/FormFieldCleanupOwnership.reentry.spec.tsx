import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';
import { freeze } from './cleanErrorsTestUtils';

it.each(['flat', 'nested root', 'nested sibling'] as const)(
  'preserves cleanup of another %s field during onCheck',
  async shape => {
    let release!: (valid: boolean) => void;
    const rule = Schema.Types.StringType().addAsyncRule(
      () =>
        new Promise<boolean>(resolve => {
          release = resolve;
        }),
      'Delayed error'
    );
    const nested = shape !== 'flat';
    const sibling = shape === 'nested sibling';
    const name = nested ? 'profile.name' : 'name';
    const keep = sibling ? 'profile.email' : 'keep';
    const model = Schema.Model<any>(
      nested
        ? {
            profile: Schema.Types.ObjectType().shape({
              name: rule,
              email: Schema.Types.StringType()
            }),
            keep: Schema.Types.StringType()
          }
        : { name: rule, keep: Schema.Types.StringType() }
    );
    const initial = freeze(
      nested
        ? {
            profile: {
              object: {
                name: { hasError: true, errorMessage: 'Initial name' },
                ...(sibling ? { email: { hasError: true, errorMessage: 'Initial keep' } } : {})
              }
            },
            ...(sibling ? {} : { keep: 'Initial keep' })
          }
        : { name: 'Initial name', keep: 'Initial keep' }
    );
    const before = JSON.stringify(initial);
    const ref = React.createRef<FormInstance<any, any>>();
    const proposals: { errors: any; contents: string }[] = [];
    const onCheck = vi.fn((errors: any) => {
      proposals.push({ errors, contents: JSON.stringify(errors) });
      ref.current!.cleanErrorForField(keep);
    });
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        model={model}
        nestedField={nested}
        formDefaultValue={
          nested
            ? { profile: { name: 'value', email: 'value' }, keep: 'value' }
            : { name: 'value', keep: 'value' }
        }
        onCheck={onCheck}
        onError={onError}
      >
        <Form.Control name={name} id="name" aria-label="Name" />
        <Form.Control name={keep} id="keep" aria-label="Keep" />
      </Form>
    );
    act(() => ref.current!.resetErrors(initial));
    let pending!: ReturnType<FormInstance['checkForFieldAsync']>;
    act(() => {
      pending = ref.current!.checkForFieldAsync(name);
    });
    await waitFor(() => expect(release).toBeTypeOf('function'));
    await act(async () => {
      release(false);
      expect((await pending).hasError).toBe(true);
    });
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById('name-error-message')).toHaveTextContent('Delayed error');
    expect(screen.getByRole('textbox', { name: 'Keep' })).not.toHaveAttribute('aria-invalid');
    expect(document.getElementById('keep-error-message')).not.toBeInTheDocument();
    const expected = nested
      ? { profile: { object: { name: { hasError: true, errorMessage: 'Delayed error' } } } }
      : { name: 'Delayed error' };
    expect(onCheck).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledExactlyOnceWith(expected);
    expect(JSON.stringify(proposals[0].errors)).toBe(proposals[0].contents);
    expect(JSON.stringify(initial)).toBe(before);
  }
);

it('does not emit a stale proxy onError when its error is cleared inside onCheck', async () => {
  let release!: (valid: boolean) => void;
  const model = Schema.Model({
    username: Schema.Types.StringType()
      .addAsyncRule(
        () =>
          new Promise<boolean>(resolve => {
            release = resolve;
          })
      )
      .proxy(['email']),
    email: Schema.Types.StringType().isRequired('Email required')
  });
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn(() => ref.current!.cleanErrorForField('email'));
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
  await act(async () => {
    release(true);
    expect((await pending).hasError).toBe(false);
  });
  expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-invalid');
  expect(onCheck).toHaveBeenCalledOnce();
  expect(onError).not.toHaveBeenCalled();
});
