import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '..';
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

describe.each(['schema field', 'schema whole', 'resolver field', 'resolver whole'] as Adapter[])(
  'New validation after field cleanup (%s)',
  adapter => {
    it('accepts a new request while the older promise returns independently', async () => {
      const row = validation(adapter);
      const mounted = mount(row);
      const { pending: older } = await start(row, mounted);
      act(() => mounted.ref.current!.cleanErrorForField('username'));
      const values = freeze({ ...row.values, username: 'fresh' });
      mounted.rerender(mounted.element(undefined, values));
      let fresh!: Promise<any>;
      act(() => {
        fresh = row.whole
          ? mounted.ref.current!.checkAsync()
          : mounted.ref.current!.checkForFieldAsync('username');
      });
      await waitFor(() =>
        expect(row.requests.map(request => request.value)).toEqual(['old', 'fresh'])
      );
      await finish(row, older);
      expectCleared('username-field', 'Username');
      expectInvalid('keep-field', 'Keep', 'Keep error');
      expect(mounted.onCheck).not.toHaveBeenCalled();
      expect(mounted.onError).not.toHaveBeenCalled();

      await finish(row, fresh, 1);

      const expected =
        row.whole || adapter === 'resolver field'
          ? { username: row.invalid }
          : { username: row.invalid, keep: 'Keep error' };
      expectInvalid('username-field', 'Username', row.invalid);
      expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith(expected);
      expect(mounted.onError).toHaveBeenCalledExactlyOnceWith(expected);
      expect(values).toEqual({ username: 'fresh', keep: 'unchanged' });
      mounted.expectCallerSnapshots();
    });
  }
);

it.each([true, false])(
  'preserves another pending field when cleaned request finishes first=%s',
  async cleanedFirst => {
    const usernameRequests: Request[] = [];
    const emailRequests: Request[] = [];
    const row = validation('schema field');
    row.props = {
      model: Schema.Model({
        username: Schema.Types.StringType().addAsyncRule(
          deferredRule(usernameRequests),
          'Username invalid'
        ),
        email: Schema.Types.StringType().addAsyncRule(deferredRule(emailRequests), 'Email invalid')
      })
    };
    row.values = freeze({ ...row.values, email: 'old' });
    const mounted = mount(row);
    mounted.rerender(
      mounted.element(
        undefined,
        row.values,
        <Form.Control name="email" id="email-field" aria-label="Email" />
      )
    );
    const errors = freeze({ ...mounted.initialErrors, email: 'Initial email error' });
    const before = JSON.stringify(errors);
    act(() => mounted.ref.current!.resetErrors(errors));
    let username!: Promise<any>, email!: Promise<any>;
    act(() => {
      username = mounted.ref.current!.checkForFieldAsync('username');
      email = mounted.ref.current!.checkForFieldAsync('email');
    });
    await waitFor(() => {
      expect(usernameRequests).toHaveLength(1);
      expect(emailRequests).toHaveLength(1);
    });
    act(() => mounted.ref.current!.cleanErrorForField('username'));
    const finishUsername = async () => {
      usernameRequests[0].resolve(false);
      expect(await username).toEqual({ hasError: true, errorMessage: 'Username invalid' });
    };
    const finishEmail = async () => {
      emailRequests[0].resolve(false);
      expect(await email).toEqual({ hasError: true, errorMessage: 'Email invalid' });
    };
    await act(async () => {
      if (cleanedFirst) {
        await finishUsername();
        await finishEmail();
      } else {
        await finishEmail();
        await finishUsername();
      }
    });
    expectCleared('username-field', 'Username');
    expectInvalid('email-field', 'Email', 'Email invalid');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    const expected = { email: 'Email invalid', keep: 'Keep error' };
    expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith(expected);
    expect(mounted.onError).toHaveBeenCalledExactlyOnceWith(expected);
    expect(JSON.stringify(errors)).toBe(before);
    mounted.expectCallerSnapshots();
  }
);
