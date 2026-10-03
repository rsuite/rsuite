import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import DateInput from '../DateInput';
import DateRangeInput from '../../DateRangeInput';
import { selectionFormats } from './selectionFixtures';

beforeEach(() => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
    'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/126.0.0.0 Mobile Safari/537.36'
  );
});

afterEach(() => vi.restoreAllMocks());

function holdAnimationFrames() {
  const frames: FrameRequestCallback[] = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.push(callback);
    return frames.length;
  });
  return () => {
    act(() => {
      while (frames.length) {
        frames.splice(0).forEach(callback => callback(performance.now()));
      }
    });
  };
}

describe.each([
  { Component: DateInput, name: 'DateInput', range: false },
  { Component: DateRangeInput, name: 'DateRangeInput', range: true }
])('$name Android selection', ({ Component, range }) => {
  const InputComponent: React.ElementType = Component;

  describe.each([false, true])('controlled=%s', controlled => {
    it.each(selectionFormats)(
      'Should preserve consecutive $format key input while native selection is deferred',
      ({ format: dateFormat, keys, endKeys, expected, expectedEnd, lastSegmentLength }) => {
        const onChange = vi.fn();
        const TestInput = () => {
          const [value, setValue] = useState<Date | (Date | null)[] | null>(
            range ? [null, null] : null
          );
          return (
            <InputComponent
              format={dateFormat}
              {...(controlled ? { value } : {})}
              onChange={(nextValue: Date | (Date | null)[] | null) => {
                onChange(nextValue);
                if (controlled) setValue(nextValue);
              }}
            />
          );
        };
        render(<TestInput />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const flushFrames = holdAnimationFrames();
        userEvent.click(input);
        for (const key of range ? keys + endKeys : keys) fireEvent.keyDown(input, { key });

        const expectedValue = range ? `${expected} ~ ${expectedEnd}` : expected;
        expect(input).to.have.value(expectedValue);
        const lastValue = onChange.mock.lastCall?.[0];
        const dates = range ? lastValue : [lastValue];
        expect(dates.map((date: Date) => format(date, 'yyyy-MM-dd'))).to.deep.equal(
          range ? ['2024-01-01', '2024-02-02'] : ['2024-01-01']
        );

        flushFrames();
        expect(input).to.have.value(expectedValue);
        expect(input.selectionStart).to.equal(expectedValue.length - lastSegmentLength);
        expect(input.selectionEnd).to.equal(expectedValue.length);
      }
    );

    it('Should replace existing segment values while native selection is deferred', () => {
      const firstDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 2);
      const initialValue = range ? [firstDate, endDate] : firstDate;
      const TestInput = () => {
        const [value, setValue] = useState(initialValue);
        return (
          <InputComponent
            format="MM/dd/yyyy"
            {...(controlled ? { value, onChange: setValue } : { defaultValue: initialValue })}
          />
        );
      };
      render(<TestInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      const flushFrames = holdAnimationFrames();
      userEvent.click(input);
      for (const key of '0401') fireEvent.keyDown(input, { key });
      const expected = range ? '04/01/2024 ~ 01/02/2024' : '04/01/2024';
      expect(input).to.have.value(expected);

      flushFrames();
      expect(input).to.have.value(expected);
      expect(input.selectionStart).to.equal(6);
      expect(input.selectionEnd).to.equal(10);
    });
  });

  it('Should follow a new click before queued native selections run', () => {
    const date = new Date(2024, 0, 1);
    render(<InputComponent format="MM/dd/yyyy" defaultValue={range ? [date, date] : date} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    for (const key of '04') fireEvent.keyDown(input, { key });

    const dayStart = range ? 16 : 3;
    input.setSelectionRange(dayStart + 1, dayStart + 1);
    fireEvent.click(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    const expected = range ? '04/01/2024 ~ 01/02/2024' : '04/02/2024';
    expect(input).to.have.value(expected);

    flushFrames();
    expect(input).to.have.value(expected);
    expect(input.selectionStart).to.equal(dayStart);
    expect(input.selectionEnd).to.equal(dayStart + 2);
  });

  it('Should not replay queued selections after blur and refocus', () => {
    const date = new Date(2024, 0, 1);
    render(<InputComponent format="yyyy-MM-dd" defaultValue={range ? [date, date] : date} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    input.blur();
    input.focus();
    input.setSelectionRange(5, 7);

    flushFrames();
    expect(document.activeElement).to.equal(input);
    expect(input.selectionStart).to.equal(5);
    expect(input.selectionEnd).to.equal(7);
  });

  it('Should discard queued selections after an external controlled value update', () => {
    const firstDate = new Date(2024, 0, 1);
    const nextDate = new Date(2025, 1, 2);
    const { rerender } = render(
      <InputComponent format="yyyy-MM-dd" value={range ? [firstDate, firstDate] : firstDate} />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    rerender(
      <InputComponent format="yyyy-MM-dd" value={range ? [nextDate, nextDate] : nextDate} />
    );
    input.setSelectionRange(5, 7);

    flushFrames();
    expect(input).to.have.value(range ? '2025-02-02 ~ 2025-02-02' : '2025-02-02');
    expect(input.selectionStart).to.equal(5);
    expect(input.selectionEnd).to.equal(7);
  });

  it('Should discard queued selections after unmounting', () => {
    const date = new Date(2024, 0, 1);
    const { unmount } = render(
      <InputComponent format="yyyy-MM-dd" defaultValue={range ? [date, date] : date} />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    unmount();
    const setSelection = vi.spyOn(input, 'setSelectionRange');

    flushFrames();
    expect(setSelection).not.toHaveBeenCalled();
  });

  it('Should preserve pending navigation when controlled dates have new references', () => {
    const date = new Date(2024, 0, 1);
    const onChange = vi.fn();
    const { rerender } = render(
      <InputComponent format="yyyy-MM-dd" value={range ? [date, date] : date} onChange={onChange} />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    const monthStart = range ? 18 : 5;
    input.setSelectionRange(monthStart + 1, monthStart + 1);
    fireEvent.click(input);
    const sameDate = new Date(date.getTime());
    rerender(
      <InputComponent
        format="yyyy-MM-dd"
        value={range ? [sameDate, sameDate] : sameDate}
        onChange={onChange}
      />
    );
    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    const value = onChange.mock.lastCall?.[0];
    const dates = range ? value : [value];
    expect(dates.map((date: Date) => format(date, 'yyyy-MM-dd'))).to.deep.equal(
      range ? ['2024-01-01', '2025-01-01'] : ['2025-01-01']
    );

    flushFrames();
    expect(input.selectionStart).to.equal(range ? 13 : 0);
    expect(input.selectionEnd).to.equal(range ? 17 : 4);
  });

  it('Should clear the entire value after native Select All before frames run', () => {
    const date = new Date(2024, 0, 1);
    const onChange = vi.fn();
    render(
      <InputComponent
        format="yyyy-MM-dd"
        defaultValue={range ? [date, date] : date}
        onChange={onChange}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    fireEvent.keyDown(input, { key: 'a', ctrlKey: true });
    input.select();
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange.mock.lastCall?.[0]).to.be.null;
    const expected = range ? 'yyyy-MM-dd ~ yyyy-MM-dd' : 'yyyy-MM-dd';
    expect(input).to.have.value(expected);

    flushFrames();
    expect(input).to.have.value(expected);
    expect(input.selectionStart).to.equal(0);
    expect(input.selectionEnd).to.equal(0);
  });

  it('Should navigate consecutive segments after native Select All before frames run', () => {
    const date = new Date(2024, 0, 1);
    render(<InputComponent format="yyyy-MM-dd" defaultValue={range ? [date, date] : date} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    input.select();
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    const expected = range ? '2024-02-01 ~ 2024-01-01' : '2024-02-01';
    expect(input).to.have.value(expected);

    flushFrames();
    expect(input).to.have.value(expected);
    expect(input.selectionStart).to.equal(5);
    expect(input.selectionEnd).to.equal(7);
  });

  it('Should preserve a new native selection without another keyboard event', () => {
    const date = new Date(2024, 0, 1);
    render(<InputComponent format="yyyy-MM-dd" defaultValue={range ? [date, date] : date} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const flushFrames = holdAnimationFrames();
    userEvent.click(input);
    input.setSelectionRange(5, 7);

    flushFrames();
    expect(input.selectionStart).to.equal(5);
    expect(input.selectionEnd).to.equal(7);
  });
});
