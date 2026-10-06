import React from 'react';
import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Toggle from '../Toggle';
import {
  ResetView,
  edit,
  expectCoherent,
  mountReset,
  recordObservation,
  scriptedReset,
  taskAndCommit
} from './resetCoherenceTestUtils';

describe('Toggle reset lifetime', () => {
  it('TRC-09 retains a completed reset across a same-stack unrelated parent commit', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    act(() => form.reset());
    mounted.rerender(<ResetView defaultChecked tick={1} onChange={onChange} />);
    expect(mounted.getByRole('switch')).toBe(input);
    expect(input.checked).toBe(true);
    await taskAndCommit('TRC-09', input);
    expectCoherent(input, true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-10 retains pending native state across committed same-input owner reassociation', async () => {
    const { mounted, form, input, onChange } = mountReset(true, { form: 'trc-a' });
    const formB = mounted.container.querySelector<HTMLFormElement>('#trc-b')!;
    expect(input.form).toBe(form);
    edit(input);
    act(() => form.reset());
    mounted.rerender(<ResetView defaultChecked form="trc-b" onChange={onChange} />);
    expect(mounted.getByRole('switch')).toBe(input);
    expect(input.form).toBe(formB);
    await taskAndCommit('TRC-10', input);
    expectCoherent(input, true);
    edit(input);
    await scriptedReset(form, 'TRC-10', input);
    expectCoherent(input, false);
    await scriptedReset(formB, 'TRC-10', input);
    expectCoherent(input, true);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('TRC-11 follows external form owners and committed ancestor relocation', async () => {
    const onChange = vi.fn();
    const toggle = (form?: string) => (
      <Toggle
        name="choice"
        defaultChecked
        form={form}
        checkedChildren="ON"
        unCheckedChildren="OFF"
        onChange={onChange}
      />
    );
    function View({ owner, inside = false }: { owner: string; inside?: boolean }) {
      return (
        <div>
          <form id="trc-a" />
          <form id="trc-b">{inside && toggle()}</form>
          {!inside && toggle(owner)}
        </div>
      );
    }
    const mounted = render(<View owner="trc-a" />);
    const input = mounted.getByRole('switch') as HTMLInputElement;
    const formA = mounted.container.querySelector<HTMLFormElement>('#trc-a')!;
    const formB = mounted.container.querySelector<HTMLFormElement>('#trc-b')!;
    expect(input.closest('form')).toBeNull();
    expect(input.form).toBe(formA);
    edit(input);
    await scriptedReset(formB, 'TRC-11', input);
    expectCoherent(input, false);
    await scriptedReset(formA, 'TRC-11', input);
    expectCoherent(input, true);
    mounted.rerender(<View owner="trc-b" />);
    expect(mounted.getByRole('switch')).toBe(input);
    expect(input.form).toBe(formB);
    edit(input);
    await scriptedReset(formB, 'TRC-11', input);
    expectCoherent(input, true);
    mounted.rerender(<View owner="trc-b" inside />);
    const relocated = mounted.getByRole('switch') as HTMLInputElement;
    // Record actual identity instead of assuming relocation retains a primitive input.
    recordObservation('TRC-11', {
      retainedInputAfterAncestorRelocation: relocated === input,
      oldInputConnected: input.isConnected
    });
    expect(relocated.closest('form')).toBe(formB);
    expect(relocated.form).toBe(formB);
    edit(relocated);
    await scriptedReset(formB, 'TRC-11', relocated);
    expectCoherent(relocated, true);
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('TRC-12 fences an obsolete task when a keyed Toggle replaces the native input', async () => {
    const { mounted, form, input, onChange } = mountReset(true, { toggleKey: 'old' });
    edit(input);
    act(() => form.reset());
    mounted.rerender(<ResetView defaultChecked={false} toggleKey="new" onChange={onChange} />);
    const replacement = mounted.getByRole('switch') as HTMLInputElement;
    expect(replacement).not.toBe(input);
    expect(input.isConnected).toBe(false);
    await taskAndCommit('TRC-12', replacement);
    expectCoherent(replacement, false);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('TRC-13 fences an obsolete task when plaintext removes the native input', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    act(() => form.reset());
    mounted.rerender(<ResetView defaultChecked plaintext onChange={onChange} />);
    expect(input.isConnected).toBe(false);
    expect(mounted.queryByRole('switch')).toBeNull();
    expect(mounted.getByText('OFF')).toBeTruthy();
    await taskAndCommit('TRC-13', input);
    expect(mounted.getByText('OFF')).toBeTruthy();
    expect(onChange).toHaveBeenCalledTimes(1);
    mounted.rerender(<ResetView defaultChecked onChange={onChange} />);
    const replacement = mounted.getByRole('switch') as HTMLInputElement;
    expect(replacement).not.toBe(input);
    // New native default and retained hook state are a separate plaintext transition boundary.
    expect(replacement.checked).toBe(true);
    recordObservation('TRC-13', {
      phase: 'later-native-branch-recorded-separately',
      checked: replacement.checked,
      ariaChecked: replacement.getAttribute('aria-checked'),
      qualification: 'Later plaintext-to-native coherence is outside obsolete-task fencing'
    });
  });

  it('TRC-14 fences an obsolete task after actual unmount and fresh false mount', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    act(() => form.reset());
    mounted.unmount();
    expect(input.isConnected).toBe(false);
    const fresh = mountReset(false);
    await taskAndCommit('TRC-14', fresh.input);
    expectCoherent(fresh.input, false);
    act(() => form.reset());
    await taskAndCommit('TRC-14', fresh.input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fresh.onChange).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
