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
  onChangeCalendarDate?: (index: number, date: Date) => void;
  onChangeCalendarTime?: (index: number, date: Date) => void;
  onToggleMeridian: (index: number, event: React.MouseEvent) => void;
  onMouseMove?: (date: Date) => void;
  onSelect?: (date: Date, event: React.SyntheticEvent) => void;
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
      onChangeCalendarDate,
      onChangeCalendarTime,
      onToggleMeridian,
      value = [],
      ...rest
    } = props;

    const onMoveForward = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarDate?.(index, nextPageDate);
      },
      [index, onChangeCalendarDate]
    );

    const onMoveBackward = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarDate?.(index, nextPageDate);
      },
      [index, onChangeCalendarDate]
    );

    const handleChangePageDate = useCallback(
      (nextPageDate: Date) => {
        onChangeCalendarDate?.(index, nextPageDate);
      },
      [index, onChangeCalendarDate]
    );

    const handleChangePageTime = useCallback(
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
        onChangePageDate={handleChangePageDate}
        onChangePageTime={handleChangePageTime}
        onMoveBackward={handleMoveBackward}
        onMoveForward={handleMoveForward}
        onToggleMeridian={handleToggleMeridian}
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
  onChangeCalendarDate: PropTypes.func
};

export default Calendar;
