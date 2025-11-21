import React from 'react';
import TimeDropdown from '../TimeDropdown';
import en_US from '../../locales/en_US';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { CalendarProvider } from '../CalendarProvider';

describe('Calendar - TimeDropdown', () => {
  testStandardProps(<TimeDropdown show />);

  it('Should render a div with `time-dropdown` class', () => {
    render(<TimeDropdown />);

    expect(screen.getByRole('group', { hidden: true })).to.have.class('rs-calendar-time-dropdown');
  });

  it('Should render hours, minutes and seconds', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH:mm:ss',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).not.toBeNull();
    expect(screen.queryByText('Minutes')).not.toBeNull();
    expect(screen.queryByText('Seconds')).not.toBeNull();
  });

  it('Should render hours and minutes', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH:mm',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).not.toBeNull();
    expect(screen.queryByText('Minutes')).not.toBeNull();
    expect(screen.queryByText('Seconds')).toBeNull();
  });

  it('Should only render hours', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).not.toBeNull();
    expect(screen.queryByText('Minutes')).toBeNull();
    expect(screen.queryByText('Seconds')).toBeNull();
  });

  it('Should call `onChangeTime` callback', () => {
    const onChangeTime = vi.fn();

    render(
      <CalendarProvider
        value={{
          onChangeTime,
          date: new Date(),
          format: 'HH',
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('option', { name: '1 hours', hidden: true }));

    expect(onChangeTime).toHaveBeenCalledTimes(1);
  });

  it('Should set aria-disabled attribute for disabled hours', () => {
    const disabledHours = vi.fn(h => {
      return h > 10;
    });
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown disabledHours={disabledHours} />
      </CalendarProvider>
    );

    for (let h = 0; h < 24; h++) {
      expect(disabledHours).toHaveBeenCalledWith(h, { year: 2022, month: 11, day: 2 });
    }
    screen.getAllByRole('option', { hidden: true }).forEach((option, index) => {
      expect(option).to.have.attribute('aria-disabled', index > 10 ? 'true' : 'false');
    });
  });

  it('Should not render hours hidden by `hideHours`', () => {
    const hideHours = vi.fn(h => {
      return h > 10;
    });
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown hideHours={hideHours} />
      </CalendarProvider>
    );

    for (let h = 0; h < 24; h++) {
      expect(hideHours).toHaveBeenCalledWith(h, { year: 2022, month: 11, day: 2 });
    }
    expect(screen.getAllByRole('option', { hidden: true }).map(e => e.textContent)).toEqual([
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10'
    ]);
  });
});
