import React, { HTMLAttributes, useMemo } from 'react';
import pick from 'lodash/pick';
import ArrowUpIcon from '@rsuite/icons/ArrowUp';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import CalendarBody from './CalendarBody';
import CalendarHeader, { CalendarHeaderProps } from './CalendarHeader';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import {
  startOfToday,
  disableTime,
  isSameMonth,
  calendarOnlyProps,
  omitHideDisabledProps,
  DateMode,
  useDateMode,
  isValid
} from '@/internals/utils/date';
import { WithAsProps } from '@/internals/types';
import { CalendarLocale } from '../locales';
import { CalendarProvider } from './CalendarProvider';
import { useCalendarState, CalendarState } from './hooks';
import { MonthDropdownProps } from './types';

export interface CalendarProps
  extends WithAsProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange' | 'onMouseMove'>,
    CalendarHeaderProps {
  /**
   * The panel render based on date range
   */
  dateRange?: Date[];

  /**
   * The Id of the target element that triggers the opening of the calendar
   */
  targetId?: string;

  /**
   * Date displayed on the current page
   */
  calendarDate: Date;

  /**
   * Whether to show week numbers
   */
  showWeekNumbers?: boolean;

  /**
   * Whether to show meridiem
   */
  showMeridiem?: boolean;

  /**
   * Whether inline mode
   */
  inline?: boolean;

  /**
   * Default state of the calendar, can be `MONTH` or `TIME`
   */
  defaultState?: CalendarState;

  /**
   * Disabled dates on the calendar
   */
  disabledDate?: (date: Date) => boolean;

  /**
   * Disabled hours on time view
   */
  disabledHours?: (hour: number, date: Date) => boolean;

  /**
   * Disabled minutes on time view
   */
  disabledMinutes?: (minute: number, date: Date) => boolean;

  /**
   * Hidden seconds on time view
   */
  disabledSeconds?: (second: number, date: Date) => boolean;

  /**
   * Format of the date
   */
  format: string;

  /**
   * Hidden hours on time view
   */
  hideHours?: (hour: number, date: Date) => boolean;

  /**
   * Hidden minutes on time view
   */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /**
   * Hidden seconds on time view
   */
  hideSeconds?: (second: number, date: Date) => boolean;

  /**
   * The value that mouse hover on in range selection
   */
  hoverRangeValue?: [Date, Date];

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   *
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  isoWeek?: boolean;

  /**
   * The index of the calendar
   */
  index?: number;

  /**
   * the index of the first day of the week (0 - Sunday)
   * If `isoWeek` is `true`, the value of `weekStart` is ignored.
   *
   * @default 0
   */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Limit showing how many years in the future
   */
  limitEndYear?: number;

  /**
   * Limit showing how many years in the past
   */
  limitStartYear?: number;

  /**
   * Custom locale object
   *
   * @see https://rsuitejs.com/guide/i18n/#calendar
   */
  locale?: CalendarLocale;

  /**
   * The props for the Month Dropdown component.
   */
  monthDropdownProps?: MonthDropdownProps;

  /**
   * Callback after the date has changed
   */
  onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;

  /**
   * Callback after the time has changed
   */
  onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;

  /**
   * Callback after mouse enter other date cell
   */
  onMouseMove?: (date: Date) => void;

  /**
   * Switch to the callback triggered after the previous month
   */
  onMoveBackward?: (nextPageDate: Date) => void;

  /**
   * Switch to the callback triggered after the next month
   */
  onMoveForward?: (nextPageDate: Date) => void;

  /**
   * Callback fired before the date selected
   */
  onSelect?: (date: Date, event: React.MouseEvent) => void;

  /**
   * Custom rendering cell
   */
  renderCell?: (date: Date) => React.ReactNode;

  /**
   * Custom rendering cell on the picker
   */
  renderCellOnPicker?: (date: Date) => React.ReactNode;

  /**
   * Custom cell classes base on it's date
   */
  cellClassName?: (date: Date) => string | undefined;

  /**
   * Called when opening the month view
   */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /**
   * Called when opening the time view
   */
  onToggleTimeDropdown?: (toggle: boolean) => void;
}

const CalendarContainer = forwardRef<'div', CalendarProps>((props: CalendarProps, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar',
    calendarDate: calendarDateProp,
    dateRange,
    disabledBackward,
    defaultState,
    disabledForward,
    format,
    hoverRangeValue,
    inline,
    isoWeek = false,
    weekStart = 0,
    targetId,
    limitEndYear,
    limitStartYear,
    locale,
    monthDropdownProps,
    showMeridiem,
    showWeekNumbers,
    cellClassName,
    disabledDate,
    onChangeMonth,
    onChangeTime,
    onMouseMove,
    onMoveBackward,
    onMoveForward,
    onSelect,
    onToggleMonthDropdown,
    onToggleTimeDropdown,
    renderCell,
    renderCellOnPicker,
    renderTitle,
    renderToolbar,
    ...rest
  } = props;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

  const calendarDate = useMemo(() => {
    return isValid(calendarDateProp) ? calendarDateProp : startOfToday();
  }, [calendarDateProp]);

  const { calendarState, reset, handlers } = useCalendarState({
    defaultState,
    calendarDate,
    onMoveForward,
    onMoveBackward,
    onToggleTimeDropdown,
    onToggleMonthDropdown
  });

  const isDateDisabled = (date: Date) => disabledDate?.(date) ?? false;
  const isTimeDisabled = (date: Date) => disableTime(props, date);

  const handleCloseDropdown = useEventCallback(() => reset());

  const { mode, has } = useDateMode(format);
  const timeMode = calendarState === CalendarState.TIME || mode === DateMode.Time;
  const monthMode = calendarState === CalendarState.MONTH || mode === DateMode.Month;
  const inSameThisMonthDate = (date: Date) => isSameMonth(calendarDate, date);

  const calendarClasses = merge(
    className,
    withClassPrefix({
      'time-view': timeMode,
      'month-view': monthMode,
      'only-time': mode === DateMode.Time,
      'show-week-numbers': showWeekNumbers
    })
  );
  const timeDropdownProps = pick(rest, calendarOnlyProps);

  const handleChangeMonth = useEventCallback((date: Date, event: React.MouseEvent) => {
    reset();
    onChangeMonth?.(date, event);
  });

  const contextValue = {
    date: calendarDate,
    dateRange,
    format,
    hoverRangeValue,
    inline,
    isoWeek,
    weekStart,
    targetId,
    locale,
    showWeekNumbers,
    monthDropdownProps,
    cellClassName,
    disabledDate: isDateDisabled,
    inSameMonth: inSameThisMonthDate,
    onChangeMonth: handleChangeMonth,
    onChangeTime,
    onMouseMove,
    onSelect,
    renderCell,
    renderCellOnPicker
  };

  return (
    <CalendarProvider value={contextValue}>
      <Component
        data-testid="calendar"
        {...omitHideDisabledProps<Partial<CalendarProps>>(rest)}
        className={calendarClasses}
        ref={ref}
      >
        {mode !== DateMode.Time && (
          <CalendarHeader
            {...handlers}
            showMonth={has('month')}
            showDate={has('day')}
            showTime={has('time')}
            disabledTime={isTimeDisabled}
            renderTitle={renderTitle}
            renderToolbar={renderToolbar}
            disabledBackward={disabledBackward}
            disabledForward={disabledForward}
          />
        )}
        {has('day') && <CalendarBody />}
        {has('month') && (
          <MonthDropdown
            show={monthMode}
            limitEndYear={limitEndYear}
            limitStartYear={limitStartYear}
            disabledMonth={isDateDisabled}
          />
        )}
        {has('time') && (
          <TimeDropdown {...timeDropdownProps} show={timeMode} showMeridiem={showMeridiem} />
        )}

        {(monthMode || timeMode) && has('day') && (
          <button
            className={prefix('btn-close')}
            onClick={handleCloseDropdown}
            aria-label={`Collapse ${monthMode ? 'month' : 'time'} view`}
          >
            <ArrowUpIcon />
          </button>
        )}
      </Component>
    </CalendarProvider>
  );
});

CalendarContainer.displayName = 'CalendarContainer';

export default CalendarContainer;
