import React from 'react';
import CalendarContainer from './CalendarContainer';
import Button from '../Button';
import { forwardRef } from '@/internals/utils';
import { isSameMonth, startOfDay } from '@/internals/utils/date';
import { FormattedDate } from '../CustomProvider';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { useCalendarDate } from './hooks';
import { useCustom } from '../CustomProvider';
import type { CalendarLocale } from '../locales';
import type { WithAsProps } from '@/internals/types';
import type { MonthDropdownProps } from './types';

export interface CalendarProps extends WithAsProps {
  /**
   * Controlled value
   */
  value?: Date;

  /**
   * Default value
   */
  defaultValue?: Date;

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   *
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  isoWeek?: boolean;

  /**
   * Display a compact calendar
   */
  compact?: boolean;

  /**
   * Show border
   */
  bordered?: boolean;

  /**
   * Custom locale object
   *
   * @see https://rsuitejs.com/guide/i18n/#calendar
   */
  locale?: CalendarLocale;

  /**
   * The index of the first day of the week (0 - Sunday)
   * If `isoWeek` is `true`, the value of `weekStart` is ignored.
   *
   * @default 0
   */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The props for the Month Dropdown component.
   */
  monthDropdownProps?: MonthDropdownProps;

  /**
   * Callback fired before the value changed
   */
  onChange?: (date: Date) => void;

  /**
   * Callback fired before the month changed
   * @todo-Doma Change signature to `onMonthChange(year: number, month: number, reason: string)`?
   */
  onMonthChange?: (date: Date) => void;

  /**
   * Callback fired before the date selected
   */
  onSelect?: (date: Date) => void;

  /**
   * Custom render calendar cells
   */
  renderCell?: (date: Date) => React.ReactNode;

  /**
   * Custom cell classes base on it's date
   */
  cellClassName?: (date: Date) => string | undefined;
}

/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
const Calendar = forwardRef<typeof CalendarContainer, CalendarProps>(
  (props: CalendarProps, ref) => {
    const { propsWithDefaults } = useCustom('Calendar', props);
    const {
      as: Component = CalendarContainer,
      bordered,
      className,
      classPrefix = 'calendar',
      compact,
      defaultValue = startOfDay(new Date()),
      isoWeek,
      weekStart = 0,
      locale,
      onChange,
      onMonthChange,
      onSelect,
      renderCell,
      value,
      cellClassName,
      ...rest
    } = propsWithDefaults;

    const { calendarDate, setCalendarDate } = useCalendarDate(value, defaultValue);

    const handleChange = useEventCallback((nextValue: Date) => {
      setCalendarDate(nextValue);
      onChange?.(nextValue);

      if (!isSameMonth(nextValue, calendarDate)) {
        onMonthChange?.(nextValue);
      }
    });

    const handleClickToday = useEventCallback(() => {
      handleChange(new Date());
    });

    const handleSelect = useEventCallback((nextValue: Date) => {
      onSelect?.(nextValue);
      handleChange(nextValue);
    });

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const renderToolbar = () => (
      <Button className={prefix('btn-today')} size="sm" onClick={handleClickToday}>
        {locale?.today || 'Today'}
      </Button>
    );

    const renderTitle = (date: Date) => (
      <FormattedDate date={date} formatStr={locale?.formattedMonthPattern || 'MMMM  yyyy'} />
    );

    const classes = merge(className, withClassPrefix('panel', { bordered, compact }));

    return (
      <Component
        {...rest}
        inline
        className={classes}
        ref={ref}
        isoWeek={isoWeek}
        weekStart={weekStart}
        format="yyyy-MM-dd"
        calendarDate={calendarDate}
        limitEndYear={1000}
        locale={locale}
        renderTitle={renderTitle}
        renderToolbar={renderToolbar}
        renderCell={renderCell}
        cellClassName={cellClassName}
        onMoveForward={handleChange}
        onMoveBackward={handleChange}
        onChangeMonth={handleChange}
        onSelect={handleSelect}
      />
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;
