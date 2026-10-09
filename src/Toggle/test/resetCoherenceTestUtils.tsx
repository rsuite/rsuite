import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { commands } from '@vitest/browser/context';
import { expect, vi } from 'vitest';
import Toggle from '../Toggle';
import type { ToggleProps } from '../Toggle';

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    trcTrustedResetClick: (buttonId: string) => Promise<{ buttonId: string }>;
    trcTrustedInputClick: (inputId: string) => Promise<{ inputId: string }>;
  }
}

export interface ResetViewProps extends Omit<ToggleProps, 'onReset'> {
  tick?: number;
  toggleKey?: string;
  present?: boolean;
  onReset?: React.FormEventHandler<HTMLFormElement>;
}

export function ResetView({
  tick = 0,
  toggleKey,
  present = true,
  onReset,
  ...props
}: ResetViewProps) {
  return (
    <div>
      <form id="trc-a" data-parent-tick={tick} onReset={onReset}>
        {present && (
          <Toggle
            key={toggleKey}
            id="trc-input"
            name="choice"
            checkedChildren="ON"
            unCheckedChildren="OFF"
            {...props}
          />
        )}
        <button id="trc-reset" type="reset">
          Reset
        </button>
      </form>
      <form id="trc-b" />
    </div>
  );
}

export function mountReset(defaultChecked = true, props: ResetViewProps = {}) {
  const onChange = vi.fn();
  const mounted = render(
    <ResetView defaultChecked={defaultChecked} onChange={onChange} {...props} />
  );
  const form = mounted.container.querySelector<HTMLFormElement>('#trc-a')!;
  const input = mounted.getByRole('switch') as HTMLInputElement;
  return { mounted, form, input, onChange };
}

export function expectCoherent(input: HTMLInputElement, checked: boolean) {
  expect(input.checked).toBe(checked);
  expect(input.getAttribute('aria-checked')).toBe(String(checked));
  const toggle = input.closest('.rs-toggle')!;
  expect(toggle.getAttribute('data-checked')).toBe(String(checked));
  expect(toggle.querySelector('.rs-toggle-inner')?.textContent).toBe(checked ? 'ON' : 'OFF');
  const labelledby = input.getAttribute('aria-labelledby')!;
  expect(document.getElementById(labelledby)?.textContent).toBe(checked ? 'ON' : 'OFF');
  if (input.form) {
    expect(new FormData(input.form).getAll('choice')).toEqual(
      checked && !input.disabled ? ['on'] : []
    );
  }
}

export function edit(input: HTMLInputElement) {
  fireEvent.click(input);
}

function publicState(input?: HTMLInputElement) {
  return input
    ? {
        connected: input.isConnected,
        ownerId: input.form?.id ?? null,
        checked: input.checked,
        defaultChecked: input.defaultChecked,
        ariaChecked: input.getAttribute('aria-checked'),
        dataChecked: input.closest('.rs-toggle')?.getAttribute('data-checked') ?? null,
        innerText:
          input.closest('.rs-toggle')?.querySelector('.rs-toggle-inner')?.textContent ?? null,
        formData: input.form ? new FormData(input.form).getAll('choice') : null
      }
    : { inputPresent: false };
}

export async function taskAndCommit(caseId: string, input?: HTMLInputElement) {
  await act(async () => {
    await new Promise<void>(resolve =>
      setTimeout(() => {
        recordObservation(caseId, { phase: 'scheduled-task-arrived', state: publicState(input) });
        resolve();
      }, 0)
    );
  });
  recordObservation(caseId, {
    phase: 'act-completed-after-one-scheduled-task',
    state: publicState(input),
    qualification: 'Explicit task arrival plus act completion; not a universal task or event drain'
  });
}

export async function scriptedReset(
  form: HTMLFormElement,
  caseId: string,
  input?: HTMLInputElement
) {
  recordObservation(caseId, { phase: 'before-scripted-reset', state: publicState(input) });
  act(() => form.reset());
  recordObservation(caseId, { phase: 'scripted-reset-returned', state: publicState(input) });
  await taskAndCommit(caseId, input);
}

export function recordObservation(caseId: string, observations: Record<string, unknown>) {
  const target = globalThis as typeof globalThis & {
    __RSUITE_TOGGLE_RESET_OBSERVATIONS__?: {
      caseId: string;
      observations: Record<string, unknown>;
    }[];
  };
  const row = { caseId, observations };
  (target.__RSUITE_TOGGLE_RESET_OBSERVATIONS__ ??= []).push(row);
  console.log(`RSUITE_TOGGLE_RESET_OBSERVATION ${JSON.stringify(row)}`);
}

export async function trustedReset(caseId: string, form: HTMLFormElement, input: HTMLInputElement) {
  const button = form.querySelector<HTMLButtonElement>('#trc-reset')!;
  let click: MouseEvent | undefined;
  let reset: Event | undefined;
  let checkedDuringReset: boolean | undefined;
  let acknowledgeClick: () => void;
  let acknowledgeReset: () => void;
  const clickArrival = new Promise<void>(resolve => {
    acknowledgeClick = resolve;
  });
  const resetArrival = new Promise<void>(resolve => {
    acknowledgeReset = resolve;
  });
  const captureClick = (event: MouseEvent) => {
    click = event;
    acknowledgeClick();
  };
  const captureReset = (event: Event) => {
    reset = event;
    checkedDuringReset = input.checked;
    recordObservation(caseId, {
      phase: 'reset-capture-listener',
      resetIsTrusted: event.isTrusted,
      state: publicState(input)
    });
    acknowledgeReset();
  };
  button.addEventListener('click', captureClick, { once: true, capture: true });
  form.addEventListener('reset', captureReset, { once: true, capture: true });
  try {
    recordObservation(caseId, { phase: 'before-trusted-reset-command', state: publicState(input) });
    let afterCommandChecked: boolean | undefined;
    await act(async () => {
      const receipt = await commands.trcTrustedResetClick(button.id);
      expect(receipt.buttonId).toBe(button.id);
      // The command receipt is separate from actual browser event delivery.
      await Promise.all([clickArrival, resetArrival]);
      expect(click?.isTrusted).toBe(true);
      expect(click?.target).toBe(button);
      expect(reset?.isTrusted).toBe(true);
      expect(reset?.target).toBe(form);
      afterCommandChecked = input.checked;
      recordObservation(caseId, {
        phase: 'after-command-and-explicit-click-reset-arrival',
        state: publicState(input),
        finalDefaultPrevented: reset?.defaultPrevented
      });
    });
    await taskAndCommit(caseId, input);
    recordObservation(caseId, {
      clickIsTrusted: click?.isTrusted,
      clickTargetIsButton: click?.target === button,
      resetIsTrusted: reset?.isTrusted,
      resetTargetIsOwner: reset?.target === form,
      checkedDuringReset,
      afterCommandChecked,
      finalChecked: input.checked,
      finalDefaultPrevented: reset?.defaultPrevented,
      ariaChecked: input.getAttribute('aria-checked'),
      dataChecked: input.closest('.rs-toggle')?.getAttribute('data-checked')
    });
    return { click: click!, reset: reset!, checkedDuringReset, afterCommandChecked };
  } finally {
    button.removeEventListener('click', captureClick, true);
    form.removeEventListener('reset', captureReset, true);
  }
}

export async function trustedEdit(caseId: string, input: HTMLInputElement) {
  let click: MouseEvent | undefined;
  let acknowledge: () => void;
  const arrival = new Promise<void>(resolve => {
    acknowledge = resolve;
  });
  const captureClick = (event: MouseEvent) => {
    click = event;
    recordObservation(caseId, {
      phase: 'trusted-input-click-capture',
      isTrusted: event.isTrusted,
      state: publicState(input)
    });
    acknowledge();
  };
  input.addEventListener('click', captureClick, { once: true, capture: true });
  try {
    recordObservation(caseId, { phase: 'before-trusted-input-click', state: publicState(input) });
    await act(async () => {
      const receipt = await commands.trcTrustedInputClick(input.id);
      expect(receipt.inputId).toBe(input.id);
      await arrival;
      expect(click?.isTrusted).toBe(true);
      expect(click?.target).toBe(input);
    });
    recordObservation(caseId, {
      phase: 'trusted-input-click-act-completed',
      state: publicState(input),
      finalDefaultPrevented: click?.defaultPrevented
    });
  } finally {
    input.removeEventListener('click', captureClick, true);
  }
}
