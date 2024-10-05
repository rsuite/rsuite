import React, { useCallback, useMemo } from 'react';
import CalendarContainer, {
  CalendarProps as CalendarContainerProps
} from '../Calendar/CalendarContainer';
import { addMonths, startOfToday } from '@/internals/utils/date';
import { DATERANGE_DISABLED_TARGET } from '@/internals/constants';
import { useEventCallback } from '@/internals/hooks';
import { DateRange } from './types';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { DatePickerLocale } from '../locales';

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
  locale?: DatePickerLocale;
  showWeekNumbers?: boolean;
  value?: [] | [Date] | [Date, Date];
  onChangeCalendarMonth?: (index: number, date: Date) => void;
  onChangeCalendarTime?: (index: number, date: Date) => void;
  onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
  onMouseMove?: (date: Date) => void;
}

const Calendar: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
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

    const calendarDate = useMemo(() => calendarDateRange[index], [calendarDateRange, index]);

    const onMoveForward = useEventCallback((nextPageDate: Date) => {
      onChangeCalendarMonth?.(index, nextPageDate);
    });

    const onMoveBackward = useEventCallback((nextPageDate: Date) => {
      onChangeCalendarMonth?.(index, nextPageDate);
    });

    const handleSelect = useEventCallback((date: Date, event: React.SyntheticEvent) => {
      onSelect?.(index, date, event);
    });

    const handleChangeMonth = useEventCallback((nextPageDate: Date) => {
      onChangeCalendarMonth?.(index, nextPageDate);
    });

    const handleChangeTime = useEventCallback((nextPageDate: Date) => {
      onChangeCalendarTime?.(index, nextPageDate);
    });

    const handleMoveForward = useEventCallback(() => {
      onMoveForward?.(addMonths(calendarDate, 1));
    });

    const handleMoveBackward = useEventCallback(() => {
      onMoveBackward?.(addMonths(calendarDate, -1));
    });

    const disabledMonth = useCallback(
      (date: Date) => {
        disabledDate?.(date, value, DATERANGE_DISABLED_TARGET.CALENDAR);
      },
      [disabledDate, value]
    );

    return (
      <Component
        data-testid={`calendar-${index === 0 ? 'start' : 'end'}`}
        {...rest}
        index={index}
        format={format}
        dateRange={value}
        disabledDate={disabledMonth}
        limitEndYear={limitEndYear}
        limitStartYear={limitStartYear}
        onChangeMonth={handleChangeMonth}
        onChangeTime={handleChangeTime}
        onMoveBackward={handleMoveBackward}
        onMoveForward={handleMoveForward}
        onSelect={handleSelect}
        calendarDate={calendarDate}
        ref={ref}
      />
    );
  }
);

Calendar.displayName = 'DateRangePicker.Calendar';

export default Calendar;
