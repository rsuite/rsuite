import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import CalendarContainer from '../CalendarContainer';
import DatePicker from '../../DatePicker';
import DateRangePicker from '../../DateRangePicker';
import TimePicker from '../../TimePicker';
import TimeRangePicker from '../../TimeRangePicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../DatePicker/styles/index.scss';
import '../../DateRangePicker/styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20, 30);
const end = new Date(2022, 10, 15, 12, 40, 50);
const constraints = [
  {
    prop: 'shouldDisableHour',
    calendarProp: 'disabledHours',
    unit: 'hours',
    value: 11,
    selected: 10,
    hidden: false
  },
  {
    prop: 'shouldDisableMinute',
    calendarProp: 'disabledMinutes',
    unit: 'minutes',
    value: 21,
    selected: 20,
    hidden: false
  },
  {
    prop: 'shouldDisableSecond',
    calendarProp: 'disabledSeconds',
    unit: 'seconds',
    value: 31,
    selected: 30,
    hidden: false
  },
  {
    prop: 'hideHours',
    calendarProp: 'hideHours',
    unit: 'hours',
    value: 11,
    selected: 10,
    hidden: true
  },
  {
    prop: 'hideMinutes',
    calendarProp: 'hideMinutes',
    unit: 'minutes',
    value: 21,
    selected: 20,
    hidden: true
  },
  {
    prop: 'hideSeconds',
    calendarProp: 'hideSeconds',
    unit: 'seconds',
    value: 31,
    selected: 30,
    hidden: true
  }
] as const;

describe.each(['DatePicker', 'TimePicker', 'DateRangePicker', 'TimeRangePicker'])(
  '%s time constraint context',
  component => {
    it.each(constraints)(
      '$prop uses the selected time when filtering options',
      async ({ prop, unit, value, hidden }) => {
        const range = component.includes('Range');
        const dates = range ? [initial, end] : [initial];
        const predicate = (option: number, date: Date) =>
          option === value && dates.some(selected => selected.getTime() === date.getTime());
        const common = {
          defaultOpen: true,
          responsive: false,
          format: component.startsWith('Date') ? 'yyyy-MM-dd HH:mm:ss' : 'HH:mm:ss',
          [prop]: predicate
        };
        const picker =
          component === 'DatePicker' ? (
            <DatePicker {...common} defaultValue={initial} />
          ) : component === 'TimePicker' ? (
            <TimePicker {...common} defaultValue={initial} />
          ) : component === 'DateRangePicker' ? (
            <DateRangePicker {...common} defaultValue={[initial, end]} />
          ) : (
            <TimeRangePicker {...common} defaultValue={[initial, end]} />
          );
        render(<CustomProvider reduceMotion>{picker}</CustomProvider>);
        if (component.startsWith('Date')) {
          for (const button of screen.getAllByRole('button', { name: 'Select time' })) {
            await act(() => userEvent.click(button));
          }
        }
        const options = screen.queryAllByRole('option', { name: `${value} ${unit}` });
        if (hidden) expect(options).toHaveLength(0);
        else {
          expect(options).toHaveLength(dates.length);
          options.forEach(option => expect(option).to.have.attribute('aria-disabled', 'true'));
        }
      }
    );
  }
);

describe('Calendar time validation context', () => {
  it.each(constraints)(
    '$calendarProp keeps the time when validating the header',
    ({ calendarProp, selected }) => {
      const predicate = (option: number, date: Date) =>
        option === selected && date.getTime() === initial.getTime();
      const view = (date: Date) => (
        <CalendarContainer
          calendarDate={date}
          format="yyyy-MM-dd HH:mm:ss"
          {...{ [calendarProp]: predicate }}
        />
      );
      const { rerender } = render(view(initial));
      expect(screen.getByRole('button', { name: 'Select time' })).to.have.class(
        'rs-calendar-header-error'
      );
      rerender(view(new Date(2022, 9, 14, 13, 25, 35)));
      expect(screen.getByRole('button', { name: 'Select time' })).not.to.have.class(
        'rs-calendar-header-error'
      );
    }
  );
});

describe('Dependent time constraints', () => {
  it.each([false, true])(
    'refreshes minute and second rules after selection, meridiem=%s',
    async showMeridiem => {
      const value = new Date(2022, 9, 14, showMeridiem ? 13 : 10, 20, 30);
      render(
        <CustomProvider reduceMotion>
          <TimePicker
            defaultOpen
            responsive={false}
            defaultValue={value}
            showMeridiem={showMeridiem}
            format={showMeridiem ? 'hh:mm:ss aa' : 'HH:mm:ss'}
            shouldDisableMinute={(minute, date) =>
              minute === 21 && date.getHours() === value.getHours()
            }
            hideSeconds={(second, date) => second === 31 && date.getMinutes() === 21}
          />
        </CustomProvider>
      );
      expect(screen.getByRole('option', { name: '21 minutes' })).to.have.attribute(
        'aria-disabled',
        'true'
      );
      expect(screen.getByRole('option', { name: '31 seconds' })).to.exist;
      await act(() =>
        userEvent.click(screen.getByRole('option', { name: `${showMeridiem ? 2 : 11} hours` }))
      );
      expect(screen.getByRole('option', { name: '21 minutes' })).to.have.attribute(
        'aria-disabled',
        'false'
      );
      await act(() => userEvent.click(screen.getByRole('option', { name: '21 minutes' })));
      expect(screen.queryByRole('option', { name: '31 seconds' })).not.to.exist;
      await act(() => userEvent.click(screen.getByRole('button', { name: 'OK' })));
      expect(screen.getByRole('textbox')).to.have.value(showMeridiem ? '02:21:30 PM' : '11:21:30');
    }
  );
});
