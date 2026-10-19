import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../index';
import Schema from '../../Schema';
import {
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
