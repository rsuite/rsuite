import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from '..';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const initial = new Date(2025, 0, 31, 13, 30);

function previousMonth() {
  fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
}

function nextMonth() {
  fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
}

describe('DatePicker month browsing', () => {
  it('preserves a selected day when browsing through a shorter month and back', () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();
    const onNextMonth = vi.fn();
    render(
      <DatePicker
        defaultOpen
        defaultValue={initial}
        onChange={onChange}
        onSelect={onSelect}
        onNextMonth={onNextMonth}
      />
    );

    nextMonth();

    const february = screen.getByRole('grid', { name: 'Feb 2025' });
    expect(within(february).queryByRole('gridcell', { selected: true })).not.to.exist;
    const activeDay = within(february).getByRole('gridcell', { name: '28 Feb 2025' });
    expect(activeDay).to.have.attribute('tabindex', '0');
    expect(onNextMonth).toHaveBeenCalledWith(new Date(2025, 1, 28, 13, 30));

    previousMonth();

    expect(screen.getByRole('gridcell', { name: '31 Jan 2025', selected: true })).to.exist;
    expect(onChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('confirms the chosen day and time after browsing to another month', () => {
    const onOk = vi.fn();
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultOpen
        defaultValue={initial}
        format="yyyy-MM-dd HH:mm"
        onChange={onChange}
        onOk={onOk}
      />
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '30 Jan 2025' }));
    nextMonth();
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    const chosen = new Date(2025, 0, 30, 13, 30);
    expect(onOk).toHaveBeenCalledExactlyOnceWith(chosen, expect.anything());
    expect(onChange).toHaveBeenCalledExactlyOnceWith(chosen, expect.anything());
    expect(screen.getByRole('textbox')).to.have.value('2025-01-30 13:30');
  });

  it('uses the month dropdown to browse without selecting the first day of that month', () => {
    const onSelect = vi.fn();
    const onChangeCalendarDate = vi.fn();
    render(
      <DatePicker
        defaultOpen
        defaultValue={initial}
        onSelect={onSelect}
        onChangeCalendarDate={onChangeCalendarDate}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    fireEvent.click(screen.getByRole('gridcell', { name: 'Mar 2025' }));

    const march = screen.getByRole('grid', { name: 'Mar 2025' });
    expect(within(march).queryByRole('gridcell', { selected: true })).not.to.exist;
    expect(onSelect).not.toHaveBeenCalled();
    expect(onChangeCalendarDate).toHaveBeenCalledOnce();
    previousMonth();
    previousMonth();
    expect(screen.getByRole('gridcell', { name: '31 Jan 2025', selected: true })).to.exist;
  });

  it('applies a time edit to the chosen date while viewing a different month', () => {
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <DatePicker defaultOpen defaultValue={initial} format="yyyy-MM-dd HH:mm" onOk={onOk} />
      </CustomProvider>
    );

    nextMonth();
    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));
    fireEvent.click(screen.getByRole('option', { name: '14 hours' }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(onOk).toHaveBeenCalledExactlyOnceWith(new Date(2025, 0, 31, 14, 30), expect.anything());
  });

  it('uses Enter to browse from the month dropdown before confirming the focused day', async () => {
    const onOk = vi.fn();
    const onSelect = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          defaultValue={initial}
          format="yyyy-MM-dd HH:mm"
          onOk={onOk}
          onSelect={onSelect}
        />
      </CustomProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    const month = screen.getByRole('gridcell', { name: 'Jan 2025', selected: true });
    act(() => month.focus());
    await act(() => userEvent.keyboard('{ArrowRight}'));
    const february = screen.getByRole('gridcell', { name: 'Feb 2025', selected: true });
    act(() => february.focus());
    await act(() => userEvent.keyboard('{Enter}'));

    expect(screen.getByRole('grid', { name: 'Feb 2025' })).to.exist;
    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
    expect(onOk).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();

    const activeDay = screen.getByRole('gridcell', { name: '01 Feb 2025' });
    expect(activeDay).to.have.attribute('tabindex', '0');
    await waitFor(() => expect(activeDay).to.have.focus);
    await act(() => userEvent.keyboard('{Enter}'));
    expect(onOk).toHaveBeenCalledExactlyOnceWith(new Date(2025, 1, 1, 13, 30), expect.anything());
  });

  it('checks the draft date rather than the viewed day when enabling confirmation', () => {
    const onOk = vi.fn();
    render(
      <DatePicker
        defaultOpen
        defaultValue={initial}
        shouldDisableDate={date => date.getMonth() === 1}
        onOk={onOk}
      />
    );

    nextMonth();
    const ok = screen.getByRole('button', { name: 'OK' });
    expect(ok).not.toBeDisabled();
    fireEvent.click(ok);
    expect(onOk).toHaveBeenCalledExactlyOnceWith(initial, expect.anything());
  });

  it('follows a new controlled value when it changes during browsing', () => {
    const { rerender } = render(<DatePicker defaultOpen value={initial} />);
    nextMonth();
    rerender(<DatePicker defaultOpen value={new Date(2025, 3, 19)} />);

    const april = screen.getByRole('grid', { name: 'Apr 2025' });
    expect(within(april).getByRole('gridcell', { name: '19 Apr 2025', selected: true })).to.exist;
  });
});
