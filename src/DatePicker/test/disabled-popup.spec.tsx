import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../DatePicker';
import DateRangePicker from '../../DateRangePicker';

const start = new Date(2026, 10, 12);
const end = new Date(2026, 11, 1);
const cases = [
  [
    'DatePicker',
    (disabled: boolean, onChange: () => void) => (
      <DatePicker disabled={disabled} calendarDefaultDate={start} oneTap onChange={onChange} />
    )
  ],
  [
    'DateRangePicker',
    (disabled: boolean, onChange: () => void) => (
      <DateRangePicker
        disabled={disabled}
        defaultCalendarValue={[start, end]}
        onChange={onChange}
      />
    )
  ]
] as const;

describe.each(cases)('%s', (name, picker) => {
  it('closes its open calendar when disabled', () => {
    const onChange = vi.fn<() => void>();
    const { rerender } = render(picker(false, onChange));
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('gridcell', { name: '16 Nov 2026' })).toBeTruthy();

    rerender(picker(true, onChange));
    expect(screen.queryByRole('gridcell', { name: '16 Nov 2026' })).toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    rerender(picker(false, onChange));
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByRole('gridcell', { name: '16 Nov 2026' }));
    if (name === 'DateRangePicker') {
      userEvent.click(screen.getByRole('gridcell', { name: '19 Nov 2026' }));
      userEvent.click(screen.getByRole('button', { name: 'OK' }));
    }
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
