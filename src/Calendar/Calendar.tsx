import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { useClassNames, DateUtils } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type CalendarState = 'MONTH' | 'TIME' | null;

export interface CalendarLocale {
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  ok?: string;
  today?: string;
  yesterday?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern?: string;
  formattedDayPattern?: string;
}

export interface CalendarContextValue {
  /** Current date */
  date?: Date;

  /** Date formatting characters */
  format?: string;

  /** IANA time zone */
  timeZone?: string;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** The component localized character set. */
  locale?: CalendarLocale;

  /** Disabled date */
  disabledDate?: (date: Date, selectValue?: Date[], type?: string) => boolean;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;

  /** Callback fired before the date selected */
  onSelect?: (date: Date, event: React.MouseEvent) => void;

  /** Callback after the date has changed */
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;

  /** Callback after the time has changed */
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;

  /** Format date */
  formatDate?: (
    date: Date | string | number,
    format?: string,
    options?: { locale?: any }
  ) => string;
}

export interface CalendarProps extends WithAsProps {
  /** The status of the calendar display: day, month, time. */
  calendarState?: CalendarState;

  /** Date formatting characters */
  format?: string;

  /** IANA time zone */
  timeZone?: string;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Limit showing how many years in the future */
  limitEndYear?: number;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Meridian format */
  showMeridian?: boolean;

  /** Date displayed on the current page */
  pageDate: Date;

  /** The component localized character set. */
  locale?: CalendarLocale;

  /** Disabled date */
  disabledDate?: (date: Date) => boolean;

  /** Disabled hours */
  disabledHours?: (hour: number, date: Date) => boolean;

  /** Disabled minutes */
  disabledMinutes?: (minute: number, date: Date) => boolean;

  /** Disabled seconds */
  disabledSeconds?: (second: number, date: Date) => boolean;

  /** Hidden hours */
  hideHours?: (hour: number, date: Date) => boolean;

  /** Hidden minutes */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /** Hidden seconds */
  hideSeconds?: (second: number, date: Date) => boolean;

  /** Switch to the callback triggered after the next month. */
  onMoveForward?: (nextPageDate: Date) => void;

  /** Switch to the callback triggered after the previous month. */
  onMoveBackward?: (nextPageDate: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;

  /** Called when opening the month view */
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;

  /** Called when opening the time view */
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;

  /** Callback after the date has changed */
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;

  /** Callback after the time has changed */
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;

  /** Callback after switching AM/PM. */
  onToggleMeridian?: (event: React.MouseEvent) => void;

  /** Custom rendering title */
  renderTitle?: (date: Date) => React.ReactNode;

  /** Custom rendering toolbar */
  renderToolbar?: (date: Date) => React.ReactNode;

  /** Custom rendering cell */
  renderCell?: (date: Date) => React.ReactNode;
}

export const CalendarContext = React.createContext<CalendarContextValue>({});

const defaultProps: Partial<CalendarProps> = {
  as: 'div',
  classPrefix: 'calendar'
};

const Calendar: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      calendarState,
      format,
      isoWeek,
      limitEndYear,
      locale,
      pageDate,
      showMeridian,
      showWeekNumbers,
      timeZone,
      disabledDate,
      onChangePageDate,
      onChangePageTime,
      onMoveBackward,
      onMoveForward,
      onSelect,
      onToggleMeridian,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      renderCell,
      renderTitle,
      renderToolbar,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);

    const isDisabledDate = (date: Date) => disabledDate?.(date);
    const isTimeDisabled = (date: Date) => DateUtils.disabledTime(props, date);

    const handleMoveForward = useCallback(() => onMoveForward?.(DateUtils.addMonths(pageDate, 1)), [
      onMoveForward,
      pageDate
    ]);

    const handleMoveBackward = useCallback(
      () => onMoveBackward?.(DateUtils.addMonths(pageDate, -1)),
      [onMoveBackward, pageDate]
    );

    const showDate = DateUtils.shouldDate(format);
    const showTime = DateUtils.shouldTime(format);
    const showMonth = DateUtils.shouldMonth(format);

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = calendarState === 'TIME' || onlyShowTime;
    const dropMonth = calendarState === 'MONTH' || onlyShowMonth;

    const calendarClasses = merge(
      className,
      withClassPrefix({ 'show-time-dropdown': dropTime, 'show-month-dropdown': dropMonth })
    );
    const timeDropdownProps = pick(rest, DateUtils.calendarOnlyProps);
    const contextValue = {
      date: pageDate,
      format,
      isoWeek,
      locale,
      showWeekNumbers,
      timeZone,
      disabledDate: isDisabledDate,
      onChangePageDate,
      onChangePageTime,
      onSelect,
      renderCell
    };
    return (
      <CalendarContext.Provider value={contextValue}>
        <Component
          role="table"
          {...DateUtils.omitHideDisabledProps<Partial<CalendarProps>>(rest)}
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
          />
          {showDate && <View />}
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
      </CalendarContext.Provider>
    );
  }
);

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  calendarState: PropTypes.oneOf(['MONTH', 'TIME']),
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
