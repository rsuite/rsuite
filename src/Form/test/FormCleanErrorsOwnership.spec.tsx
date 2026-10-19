import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../index';
import Schema from '../../Schema';
import {
  type Adapter,
  type Request,
  deferredRule,
  expectCleared,
  expectInvalid,
  finish,
  freeze,
  mount,
  start,
  validation
} from './cleanErrorsTestUtils';

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
