import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { addMonths } from '../utils/dateUtils';
import Calendar from './Calendar';
import { ValueType } from './types';
import { CalendarState } from '../Calendar/Calendar';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { DatePickerLocale } from '../DatePicker/types';

export interface DatePickerProps extends WithAsProps {
  calendarDate?: ValueType;
  disabledDate?: (date: Date, selectValue: ValueType, type: string) => boolean;
  format: string;
  hoverValue?: ValueType;
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
      hoverValue,
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

    return (
      <Component
        classPrefix={classPrefix}
        disabledDate={disabledDate}
        format={format}
        timeZone={timeZone}
        value={value}
        isoWeek={isoWeek}
        hoverValue={hoverValue}
        calendarState={calendarState}
        calendarDate={calendarDate}
        index={index}
        onMoveForward={onMoveForward}
        onMoveBackward={onMoveBackward}
        onSelect={onSelect}
        onMouseMove={onMouseMove}
        onToggleMonthDropdown={toggleMonthDropdown}
        onChangePageDate={handleChangePageDate}
        limitEndYear={limitEndYear}
        showWeekNumbers={showWeekNumbers}
        showOneCalendar={showOneCalendar}
        locale={locale}
        ref={ref}
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
