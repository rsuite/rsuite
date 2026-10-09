import React from 'react';
import { render } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { ResetView, recordObservation } from './resetCoherenceTestUtils';
import type { ResetViewProps } from './resetCoherenceTestUtils';

interface NativeRecord {
  id: number;
  event: Event;
  type: string;
  checked: boolean;
  trusted: boolean;
}

interface ChangeRecord {
  checked: boolean;
  checkedDuringCallback: boolean;
  event: React.ChangeEvent<HTMLInputElement>;
  type: string;
  nativeType: string;
  nativeId: number | undefined;
  targetDuringCallback: EventTarget;
  currentTargetDuringCallback: HTMLInputElement;
  nativeTarget: EventTarget | null;
  trusted: boolean;
}

interface InputRecord {
  event: React.FormEvent<HTMLInputElement>;
  targetDuringCallback: EventTarget;
  currentTargetDuringCallback: HTMLInputElement;
  nativeTarget: EventTarget | null;
  trusted: boolean;
}

export function createContinuationProbe() {
  let input: HTMLInputElement | undefined;
  let nextNativeId = 0;
  const nativeIds = new Map<Event, number>();
  const native: NativeRecord[] = [];
  const changes: ChangeRecord[] = [];
  const inputs: InputRecord[] = [];
  const order: { phase: string; nativeId: number | undefined; type: string }[] = [];
  let afterChange: (() => void) | undefined;
  const capture = (event: Event) => {
    if (!input) throw new Error('Native input probe is not attached');
    const id = ++nextNativeId;
    nativeIds.set(event, id);
    native.push({ id, event, type: event.type, checked: input.checked, trusted: event.isTrusted });
  };
  const onChange = vi.fn((checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!input) throw new Error('Change probe is not attached');
    const nativeId = nativeIds.get(event.nativeEvent);
    changes.push({
      checked,
      checkedDuringCallback: input.checked,
      event,
      type: event.type,
      nativeType: event.nativeEvent.type,
      nativeId,
      targetDuringCallback: event.target,
      currentTargetDuringCallback: event.currentTarget,
      nativeTarget: event.nativeEvent.target,
      trusted: event.nativeEvent.isTrusted
    });
    order.push({ phase: 'onChange', nativeId, type: event.type });
    afterChange?.();
  });
  const onInput = vi.fn((event: React.FormEvent<HTMLInputElement>) => {
    inputs.push({
      event,
      targetDuringCallback: event.target,
      currentTargetDuringCallback: event.currentTarget,
      nativeTarget: event.nativeEvent.target,
      trusted: event.nativeEvent.isTrusted
    });
    order.push({
      phase: 'caller-onInput',
      nativeId: nativeIds.get(event.nativeEvent),
      type: event.type
    });
  });

  const attach = (element: HTMLInputElement) => {
    input = element;
    element.addEventListener('click', capture, { capture: true, passive: true });
    element.addEventListener('input', capture, { capture: true, passive: true });
  };
  const detach = () => {
    input?.removeEventListener('click', capture, true);
    input?.removeEventListener('input', capture, true);
  };
  const record = (caseId: string, phase: string) => {
    recordObservation(caseId, {
      phase,
      native: native.map(row => ({
        id: row.id,
        type: row.type,
        checkedDuringCapture: row.checked,
        isTrusted: row.trusted,
        targetIsInput: row.event.target === input,
        defaultPrevented: row.event.defaultPrevented
      })),
      callbacks: changes.map(row => ({
        checked: row.checked,
        checkedDuringCallback: row.checkedDuringCallback,
        type: row.type,
        nativeType: row.nativeType,
        nativeId: row.nativeId,
        isTrusted: row.trusted,
        targetWasInput: row.targetDuringCallback === input,
        currentTargetWasInput: row.currentTargetDuringCallback === input,
        nativeTargetIsInput: row.nativeTarget === input
      })),
      callerInputs: inputs.map(row => ({
        type: row.event.type,
        nativeType: row.event.nativeEvent.type,
        nativeId: nativeIds.get(row.event.nativeEvent),
        isTrusted: row.trusted,
        targetWasInput: row.targetDuringCallback === input,
        currentTargetWasInput: row.currentTargetDuringCallback === input,
        nativeTargetIsInput: row.nativeTarget === input
      })),
      order,
      qualification:
        'IDs come only from passive native event capture; no product token/ref inspection'
    });
  };
  const setAfterChange = (callback?: () => void) => {
    afterChange = callback;
  };
  return {
    onChange,
    onInput,
    native,
    changes,
    inputs,
    order,
    attach,
    detach,
    record,
    setAfterChange
  };
}

export function mountContinuation(defaultChecked = true, props: ResetViewProps = {}) {
  const probe = createContinuationProbe();
  const mounted = render(
    <ResetView
      defaultChecked={defaultChecked}
      onChange={probe.onChange}
      onInput={probe.onInput}
      {...props}
    />
  );
  const element = mounted.getByRole('switch');
  if (!(element instanceof HTMLInputElement)) throw new Error('Expected native checkbox input');
  const form = element.form;
  if (!form) throw new Error('Expected native form owner');
  probe.attach(element);
  return { mounted, input: element, form, probe };
}

export function recordNativeState(caseId: string, phase: string, input: HTMLInputElement) {
  recordObservation(caseId, {
    phase,
    state: {
      checked: input.checked,
      defaultChecked: input.defaultChecked,
      checkedAttribute: input.hasAttribute('checked'),
      connected: input.isConnected,
      ownerId: input.form?.id ?? null,
      disabled: input.disabled,
      ariaChecked: input.getAttribute('aria-checked'),
      dataChecked: input.closest('.rs-toggle')?.getAttribute('data-checked'),
      innerText: input.closest('.rs-toggle')?.querySelector('.rs-toggle-inner')?.textContent,
      formData: input.form ? new FormData(input.form).getAll('choice') : null
    },
    qualification:
      'Immediate native ownership observation; direct DOM default mutations do not promise synchronous React visuals'
  });
}

export function expectNativeDefault(
  input: HTMLInputElement,
  checked: boolean,
  defaultChecked: boolean
) {
  expect(input.checked).toBe(checked);
  expect(input.defaultChecked).toBe(defaultChecked);
  expect(input.hasAttribute('checked')).toBe(defaultChecked);
  if (input.form) {
    expect(new FormData(input.form).getAll('choice')).toEqual(
      checked && !input.disabled ? ['on'] : []
    );
  }
}

export function expectNotification(
  probe: ReturnType<typeof createContinuationProbe>,
  before: number,
  checked: boolean,
  input: HTMLInputElement,
  trusted: boolean,
  expectedType?: 'change' | 'input'
) {
  expect(probe.changes).toHaveLength(before + 1);
  expectRecordedChange(probe, before, checked, input, trusted, expectedType);
}

export function expectRecordedChange(
  probe: ReturnType<typeof createContinuationProbe>,
  index: number,
  checked: boolean,
  input: HTMLInputElement,
  trusted: boolean,
  expectedType?: 'change' | 'input'
) {
  const change = probe.changes[index];
  expect(change.checked).toBe(checked);
  expect(change.checkedDuringCallback).toBe(checked);
  expect(change.targetDuringCallback).toBe(input);
  expect(change.currentTargetDuringCallback).toBe(input);
  expect(change.nativeTarget).toBe(input);
  expect(change.trusted).toBe(trusted);
  const native = probe.native.find(row => row.event === change.event.nativeEvent);
  expect(native).toBeDefined();
  expect(native?.id).toBe(change.nativeId);
  expect(native?.event).toBe(change.event.nativeEvent);
  expect(change.nativeType).toBe(change.type === 'input' ? 'input' : 'click');
  if (expectedType) expect(change.type).toBe(expectedType);
}

export function expectForwardedInput(
  probe: ReturnType<typeof createContinuationProbe>,
  index: number,
  nativeEvent: Event,
  input: HTMLInputElement
) {
  const forwarded = probe.inputs[index];
  expect(forwarded.event).toBe(probe.onInput.mock.calls[index][0]);
  expect(forwarded.event.type).toBe('input');
  expect(forwarded.event.nativeEvent).toBe(nativeEvent);
  expect(nativeEvent.type).toBe('input');
  expect(probe.native.some(row => row.event === nativeEvent)).toBe(true);
  expect(forwarded.targetDuringCallback).toBe(input);
  expect(forwarded.currentTargetDuringCallback).toBe(input);
  expect(forwarded.nativeTarget).toBe(input);
  expect(forwarded.trusted).toBe(true);
}
