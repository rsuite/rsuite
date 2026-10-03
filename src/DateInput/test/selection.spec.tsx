import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import DateInput from '../DateInput';
import DateRangeInput from '../../DateRangeInput';
import { selectionFormats } from './selectionFixtures';

describe.each([
  { Component: DateInput, name: 'DateInput', range: false },
  { Component: DateRangeInput, name: 'DateRangeInput', range: true }
])('$name selection', ({ Component, range }) => {
  const InputComponent: React.ElementType = Component;

  describe.each([false, true])('controlled=%s', controlled => {
    it.each(selectionFormats)(
      'Should preserve consecutive $format key input before animation frames run',
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
        const frames: FrameRequestCallback[] = [];
        const animationFrame = vi
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(callback => {
            frames.push(callback);
            return frames.length;
          });
        try {
          userEvent.click(input);
          for (const key of range ? keys + endKeys : keys) {
            fireEvent.keyDown(input, { key });
          }

          const expectedValue = range ? `${expected} ~ ${expectedEnd}` : expected;
          expect(input).to.have.value(expectedValue);
          expect(input.selectionStart).to.equal(expectedValue.length - lastSegmentLength);
          expect(input.selectionEnd).to.equal(expectedValue.length);

          const lastValue = onChange.mock.lastCall?.[0];
          const dates = range ? lastValue : [lastValue];
          expect(dates.map((date: Date) => format(date, 'yyyy-MM-dd'))).to.deep.equal(
            range ? ['2024-01-01', '2024-02-02'] : ['2024-01-01']
          );

          act(() => frames.forEach(callback => callback(performance.now())));
          expect(input).to.have.value(expectedValue);
          expect(input.selectionStart).to.equal(expectedValue.length - lastSegmentLength);
          expect(input.selectionEnd).to.equal(expectedValue.length);
        } finally {
          animationFrame.mockRestore();
        }
      }
    );

    it('Should replace existing segment values before animation frames run', () => {
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
      const frames: FrameRequestCallback[] = [];
      const animationFrame = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(callback => {
          frames.push(callback);
          return frames.length;
        });
      try {
        userEvent.click(input);
        for (const key of '0401') fireEvent.keyDown(input, { key });
        const expected = range ? '04/01/2024 ~ 01/02/2024' : '04/01/2024';
        expect(input).to.have.value(expected);
        expect(input.selectionStart).to.equal(6);
        expect(input.selectionEnd).to.equal(10);

        act(() => frames.forEach(callback => callback(performance.now())));
        expect(input).to.have.value(expected);
        expect(input.selectionStart).to.equal(6);
        expect(input.selectionEnd).to.equal(10);
      } finally {
        animationFrame.mockRestore();
      }
    });
  });

  it('Should preserve a manually selected segment across unrelated renders', () => {
    const date = new Date(2024, 0, 1);
    const props = { format: 'yyyy-MM-dd', defaultValue: range ? [date, date] : date };
    const { rerender } = render(<InputComponent {...props} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);

    const monthStart = range ? 18 : 5;
    input.setSelectionRange(monthStart + 1, monthStart + 1);
    fireEvent.click(input);
    expect(input.selectionStart).to.equal(monthStart);
    expect(input.selectionEnd).to.equal(monthStart + 2);

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).to.have.value(range ? '2024-01-01 ~ 2024-02-01' : '2024-02-01');
    expect(input.selectionStart).to.equal(monthStart);
    expect(input.selectionEnd).to.equal(monthStart + 2);

    input.setSelectionRange(8, 10);
    rerender(<InputComponent {...props} className="rerendered" />);
    expect(input.selectionStart).to.equal(8);
    expect(input.selectionEnd).to.equal(10);
  });

  it('Should not restore an old selection after an external controlled value update', () => {
    const firstDate = new Date(2024, 0, 1);
    const nextDate = new Date(2025, 1, 2);
    const { rerender } = render(
      <InputComponent format="yyyy-MM-dd" value={range ? [firstDate, firstDate] : firstDate} />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);
    expect(input.selectionStart).to.equal(0);
    expect(input.selectionEnd).to.equal(4);

    rerender(
      <InputComponent format="yyyy-MM-dd" value={range ? [nextDate, nextDate] : nextDate} />
    );
    expect(input).to.have.value(range ? '2025-02-02 ~ 2025-02-02' : '2025-02-02');
    expect(input.selectionStart).to.equal(input.value.length);
    expect(input.selectionEnd).to.equal(input.value.length);
  });

  it('Should discard a selection request when the input loses focus during onChange', () => {
    const date = new Date(2024, 0, 1);
    const { rerender } = render(
      <InputComponent
        format="yyyy-MM-dd"
        defaultValue={range ? [date, date] : date}
        onChange={() => (screen.getByRole('textbox') as HTMLInputElement).blur()}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(document.activeElement).not.to.equal(input);

    input.focus();
    input.setSelectionRange(5, 7);
    rerender(
      <InputComponent
        format="yyyy-MM-dd"
        defaultValue={range ? [date, date] : date}
        className="rerendered"
      />
    );
    expect(input.selectionStart).to.equal(5);
    expect(input.selectionEnd).to.equal(7);
  });

  it('Should not queue selection changes after unmounting during onChange', () => {
    const date = new Date(2024, 0, 1);
    const TestInput = () => {
      const [mounted, setMounted] = useState(true);
      return mounted ? (
        <InputComponent
          format="yyyy-MM-dd"
          defaultValue={range ? [date, date] : date}
          onChange={() => setMounted(false)}
        />
      ) : null;
    };
    render(<TestInput />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const animationFrame = vi.spyOn(window, 'requestAnimationFrame');
    try {
      userEvent.click(input);
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(screen.queryByRole('textbox')).to.be.null;
      expect(animationFrame).not.toHaveBeenCalled();
    } finally {
      animationFrame.mockRestore();
    }
  });
});
