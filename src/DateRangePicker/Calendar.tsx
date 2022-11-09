import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { addMonths, isSameMonth } from '../utils/dateUtils';
import CalendarCore, { CalendarProps as CalendarCoreProps } from '../Calendar/CalendarContainer';
import { DateRange } from './types';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { DatePickerLocale } from '../locales';
import { DATERANGE_DISABLED_TARGET } from '../utils';

type OmitCalendarCoreTypes =
  | 'disabledDate'
  | 'onSelect'
  | 'onMouseMove'
  | 'calendarDate'
  | 'format'
  | 'locale'
  | 'onToggleMeridian';

export interface CalendarProps extends WithAsProps, Omit<CalendarCoreProps, OmitCalendarCoreTypes> {
  calendarDate?: DateRange;
  disabledDate?: (
    date: Date,
    selectValue: [] | [Date] | [Date, Date],
    type: DATERANGE_DISABLED_TARGET
  ) => boolean;
  format?: string;
  hoverRangeValue?: DateRange;
  index: number;
  isoWeek?: boolean;
  limitEndYear?: number;
  locale?: DatePickerLocale;
  onChangeCalendarMonth?: (index: number, date: Date) => void;
  onChangeCalendarTime?: (index: number, date: Date) => void;
  onToggleMeridian: (index: number, event: React.MouseEvent) => void;
  onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
  onMouseMove?: (date: Date) => void;
  showWeekNumbers?: boolean;
  value?: [] | [Date] | [Date, Date];
}

const Calendar: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
    const {
      as: Component = CalendarCore,
      calendarDate = [new Date(), addMonths(new Date(), 1)],
      format = 'yyyy-MM-dd',
      disabledDate,
      index = 0,
      limitEndYear,
      onChangeCalendarMonth,
      onChangeCalendarTime,
      onToggleMeridian,
      onSelect,
      value = [],
      ...rest
    } = props;

    const onMoveForward = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarMonth?.(index, nextPageDate);
      },
      [index, onChangeCalendarMonth]
    );

    const onMoveBackward = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarMonth?.(index, nextPageDate);
      },
      [index, onChangeCalendarMonth]
    );

    const handleSelect = useCallback(
      (date: Date, event: React.SyntheticEvent) => {
        onSelect?.(index, date, event);
      },
      [index, onSelect]
    );

    const handleChangeMonth = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarMonth?.(index, nextPageDate);
      },
      [index, onChangeCalendarMonth]
    );

    const handleChangeTime = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarTime?.(index, nextPageDate);
      },
      [index, onChangeCalendarTime]
    );

    const handleToggleMeridian = useCallback(
      (event: React.MouseEvent) => {
        onToggleMeridian(index, event);
      },
      [index, onToggleMeridian]
    );

    const inSameMonth = useCallback(
      (date: Date) => isSameMonth(date, calendarDate[index]),
      [calendarDate, index]
    );

    const getCalendarDate = useCallback(() => calendarDate[index], [calendarDate, index]);

    const handleMoveForward = useCallback(() => {
      onMoveForward?.(addMonths(getCalendarDate(), 1));
    }, [getCalendarDate, onMoveForward]);

    const handleMoveBackward = useCallback(() => {
      onMoveBackward?.(addMonths(getCalendarDate(), -1));
    }, [getCalendarDate, onMoveBackward]);

    const disabledMonth = useCallback(
      (date: Date) => disabledDate?.(date, value, DATERANGE_DISABLED_TARGET.CALENDAR),
      [disabledDate, value]
    );

    return (
      <Component
        {...rest}
        format={format}
        dateRange={value}
        disabledDate={disabledMonth}
        inSameMonth={inSameMonth}
        index={index}
        limitEndYear={limitEndYear}
        onChangeMonth={handleChangeMonth}
        onChangeTime={handleChangeTime}
        onMoveBackward={handleMoveBackward}
        onMoveForward={handleMoveForward}
        onToggleMeridian={handleToggleMeridian}
        onSelect={handleSelect}
        calendarDate={getCalendarDate()}
        ref={ref}
      />
    );
  }
);

Calendar.displayName = 'DateRangePicker.Calendar';
Calendar.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  index: PropTypes.number,
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onChangeCalendarMonth: PropTypes.func
};

export default Calendar;
