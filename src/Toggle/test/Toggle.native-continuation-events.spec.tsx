import React from 'react';
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  ResetView,
  edit,
  expectCoherent,
  scriptedReset,
  taskAndCommit,
  trustedEdit
} from './resetCoherenceTestUtils';
import {
  expectForwardedInput,
  expectNotification,
  expectRecordedChange,
  mountContinuation,
  recordNativeState
} from './nativeContinuationTestUtils';

describe('Toggle native continuation public events', () => {
  it('TCN-11 forwards original fallback and primary events once in caller order', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-11', input);
      const before = probe.changes.length;
      const callerBefore = probe.onInput.mock.calls.length;
      const orderBefore = probe.order.length;
      await trustedEdit('TCN-11', input);
      probe.record('TCN-11', 'first-trusted-continuation');
      expectNotification(probe, before, false, input, true, 'input');
      expect(probe.onInput.mock.calls[callerBefore][0]).toBe(probe.changes[before].event);
      expectCoherent(input, false);
      await trustedEdit('TCN-11', input);
      probe.record('TCN-11', 'second-trusted-primary');
      expectNotification(probe, before + 1, true, input, true, 'change');
      expect(probe.onInput.mock.calls[callerBefore + 1][0]).not.toBe(
        probe.changes[before + 1].event
      );
      expect(probe.onInput).toHaveBeenCalledTimes(callerBefore + 2);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'onChange',
        'caller-onInput',
        'onChange',
        'caller-onInput'
      ]);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-12 rejects canceled click and stale direct input before the next edit', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-12', input);
      const before = probe.changes.length;
      const nativeBefore = probe.native.length;
      const callerBefore = probe.onInput.mock.calls.length;
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={probe.onChange}
          onInput={probe.onInput}
          onClick={event => event.preventDefault()}
        />
      );
      await trustedEdit('TCN-12', input);
      probe.record('TCN-12', 'canceled-trusted-click-returned');
      expect(input.checked).toBe(true);
      expect(probe.changes).toHaveLength(before);
      expect(probe.native.slice(nativeBefore).filter(row => row.type === 'input')).toHaveLength(0);
      expect(
        probe.native.slice(nativeBefore).find(row => row.type === 'click')?.event.defaultPrevented
      ).toBe(true);
      await taskAndCommit('TCN-12', input);
      act(() => input.dispatchEvent(new Event('input', { bubbles: true })));
      probe.record('TCN-12', 'untrusted-direct-input-after-expiry');
      expect(probe.changes).toHaveLength(before);
      expect(probe.onInput).toHaveBeenCalledTimes(callerBefore + 1);
      mounted.rerender(
        <ResetView defaultChecked onChange={probe.onChange} onInput={probe.onInput} />
      );
      await trustedEdit('TCN-12', input);
      probe.record('TCN-12', 'accepted-trusted-click-returned');
      expectNotification(probe, before, false, input, true, 'input');
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });

  it('TCN-13 rejects direct input while retaining scripted default-action native input', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-13', input);
      const before = probe.changes.length;
      act(() => input.dispatchEvent(new Event('input', { bubbles: true })));
      probe.record('TCN-13', 'direct-input-with-no-admitted-click');
      expect(probe.changes).toHaveLength(before);
      expect(probe.native[probe.native.length - 1].trusted).toBe(false);
      const nativeBefore = probe.native.length;
      act(() => input.click());
      probe.record('TCN-13', 'scripted-click-default-action-returned');
      const generated = probe.native.slice(nativeBefore);
      expect(generated.find(row => row.type === 'click')?.trusted).toBe(false);
      expect(generated.find(row => row.type === 'input')?.trusted).toBe(true);
      expectNotification(probe, before, false, input, true, 'input');
      expectCoherent(input, false);
      await trustedEdit('TCN-13', input);
      probe.record('TCN-13', 'later-trusted-primary-returned');
      expectNotification(probe, before + 1, true, input, true, 'change');
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TCN-14 retains nested callback activation and original event identities', async () => {
    const { form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-14', input);
      const before = probe.changes.length;
      const orderBefore = probe.order.length;
      const nativeBefore = probe.native.length;
      const callerBefore = probe.inputs.length;
      let reentered = false;
      probe.setAfterChange(() => {
        if (!reentered) {
          reentered = true;
          input.click();
        }
      });
      await trustedEdit('TCN-14', input);
      probe.record('TCN-14', 'outer-input-callback-and-nested-click-returned');
      expect(reentered).toBe(true);
      expect(probe.changes).toHaveLength(before + 2);
      expectRecordedChange(probe, before, false, input, true, 'input');
      expectRecordedChange(probe, before + 1, true, input, false, 'change');
      expect(probe.changes[before].event.nativeEvent).not.toBe(
        probe.changes[before + 1].event.nativeEvent
      );
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'onChange',
        'onChange',
        'caller-onInput',
        'caller-onInput'
      ]);
      const capturedInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(capturedInputs).toHaveLength(2);
      expect(probe.inputs).toHaveLength(callerBefore + 2);
      expectForwardedInput(probe, callerBefore, capturedInputs[1].event, input);
      expectForwardedInput(probe, callerBefore + 1, capturedInputs[0].event, input);
      expect(probe.inputs[callerBefore + 1].event).toBe(probe.changes[before].event);
      expectCoherent(input, true);
      probe.setAfterChange();
      await trustedEdit('TCN-14', input);
      probe.record('TCN-14', 'next-accepted-trusted-click-returned');
      expectNotification(probe, before + 2, false, input, true, 'change');
      expectCoherent(input, false);
    } finally {
      probe.setAfterChange();
      probe.detach();
    }
  });

  it('TCN-15 preserves controlled owner rejection and original primary callback', async () => {
    const { form, input, probe } = mountContinuation(false, { checked: true });
    try {
      await scriptedReset(form, 'TCN-15', input);
      await trustedEdit('TCN-15', input);
      probe.record('TCN-15', 'controlled-owner-rejected-request');
      recordNativeState('TCN-15', 'owner-restored-native-state', input);
      expectNotification(probe, 0, false, input, true, 'change');
      expect(probe.onInput).toHaveBeenCalledTimes(1);
      expect(probe.order.map(row => row.phase)).toEqual(['onChange', 'caller-onInput']);
      expectCoherent(input, true);
      expect(console.error).not.toHaveBeenCalled();
    } finally {
      probe.detach();
    }
  });

  it('TCN-16 retains latest native state when caller onClick nests a same-task click', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TCN-16', input);
      const before = probe.changes.length;
      const orderBefore = probe.order.length;
      const nativeBefore = probe.native.length;
      const callerBefore = probe.inputs.length;
      let reentered = false;
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={probe.onChange}
          onInput={probe.onInput}
          onClick={() => {
            if (!reentered) {
              reentered = true;
              input.click();
            }
          }}
        />
      );
      await trustedEdit('TCN-16', input);
      probe.record('TCN-16', 'caller-onClick-nested-activation-returned');
      recordNativeState('TCN-16', 'latest-native-after-outer-return', input);
      expect(reentered).toBe(true);
      // The nested edit restored true before outer input. Do not fabricate a
      // historical false callback from the earlier outer pre-activation.
      expect(probe.changes).toHaveLength(before + 1);
      expectRecordedChange(probe, before, true, input, false, 'change');
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'onChange',
        'caller-onInput',
        'caller-onInput'
      ]);
      const capturedInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(capturedInputs).toHaveLength(2);
      expect(probe.inputs).toHaveLength(callerBefore + 2);
      expectForwardedInput(probe, callerBefore, capturedInputs[0].event, input);
      expectForwardedInput(probe, callerBefore + 1, capturedInputs[1].event, input);
      expectCoherent(input, true);
      mounted.rerender(
        <ResetView defaultChecked onChange={probe.onChange} onInput={probe.onInput} />
      );
      await trustedEdit('TCN-16', input);
      probe.record('TCN-16', 'next-accepted-trusted-click-returned');
      expectNotification(probe, before + 1, false, input, true, 'change');
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });
});
