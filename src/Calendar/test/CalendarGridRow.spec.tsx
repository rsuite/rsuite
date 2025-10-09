import React from 'react';
import GridRow from '../Grid/GridRow';
import { describe, expect, it, vi } from 'vitest';
import { format } from 'date-fns';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/cases';
import { equals } from '@/internals/utils/date/plainDate';

describe('Calendar-GridRow', () => {
  testStandardProps(<GridRow startingDate={{ year: 2025, month: 8, day: 4 }} />);

  it('Should render a div with `table-row` class', () => {
    render(<GridRow startingDate={{ year: 2025, month: 8, day: 4 }} />);
    expect(screen.getByRole('row')).to.have.class('rs-calendar-table-row');
  });

  it('Should be active today', () => {
    const thisDate = new Date();
    render(
      <GridRow
        startingDate={{
          year: thisDate.getFullYear(),
          month: thisDate.getMonth() + 1,
          day: thisDate.getDate()
        }}
      />
    );

    expect(screen.getByTitle(`${format(thisDate, 'dd MMM yyyy')} (Today)`)).to.have.class(
      'rs-calendar-table-cell-is-today'
    );
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = vi.fn();
    const thisDate = new Date(2025, 5, 16);
    render(
      <CalendarProvider
        value={{ onSelect, date: thisDate, locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <GridRow startingDate={{ year: 2025, month: 6, day: 16 }} />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '16 Jun 2025' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith({ year: 2025, month: 6, day: 16 }, expect.anything());
  });

  it('Should render a week number', () => {
    const thisDate = new Date(2022, 10, 2);
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <GridRow startingDate={{ year: 2022, month: 11, day: 2 }} />
      </CalendarProvider>
    );
    expect(screen.getByRole('rowheader')).to.have.text(format(thisDate, 'w'));
  });

  it('Should render a ISO week number', () => {
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          weekStart: 0,
          locale: {}
        }}
      >
        <GridRow startingDate={{ year: 2022, month: 11, day: 2 }} />
      </CalendarProvider>
    );

    expect(screen.getByRole('rowheader')).to.have.text('44');
  });

  it('Should have a additional className', () => {
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          date: new Date(),
          weekStart: 0,
          locale: {},
          cellClassName: date => {
            if (equals(date, { year: 2025, month: 10, day: 7 })) {
              return 'custom-cell';
            }
          }
        }}
      >
        <GridRow
          startingDate={{
            year: 2025,
            month: 10,
            day: 7
          }}
        />
      </CalendarProvider>
    );

    expect(screen.getByTitle(`07 Oct 2025 (Today)`)).to.have.class('custom-cell');
  });

  describe('Accessibility', () => {
    it('Should have a role attribute', () => {
      render(<GridRow startingDate={{ year: 2025, month: 8, day: 4 }} />);
      expect(screen.getByRole('row')).to.have.attribute('role', 'row');
    });
  });
});
