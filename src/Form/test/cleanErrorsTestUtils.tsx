import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import Form, { FormInstance } from '../index';
import Schema from '../../Schema';

export type Adapter = 'schema field' | 'schema whole' | 'resolver field' | 'resolver whole';
export type Api = FormInstance<Record<string, any>, any, Record<string, any>>;
export type Request = { value: string; resolve: (valid: boolean) => void };

export function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

export function deferredRule(requests: Request[]) {
  return (value: string | undefined) =>
    new Promise<boolean>(resolve => requests.push({ value: value!, resolve }));
}

export function validation(adapter: Adapter) {
  const requests: Request[] = [];
  const invalid = 'Delayed username error';
  const values = freeze({ username: 'old', keep: 'unchanged' });
  let lastErrors: Record<string, any> | undefined;
  const props: any = adapter.startsWith('resolver')
    ? {
        resolver: async (nextValues: Record<string, any>) => {
          const valid = await deferredRule(requests)(nextValues.username);
          lastErrors = freeze(valid ? {} : { username: invalid });
          return { errors: lastErrors };
        }
      }
    : {
        model: Schema.Model({
          username: Schema.Types.StringType().addAsyncRule(deferredRule(requests), invalid)
        })
      };
  return {
    adapter,
    requests,
    values,
    props,
    invalid,
    whole: adapter.endsWith('whole'),
    get lastErrors() {
      return lastErrors;
    }
  };
}

type Validation = ReturnType<typeof validation>;

export function expectInvalid(id: string, label: string, message: string) {
  const input = screen.getByRole('textbox', { name: label });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-errormessage', `${id}-error-message`);
  expect(document.getElementById(`${id}-error-message`)).toHaveTextContent(message);
}

export function expectCleared(id: string, label: string) {
  expect(screen.getByRole('textbox', { name: label })).not.toHaveAttribute('aria-invalid');
  expect(document.getElementById(`${id}-error-message`)).not.toBeInTheDocument();
}

export function mount(row: Validation, controlled = false, onCheck = vi.fn()) {
  const initialErrors = freeze({ username: 'Initial username error', keep: 'Keep error' });
  const ref = React.createRef<Api>();
  const onError = vi.fn();
  const onChange = vi.fn();
  const seedJson = JSON.stringify(initialErrors);
  const valuesJson = JSON.stringify(row.values);
  const element = (
    errors: Record<string, any> | undefined = controlled ? initialErrors : undefined,
    values = row.values,
    child: React.ReactNode = null
  ) => (
    <Form
      {...row.props}
      ref={ref}
      formValue={values}
      formError={errors}
      onCheck={onCheck}
      onError={onError}
      onChange={onChange}
    >
      <Form.Control name="username" id="username-field" aria-label="Username" />
      <Form.Control name="keep" id="keep-field" aria-label="Keep" />
      {child}
    </Form>
  );
  const rendered = render(element());
  if (!controlled) act(() => ref.current!.resetErrors(initialErrors));
  expectInvalid('username-field', 'Username', 'Initial username error');
  expectInvalid('keep-field', 'Keep', 'Keep error');
  return {
    ref,
    onCheck,
    onError,
    onChange,
    initialErrors,
    element,
    rerender: rendered.rerender,
    expectCallerSnapshots: () => {
      expect(JSON.stringify(initialErrors)).toBe(seedJson);
      expect(JSON.stringify(row.values)).toBe(valuesJson);
      expect(onChange).not.toHaveBeenCalled();
    }
  };
}

type Mounted = ReturnType<typeof mount>;

export async function start(row: Validation, mounted: Mounted) {
  let pending!: Promise<any>;
  act(() => {
    pending = row.whole
      ? mounted.ref.current!.checkAsync()
      : mounted.ref.current!.checkForFieldAsync('username');
  });
  await waitFor(() => expect(row.requests).toHaveLength(1));
  expect(row.requests[0].value).toBe('old');
  return { pending };
}

export async function finish(row: Validation, pending: Promise<any>, index = 0, valid = false) {
  let result: any;
  await act(async () => {
    row.requests[index].resolve(valid);
    result = await pending;
  });
  expect(result).toEqual(
    row.whole
      ? { hasError: !valid, formError: valid ? {} : { username: row.invalid } }
      : valid
        ? row.adapter === 'resolver field'
          ? { hasError: false, errorMessage: undefined }
          : { hasError: false }
        : { hasError: true, errorMessage: row.invalid }
  );
  if (row.adapter === 'resolver whole') expect(result.formError).toBe(row.lastErrors);
  return result;
}
