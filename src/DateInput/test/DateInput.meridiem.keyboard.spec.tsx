import React, { useState } from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import type {} from '@vitest/browser/providers/playwright';
import DateInput from '..';
import DateRangeInput from '../../DateRangeInput';

type RangeValue = [Date | null, Date | null] | null;
type Value = Date | RangeValue;
type Kind = 'single' | 'range';
type Endpoint = 'start' | 'end';
type Parts = [number, number, number, number, number, number, number];
type Observation = {
  keys: { key: string; trusted: boolean }[];
  changes: { value: Value; key: string; trusted: boolean }[];
};

const format = 'yyyy-MM-dd hh:mm:ss aa';
const startNoon: Parts = [2024, 1, 15, 12, 34, 56, 0];
const startMidnight: Parts = [2024, 1, 15, 0, 34, 56, 0];
const endNoon: Parts = [2024, 1, 16, 12, 34, 56, 0];
const endMidnight: Parts = [2024, 1, 16, 0, 34, 56, 0];
const startPM = '2024-01-15 12:34:56 PM';
const startAM = '2024-01-15 12:34:56 AM';
const endPM = '2024-01-16 12:34:56 PM';
const endAM = '2024-01-16 12:34:56 AM';
const noon = (day: number) => new Date(2024, 0, day, 12, 34, 56, 0);

function parts(date: Date | null): Parts {
  expect(date).toBeInstanceOf(Date);
  expect(Number.isNaN(date!.getTime())).toBe(false);
  return [
    date!.getFullYear(),
    date!.getMonth() + 1,
    date!.getDate(),
    date!.getHours(),
    date!.getMinutes(),
    date!.getSeconds(),
    date!.getMilliseconds()
  ];
}

function payloadParts(value: Value): Parts | Parts[] {
  return Array.isArray(value) ? value.map(parts) : parts(value);
}

function expectedPayload(kind: Kind, endpoint: Endpoint, am: boolean): Parts | Parts[] {
  if (kind === 'single') return am ? startMidnight : startNoon;
  return endpoint === 'start'
    ? [am ? startMidnight : startNoon, endNoon]
    : [startNoon, am ? endMidnight : endNoon];
}

function expectedDisplay(kind: Kind, endpoint: Endpoint, am: boolean) {
  if (kind === 'single') return am ? startAM : startPM;
  return endpoint === 'start'
    ? `${am ? startAM : startPM} ~ ${endPM}`
    : `${startPM} ~ ${am ? endAM : endPM}`;
}

function Owner({
  kind,
  controlled,
  inputRef,
  observation
}: {
  kind: Kind;
  controlled: boolean;
  inputRef: React.Ref<HTMLInputElement>;
  observation: Observation;
}) {
  const [singleValue, setSingleValue] = useState<Date | null>(() => noon(15));
  const [rangeValue, setRangeValue] = useState<RangeValue>(() => [noon(15), noon(16)]);
  const record = (value: Value, event: React.SyntheticEvent) =>
    observation.changes.push({
      value,
      key: (event as React.KeyboardEvent).key,
      trusted: event.isTrusted
    });

  return (
    <div
      onKeyDownCapture={event =>
        observation.keys.push({ key: event.key, trusted: event.isTrusted })
      }
    >
      {kind === 'single' ? (
        <DateInput
          ref={inputRef}
          format={format}
          {...(controlled ? { value: singleValue } : { defaultValue: singleValue })}
          onChange={(nextValue, event) => {
            record(nextValue, event);
            if (controlled) setSingleValue(nextValue);
          }}
        />
      ) : (
        <DateRangeInput
          ref={inputRef}
          format={format}
          character=" ~ "
          {...(controlled ? { value: rangeValue } : { defaultValue: rangeValue })}
          onChange={(nextValue, event) => {
            record(nextValue, event);
            if (controlled) setRangeValue(nextValue);
          }}
        />
      )}
    </div>
  );
}

async function expectCaret(input: HTMLInputElement, range: [number, number]) {
  await waitFor(() => {
    expect(document.activeElement).toBe(input);
    expect([input.selectionStart, input.selectionEnd]).toEqual(range);
  });
}

async function expectInput(input: HTMLInputElement, value: string, range: [number, number]) {
  await waitFor(() => {
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe(value);
    expect([input.selectionStart, input.selectionEnd]).toEqual(range);
  });
}

const singleRanges: [number, number][] = [
  [0, 4],
  [5, 7],
  [8, 10],
  [11, 13],
  [14, 16],
  [17, 19],
  [20, 22]
];
const scenarios: { name: string; kind: Kind; endpoint: Endpoint }[] = [
  { name: 'DateInput', kind: 'single', endpoint: 'start' },
  { name: 'DateRangeInput Start', kind: 'range', endpoint: 'start' },
  { name: 'DateRangeInput End', kind: 'range', endpoint: 'end' }
];
const paths = [
  { name: 'ArrowUp', keys: ['ArrowUp', 'ArrowUp'], counts: [1, 2], am: [true, false] },
  {
    name: 'a/p with unchanged-meridiem controls',
    keys: ['a', 'a', 'p', 'p'],
    counts: [1, 1, 2, 2],
    am: [true, true, false, false]
  }
];

describe.each([false, true])('native noon meridiem (controlled=%s)', controlled => {
  for (const scenario of scenarios) {
    for (const path of paths) {
      it(`${scenario.name} changes noon to same-day midnight and back using ${path.name}`, async () => {
        const inputRef = React.createRef<HTMLInputElement>();
        const observation: Observation = { keys: [], changes: [] };
        render(
          <Owner
            kind={scenario.kind}
            controlled={controlled}
            inputRef={inputRef}
            observation={observation}
          />
        );
        const input = inputRef.current!;
        expect(input).toBeInstanceOf(HTMLInputElement);
        inputRef.current!.focus();
        inputRef.current!.setSelectionRange(0, 4);
        await expectCaret(input, [0, 4]);
        const initialDisplay = input.value;
        // Keep initial noon rendering mandatory, but still exercise the native
        // callback path when an uncontrolled initial meridiem is incorrect.
        expect.soft(initialDisplay).toBe(expectedDisplay(scenario.kind, scenario.endpoint, false));
        expect(observation.changes).toHaveLength(0);

        const ranges =
          scenario.endpoint === 'end'
            ? [
                ...singleRanges,
                ...singleRanges.map(([start, end]): [number, number] => [start + 25, end + 25])
              ]
            : singleRanges;
        const keys: string[] = [];
        for (const range of ranges.slice(1)) {
          await userEvent.keyboard('{ArrowRight}');
          keys.push('ArrowRight');
          await expectInput(input, initialDisplay, range);
          expect(observation.keys).toEqual(keys.map(key => ({ key, trusted: true })));
          expect(observation.changes).toHaveLength(0);
        }
        const meridiemRange: [number, number] = scenario.endpoint === 'end' ? [45, 47] : [20, 22];
        const expectedChanges = [
          expectedPayload(scenario.kind, scenario.endpoint, true),
          expectedPayload(scenario.kind, scenario.endpoint, false)
        ];
        const changedKeys = path.name === 'ArrowUp' ? ['ArrowUp', 'ArrowUp'] : ['a', 'p'];

        for (const [index, key] of path.keys.entries()) {
          await userEvent.keyboard(key === 'ArrowUp' ? '{ArrowUp}' : key);
          keys.push(key);
          const count = path.counts[index];
          await waitFor(() => expect(observation.changes).toHaveLength(count));
          expect(observation.keys).toEqual(keys.map(key => ({ key, trusted: true })));
          expect(observation.changes.map(({ key, trusted }) => ({ key, trusted }))).toEqual(
            changedKeys.slice(0, count).map(key => ({ key, trusted: true }))
          );
          expect(observation.changes.map(({ value }) => payloadParts(value))).toEqual(
            expectedChanges.slice(0, count)
          );
          await expectInput(
            input,
            expectedDisplay(scenario.kind, scenario.endpoint, path.am[index]),
            meridiemRange
          );
        }
        expect(observation.changes).toHaveLength(2);
      });
    }
  }
});
