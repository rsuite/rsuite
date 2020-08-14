import React, { HTMLAttributes, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { useClassNames } from '../utils';
import { shouldDate, shouldMonth, shouldTime } from '../utils/formatUtils';
import { addMonths, calendarOnlyProps, disabledTime } from '../utils/dateUtils';
import { tuple } from '../@types/utils';
import { StandardProps } from '../@types/common';
import { CalendarLocaleTypes } from './types';
import { CalendarProvider } from './CalendarContext';

const CalendarState = tuple('DROP_TIME', 'DROP_MONTH');

export interface CalendarProps
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange'> {
  pageDate: Date;
  calendarState?: typeof CalendarState[number];
  format?: string;
  timeZone?: string;
  isoWeek?: boolean;
  limitEndYear?: number;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  showMeridian?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
  onMoveForward?: (nextPageDate: Date) => void;
  onMoveBackward?: (nextPageDate: Date) => void;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  onToggleMeridian?: (event: React.MouseEvent) => void;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
  renderCell?: (date: Date) => React.ReactNode;
  locale?: CalendarLocaleTypes;
}

const defaultProps: Partial<CalendarProps> = {
  classPrefix: 'calendar',
  as: 'div'
};

const Calendar = React.forwardRef((props: CalendarProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    classPrefix,
    calendarState,
    disabledDate,
    format,
    isoWeek,
    limitEndYear,
    locale,
    onChangePageDate,
    onChangePageTime,
    onMoveBackward,
    onMoveForward,
    onSelect,
    onToggleMeridian,
    onToggleMonthDropdown,
    onToggleTimeDropdown,
    pageDate,
    renderCell,
    renderTitle,
    renderToolbar,
    showMeridian,
    showWeekNumbers,
    timeZone,
    ...rest
  } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);

  const isDisabledDate = (date: Date) => disabledDate?.(date);

  const isTimeDisabled = (date: Date) => disabledTime(props, date);

  const handleMoveForward = useCallback(() => {
    onMoveForward?.(addMonths(pageDate, 1));
  }, [onMoveForward, pageDate]);

  const handleMoveBackward = useCallback(() => {
    onMoveBackward?.(addMonths(pageDate, -1));
  }, [onMoveBackward, pageDate]);

  const showDate = shouldDate(format);
  const showTime = shouldTime(format);
  const showMonth = shouldMonth(format);

  const onlyShowTime = showTime && !showDate && !showMonth;
  const onlyShowMonth = showMonth && !showDate && !showTime;
  const dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
  const dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;

  const calendarClasses = merge(
    className,
    withClassPrefix({
      'show-time-dropdown': dropTime,
      'show-month-dropdown': dropMonth
    })
  );
  const timeDropdownProps = pick(rest, calendarOnlyProps);
  const contextValue = {
    date: pageDate,
    disabledDate: isDisabledDate,
    format,
    isoWeek,
    locale,
    onChangePageDate,
    onChangePageTime,
    onSelect,
    renderCell,
    showWeekNumbers,
    timeZone
  };
  return (
    <CalendarProvider value={contextValue}>
      <div {...rest} className={calendarClasses} ref={ref}>
        <Header
          showMonth={showMonth}
          showDate={showDate}
          showTime={showTime}
          showMeridian={showMeridian}
          disabledTime={isTimeDisabled}
          onMoveForward={handleMoveForward}
          onMoveBackward={handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
          onToggleTimeDropdown={onToggleTimeDropdown}
          onToggleMeridian={onToggleMeridian}
          renderTitle={renderTitle}
          renderToolbar={renderToolbar}
        />
        {showDate && <View key="MonthView" />}
        {showMonth && (
          <MonthDropdown
            show={dropMonth}
            limitEndYear={limitEndYear}
            disabledMonth={isDisabledDate}
          />
        )}
        {showTime && (
          <TimeDropdown {...timeDropdownProps} show={dropTime} showMeridian={showMeridian} />
        )}
      </div>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  calendarState: PropTypes.oneOf(CalendarState),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  locale: PropTypes.object,
  onChangePageDate: PropTypes.func,
  onChangePageTime: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onMoveForward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  pageDate: PropTypes.instanceOf(Date),
  renderCell: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  timeZone: PropTypes.string
};
Calendar.defaultProps = defaultProps;

export default Calendar;
