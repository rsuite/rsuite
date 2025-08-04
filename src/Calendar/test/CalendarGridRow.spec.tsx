import React from 'react';
import GridRow from '../Grid/GridRow';
import { describe, expect, it, vi } from 'vitest';
import { format, isToday } from 'date-fns';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/cases';

describe('Calendar-GridRow', () => {
  testStandardProps(<GridRow />);

  it('Should render a div with `table-row` class', () => {
    render(<GridRow />);
    expect(screen.getByRole('row')).to.have.class('rs-calendar-table-row');
  });

  it('Should be active today', () => {
    const thisDate = new Date();
    render(<GridRow weekendDate={thisDate} />);

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
        <GridRow weekendDate={thisDate} />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '16 Jun 2025' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
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
        <GridRow weekendDate={thisDate} />
      </CalendarProvider>
    );
    expect(screen.getByRole('rowheader')).to.have.text(format(thisDate, 'w'));
  });

  it('Should render a ISO week number', () => {
    const thisDate = new Date(2022, 10, 2);
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          weekStart: 0,
          locale: {}
        }}
      >
        <GridRow weekendDate={thisDate} />
      </CalendarProvider>
    );

    expect(screen.getByRole('rowheader')).to.have.text('44');
  });

  it('Should have a additional className', () => {
    const thisDate = new Date();
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          date: new Date(),
          weekStart: 0,
          locale: {},
          cellClassName: (date: Date) => {
            if (isToday(date)) {
              return 'custom-cell';
            }
          }
        }}
      >
        <GridRow />
      </CalendarProvider>
    );

    expect(screen.getByTitle(`${format(thisDate, 'dd MMM yyyy')} (Today)`)).to.have.class(
      'custom-cell'
    );
  });

  describe('Accessibility', () => {
    it('Should have a role attribute', () => {
      render(<GridRow />);
      expect(screen.getByRole('row')).to.have.attribute('role', 'row');
    });
  });
});
