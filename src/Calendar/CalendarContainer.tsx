import React, { HTMLAttributes, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import CalendarBody from './CalendarBody';
import CalendarHeader, { CalendarHeaderProps } from './CalendarHeader';
import { useClassNames, composeFunctions } from '../utils';
import {
  disabledTime,
  addMonths,
  shouldRenderDate,
  shouldRenderTime,
  shouldRenderMonth,
  setDate,
  isSameMonth,
  calendarOnlyProps,
  omitHideDisabledProps
} from '../utils/dateUtils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { CalendarLocale } from '../locales';
import { CalendarProvider } from './CalendarContext';
import useCalendarState, { CalendarState } from './useCalendarState';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';

export interface CalendarProps
  extends WithAsProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange' | 'onMouseMove'>,
    CalendarHeaderProps {
  /** The panel render based on date range */
  dateRange?: Date[];

  /** Date displayed on the current page */
  calendarDate: Date;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  inline?: boolean;

  defaultState?: CalendarState;

  /** Disabled date */
  disabledDate?: (date: Date) => boolean;

  /** Disabled hours */
  disabledHours?: (hour: number, date: Date) => boolean;

  /** Disabled minutes */
  disabledMinutes?: (minute: number, date: Date) => boolean;

  /** Hidden seconds */
  disabledSeconds?: (second: number, date: Date) => boolean;

  /** Format str */
  format: string;

  /** Hidden hours */
  hideHours?: (hour: number, date: Date) => boolean;

  /** Hidden minutes */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /** Hidden seconds */
  hideSeconds?: (second: number, date: Date) => boolean;

  /** The value that mouse hover on in range selection */
  hoverRangeValue?: [Date, Date];

  /** Is it in the same month as today */
  inSameMonth?: (date: Date) => boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Limit showing how many years in the future */
  limitEndYear?: number;

  /** Custom locale */
  locale: CalendarLocale;

  /** Callback after the date has changed */
  onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;

  /** Callback after the time has changed */
  onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;

  /** Callback after mouse enter other date cell */
  onMouseMove?: (date: Date) => void;

  /** Switch to the callback triggered after the previous month. */
  onMoveBackward?: (nextPageDate: Date) => void;

  /** Switch to the callback triggered after the next month. */
  onMoveForward?: (nextPageDate: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date, event: React.MouseEvent) => void;

  /** Custom rendering cell*/
  renderCell?: (date: Date) => React.ReactNode;

  /** Called when opening the month view */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /** Called when opening the time view */
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
      inSameMonth,
      isoWeek = false,
      limitEndYear,
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
      calendarDate,
      renderCell,
      renderTitle,
      renderToolbar,
      showMeridian,
      showWeekNumbers,
      inline,
      ...rest
    } = props;
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

    const { calendarState, reset, openMonth, openTime } = useCalendarState(defaultState);

    const isDisabledDate = useCallback(
      (date: Date) => disabledDate?.(date) ?? false,
      [disabledDate]
    );
    const isTimeDisabled = (date: Date) => disabledTime(props, date);
    const handleMoveForward = useCallback(() => {
      onMoveForward?.(addMonths(calendarDate, 1));
    }, [onMoveForward, calendarDate]);

    const handleMoveBackward = useCallback(() => {
      onMoveBackward?.(addMonths(calendarDate, -1));
    }, [onMoveBackward, calendarDate]);

    // It is displayed as the month to be selected.
    const toggleMonthView = useCallback(() => {
      if (calendarState === CalendarState.MONTH) {
        reset();
      } else {
        openMonth();
      }

      onToggleMonthDropdown?.(calendarState !== CalendarState.MONTH);
    }, [calendarState, onToggleMonthDropdown, openMonth, reset]);

    // It is displayed as a time to be selected.
    const toggleTimeView = useCallback(() => {
      if (calendarState === CalendarState.TIME) {
        reset();
      } else {
        openTime();
      }

      onToggleTimeDropdown?.(calendarState !== CalendarState.TIME);
    }, [calendarState, onToggleTimeDropdown, openTime, reset]);

    const handleCloseDropdown = useCallback(() => reset(), [reset]);

    const renderDate = shouldRenderDate(format);
    const renderTime = shouldRenderTime(format);
    const renderMonth = shouldRenderMonth(format);

    const onlyShowTime = renderTime && !renderDate && !renderMonth;
    const onlyShowMonth = renderMonth && !renderDate && !renderTime;
    const showTime = calendarState === CalendarState.TIME || onlyShowTime;
    const showMonth = calendarState === CalendarState.MONTH || onlyShowMonth;

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
        'time-view': showTime,
        'month-view': showMonth,
        'show-week-numbers': showWeekNumbers
      })
    );
    const timeDropdownProps = pick(rest, calendarOnlyProps);

    const handleChangeMonth = useCallback(
      (date: Date, event: React.MouseEvent) => {
        reset();
        onChangeMonth?.(date, event);
      },
      [onChangeMonth, reset]
    );

    const contextValue = useMemo(
      () => ({
        date: calendarDate,
        dateRange,
        disabledDate: isDisabledDate,
        format,
        hoverRangeValue,
        inSameMonth: inSameMonth ?? inSameThisMonthDate,
        isoWeek,
        locale,
        onChangeMonth: handleChangeMonth,
        onChangeTime,
        onMouseMove,
        onSelect,
        renderCell,
        showWeekNumbers,
        inline
      }),
      [
        calendarDate,
        dateRange,
        format,
        handleChangeMonth,
        hoverRangeValue,
        inSameMonth,
        inSameThisMonthDate,
        inline,
        isDisabledDate,
        isoWeek,
        locale,
        onChangeTime,
        onMouseMove,
        onSelect,
        renderCell,
        showWeekNumbers
      ]
    );
    return (
      <CalendarProvider value={contextValue}>
        <Component
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
              disabledMonth={isDisabledDate}
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
  inSameMonth: PropTypes.func,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
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
