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
  isSameMonth,
  omitHideDisabledProps,
  setDate
} from '../utils/dateUtils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { CalendarLocale } from './types';
import { CalendarProvider } from './CalendarContext';
import composeFunctions from '../utils/composeFunctions';

export enum CalendarState {
  'DROP_TIME' = 'DROP_TIME',
  'DROP_MONTH' = 'DROP_MONTH'
}

export interface CalendarProps
  extends WithAsProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange' | 'onMouseMove'>,
    Omit<HeaderProps, 'onMoveForward' | 'onMoveBackward' | 'showDate' | 'showTime' | 'showMonth'> {
  calendarState?: CalendarState;
  dateRange?: Date[];
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  format?: string;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
  hoverRangeValue?: Date[];
  inSameMonth?: (date: Date) => boolean;
  isoWeek?: boolean;
  limitEndYear?: number;
  locale?: CalendarLocale;
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  onMouseMove?: (date: Date) => void;
  onMoveBackward?: (nextPageDate: Date) => void;
  onMoveForward?: (nextPageDate: Date) => void;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  pageDate: Date;
  renderCell?: (date: Date) => React.ReactNode;
  showWeekNumbers?: boolean;
  timeZone?: string;
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
      dateRange,
      disabledBackward,
      disabledDate,
      disabledForward,
      format,
      hoverRangeValue,
      inSameMonth,
      isoWeek,
      limitEndYear,
      locale,
      onChangePageDate,
      onChangePageTime,
      onMouseMove,
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
    const dropTime = calendarState === CalendarState.DROP_TIME || onlyShowTime;
    const dropMonth = calendarState === CalendarState.DROP_MONTH || onlyShowMonth;

    const inSameThisMonthDate = useCallback(
      (date: Date) =>
        composeFunctions(
          d => setDate(d, 1),
          d => isSameMonth(d, date)
        )(date),
      []
    );

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
      dateRange,
      disabledDate: isDisabledDate,
      format,
      hoverRangeValue,
      inSameMonth: inSameMonth ?? inSameThisMonthDate,
      isoWeek,
      locale,
      onChangePageDate,
      onChangePageTime,
      onMouseMove,
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
  inSameMonth: PropTypes.func,
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
