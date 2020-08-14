import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { getUnhandledProps, useClassNames } from '../utils';
import { shouldDate, shouldMonth, shouldTime } from '../utils/formatUtils';
import { addMonths, calendarOnlyProps, disabledTime } from '../utils/dateUtils';
import { tuple } from '../@types/utils';
import { StandardProps } from '../@types/common';
import { CalendarLocaleTypes } from './types';
import { CalendarProvider } from './CalendarContext';

const CalendarState = tuple('DROP_TIME', 'DROP_MONTH');

export interface CalendarProps extends Omit<StandardProps, 'as'> {
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
  classPrefix: 'calendar'
};

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    calendarState,
    pageDate,
    onSelect,
    onToggleMonthDropdown,
    onToggleTimeDropdown,
    onChangePageDate,
    onChangePageTime,
    onToggleMeridian,
    format,
    className,
    isoWeek,
    limitEndYear,
    classPrefix,
    renderTitle,
    renderToolbar,
    renderCell,
    showWeekNumbers,
    showMeridian,
    timeZone,
    onMoveForward,
    onMoveBackward,
    locale,
    ...rest
  } = props;
  const { withClassPrefix, merge } = useClassNames(classPrefix);

  const disabledDate = (date: Date) => props.disabledDate?.(date);

  const isTimeDisabled = (date: Date) => disabledTime(props, date);

  const handleMoveForward = () => {
    onMoveForward?.(addMonths(pageDate, 1));
  };

  const handleMoveBackward = () => {
    onMoveBackward?.(addMonths(pageDate, -1));
  };
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

  const unhandled = getUnhandledProps(Calendar, rest);
  const timeDropdownProps = _.pick(rest, calendarOnlyProps);

  const contextValue = {
    locale,
    date: pageDate,
    format,
    disabledDate,
    timeZone,
    showWeekNumbers,
    isoWeek,
    onSelect,
    renderCell,
    onChangePageDate,
    onChangePageTime
  };
  return (
    <CalendarProvider value={contextValue}>
      <div {...unhandled} className={calendarClasses} ref={ref}>
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
            disabledMonth={disabledDate}
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
  pageDate: PropTypes.instanceOf(Date),
  calendarState: PropTypes.oneOf(CalendarState),
  format: PropTypes.string,
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  showWeekNumbers: PropTypes.bool,
  showMeridian: PropTypes.bool,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  onMoveForward: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  onChangePageTime: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  renderCell: PropTypes.func,
  locale: PropTypes.object
};
Calendar.defaultProps = defaultProps;

export default Calendar;
