import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DateUtils } from '../utils';
import Calendar from './Calendar';
import { ValueType } from './DateRangePicker';
import { WithAsProps } from '../@types/common';
import { DateRangeLocale } from './DateRangePicker';
import { useCalendarState } from '../DatePicker/utils';

export interface DatePickerProps extends WithAsProps {
  value?: Date[];
  hoverValue?: Date[];
  calendarDate?: Date[];
  index: number;
  format: string;
  timeZone?: string;
  isoWeek?: boolean;
  limitEndYear?: number;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  showOneCalendar?: boolean;
  locale?: DateRangeLocale;
  disabledDate?: (date: Date, selectValue: ValueType, type: string) => boolean;
  onSelect?: (date: Date, event?: React.SyntheticEvent<any>) => void;
  onMouseMove?: (date: Date) => void;
  onChangeCalendarDate?: (index: number, nextPageDate: Date) => void;
}

const defaultProps: Partial<DatePickerProps> = {
  value: [],
  calendarDate: [new Date(), DateUtils.addMonths(new Date(), 1)],
  format: 'yyyy-MM-dd',
  index: 0
};

const DatePicker = React.forwardRef((props: DatePickerProps, ref) => {
  const {
    format,
    value,
    hoverValue,
    index,
    calendarDate,
    isoWeek,
    limitEndYear,
    classPrefix,
    showWeekNumbers,
    showOneCalendar,
    timeZone,
    locale,
    onSelect,
    onMouseMove,
    disabledDate,
    onChangeCalendarDate,
    ...rest
  } = props;

  const { calendarState, reset, openMonth } = useCalendarState();

  const handleChangeMonth = useCallback(
    (nextPageDate: Date) => {
      onChangeCalendarDate?.(index, nextPageDate);
    },
    [index, onChangeCalendarDate]
  );

  const handleChangePageDate = useCallback(
    (nextPageDate: Date) => {
      onChangeCalendarDate?.(index, nextPageDate);
      reset();
    },
    [index, onChangeCalendarDate, reset]
  );

  const handleOpenMonth = useCallback(() => {
    if (calendarState === 'MONTH') {
      reset();
    } else {
      openMonth();
    }
  }, [calendarState, openMonth, reset]);

  return (
    <Calendar
      {...rest}
      ref={ref}
      locale={locale}
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
      onMoveForward={handleChangeMonth}
      onMoveBackward={handleChangeMonth}
      onSelect={onSelect}
      onMouseMove={onMouseMove}
      onToggleMonthDropdown={handleOpenMonth}
      onChangePageDate={handleChangePageDate}
      limitEndYear={limitEndYear}
      showWeekNumbers={showWeekNumbers}
      showOneCalendar={showOneCalendar}
    />
  );
});

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
