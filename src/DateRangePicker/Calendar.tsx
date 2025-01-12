import React, { useCallback } from 'react';
import CalendarContainer, {
  CalendarProps as CalendarContainerProps
} from '../Calendar/CalendarContainer';
import { forwardRef } from '@/internals/utils';
import { addMonths, startOfToday } from '@/internals/utils/date';
import { DATERANGE_DISABLED_TARGET } from '@/internals/constants';
import { DateRange } from './types';
import { WithAsProps } from '@/internals/types';
import { DateRangePickerLocale } from '../locales';
import { useCalendarHandlers } from './hooks';

type OmitCalendarCoreTypes =
  | 'disabledDate'
  | 'onSelect'
  | 'onMouseMove'
  | 'calendarDate'
  | 'format'
  | 'locale';

export interface CalendarProps
  extends WithAsProps,
    Omit<CalendarContainerProps, OmitCalendarCoreTypes> {
  calendarDateRange?: DateRange;
  disabledDate?: (
    date: Date,
    selectValue: [] | [Date] | [Date, Date],
    type: DATERANGE_DISABLED_TARGET
  ) => boolean;
  format?: string;
  hoverRangeValue?: DateRange;
  index: number;
  isoWeek?: boolean;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  limitEndYear?: number;
  limitStartYear?: number;
  locale?: Partial<DateRangePickerLocale>;
  showWeekNumbers?: boolean;
  value?: [] | [Date] | [Date, Date];
  onChangeCalendarMonth?: (index: number, date: Date) => void;
  onChangeCalendarTime?: (index: number, date: Date) => void;
  onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
  onMouseMove?: (date: Date) => void;
}

const Calendar = forwardRef<'div', CalendarProps>((props: CalendarProps, ref) => {
  const {
    as: Component = CalendarContainer,
    calendarDateRange = [startOfToday(), addMonths(startOfToday(), 1)],
    format = 'yyyy-MM-dd',
    disabledDate,
    index = 0,
    limitEndYear,
    limitStartYear,
    onChangeCalendarMonth,
    onChangeCalendarTime,
    onSelect,
    value = [],
    ...rest
  } = props;

  const calendarHandlers = useCalendarHandlers({
    index,
    calendarDateRange,
    onChangeCalendarMonth,
    onChangeCalendarTime,
    onSelect
  });

  const disableCalendarDate = useCallback(
    (date: Date) => {
      return disabledDate?.(date, value, DATERANGE_DISABLED_TARGET.CALENDAR);
    },
    [disabledDate, value]
  );

  return (
    <Component
      data-testid={`calendar-${index === 0 ? 'start' : 'end'}`}
      {...rest}
      {...calendarHandlers}
      index={index}
      format={format}
      dateRange={value}
      disabledDate={disableCalendarDate}
      limitEndYear={limitEndYear}
      limitStartYear={limitStartYear}
      ref={ref}
    />
  );
});

Calendar.displayName = 'DateRangePicker.Calendar';

export default Calendar;
