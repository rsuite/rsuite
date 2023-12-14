import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import isSameMonth from 'date-fns/isSameMonth';
import CalendarContainer from './CalendarContainer';
import { CalendarLocale } from '../locales';
import Button from '../Button';
import { FormattedDate } from '../CustomProvider';
import { useClassNames, useCustom } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import useCalendarDate from './useCalendarDate';

export interface CalendarProps extends WithAsProps {
  /** Controlled value */
  value?: Date;

  /** Default value  */
  defaultValue?: Date;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day  */
  isoWeek?: boolean;

  /** Display a compact calendar   */
  compact?: boolean;

  /** Show border   */
  bordered?: boolean;

  /** Custom locale */
  locale?: CalendarLocale;

  /**  Callback fired before the value changed  */
  onChange?: (date: Date) => void;

  /**
   * Callback fired before the month changed
   * @todo-Doma Change signature to `onMonthChange(year: number, month: number, reason: string)`?
   */
  onMonthChange?: (date: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date) => void;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;

  /** Custom cell classes base on it's date */
  cellClassName?: (date: Date) => string | undefined;
}

/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
const Calendar: RsRefForwardingComponent<typeof CalendarContainer, CalendarProps> =
  React.forwardRef((props: CalendarProps, ref) => {
    const {
      as: Component = CalendarContainer,
      bordered,
      className,
      classPrefix = 'calendar',
      compact,
      defaultValue = new Date(),
      isoWeek,
      locale: overrideLocale,
      onChange,
      onMonthChange,
      onSelect,
      renderCell,
      value,
      cellClassName,
      ...rest
    } = props;

    const { calendarDate, setCalendarDate } = useCalendarDate(value, defaultValue);
    const { locale } = useCustom('Calendar', overrideLocale);

    const handleChange = useCallback(
      (nextValue: Date) => {
        setCalendarDate(nextValue);
        onChange?.(nextValue);

        if (!isSameMonth(nextValue, calendarDate)) {
          onMonthChange?.(nextValue);
        }
      },
      [setCalendarDate, onChange, calendarDate, onMonthChange]
    );

    const handleClickToday = useCallback(() => {
      handleChange(new Date());
    }, [handleChange]);

    const handleSelect = useCallback(
      (nextValue: Date) => {
        onSelect?.(nextValue);
        handleChange(nextValue);
      },
      [handleChange, onSelect]
    );

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const renderToolbar = useCallback(
      () => (
        <Button className={prefix('btn-today')} size="sm" onClick={handleClickToday}>
          {locale.today || 'Today'}
        </Button>
      ),
      [handleClickToday, locale.today, prefix]
    );

    const customRenderCell = useCallback((date: Date) => renderCell?.(date), [renderCell]);

    const classes = merge(className, withClassPrefix('panel', { bordered, compact }));

    return (
      <Component
        {...rest}
        inline
        className={classes}
        ref={ref}
        isoWeek={isoWeek}
        format="yyyy-MM-dd"
        calendarDate={calendarDate}
        limitEndYear={1000}
        locale={locale}
        renderTitle={date => (
          <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  yyyy'} />
        )}
        renderToolbar={renderToolbar}
        renderCell={customRenderCell}
        cellClassName={cellClassName}
        onMoveForward={handleChange}
        onMoveBackward={handleChange}
        onChangeMonth={handleChange}
        onSelect={handleSelect}
      />
    );
  });

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderCell: PropTypes.func
};

export default Calendar;
