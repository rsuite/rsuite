import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import type {} from '@vitest/browser/providers/playwright';
import DateRangeInput from '..';

type RangeValue = [Date | null, Date | null] | null;
type Observation = { keys: { key: string; trusted: boolean }[]; clicks: boolean[] };
const date = (day: number, seconds: number) => new Date(2024, 0, day, 0, 0, seconds);
const display = (value: RangeValue) =>
  value?.map(item => String(item?.getSeconds()).padStart(2, '0')).join(' ~ ');

function Owner({
  controlled,
  initial,
  inputRef,
  onChange,
  observation
}: {
  controlled: boolean;
  initial: [Date, Date];
  inputRef: React.Ref<HTMLInputElement>;
  onChange: ReturnType<typeof vi.fn>;
  observation?: Observation;
}) {
  const [value, setValue] = useState<RangeValue>(initial);
  const rangeInput = (
    <DateRangeInput
      ref={inputRef}
      format="ss"
      {...(controlled ? { value } : { defaultValue: initial })}
      onMouseDown={observation ? event => event.preventDefault() : undefined}
      onChange={(nextValue, event) => {
        onChange(nextValue, event);
        if (controlled) setValue(nextValue);
      }}
    />
  );
  if (!observation) return rangeInput;
  return (
    <div
      onKeyDownCapture={event =>
        observation.keys.push({ key: event.key, trusted: event.isTrusted })
      }
      onClickCapture={event => observation.clicks.push(event.isTrusted)}
    >
      {rangeInput}
    </div>
  );
}

async function expectInput(input: HTMLInputElement, value: string, range: [number, number]) {
  await waitFor(() => {
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe(value);
    expect([input.selectionStart, input.selectionEnd]).toEqual(range);
  });
}

async function begin(input: HTMLInputElement, value: string) {
  input.focus();
  input.setSelectionRange(0, 2);
  await expectInput(input, value, [0, 2]);
}

async function digit(
  input: HTMLInputElement,
  onChange: ReturnType<typeof vi.fn>,
  key: string,
  seconds: [number, number],
  range: [number, number],
  count: number,
  observation?: Observation
) {
  await userEvent.keyboard(key);
  // Acknowledge the actual callback's render before testing its semantic value.
  // This separates endpoint accumulation from uncommitted selection restoration.
  await waitFor(() => {
    expect(onChange).toHaveBeenCalledTimes(count);
    expect(input.value).toBe(display(onChange.mock.lastCall![0]));
  });
  expect(onChange.mock.calls.every(([, event]) => event.isTrusted)).toBe(true);
  if (observation) {
    expect(observation.keys.every(event => event.trusted)).toBe(true);
    expect(observation.keys.at(-1)).toEqual({ key, trusted: true });
  }
  expect(onChange.mock.lastCall![0]).toEqual([date(1, seconds[0]), date(2, seconds[1])]);
  await expectInput(
    input,
    `${String(seconds[0]).padStart(2, '0')} ~ ${String(seconds[1]).padStart(2, '0')}`,
    range
  );
}

describe.each([false, true])('DateRangeInput endpoint accumulation (controlled=%s)', controlled => {
  it('starts a new seconds entry after ArrowRight changes Start to End', async () => {
    const onChange = vi.fn();
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <Owner
        controlled={controlled}
        initial={[date(1, 10), date(2, 2)]}
        inputRef={inputRef}
        onChange={onChange}
      />
    );
    const input = inputRef.current!;
    await begin(input, '10 ~ 02');
    await digit(input, onChange, '1', [1, 2], [0, 2], 1);
    await userEvent.keyboard('{ArrowRight}');
    await expectInput(input, '01 ~ 02', [5, 7]);
    expect(onChange).toHaveBeenCalledTimes(1);
    await digit(input, onChange, '3', [1, 3], [5, 7], 2);
  });

  it('starts a new seconds entry after ArrowLeft changes End to Start', async () => {
    const onChange = vi.fn();
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <Owner
        controlled={controlled}
        initial={[date(1, 2), date(2, 10)]}
        inputRef={inputRef}
        onChange={onChange}
      />
    );
    const input = inputRef.current!;
    await begin(input, '02 ~ 10');
    await userEvent.keyboard('{ArrowRight}');
    await expectInput(input, '02 ~ 10', [5, 7]);
    expect(onChange).not.toHaveBeenCalled();
    await digit(input, onChange, '1', [2, 1], [5, 7], 1);
    await userEvent.keyboard('{ArrowLeft}');
    await expectInput(input, '02 ~ 01', [0, 2]);
    expect(onChange).toHaveBeenCalledTimes(1);
    await digit(input, onChange, '3', [3, 1], [0, 2], 2);
  });

  it('keeps consecutive digits in the same Start seconds field', async () => {
    const onChange = vi.fn();
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <Owner
        controlled={controlled}
        initial={[date(1, 10), date(2, 2)]}
        inputRef={inputRef}
        onChange={onChange}
      />
    );
    const input = inputRef.current!;
    await begin(input, '10 ~ 02');
    await digit(input, onChange, '1', [1, 2], [0, 2], 1);
    // A filled Start field advances to End without changing its value.
    await digit(input, onChange, '3', [13, 2], [5, 7], 2);
  });

  it('keeps consecutive digits in the same End seconds field', async () => {
    const onChange = vi.fn();
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <Owner
        controlled={controlled}
        initial={[date(1, 2), date(2, 10)]}
        inputRef={inputRef}
        onChange={onChange}
      />
    );
    const input = inputRef.current!;
    await begin(input, '02 ~ 10');
    await userEvent.keyboard('{ArrowRight}');
    await expectInput(input, '02 ~ 10', [5, 7]);
    expect(onChange).not.toHaveBeenCalled();
    await digit(input, onChange, '1', [2, 1], [5, 7], 1);
    await digit(input, onChange, '3', [2, 13], [5, 7], 2);
  });
});

async function callerCaretClick(
  inputRef: React.RefObject<HTMLInputElement | null>,
  input: HTMLInputElement,
  value: string,
  range: [number, number],
  onChange: ReturnType<typeof vi.fn>,
  observation: Observation
) {
  expect(inputRef.current).toBe(input);
  expect(document.activeElement).toBe(input);
  inputRef.current!.setSelectionRange(...range);
  await expectInput(input, value, range);
  // The public mousedown callback retains the caller's caret. The click itself
  // is native and exercises DateRangeInput's internal click handler.
  await userEvent.click(input);
  await expectInput(input, value, range);
  expect(observation.clicks).toEqual([true]);
  expect(onChange).toHaveBeenCalledTimes(1);
}

describe.each([false, true])(
  'DateRangeInput caller-selected caret click (controlled=%s)',
  controlled => {
    it('starts a new seconds entry when clicking from Start into End', async () => {
      const onChange = vi.fn();
      const observation: Observation = { keys: [], clicks: [] };
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <Owner
          controlled={controlled}
          initial={[date(1, 10), date(2, 2)]}
          inputRef={inputRef}
          onChange={onChange}
          observation={observation}
        />
      );
      const input = inputRef.current!;
      await begin(input, '10 ~ 02');
      await digit(input, onChange, '1', [1, 2], [0, 2], 1, observation);
      await callerCaretClick(inputRef, input, '01 ~ 02', [5, 7], onChange, observation);
      await digit(input, onChange, '3', [1, 3], [5, 7], 2, observation);
    });

    it('starts a new seconds entry when clicking from End into Start', async () => {
      const onChange = vi.fn();
      const observation: Observation = { keys: [], clicks: [] };
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <Owner
          controlled={controlled}
          initial={[date(1, 2), date(2, 10)]}
          inputRef={inputRef}
          onChange={onChange}
          observation={observation}
        />
      );
      const input = inputRef.current!;
      await begin(input, '02 ~ 10');
      await userEvent.keyboard('{ArrowRight}');
      await expectInput(input, '02 ~ 10', [5, 7]);
      expect(observation.keys).toEqual([{ key: 'ArrowRight', trusted: true }]);
      expect(onChange).not.toHaveBeenCalled();
      await digit(input, onChange, '1', [2, 1], [5, 7], 1, observation);
      await callerCaretClick(inputRef, input, '02 ~ 01', [0, 2], onChange, observation);
      await digit(input, onChange, '3', [3, 1], [0, 2], 2, observation);
    });

    it('keeps consecutive digits when clicking the same Start field', async () => {
      const onChange = vi.fn();
      const observation: Observation = { keys: [], clicks: [] };
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <Owner
          controlled={controlled}
          initial={[date(1, 10), date(2, 2)]}
          inputRef={inputRef}
          onChange={onChange}
          observation={observation}
        />
      );
      const input = inputRef.current!;
      await begin(input, '10 ~ 02');
      await digit(input, onChange, '1', [1, 2], [0, 2], 1, observation);
      await callerCaretClick(inputRef, input, '01 ~ 02', [0, 2], onChange, observation);
      await digit(input, onChange, '3', [13, 2], [5, 7], 2, observation);
    });

    it('keeps consecutive digits when clicking the same End field', async () => {
      const onChange = vi.fn();
      const observation: Observation = { keys: [], clicks: [] };
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <Owner
          controlled={controlled}
          initial={[date(1, 2), date(2, 10)]}
          inputRef={inputRef}
          onChange={onChange}
          observation={observation}
        />
      );
      const input = inputRef.current!;
      await begin(input, '02 ~ 10');
      await userEvent.keyboard('{ArrowRight}');
      await expectInput(input, '02 ~ 10', [5, 7]);
      expect(observation.keys).toEqual([{ key: 'ArrowRight', trusted: true }]);
      expect(onChange).not.toHaveBeenCalled();
      await digit(input, onChange, '1', [2, 1], [5, 7], 1, observation);
      await callerCaretClick(inputRef, input, '02 ~ 01', [5, 7], onChange, observation);
      await digit(input, onChange, '3', [2, 13], [5, 7], 2, observation);
    });
  }
);
