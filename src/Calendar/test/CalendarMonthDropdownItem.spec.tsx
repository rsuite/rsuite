import React from 'react';
import MonthDropdownItem from '../MonthDropdown/MonthDropdownItem';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/cases';

describe('Calendar-MonthDropdownItem', () => {
  testStandardProps(<MonthDropdownItem />);

  it('Should output specified month', () => {
    render(
      <CalendarProvider value={{ date: new Date(), locale: {}, isoWeek: false, weekStart: 0 }}>
        <MonthDropdownItem year={2024} month={1} />
      </CalendarProvider>
    );

    expect(screen.getByRole('gridcell')).to.have.text('Jan');
  });

  it('Should call `onSelect` callback with correct date', () => {
    const onChangeMonth = vi.fn();

    render(
      <CalendarProvider
        value={{ date: new Date(), onChangeMonth, locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <MonthDropdownItem month={1} year={2017} />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('gridcell'));

    expect(onChangeMonth).toHaveBeenCalledTimes(1);
    expect(format(onChangeMonth.mock.calls[0][0], 'yyyy-MM')).toBe('2017-01');
  });

  describe('Accessibility', () => {
    it('Should have a aria-disabled attribute', () => {
      render(<MonthDropdownItem disabled />);

      expect(screen.getByRole('gridcell')).to.have.attribute('aria-disabled');
    });

    it('Should have a aria-selected attribute', () => {
      render(<MonthDropdownItem active />);

      expect(screen.getByRole('gridcell')).to.have.attribute('aria-selected');
    });

    it('Should have a aria-label attribute', () => {
      render(
        <CalendarProvider value={{ date: new Date(), locale: {}, isoWeek: false, weekStart: 0 }}>
          <MonthDropdownItem month={1} year={2023} />
        </CalendarProvider>
      );
      expect(screen.getByRole('gridcell')).to.have.attribute('aria-label', 'Jan 2023');
    });

    it('Should have a tabIndex attribute', () => {
      const { rerender } = render(<MonthDropdownItem />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '-1');

      rerender(<MonthDropdownItem active />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '0');
    });
  });
});
