import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import type {} from '@vitest/browser/providers/playwright';
import { format } from 'date-fns/format';
import DateInput from '..';
import DateRangeInput from '../../DateRangeInput';
import DateRangePicker from '../../DateRangePicker';

type Observation = {
  changes: { value: any; trusted: boolean }[];
  keys: { key: string; trusted: boolean }[];
};
type Step = { key: string; value: string; start: number; end: number };
const dateSummary = (value: any): any =>
  Array.isArray(value)
    ? value.map(dateSummary)
    : value instanceof Date
      ? {
          valid: !Number.isNaN(value.getTime()),
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate(),
          second: value.getSeconds()
        }
      : value;

function Owner({
  component: Component,
  controlled,
  observation,
  ...props
}: {
  component: React.ElementType;
  controlled: boolean;
  observation: Observation;
  [key: string]: any;
}) {
  const [value, setValue] = useState<any>(null);
  return (
    <div
      onKeyDown={event => {
        observation.keys.push({ key: event.key, trusted: event.isTrusted });
      }}
    >
      <Component
        {...props}
        {...(controlled ? { value } : {})}
        onChange={(nextValue: any, event: React.SyntheticEvent) => {
          observation.changes.push({ value: nextValue, trusted: event.isTrusted });
          // Echo the original public payload, including intermediate invalid dates. No normalization.
          if (controlled) setValue(nextValue);
        }}
      />
    </div>
  );
}

async function expectInput(input: HTMLInputElement, value: string, start: number, end: number) {
  await waitFor(() => {
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe(value);
    expect([input.selectionStart, input.selectionEnd]).toEqual([start, end]);
  });
}
async function begin(input: HTMLInputElement, value: string, start: number, end: number) {
  expect(input.dataset.test).toBeUndefined();
  await userEvent.click(input, { position: { x: 4, y: 10 } });
  await expectInput(input, value, start, end);
}
async function enter(input: HTMLInputElement, steps: Step[], mode: 'rapid' | 'selection-ACK') {
  if (mode === 'rapid') {
    // One native keyboard command. No async act, artificial delay, RAF flush or per-key wait.
    await userEvent.keyboard(steps.map(step => step.key).join(''));
  } else {
    for (const step of steps) {
      await userEvent.keyboard(step.key);
      await expectInput(input, step.value, step.start, step.end);
    }
  }
}
const dateSteps: Step[] = [
  { key: '2', value: '0002-MM-dd', start: 0, end: 4 },
  { key: '0', value: '0020-MM-dd', start: 0, end: 4 },
  { key: '2', value: '0202-MM-dd', start: 0, end: 4 },
  { key: '4', value: '2024-MM-dd', start: 5, end: 7 },
  { key: '{ArrowLeft}', value: '2024-MM-dd', start: 0, end: 4 },
  { key: '{ArrowRight}', value: '2024-MM-dd', start: 5, end: 7 },
  { key: '0', value: '2024-00-dd', start: 5, end: 7 },
  { key: '1', value: '2024-01-dd', start: 8, end: 10 },
  { key: '0', value: '2024-01-00', start: 8, end: 10 },
  { key: '1', value: '2024-01-01', start: 8, end: 10 }
];
const rangeSteps: Step[] = [
  { key: '0', value: '00/dd/yyyy ~ MM/dd/yyyy', start: 0, end: 2 },
  { key: '1', value: '01/dd/yyyy ~ MM/dd/yyyy', start: 3, end: 5 },
  { key: '0', value: '01/00/yyyy ~ MM/dd/yyyy', start: 3, end: 5 },
  { key: '1', value: '01/01/yyyy ~ MM/dd/yyyy', start: 6, end: 10 },
  { key: '2', value: '01/01/0002 ~ MM/dd/yyyy', start: 6, end: 10 },
  { key: '0', value: '01/01/0020 ~ MM/dd/yyyy', start: 6, end: 10 },
  { key: '2', value: '01/01/0202 ~ MM/dd/yyyy', start: 6, end: 10 },
  { key: '4', value: '01/01/2024 ~ MM/dd/yyyy', start: 13, end: 15 },
  { key: '{ArrowLeft}', value: '01/01/2024 ~ MM/dd/yyyy', start: 6, end: 10 },
  { key: '{ArrowRight}', value: '01/01/2024 ~ MM/dd/yyyy', start: 13, end: 15 },
  { key: '0', value: '01/01/2024 ~ 00/dd/yyyy', start: 13, end: 15 },
  { key: '2', value: '01/01/2024 ~ 02/dd/yyyy', start: 16, end: 18 },
  { key: '0', value: '01/01/2024 ~ 02/00/yyyy', start: 16, end: 18 },
  { key: '2', value: '01/01/2024 ~ 02/02/yyyy', start: 19, end: 23 },
  { key: '2', value: '01/01/2024 ~ 02/02/0002', start: 19, end: 23 },
  { key: '0', value: '01/01/2024 ~ 02/02/0020', start: 19, end: 23 },
  { key: '2', value: '01/01/2024 ~ 02/02/0202', start: 19, end: 23 },
  { key: '4', value: '01/01/2024 ~ 02/02/2024', start: 19, end: 23 }
];
const scenarios = [
  {
    name: 'DateInput',
    component: DateInput,
    format: 'yyyy-MM-dd',
    initial: 'yyyy-MM-dd',
    steps: dateSteps,
    callbackCount: 8,
    final: { year: 2024, month: 1, day: 1 }
  },
  {
    name: 'DateRangeInput',
    component: DateRangeInput,
    format: 'MM/dd/yyyy',
    initial: 'MM/dd/yyyy ~ MM/dd/yyyy',
    steps: rangeSteps,
    callbackCount: 16,
    final: [
      { year: 2024, month: 1, day: 1 },
      { year: 2024, month: 2, day: 2 }
    ]
  }
];

describe('DateInput native selection commits', () => {
  for (const scenario of scenarios) {
    for (const controlled of [false, true]) {
      for (const mode of ['rapid', 'selection-ACK'] as const) {
        it(`${scenario.name} ${controlled ? 'controlled' : 'uncontrolled'} ${mode}`, async () => {
          const observation: Observation = { changes: [], keys: [] };
          render(
            <Owner
              component={scenario.component}
              controlled={controlled}
              observation={observation}
              format={scenario.format}
            />
          );
          const input = screen.getByRole('textbox') as HTMLInputElement;
          await begin(input, scenario.initial, 0, scenario.name === 'DateInput' ? 4 : 2);
          await enter(input, scenario.steps, mode);
          const last = scenario.steps.at(-1)!;
          await expectInput(input, last.value, last.start, last.end);
          expect(observation.keys).toHaveLength(scenario.steps.length);
          expect(observation.keys.every(key => key.trusted)).toBe(true);
          expect(observation.changes).toHaveLength(scenario.callbackCount);
          expect(observation.changes.every(change => change.trusted)).toBe(true);
          const summary = dateSummary(observation.changes.at(-1)!.value);
          if (Array.isArray(scenario.final)) {
            expect(summary).toHaveLength(2);
            scenario.final.forEach((expected, index) =>
              expect(summary[index]).toMatchObject({ valid: true, ...expected })
            );
          } else expect(summary).toMatchObject({ valid: true, ...scenario.final });
        });
      }
    }
  }

  it('controlled DateRangePicker echoes native range input then displays custom value on blur', async () => {
    const observation: Observation = { changes: [], keys: [] };
    render(
      <>
        <button type="button">Outside owner</button>
        <Owner
          component={DateRangePicker}
          controlled
          observation={observation}
          format="yyyy-MM-dd"
          renderValue={([start, end]: [Date, Date]) =>
            format(start, 'EEE, d MMM') + ' ~ ' + format(end, 'EEE, d MMM')
          }
        />
      </>
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await begin(input, 'yyyy-MM-dd ~ yyyy-MM-dd', 0, 4);
    await userEvent.keyboard('2024051320240514');
    await expectInput(input, '2024-05-13 ~ 2024-05-14', 21, 23);
    expect(observation.keys).toHaveLength(16);
    expect(observation.keys.every(key => key.trusted)).toBe(true);
    expect(observation.changes).toHaveLength(16);
    expect(observation.changes.every(change => change.trusted)).toBe(true);
    const summary = dateSummary(observation.changes.at(-1)!.value);
    expect(summary[0]).toMatchObject({ valid: true, year: 2024, month: 5, day: 13 });
    expect(summary[1]).toMatchObject({ valid: true, year: 2024, month: 5, day: 14 });
    await userEvent.click(screen.getByRole('button', { name: 'Outside owner' }));
    await waitFor(() =>
      expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
        'Mon, 13 May ~ Tue, 14 May'
      )
    );
  });
  it('does not restore a pending selection after onChange moves focus outside', async () => {
    let outside: HTMLButtonElement;
    const onChange = vi.fn<(value: Date | null, event: React.SyntheticEvent) => void>(() =>
      outside.focus()
    );
    render(
      <>
        <button
          ref={node => {
            outside = node!;
          }}
          type="button"
        >
          Outside owner
        </button>
        <DateInput defaultValue={new Date(2024, 0, 1)} onChange={onChange} format="yyyy-MM-dd" />
      </>
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input, { position: { x: 4, y: 10 } });
    await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([0, 4]));
    const selection = vi.spyOn(input, 'setSelectionRange');
    await userEvent.keyboard('2');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Outside owner' }));
    expect(input.value).toBe('0002-01-01');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.lastCall![1].isTrusted).toBe(true);
    expect(selection).not.toHaveBeenCalled();
    selection.mockRestore();
  });

  it('does not apply a pending selection to an input removed by onChange', async () => {
    const onChange = vi.fn();
    function Removable() {
      const [shown, setShown] = useState(true);
      return (
        <>
          {shown && (
            <DateInput
              defaultValue={new Date(2024, 0, 1)}
              format="yyyy-MM-dd"
              onChange={(value, event) => {
                onChange(value, event);
                setShown(false);
              }}
            />
          )}
          <button type="button">Remaining owner</button>
        </>
      );
    }
    render(<Removable />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input, { position: { x: 4, y: 10 } });
    await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([0, 4]));
    const calls: boolean[] = [];
    const original = input.setSelectionRange;
    const selection = vi.spyOn(input, 'setSelectionRange').mockImplementation(function (
      this: HTMLInputElement,
      ...args: Parameters<HTMLInputElement['setSelectionRange']>
    ) {
      calls.push(this.isConnected);
      return original.apply(this, args);
    });
    await userEvent.keyboard('2');
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(input.isConnected).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.lastCall![1].isTrusted).toBe(true);
    expect(calls.every(connected => connected)).toBe(true);
    await userEvent.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Remaining owner' }));
    selection.mockRestore();
  });
  it('uses caller collapsed caret at the start and end after focusing the month', async () => {
    const onChange = vi.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={ref}
        defaultValue={new Date(2024, 0, 1)}
        onChange={onChange}
        format="yyyy-MM-dd"
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await begin(input, '2024-01-01', 0, 4);
    await userEvent.keyboard('{ArrowRight}');
    await expectInput(input, '2024-01-01', 5, 7);
    expect(ref.current).toBe(input);
    ref.current!.setSelectionRange(0, 0);
    await userEvent.keyboard('{ArrowUp}');
    await expectInput(input, '2025-01-01', 0, 4);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.lastCall![1].isTrusted).toBe(true);
    expect(onChange.mock.lastCall![0].getFullYear()).toBe(2025);
    ref.current!.setSelectionRange(input.value.length, input.value.length);
    await userEvent.keyboard('{ArrowUp}');
    await expectInput(input, '2025-01-02', 8, 10);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls.every(([, event]) => event.isTrusted)).toBe(true);
  });

  it('uses the caller ref selection after focusing the month', async () => {
    const onChange = vi.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(
      <DateInput
        ref={ref}
        defaultValue={new Date(2024, 0, 1)}
        onChange={onChange}
        format="yyyy-MM-dd"
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await begin(input, '2024-01-01', 0, 4);
    await userEvent.keyboard('{ArrowRight}');
    await expectInput(input, '2024-01-01', 5, 7);
    expect(ref.current).toBe(input);
    ref.current!.setSelectionRange(8, 10);
    await userEvent.keyboard('{ArrowUp}');
    await expectInput(input, '2024-01-02', 8, 10);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.lastCall![1].isTrusted).toBe(true);
    expect(onChange.mock.lastCall![0].getDate()).toBe(2);
  });
  for (const Component of [DateInput, DateRangeInput] as React.ElementType[]) {
    it(`${Component === DateInput ? 'DateInput ref end' : 'DateRangeInput ref day'} resets digit accumulation when the native caret changes fields`, async () => {
      const onChange = vi.fn();
      const ref = React.createRef<HTMLInputElement>();
      const range = Component === DateRangeInput;
      render(
        <Component
          ref={ref}
          format="yyyy-MM-dd"
          defaultValue={range ? [new Date(2024, 0, 1), new Date(2024, 4, 2)] : new Date(2024, 0, 1)}
          onChange={onChange}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const initial = range ? '2024-01-01 ~ 2024-05-02' : '2024-01-01';
      await begin(input, initial, 0, 4);
      await userEvent.keyboard('{ArrowRight}1');
      await expectInput(input, initial, 5, 7);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(ref.current).toBe(input);
      if (range) ref.current!.setSelectionRange(8, 10);
      else ref.current!.setSelectionRange(input.value.length, input.value.length);
      await userEvent.keyboard('2');
      await expectInput(input, range ? '2024-01-02 ~ 2024-05-02' : '2024-01-02', 8, 10);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls.every(([, event]) => event.isTrusted)).toBe(true);
      const date = range ? onChange.mock.lastCall![0][0] : onChange.mock.lastCall![0];
      expect(date.getDate()).toBe(2);
      expect(date.getMonth()).toBe(0);
    });
  }
});
