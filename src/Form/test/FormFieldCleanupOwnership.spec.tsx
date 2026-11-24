import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  type Adapter,
  expectCleared,
  expectInvalid,
  finish,
  mount,
  start,
  validation
} from './cleanErrorsTestUtils';

const adapters: Adapter[] = ['schema field', 'schema whole', 'resolver field', 'resolver whole'];

describe.each(adapters)('Public cleanErrorForField async ownership (%s)', adapter => {
  it('keeps an accepted field cleanup after an older promise returns', async () => {
    const row = validation(adapter);
    const mounted = mount(row);
    const { pending } = await start(row, mounted);
    act(() => mounted.ref.current!.cleanErrorForField('username'));
    expectCleared('username-field', 'Username');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    expect(mounted.onCheck).not.toHaveBeenCalled();
    expect(mounted.onError).not.toHaveBeenCalled();

    await finish(row, pending);

    expectCleared('username-field', 'Username');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    expect(mounted.onCheck).not.toHaveBeenCalled();
    expect(mounted.onError).not.toHaveBeenCalled();
    mounted.expectCallerSnapshots();
  });

  it('preserves onCheck-reentrant field cleanup without a stale onError', async () => {
    const row = validation(adapter);
    const observed: { errors: any; contents: string }[] = [];
    const onCheck = vi.fn((errors: any) => {
      observed.push({ errors, contents: JSON.stringify(errors) });
      mounted.ref.current!.cleanErrorForField('username');
    });
    const mounted = mount(row, false, onCheck);
    const { pending } = await start(row, mounted);

    await finish(row, pending);

    expectCleared('username-field', 'Username');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(observed[0].errors.username).toBe(row.invalid);
    expect(JSON.stringify(observed[0].errors)).toBe(observed[0].contents);
    expect(mounted.onError).not.toHaveBeenCalled();
    mounted.expectCallerSnapshots();
  });

  it('keeps a rejected controlled cleanup and pending callbacks authoritative', async () => {
    const row = validation(adapter);
    const mounted = mount(row, true);
    const { pending } = await start(row, mounted);
    act(() => mounted.ref.current!.cleanErrorForField('username'));

    await finish(row, pending);

    expectInvalid('username-field', 'Username', 'Initial username error');
    expectInvalid('keep-field', 'Keep', 'Keep error');
    const expected =
      row.whole || adapter === 'resolver field'
        ? { username: row.invalid }
        : { username: row.invalid, keep: 'Keep error' };
    expect(mounted.onCheck).toHaveBeenCalledExactlyOnceWith(expected);
    expect(mounted.onError).toHaveBeenCalledExactlyOnceWith(expected);
    expect(mounted.onCheck.mock.calls[0][0]).toBe(mounted.onError.mock.calls[0][0]);
    mounted.expectCallerSnapshots();
  });
});
