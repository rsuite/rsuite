import React from 'react';
import PropTypes from 'prop-types';
import { addMonths } from '../utils/dateUtils';
import CalendarCore, { CalendarProps as CalendarCoreProps } from '../Calendar/CalendarContainer';
import { DateRange } from './types';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { DatePickerLocale } from '../locales';
import { DATERANGE_DISABLED_TARGET, useEventCallback } from '../utils';

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
  limitStartYear?: number;
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
      limitStartYear,
      onChangeCalendarMonth,
      onChangeCalendarTime,
      onToggleMeridian,
      onSelect,
      value = [],
      ...rest
    } = props;

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

    const handleToggleMeridian = useEventCallback((event: React.MouseEvent) => {
      onToggleMeridian(index, event);
    });

    const getCalendarDate = () => calendarDate[index];

    const handleMoveForward = useEventCallback(() => {
      onMoveForward?.(addMonths(getCalendarDate(), 1));
    });

    const handleMoveBackward = useEventCallback(() => {
      onMoveBackward?.(addMonths(getCalendarDate(), -1));
    });

    const disabledMonth = (date: Date) =>
      disabledDate?.(date, value, DATERANGE_DISABLED_TARGET.CALENDAR);

    return (
      <Component
        data-testid={`calendar-${index === 0 ? 'start' : 'end'}`}
        {...rest}
        format={format}
        dateRange={value}
        disabledDate={disabledMonth}
        index={index}
        limitEndYear={limitEndYear}
        limitStartYear={limitStartYear}
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
  limitStartYear: PropTypes.number,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onChangeCalendarMonth: PropTypes.func
};

export default Calendar;
