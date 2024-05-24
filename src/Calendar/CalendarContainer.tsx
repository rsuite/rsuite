import React, { HTMLAttributes, useMemo } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import CalendarBody from './CalendarBody';
import CalendarHeader, { CalendarHeaderProps } from './CalendarHeader';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import {
  disableTime,
  addMonths,
  shouldRenderDate,
  shouldRenderTime,
  shouldRenderMonth,
  isSameMonth,
  calendarOnlyProps,
  omitHideDisabledProps,
  isValid
} from '@/internals/utils/date';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { CalendarLocale } from '../locales';
import { CalendarProvider } from './CalendarContext';
import useCalendarState, { CalendarState } from './useCalendarState';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

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
  locale: CalendarLocale;

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

const CalendarContainer: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar',
      dateRange,
      disabledBackward,
      defaultState,
      disabledDate,
      disabledForward,
      format,
      hoverRangeValue,
      isoWeek = false,
      weekStart = 0,
      targetId,
      limitEndYear,
      limitStartYear,
      locale,
      onChangeMonth,
      onChangeTime,
      onMouseMove,
      onMoveBackward,
      onMoveForward,
      onSelect,
      onToggleMeridian,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      calendarDate: calendarDateProp,
      cellClassName,
      renderCell,
      renderCellOnPicker,
      renderTitle,
      renderToolbar,
      showMeridian,
      showWeekNumbers,
      inline,
      ...rest
    } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const { calendarState, reset, openMonth, openTime } = useCalendarState(defaultState);

    const calendarDate = useMemo(() => {
      return isValid(calendarDateProp) ? calendarDateProp : new Date();
    }, [calendarDateProp]);

    const isDateDisabled = useEventCallback((date: Date) => disabledDate?.(date) ?? false);
    const isTimeDisabled = (date: Date) => disableTime(props, date);
    const handleMoveForward = useEventCallback(() => {
      onMoveForward?.(addMonths(calendarDate, 1));
    });

    const handleMoveBackward = useEventCallback(() => {
      onMoveBackward?.(addMonths(calendarDate, -1));
    });

    // It is displayed as the month to be selected.
    const toggleMonthView = useEventCallback(() => {
      if (calendarState === CalendarState.MONTH) {
        reset();
      } else {
        openMonth();
      }

      onToggleMonthDropdown?.(calendarState !== CalendarState.MONTH);
    });

    // It is displayed as a time to be selected.
    const toggleTimeView = useEventCallback(() => {
      if (calendarState === CalendarState.TIME) {
        reset();
      } else {
        openTime();
      }

      onToggleTimeDropdown?.(calendarState !== CalendarState.TIME);
    });

    const handleCloseDropdown = useEventCallback(() => reset());

    const renderDate = shouldRenderDate(format);
    const renderTime = shouldRenderTime(format);
    const renderMonth = shouldRenderMonth(format);

    const onlyShowTime = renderTime && !renderDate && !renderMonth;
    const onlyShowMonth = renderMonth && !renderDate && !renderTime;
    const showTime = calendarState === CalendarState.TIME || onlyShowTime;
    const showMonth = calendarState === CalendarState.MONTH || onlyShowMonth;

    const inSameThisMonthDate = (date: Date) => isSameMonth(calendarDate, date);

    const calendarClasses = merge(
      className,
      withClassPrefix({
        'time-view': showTime,
        'month-view': showMonth,
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
      disabledDate: isDateDisabled,
      format,
      hoverRangeValue,
      inSameMonth: inSameThisMonthDate,
      isoWeek,
      weekStart,
      targetId,
      locale,
      onChangeMonth: handleChangeMonth,
      onChangeTime,
      onMouseMove,
      onSelect,
      cellClassName,
      renderCell,
      renderCellOnPicker,
      showWeekNumbers,
      inline
    };

    return (
      <CalendarProvider value={contextValue}>
        <Component
          data-testid="calendar"
          {...omitHideDisabledProps<Partial<CalendarProps>>(rest)}
          className={calendarClasses}
          ref={ref}
        >
          <CalendarHeader
            showMonth={renderMonth}
            showDate={renderDate}
            showTime={renderTime}
            showMeridian={showMeridian}
            disabledTime={isTimeDisabled}
            onMoveForward={handleMoveForward}
            onMoveBackward={handleMoveBackward}
            onToggleMonthDropdown={toggleMonthView}
            onToggleTimeDropdown={toggleTimeView}
            onToggleMeridian={onToggleMeridian}
            renderTitle={renderTitle}
            renderToolbar={renderToolbar}
            disabledBackward={disabledBackward}
            disabledForward={disabledForward}
          />
          {renderDate && <CalendarBody />}
          {renderMonth && (
            <MonthDropdown
              show={showMonth}
              limitEndYear={limitEndYear}
              limitStartYear={limitStartYear}
              disabledMonth={isDateDisabled}
            />
          )}
          {renderTime && (
            <TimeDropdown {...timeDropdownProps} show={showTime} showMeridian={showMeridian} />
          )}

          {(showMonth || showTime) && renderDate && (
            <button
              className={prefix('btn-close')}
              onClick={handleCloseDropdown}
              aria-label={`Collapse ${showMonth ? 'month' : 'time'} view`}
            >
              <AngleUpIcon />
            </button>
          )}
        </Component>
      </CalendarProvider>
    );
  }
);

CalendarContainer.displayName = 'CalendarContainer';
CalendarContainer.propTypes = {
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
  limitStartYear: PropTypes.number,
  locale: PropTypes.object,
  onChangeMonth: PropTypes.func,
  onChangeTime: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onMoveForward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  calendarDate: PropTypes.instanceOf(Date),
  renderCell: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool
};

export default CalendarContainer;
