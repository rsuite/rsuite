import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { addMonths, isSameMonth } from '../utils/dateUtils';
import Calendar from './Calendar';
import { ValueType } from './types';
import { CalendarState } from '../Calendar/Calendar';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { DatePickerLocale } from '../DatePicker/types';

export interface DatePickerProps extends WithAsProps {
  calendarDate?: ValueType;
  disabledDate?: (date: Date, selectValue: ValueType, type: string) => boolean;
  format: string;
  hoverRangeValue?: ValueType;
  index: number;
  isoWeek?: boolean;
  limitEndYear?: number;
  onChangeCalendarDate?: (index: number, nextPageDate: Date) => void;
  onMouseMove?: (date: Date) => void;
  onSelect?: (date: Date, event?: React.SyntheticEvent<any>) => void;
  showOneCalendar?: boolean;
  showWeekNumbers?: boolean;
  timeZone?: string;
  value?: ValueType;
  locale?: DatePickerLocale;
}

const defaultProps: Partial<DatePickerProps> = {
  as: Calendar,
  calendarDate: [new Date(), addMonths(new Date(), 1)],
  format: 'yyyy-MM-dd',
  index: 0,
  value: []
};
const DatePicker: RsRefForwardingComponent<'div', DatePickerProps> = React.forwardRef(
  (props: DatePickerProps, ref) => {
    const {
      as: Component,
      calendarDate,
      classPrefix,
      disabledDate,
      format,
      hoverRangeValue,
      index,
      isoWeek,
      limitEndYear,
      onChangeCalendarDate,
      onMouseMove,
      onSelect,
      showOneCalendar,
      showWeekNumbers,
      timeZone,
      value,
      locale
    } = props;
    const [calendarState, setCalendarState] = useState<CalendarState>();

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
        setCalendarState(undefined);
      },
      [index, onChangeCalendarDate]
    );

    const toggleMonthDropdown = useCallback(() => {
      setCalendarState(
        calendarState === CalendarState.DROP_MONTH ? undefined : CalendarState.DROP_MONTH
      );
    }, [calendarState]);

    const inSameMonth = useCallback((date: Date) => isSameMonth(date, calendarDate[index]), [
      calendarDate,
      index
    ]);

    return (
      <Component
        calendarDate={calendarDate}
        calendarState={calendarState}
        classPrefix={classPrefix}
        disabledDate={disabledDate}
        format={format}
        hoverRangeValue={hoverRangeValue}
        index={index}
        inSameMonth={inSameMonth}
        isoWeek={isoWeek}
        limitEndYear={limitEndYear}
        locale={locale}
        onChangePageDate={handleChangePageDate}
        onMouseMove={onMouseMove}
        onMoveBackward={onMoveBackward}
        onMoveForward={onMoveForward}
        onSelect={onSelect}
        onToggleMonthDropdown={toggleMonthDropdown}
        ref={ref}
        showOneCalendar={showOneCalendar}
        showWeekNumbers={showWeekNumbers}
        timeZone={timeZone}
        value={value}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.defaultProps = defaultProps;
DatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  index: PropTypes.number,
  format: PropTypes.string,
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onChangeCalendarDate: PropTypes.func
};

export default DatePicker;
