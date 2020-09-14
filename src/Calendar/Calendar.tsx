import React, { HTMLAttributes, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header, { HeaderProps } from './Header';
import { useClassNames } from '../utils';
import { shouldDate, shouldMonth, shouldTime } from '../utils/formatUtils';
import {
  addMonths,
  calendarOnlyProps,
  disabledTime,
  omitHideDisabledProps
} from '../utils/dateUtils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { CalendarLocale } from './types';
import { CalendarProvider } from './CalendarContext';

export enum CalendarState {
  'DROP_TIME' = 'DROP_TIME',
  'DROP_MONTH' = 'DROP_MONTH'
}

export interface CalendarProps
  extends WithAsProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange'>,
    Omit<HeaderProps, 'onMoveForward' | 'onMoveBackward'> {
  pageDate: Date;
  calendarState?: CalendarState;
  format?: string;
  timeZone?: string;
  isoWeek?: boolean;
  limitEndYear?: number;
  showWeekNumbers?: boolean;
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
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  renderCell?: (date: Date) => React.ReactNode;
  locale?: CalendarLocale;
}

const defaultProps: Partial<CalendarProps> = {
  classPrefix: 'calendar',
  as: 'div'
};

const Calendar: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
    const {
      as: Component,
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
      showDate: showDateProp,
      showMeridian,
      showMonth: showMonthProp,
      showTime: showTimeProp,
      showWeekNumbers,
      timeZone,
      disabledBackward,
      disabledForward,
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

    const showDate = showDateProp ?? shouldDate(format);
    const showTime = showMonthProp ?? shouldTime(format);
    const showMonth = showTimeProp ?? shouldMonth(format);

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = calendarState === CalendarState.DROP_TIME || onlyShowTime;
    const dropMonth = calendarState === CalendarState.DROP_MONTH || onlyShowMonth;

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
        <Component
          {...omitHideDisabledProps<Partial<CalendarProps>>(rest)}
          role="table"
          className={calendarClasses}
          ref={ref}
        >
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
            disabledBackward={disabledBackward}
            disabledForward={disabledForward}
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
        </Component>
      </CalendarProvider>
    );
  }
);

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  calendarState: PropTypes.oneOf(Object.values(CalendarState)),
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
  showDate: PropTypes.bool,
  showMonth: PropTypes.bool,
  showTime: PropTypes.bool,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  timeZone: PropTypes.string
};
Calendar.defaultProps = defaultProps;

export default Calendar;
