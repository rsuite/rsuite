import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, DateUtils } from '../../utils';
import { CalendarContext, CalendarState } from '../../Calendar';
import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';
import { WithAsProps } from '../../@types/common';
import { DateRangeLocale } from '../DateRangePicker';

export interface CalendarProps extends WithAsProps {
  calendarState?: CalendarState;
  index: number;
  calendarDate: Date[];
  value?: Date[];
  hoverValue?: Date[];
  format: string;
  timeZone: string;
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
  limitEndYear?: number;
  showWeekNumbers?: boolean;
  showOneCalendar?: boolean;
  locale?: DateRangeLocale;
  disabledDate?: (date: Date, selectValue?: Date[], type?: string) => boolean;
  onMoveForward?: (nextPageDate: Date) => void;
  onMoveBackward?: (nextPageDate: Date) => void;
  onSelect?: (date: Date, event: React.SyntheticEvent) => void;
  onMouseMove?: (date: Date) => void;
  onToggleMonthDropdown?: (event: React.SyntheticEvent) => void;
  onChangePageDate?: (nextPageDate: Date, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<CalendarProps> = {
  as: 'div',
  classPrefix: 'calendar',
  calendarDate: [new Date(), DateUtils.addMonths(new Date(), 1)],
  index: 0
};

const Calendar = React.forwardRef((props: CalendarProps, ref) => {
  const {
    as: Component,
    calendarState,
    className,
    value,
    hoverValue,
    isoWeek,
    limitEndYear,
    classPrefix,
    showWeekNumbers,
    timeZone,
    calendarDate,
    index,
    showOneCalendar,
    locale,
    format,
    onSelect,
    onMouseMove,
    onToggleMonthDropdown,
    onChangePageDate,
    disabledDate,
    onMoveForward,
    onMoveBackward,
    ...rest
  } = props;

  const pageDate = useMemo(() => calendarDate[index], [calendarDate, index]);
  const dropMonth = calendarState === 'MONTH';
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const calendarClasses = merge(className, withClassPrefix({ 'show-month-dropdown': dropMonth }));

  /**
   * Check to disable the switch to the previous month button.
   */
  const disabledBackward = useCallback(() => {
    const after = DateUtils.isAfter(
      DateUtils.setDate(calendarDate[1], 1),
      DateUtils.setDate(DateUtils.addMonths(calendarDate[0], 1), 1)
    );

    if (index === 0) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  }, [calendarDate, index]);

  /**
   * Check to disable the switch to the next month button.
   */
  const disabledForward = useCallback(() => {
    if (showOneCalendar) return false;
    const after = DateUtils.isAfter(
      DateUtils.setDate(calendarDate[1], 1),
      DateUtils.setDate(DateUtils.addMonths(calendarDate[0], 1), 1)
    );

    if (index === 1) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  }, [calendarDate, index, showOneCalendar]);

  /**
   * Check for disabled months
   */
  const disabledMonth = useCallback(
    (date: Date) => {
      let after = true;

      if (disabledDate?.(date, value, 'MONTH')) {
        return true;
      }
      if (showOneCalendar) return false;

      if (index === 1) {
        after = DateUtils.isAfter(date, calendarDate[0]);

        return !after;
      }

      after = DateUtils.isAfter(calendarDate[1], date);

      return !after;
    },
    [calendarDate, disabledDate, index, showOneCalendar, value]
  );

  /**
   * When clicked to switch to the callback of the next month.
   */
  const handleMoveForward = useCallback(() => {
    onMoveForward?.(DateUtils.addMonths(pageDate, 1));
  }, [onMoveForward, pageDate]);

  /**
   * When clicked to switch to the callback of the previous month.
   */
  const handleMoveBackward = useCallback(() => {
    onMoveBackward?.(DateUtils.addMonths(pageDate, -1));
  }, [onMoveBackward, pageDate]);

  const contextValue = {
    date: pageDate,
    format,
    locale,
    isoWeek,
    showWeekNumbers,
    timeZone,
    disabledDate,
    onChangePageDate,
    onSelect
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      <Component {...rest} ref={ref} className={calendarClasses}>
        <Header
          showMonth={true}
          disabledBackward={disabledBackward()}
          disabledForward={disabledForward()}
          onMoveForward={handleMoveForward}
          onMoveBackward={handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
        />

        <View
          activeDate={pageDate}
          value={value}
          hoverValue={hoverValue}
          onMouseMove={onMouseMove}
        />

        <MonthDropdown show={dropMonth} disabledMonth={disabledMonth} limitEndYear={limitEndYear} />
      </Component>
    </CalendarContext.Provider>
  );
});

Calendar.displayName = 'Calendar';
Calendar.defaultProps = defaultProps;
Calendar.propTypes = {
  calendarState: PropTypes.oneOf(['MONTH', 'TIME']),
  index: PropTypes.number,
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  format: PropTypes.string,
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  limitEndYear: PropTypes.number,
  disabledDate: PropTypes.func,
  onMoveForward: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  showOneCalendar: PropTypes.bool
};

export default Calendar;
