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
  mountContinuation
} from './nativeContinuationTestUtils';

function expectUntrustedForwarding(
  probe: ReturnType<typeof mountContinuation>['probe'],
  index: number,
  nativeEvent: Event,
  input: HTMLInputElement
) {
  const forwarded = probe.inputs[index];
  expect(forwarded.event).toBe(probe.onInput.mock.calls[index][0]);
  expect(forwarded.event.type).toBe('input');
  expect(forwarded.event.nativeEvent).toBe(nativeEvent);
  expect(nativeEvent.type).toBe('input');
  expect(nativeEvent.isTrusted).toBe(false);
  expect(probe.native.some(row => row.event === nativeEvent)).toBe(true);
  expect(forwarded.targetDuringCallback).toBe(input);
  expect(forwarded.currentTargetDuringCallback).toBe(input);
  expect(forwarded.nativeTarget).toBe(input);
  expect(forwarded.trusted).toBe(false);
}

describe('Toggle pending input continuation', () => {
  it('TPI-01 retains pending trusted continuation after an early untrusted input', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TPI-01', input);
      expectCoherent(input, true);
      const before = probe.changes.length;
      const callerBefore = probe.inputs.length;
      const nativeBefore = probe.native.length;
      const orderBefore = probe.order.length;
      const earlyInput = new Event('input', { bubbles: true });
      let injected = false;
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={probe.onChange}
          onInput={probe.onInput}
          onClick={() => {
            if (!injected) {
              injected = true;
              input.dispatchEvent(earlyInput);
            }
          }}
        />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      await trustedEdit('TPI-01', input);
      probe.record('TPI-01', 'early-untrusted-input-and-trusted-continuation-returned');
      expect(injected).toBe(true);
      expectNotification(probe, before, false, input, true, 'input');
      const capturedInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(capturedInputs).toHaveLength(2);
      expect(capturedInputs[0].event).toBe(earlyInput);
      expect(probe.inputs).toHaveLength(callerBefore + 2);
      expectUntrustedForwarding(probe, callerBefore, earlyInput, input);
      expectForwardedInput(probe, callerBefore + 1, capturedInputs[1].event, input);
      expect(probe.inputs[callerBefore + 1].event).toBe(probe.changes[before].event);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'caller-onInput',
        'onChange',
        'caller-onInput'
      ]);
      expectCoherent(input, false);
      await trustedEdit('TPI-01', input);
      probe.record('TPI-01', 'next-original-primary-returned');
      expectNotification(probe, before + 1, true, input, true, 'change');
      const allInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(allInputs).toHaveLength(3);
      expect(probe.inputs).toHaveLength(callerBefore + 3);
      expectForwardedInput(probe, callerBefore + 2, allInputs[2].event, input);
      expect(probe.inputs[callerBefore + 2].event).not.toBe(probe.changes[before + 1].event);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'caller-onInput',
        'onChange',
        'caller-onInput',
        'onChange',
        'caller-onInput'
      ]);
      expect(mounted.getByRole('switch')).toBe(input);
      expectCoherent(input, true);
    } finally {
      probe.detach();
    }
  });

  it('TPI-02 preserves nested activation replacement during caller input reentry', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TPI-02', input);
      expectCoherent(input, true);
      const before = probe.changes.length;
      const callerBefore = probe.inputs.length;
      const nativeBefore = probe.native.length;
      const orderBefore = probe.order.length;
      const earlyInputs: Event[] = [];
      let reentered = false;
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={probe.onChange}
          onClick={() => {
            if (earlyInputs.length < 2) {
              const earlyInput = new Event('input', { bubbles: true });
              earlyInputs.push(earlyInput);
              input.dispatchEvent(earlyInput);
            }
          }}
          onInput={event => {
            probe.onInput(event);
            if (!reentered && event.nativeEvent === earlyInputs[0]) {
              reentered = true;
              input.click();
            }
          }}
        />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      await trustedEdit('TPI-02', input);
      probe.record('TPI-02', 'caller-input-reentry-and-original-inputs-returned');
      expect(reentered).toBe(true);
      expect(earlyInputs).toHaveLength(2);
      expect(probe.changes).toHaveLength(before + 1);
      expectRecordedChange(probe, before, true, input, false, 'change');
      const captured = probe.native.slice(nativeBefore);
      const capturedClicks = captured.filter(row => row.type === 'click');
      const capturedInputs = captured.filter(row => row.type === 'input');
      expect(capturedClicks).toHaveLength(2);
      expect(capturedClicks[0].trusted).toBe(true);
      expect(capturedClicks[1].trusted).toBe(false);
      expect(probe.changes[before].event.nativeEvent).toBe(capturedClicks[1].event);
      expect(capturedInputs).toHaveLength(4);
      expect(capturedInputs[0].event).toBe(earlyInputs[0]);
      expect(capturedInputs[1].event).toBe(earlyInputs[1]);
      expect(probe.inputs).toHaveLength(callerBefore + 4);
      expectUntrustedForwarding(probe, callerBefore, earlyInputs[0], input);
      expectUntrustedForwarding(probe, callerBefore + 1, earlyInputs[1], input);
      expectForwardedInput(probe, callerBefore + 2, capturedInputs[2].event, input);
      expectForwardedInput(probe, callerBefore + 3, capturedInputs[3].event, input);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'caller-onInput',
        'caller-onInput',
        'onChange',
        'caller-onInput',
        'caller-onInput'
      ]);
      expectCoherent(input, true);
      mounted.rerender(
        <ResetView defaultChecked onChange={probe.onChange} onInput={probe.onInput} />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      await trustedEdit('TPI-02', input);
      probe.record('TPI-02', 'next-original-primary-returned');
      expectNotification(probe, before + 1, false, input, true, 'change');
      const allInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(allInputs).toHaveLength(5);
      expect(probe.inputs).toHaveLength(callerBefore + 5);
      expectForwardedInput(probe, callerBefore + 4, allInputs[4].event, input);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'caller-onInput',
        'caller-onInput',
        'onChange',
        'caller-onInput',
        'caller-onInput',
        'onChange',
        'caller-onInput'
      ]);
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });

  it('TPI-03 preserves canceled click and owned expiry after early untrusted input', async () => {
    const { mounted, form, input, probe } = mountContinuation(true);
    try {
      edit(input);
      await scriptedReset(form, 'TPI-03', input);
      expectCoherent(input, true);
      const before = probe.changes.length;
      const callerBefore = probe.inputs.length;
      const nativeBefore = probe.native.length;
      const orderBefore = probe.order.length;
      const earlyInput = new Event('input', { bubbles: true });
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={probe.onChange}
          onInput={probe.onInput}
          onClick={event => {
            input.dispatchEvent(earlyInput);
            event.preventDefault();
          }}
        />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      await trustedEdit('TPI-03', input);
      probe.record('TPI-03', 'early-input-and-canceled-click-returned');
      const canceled = probe.native.slice(nativeBefore);
      const capturedClicks = canceled.filter(row => row.type === 'click');
      const capturedInputs = canceled.filter(row => row.type === 'input');
      expect(capturedClicks).toHaveLength(1);
      expect(capturedClicks[0].trusted).toBe(true);
      expect(capturedClicks[0].event.defaultPrevented).toBe(true);
      expect(capturedInputs).toHaveLength(1);
      expect(capturedInputs[0].event).toBe(earlyInput);
      expect(probe.inputs).toHaveLength(callerBefore + 1);
      expectUntrustedForwarding(probe, callerBefore, earlyInput, input);
      expect(probe.changes).toHaveLength(before);
      expectCoherent(input, true);
      await taskAndCommit('TPI-03', input);
      const staleInput = new Event('input', { bubbles: true });
      act(() => input.dispatchEvent(staleInput));
      probe.record('TPI-03', 'direct-untrusted-input-after-owned-expiry');
      expect(probe.inputs).toHaveLength(callerBefore + 2);
      expectUntrustedForwarding(probe, callerBefore + 1, staleInput, input);
      expect(probe.changes).toHaveLength(before);
      expectCoherent(input, true);
      mounted.rerender(
        <ResetView defaultChecked onChange={probe.onChange} onInput={probe.onInput} />
      );
      expect(mounted.getByRole('switch')).toBe(input);
      await trustedEdit('TPI-03', input);
      probe.record('TPI-03', 'next-trusted-continuation-returned');
      expectNotification(probe, before, false, input, true, 'input');
      const allInputs = probe.native.slice(nativeBefore).filter(row => row.type === 'input');
      expect(allInputs).toHaveLength(3);
      expect(allInputs[0].event).toBe(earlyInput);
      expect(allInputs[1].event).toBe(staleInput);
      expect(probe.inputs).toHaveLength(callerBefore + 3);
      expectForwardedInput(probe, callerBefore + 2, allInputs[2].event, input);
      expect(probe.inputs[callerBefore + 2].event).toBe(probe.changes[before].event);
      expect(probe.order.slice(orderBefore).map(row => row.phase)).toEqual([
        'caller-onInput',
        'caller-onInput',
        'onChange',
        'caller-onInput'
      ]);
      expectCoherent(input, false);
    } finally {
      probe.detach();
    }
  });
});
