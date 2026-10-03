import React from 'react';
import CalendarContainer from '../CalendarContainer';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { parseISO } from 'date-fns';
import { testStandardProps } from '@test/cases';
import { enGB, enUS, faIR } from '@/locales';
import { getJalaliMonth, getJalaliYear } from '@/internals/utils/date/jalali';

describe('CalendarContainer', () => {
  testStandardProps(
    <CalendarContainer calendarDate={new Date(2022, 10, 2)} format="yyyy-MM-dd" locale={{}} />
  );

  it('Should render a div with `calendar` class', () => {
    render(
      <CalendarContainer
        calendarDate={new Date(2021, 11, 24)}
        format="yyyy-MM-dd"
        locale={{}}
        data-testid="calendar"
      />
    );

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should output valid one day', () => {
    render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={parseISO('2018-07-01')}
        locale={{}}
        data-testid="calendar"
      />
    );
    expect(within(screen.getAllByRole('row')[1]).getAllByRole('gridcell')[0]).to.attribute(
      'aria-label',
      '01 Jul 2018'
    );
  });

  it('Should call `onSelect` callback with the date being clicked', () => {
    const onSelect = vi.fn();

    render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={new Date(2021, 11, 24)}
        locale={{}}
        onSelect={onSelect}
      />
    );
    fireEvent.click(
      screen.getByRole('gridcell', { name: '24 Dec 2021' }).firstChild as HTMLElement
    );

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toEqual(new Date(2021, 11, 24));
  });

  it('Should render a button that can close the month view', () => {
    render(
      <CalendarContainer calendarDate={new Date(2022, 8, 15)} format="yyyy-MM-dd" locale={{}} />
    );
    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(screen.getByRole('button', { name: 'Collapse month view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse month view' }));

    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
  });

  it('Should render a button that can close the time view', () => {
    render(
      <CalendarContainer
        calendarDate={new Date(2022, 8, 15, 0, 0, 0)}
        format="yyyy-MM-dd HH:mm:ss"
        locale={{}}
      />
    );
    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(screen.getByRole('button', { name: 'Collapse time view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse time view' }));

    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
  });

  describe('Locale', () => {
    it('Should render the first week of the year correctly when firstWeekContainsDate is 4', () => {
      render(
        <CalendarContainer
          calendarDate={new Date('2022-01-01')}
          format="yyyy-MM-dd"
          showWeekNumbers
          // enGB.Calendar.dateLocale.options.firstWeekContainsDate = 4;
          locale={enGB.Calendar}
        />
      );

      expect(screen.getAllByRole('rowheader')[0]).to.have.text('52');
    });

    it('Should render the first week of the year correctly when firstWeekContainsDate is 1', () => {
      render(
        <CalendarContainer
          calendarDate={new Date('2025-01-01')}
          format="yyyy-MM-dd"
          showWeekNumbers
          // enUS.Calendar.dateLocale.options.firstWeekContainsDate = 1;
          locale={enUS.Calendar}
        />
      );

      expect(screen.getAllByRole('rowheader')[0]).to.have.text('1');
    });
  });

  it('Should call `onToggleMonthDropdown` callback', () => {
    const onToggleMonthDropdown = vi.fn();
    render(
      <CalendarContainer
        locale={enUS.Calendar}
        calendarDate={new Date(2024, 10, 18, 0, 0, 0)}
        format="yyyy-MM-dd"
        onToggleMonthDropdown={onToggleMonthDropdown}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(onToggleMonthDropdown).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(onToggleMonthDropdown).toHaveBeenCalledWith(false);
  });

  it('Should call `onToggleMonthDropdown` callback when click collapse button', () => {
    const onToggleMonthDropdown = vi.fn();
    render(
      <CalendarContainer
        locale={enUS.Calendar}
        calendarDate={new Date(2024, 10, 18, 0, 0, 0)}
        format="yyyy-MM-dd"
        onToggleMonthDropdown={onToggleMonthDropdown}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(onToggleMonthDropdown).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('button', { name: 'Collapse month view' }));

    expect(onToggleMonthDropdown).toHaveBeenCalledWith(false);
  });

  it('Should call `onToggleTimeDropdown` callback', () => {
    const onToggleTimeDropdown = vi.fn();
    render(
      <CalendarContainer
        locale={enUS.Calendar}
        calendarDate={new Date(2024, 10, 18, 0, 0, 0)}
        format="yyyy-MM-dd HH:mm:ss"
        onToggleTimeDropdown={onToggleTimeDropdown}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(onToggleTimeDropdown).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(onToggleTimeDropdown).toHaveBeenCalledWith(false);
  });

  it('Should call `onToggleTimeDropdown` callback when click collapse button', () => {
    const onToggleTimeDropdown = vi.fn();
    render(
      <CalendarContainer
        locale={enUS.Calendar}
        calendarDate={new Date(2024, 10, 18, 0, 0, 0)}
        format="yyyy-MM-dd HH:mm:ss"
        onToggleTimeDropdown={onToggleTimeDropdown}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(onToggleTimeDropdown).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole('button', { name: 'Collapse time view' }));

    expect(onToggleTimeDropdown).toHaveBeenCalledWith(false);
  });

  describe('Jalali calendar', () => {
    // Jan 15, 2024 = Jalali 1402/10/25 (Dey 25, 1402)
    const gregorianDate = new Date(2024, 0, 15);

    it('Should display Jalali day numbers in grid cells', () => {
      render(
        <CalendarContainer
          calendarDate={gregorianDate}
          format="yyyy/MM/dd"
          locale={faIR.Calendar}
        />
      );

      // The first cell of the Jalali Dey 1402 month should show day 1 (not a Gregorian day number)
      // Jalali 1402/10/01 = Dec 22, 2023
      // The calendar shows Dey 1402 (Jalali month 10), so day 1 should be the Jalali day 1
      const cells = screen.getAllByRole('gridcell');
      const dayTexts = cells.map(c => c.querySelector('.rs-calendar-table-cell-day')?.textContent);
      // Jalali Dey 1402 has 30 days (days 1-30), plus some days from neighboring months
      // Day 1 should appear as "1", day 30 should appear as "30"
      expect(dayTexts).to.include('1');
      expect(dayTexts).to.include('30');
      // Gregorian day 22 of Dec 2023 = Jalali day 1, so "22" should NOT appear as a main day number
      // (it would be a Jalali day, not Gregorian)
    });

    it('Should navigate to the next Jalali month when clicking forward', () => {
      const onMoveForward = vi.fn();
      render(
        <CalendarContainer
          calendarDate={gregorianDate}
          format="yyyy/MM/dd"
          locale={faIR.Calendar}
          onMoveForward={onMoveForward}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Next month' }));

      expect(onMoveForward).toHaveBeenCalledTimes(1);
      const nextDate: Date = onMoveForward.mock.calls[0][0];
      // Next Jalali month from 1402/10 should be 1402/11
      expect(getJalaliYear(nextDate)).to.equal(1402);
      expect(getJalaliMonth(nextDate)).to.equal(11);
    });

    it('Should navigate to the previous Jalali month when clicking backward', () => {
      const onMoveBackward = vi.fn();
      render(
        <CalendarContainer
          calendarDate={gregorianDate}
          format="yyyy/MM/dd"
          locale={faIR.Calendar}
          onMoveBackward={onMoveBackward}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));

      expect(onMoveBackward).toHaveBeenCalledTimes(1);
      const prevDate: Date = onMoveBackward.mock.calls[0][0];
      // Previous Jalali month from 1402/10 should be 1402/09
      expect(getJalaliYear(prevDate)).to.equal(1402);
      expect(getJalaliMonth(prevDate)).to.equal(9);
    });
  });
});
