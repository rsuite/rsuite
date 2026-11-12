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
    (disabled: boolean, onChange: ReturnType<typeof vi.fn>) => (
      <DatePicker disabled={disabled} calendarDefaultDate={start} oneTap onChange={onChange} />
    )
  ],
  [
    'DateRangePicker',
    (disabled: boolean, onChange: ReturnType<typeof vi.fn>) => (
      <DateRangePicker
        disabled={disabled}
        defaultCalendarValue={[start, end]}
        onChange={onChange}
      />
    )
  ]
] as const;

describe.each(cases)('%s', (name, picker) => {
  it('closes its open calendar when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(picker(false, onChange));
    await user.click(screen.getByRole('textbox'));
    expect(screen.getByRole('gridcell', { name: '16 Nov 2026' })).toBeTruthy();

    rerender(picker(true, onChange));
    expect(screen.queryByRole('gridcell', { name: '16 Nov 2026' })).toBeNull();
    expect(onChange).not.toHaveBeenCalled();

    rerender(picker(false, onChange));
    await user.click(screen.getByRole('textbox'));
    await user.click(screen.getByRole('gridcell', { name: '16 Nov 2026' }));
    if (name === 'DateRangePicker') {
      await user.click(screen.getByRole('gridcell', { name: '19 Nov 2026' }));
      await user.click(screen.getByRole('button', { name: 'OK' }));
    }
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
