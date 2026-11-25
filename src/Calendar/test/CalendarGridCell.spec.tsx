import GirdCell from '../Grid/GridCell';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/cases';

describe('Calendar-GirdHeaderRow', () => {
  testStandardProps(<GirdCell date={{ year: 2025, month: 7, day: 26 }} />);

  it('Should render a div with "rs-calendar-table-cell" class', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} />);

    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell');
  });

  it('Should be disabled', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} disabled />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-disabled');
  });

  it('Should be selected', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} selected />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-selected');
  });

  it('Should be selected start', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} rangeStart />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-selected-start');
  });

  it('Should be selected end', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} rangeEnd />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-selected-end');
  });

  it('Should be in range', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} inRange />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-in-range');
  });

  it('Should be unSameMonth', () => {
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} unSameMonth />);
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-un-same-month');
  });

  it('Should be today', () => {
    const today = new Date();
    render(
      <GirdCell
        date={{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }}
      />
    );
    expect(screen.getByRole('gridcell')).to.have.class('rs-calendar-table-cell-is-today');
  });

  it('Should call `onMouseMove` callback', () => {
    const onMouseMove = vi.fn();
    render(
      <CalendarProvider
        value={{
          onMouseMove,
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <GirdCell date={{ year: 2025, month: 7, day: 26 }} />
      </CalendarProvider>
    );
    fireEvent.mouseEnter(screen.getByRole('gridcell'));
    expect(onMouseMove).toHaveBeenCalledTimes(1);
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = vi.fn();
    render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('gridcell'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  describe('Accessibility', () => {
    it('Should have a aria-label', () => {
      render(<GirdCell date={{ year: 2022, month: 11, day: 2 }} />);
      expect(screen.getByRole('gridcell')).to.have.attr('aria-label', '02 Nov 2022');
    });

    it('Should have a aria-selected', () => {
      render(<GirdCell date={{ year: 2022, month: 11, day: 2 }} selected />);
      expect(screen.getByRole('gridcell')).to.have.attr('aria-selected', 'true');
    });

    it('Should have a aria-disabled', () => {
      render(<GirdCell date={{ year: 2022, month: 11, day: 2 }} disabled />);
      expect(screen.getByRole('gridcell')).to.have.attr('aria-disabled', 'true');
    });

    it('Should have a tabIndex attribute', () => {
      const { rerender } = render(<GirdCell date={{ year: 2025, month: 7, day: 26 }} />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '-1');

      rerender(<GirdCell selected date={{ year: 2025, month: 7, day: 26 }} />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '0');
    });
  });
});
