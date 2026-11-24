import React from 'react';
import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  ResetView,
  edit,
  expectCoherent,
  mountReset,
  scriptedReset,
  taskAndCommit,
  trustedReset
} from './resetCoherenceTestUtils';

describe('Toggle reset coherence', () => {
  it('TRC-01 synchronizes native default true after scripted reset and parent render', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(1);
    act(() => form.reset());
    expect(input.checked).toBe(true);
    expect(new FormData(form).getAll('choice')).toEqual(['on']);
    await taskAndCommit('TRC-01', input);
    expectCoherent(input, true);
    mounted.rerender(<ResetView defaultChecked tick={1} onChange={onChange} />);
    expect(mounted.getByRole('switch')).toBe(input);
    expectCoherent(input, true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-02 synchronizes native default false after scripted reset', async () => {
    const { form, input, onChange } = mountReset(false);
    edit(input);
    expectCoherent(input, true);
    act(() => form.reset());
    expect(input.checked).toBe(false);
    expect(new FormData(form).getAll('choice')).toEqual([]);
    await taskAndCommit('TRC-02', input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-03 synchronizes after a trusted native reset button default action', async () => {
    const onReset = vi.fn();
    const { form, input, onChange } = mountReset(true, { onReset });
    edit(input);
    const observation = await trustedReset('TRC-03', form, input);
    expect(observation.checkedDuringReset).toBe(false);
    expect(observation.afterCommandChecked).toBe(true);
    expect(observation.reset.defaultPrevented).toBe(false);
    expectCoherent(input, true);
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-04 respects React onReset cancellation without reset onChange', async () => {
    let event: Event | undefined;
    const onReset = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      event = e.nativeEvent;
      e.preventDefault();
    });
    const { form, input, onChange } = mountReset(true, { onReset });
    edit(input);
    await scriptedReset(form, 'TRC-04', input);
    expect(event?.defaultPrevented).toBe(true);
    expectCoherent(input, false);
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-05 respects late ancestor cancellation of a trusted reset button', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    const order: string[] = [];
    const owner = () => {
      order.push('owner');
    };
    const ancestor = (event: Event) => {
      order.push('ancestor');
      event.preventDefault();
    };
    form.addEventListener('reset', owner);
    mounted.container.addEventListener('reset', ancestor);
    try {
      edit(input);
      const observation = await trustedReset('TRC-05', form, input);
      expect(order).toEqual(['owner', 'ancestor']);
      expect(observation.reset.defaultPrevented).toBe(true);
      expect(observation.afterCommandChecked).toBe(false);
      expectCoherent(input, false);
      expect(onChange).toHaveBeenCalledTimes(1);
    } finally {
      form.removeEventListener('reset', owner);
      mounted.container.removeEventListener('reset', ancestor);
    }
  });

  it('TRC-06 preserves controlled true through rejected click reset and parent commit', async () => {
    const { mounted, form, input, onChange } = mountReset(false, { checked: true });
    edit(input);
    expect(onChange).toHaveBeenNthCalledWith(1, false, expect.any(Object));
    expectCoherent(input, true);
    await scriptedReset(form, 'TRC-06', input);
    mounted.rerender(<ResetView checked defaultChecked={false} tick={1} onChange={onChange} />);
    expectCoherent(input, true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-07 preserves controlled false and latest same-stack owner update', async () => {
    const { mounted, form, input, onChange } = mountReset(true, { checked: false });
    expect(input.defaultChecked).toBe(false);
    expectCoherent(input, false);
    act(() => form.reset());
    mounted.rerender(<ResetView checked defaultChecked tick={1} onChange={onChange} />);
    await taskAndCommit('TRC-07', input);
    expectCoherent(input, true);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('TRC-08 reads the current native default after dirty defaultChecked prop change', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    mounted.rerender(<ResetView defaultChecked={false} onChange={onChange} />);
    expect(input.defaultChecked).toBe(false);
    expect(input.hasAttribute('checked')).toBe(false);
    expect(input.checked).toBe(false);
    await scriptedReset(form, 'TRC-08', input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
