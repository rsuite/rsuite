import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '../index';
import Schema from '../../Schema';

type Adapter = 'schema field' | 'schema whole' | 'resolver field' | 'resolver whole';
type Api = FormInstance<Record<string, any>, any, Record<string, any>>;
type Request = { value: string; resolve: (valid: boolean) => void };

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function deferredRule(requests: Request[]) {
  return (value: string | undefined) =>
    new Promise<boolean>(resolve => requests.push({ value: value!, resolve }));
}

function validation(adapter: Adapter) {
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

function expectInvalid(id: string, label: string, message: string) {
  const input = screen.getByRole('textbox', { name: label });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-errormessage', `${id}-error-message`);
  expect(document.getElementById(`${id}-error-message`)).toHaveTextContent(message);
}

function expectCleared(id: string, label: string) {
  expect(screen.getByRole('textbox', { name: label })).not.toHaveAttribute('aria-invalid');
  expect(document.getElementById(`${id}-error-message`)).not.toBeInTheDocument();
}

function mount(row: Validation, controlled = false, onCheck = vi.fn()) {
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

async function start(row: Validation, mounted: Mounted) {
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

async function finish(row: Validation, pending: Promise<any>, index = 0, valid = false) {
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

const adapters: Adapter[] = ['schema field', 'schema whole', 'resolver field', 'resolver whole'];

describe.each(adapters)('Public cleanErrors ownership (%s)', adapter => {
  it('keeps accepted clear-all after an older promise returns its own result', async () => {
    const row = validation(adapter);
    const mounted = mount(row);
    const { pending } = await start(row, mounted);
    act(() => mounted.ref.current!.cleanErrors());
    expectCleared('username-field', 'Username');
    expectCleared('keep-field', 'Keep');
    expect(mounted.onCheck).not.toHaveBeenCalled();
    expect(mounted.onError).not.toHaveBeenCalled();
    await finish(row, pending);
    expectCleared('username-field', 'Username');
    expectCleared('keep-field', 'Keep');
    expect(mounted.onCheck).not.toHaveBeenCalled();
    expect(mounted.onError).not.toHaveBeenCalled();
    mounted.expectCallerSnapshots();
  });

  it('preserves onCheck-reentrant clear-all without later stale publication', async () => {
    const row = validation(adapter);
    const observed: { errors: any; json: string }[] = [];
    const onCheck = vi.fn((errors: any) => {
      observed.push({ errors, json: JSON.stringify(errors) });
      mounted.ref.current!.cleanErrors();
    });
    const mounted = mount(row, false, onCheck);
    const { pending } = await start(row, mounted);
    await finish(row, pending);
    expectCleared('username-field', 'Username');
    expectCleared('keep-field', 'Keep');
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(observed[0].errors).toEqual(
      row.whole || row.adapter === 'resolver field'
        ? { username: row.invalid }
        : { username: row.invalid, keep: 'Keep error' }
    );
    expect(JSON.stringify(observed[0].errors)).toBe(observed[0].json);
    expect(mounted.onError).not.toHaveBeenCalled();
    mounted.expectCallerSnapshots();
  });

  it('keeps controlled rejection and the pending callbacks authoritative', async () => {
    const row = validation(adapter);
    const mounted = mount(row, true);
    const { pending } = await start(row, mounted);
    act(() => mounted.ref.current!.cleanErrors());
    await finish(row, pending);
    expectInvalid('username-field', 'Username', 'Initial username error');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    const expected =
      row.whole || row.adapter === 'resolver field'
        ? { username: row.invalid }
        : { username: row.invalid, keep: 'Keep error' };
    expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith(expected);
    expect(mounted.onError).toHaveBeenCalledExactlyOnceWith(expected);
    expect(mounted.onCheck.mock.calls[0][0]).toBe(mounted.onError.mock.calls[0][0]);
    mounted.expectCallerSnapshots();
  });
});

describe.each(['schema whole', 'resolver whole'] as Adapter[])(
  'Public resetErrors existing ownership (%s)',
  adapter => {
    it.each([false, true])(
      'keeps existing reset cancellation (controlled=%s)',
      async controlled => {
        const row = validation(adapter);
        const mounted = mount(row, controlled);
        const { pending } = await start(row, mounted);
        const replacement = freeze({ username: 'Replacement error', keep: 'Replacement keep' });
        const replacementJson = JSON.stringify(replacement);
        act(() => mounted.ref.current!.resetErrors(replacement));
        await finish(row, pending);
        expectInvalid(
          'username-field',
          'Username',
          controlled ? 'Initial username error' : 'Replacement error'
        );
        expectInvalid('keep-field', 'Keep', controlled ? 'Keep error' : 'Replacement keep');
        expect(mounted.onCheck).not.toHaveBeenCalled();
        expect(mounted.onError).not.toHaveBeenCalled();
        expect(JSON.stringify(replacement)).toBe(replacementJson);
        mounted.expectCallerSnapshots();
      }
    );
  }
);

describe('Public cleanErrors independent field promises', () => {
  it('cancels both field owners and preserves both returned results', async () => {
    const usernameRequests: Request[] = [];
    const emailRequests: Request[] = [];
    const model = Schema.Model({
      username: Schema.Types.StringType().addAsyncRule(
        deferredRule(usernameRequests),
        'Username invalid'
      ),
      email: Schema.Types.StringType().addAsyncRule(deferredRule(emailRequests), 'Email invalid')
    });
    const row = validation('schema field');
    row.props = { model };
    row.values = freeze({ ...row.values, email: 'old' });
    const mounted = mount(row);
    mounted.rerender(
      mounted.element(
        undefined,
        row.values,
        <Form.Control name="email" id="email-field" aria-label="Email" />
      )
    );
    const seeds = freeze({ ...mounted.initialErrors, email: 'Initial email error' });
    const seedJson = JSON.stringify(seeds);
    act(() => mounted.ref.current!.resetErrors(seeds));
    let username!: Promise<any>, email!: Promise<any>;
    act(() => {
      username = mounted.ref.current!.checkForFieldAsync('username');
      email = mounted.ref.current!.checkForFieldAsync('email');
    });
    await waitFor(() => {
      expect(usernameRequests).toHaveLength(1);
      expect(emailRequests).toHaveLength(1);
    });
    act(() => mounted.ref.current!.cleanErrors());
    let usernameResult: any, emailResult: any;
    await act(async () => {
      emailRequests[0].resolve(false);
      emailResult = await email;
      usernameRequests[0].resolve(false);
      usernameResult = await username;
    });
    expect(usernameResult).toEqual({ hasError: true, errorMessage: 'Username invalid' });
    expect(emailResult).toEqual({ hasError: true, errorMessage: 'Email invalid' });
    expectCleared('username-field', 'Username');
    expectCleared('email-field', 'Email');
    expectCleared('keep-field', 'Keep');
    expect(mounted.onCheck).not.toHaveBeenCalled();
    expect(mounted.onError).not.toHaveBeenCalled();
    expect(JSON.stringify(seeds)).toBe(seedJson);
    mounted.expectCallerSnapshots();
  });
});

describe.each(['schema field', 'resolver whole'] as Adapter[])(
  'Public newly requested validation after cleanErrors (%s)',
  adapter => {
    it('accepts the fresh request and leaves the older promise independent', async () => {
      const row = validation(adapter);
      const mounted = mount(row);
      const { pending: older } = await start(row, mounted);
      act(() => mounted.ref.current!.cleanErrors());
      const freshValues = freeze({ ...row.values, username: 'fresh' });
      const freshJson = JSON.stringify(freshValues);
      mounted.rerender(mounted.element(undefined, freshValues));
      let fresh!: Promise<any>;
      act(() => {
        fresh = row.whole
          ? mounted.ref.current!.checkAsync()
          : mounted.ref.current!.checkForFieldAsync('username');
      });
      await waitFor(() =>
        expect(row.requests.map(request => request.value)).toEqual(['old', 'fresh'])
      );
      await finish(row, fresh, 1);
      const delivered = mounted.onCheck.mock.calls[0][0];
      const deliveredJson = JSON.stringify(delivered);
      await finish(row, older, 0, true);
      expectInvalid('username-field', 'Username', row.invalid);
      expectCleared('keep-field', 'Keep');
      expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith({ username: row.invalid });
      expect(mounted.onError).toHaveBeenCalledExactlyOnceWith({ username: row.invalid });
      expect(JSON.stringify(delivered)).toBe(deliveredJson);
      expect(JSON.stringify(freshValues)).toBe(freshJson);
      mounted.expectCallerSnapshots();
    });
  }
);

function CleanupLayout({ run }: { run?: () => void }) {
  React.useLayoutEffect(() => {
    run?.();
  }, [run]);
  return null;
}

describe('Public saved cleanErrors render-current authority', () => {
  it('rejects saved cleanup during an uncontrolled-to-controlled child layout', async () => {
    const row = validation('schema field');
    const mounted = mount(row);
    const { pending } = await start(row, mounted);
    const saved = mounted.ref.current!;
    const ownerErrors = freeze({ username: 'Owner username error', keep: 'Owner keep error' });
    const ownerJson = JSON.stringify(ownerErrors);
    mounted.rerender(
      mounted.element(ownerErrors, row.values, <CleanupLayout run={() => saved.cleanErrors()} />)
    );
    await finish(row, pending);
    expectInvalid('username-field', 'Username', 'Owner username error');
    expectInvalid('keep-field', 'Keep', 'Owner keep error');
    expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith({
      username: row.invalid,
      keep: 'Owner keep error'
    });
    expect(mounted.onError).toHaveBeenCalledExactlyOnceWith({
      username: row.invalid,
      keep: 'Owner keep error'
    });
    expect(JSON.stringify(ownerErrors)).toBe(ownerJson);
    mounted.expectCallerSnapshots();
  });

  it('publishes accepted saved cleanup before synchronous validation after owner release', async () => {
    const emailRequests: Request[] = [];
    const row = validation('schema field');
    row.values = freeze({ ...row.values, email: 'old' });
    row.props = {
      model: Schema.Model({
        username: Schema.Types.StringType(),
        email: Schema.Types.StringType().addAsyncRule(deferredRule(emailRequests), 'Email invalid')
      })
    };
    const mounted = mount(row);
    const emailControl = <Form.Control name="email" id="email-field" aria-label="Email" />;
    const seedErrors = freeze({ ...mounted.initialErrors, email: 'Initial email error' });
    const seedJson = JSON.stringify(seedErrors);
    act(() => mounted.ref.current!.resetErrors(seedErrors));
    const ownerErrors = freeze({ username: 'Owner username error', keep: 'Owner keep error' });
    const ownerJson = JSON.stringify(ownerErrors);
    mounted.rerender(
      mounted.element(
        ownerErrors,
        row.values,
        <>
          {emailControl}
          <CleanupLayout />
        </>
      )
    );
    let pending!: Promise<any>;
    act(() => {
      pending = mounted.ref.current!.checkForFieldAsync('email');
    });
    await waitFor(() => expect(emailRequests).toHaveLength(1));
    const saved = mounted.ref.current!;
    let syncResult: boolean | undefined;
    mounted.rerender(
      mounted.element(
        undefined,
        row.values,
        <>
          {emailControl}
          <CleanupLayout
            run={() => {
              saved.cleanErrors();
              syncResult = saved.checkForField('username');
            }}
          />
        </>
      )
    );
    let result: any;
    await act(async () => {
      emailRequests[0].resolve(false);
      result = await pending;
    });
    expect(syncResult).toBe(true);
    expect(result).toEqual({ hasError: true, errorMessage: 'Email invalid' });
    expectCleared('username-field', 'Username');
    expectCleared('email-field', 'Email');
    expectCleared('keep-field', 'Keep');
    expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith({});
    expect(mounted.onError).not.toHaveBeenCalled();
    expect(JSON.stringify(seedErrors)).toBe(seedJson);
    expect(JSON.stringify(ownerErrors)).toBe(ownerJson);
    mounted.expectCallerSnapshots();
  });
});
