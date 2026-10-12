import React, { useCallback } from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { useCalendar } from '../hooks';
import type { WithAsProps } from '@/internals/types';
import type { PlainYearMonth } from '@/internals/utils/date/types';
import { useGetAriaLabelForMonth } from '../utils/getAriaLabel';
import { jalaliYearMonthToGregorianDate } from '@/internals/utils/date/jalali';

export interface MonthDropdownItemProps extends WithAsProps {
  yearMonth: PlainYearMonth;
  active?: boolean;
  disabled?: boolean;
}

const MonthDropdownItem = forwardRef<'div', MonthDropdownItemProps>(
  (props: MonthDropdownItemProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-month-dropdown-cell',
      yearMonth,
      active,
      disabled,
      ...rest
    } = props;

    const { onChangeMonth } = useCalendar();
    const formatMonth = useFormatMonth();
    const getAriaLabelForMonth = useGetAriaLabelForMonth();

    const handleClick = useEventCallback((event: React.MouseEvent) => {
      if (disabled) {
        return;
      }

      onChangeMonth?.(yearMonth, event);
    });

    const { prefix, merge, withPrefix } = useStyles(classPrefix);
    const classes = merge(className, withPrefix({ active }), { disabled });
    const ariaLabel = getAriaLabelForMonth(yearMonth);

    return (
      <Component
        role="gridcell"
        aria-selected={active}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        tabIndex={active ? 0 : -1}
        ref={ref}
        className={classes}
        onClick={handleClick}
        {...rest}
      >
        <span className={prefix('content')}>{formatMonth(yearMonth)}</span>
      </Component>
    );
  }
);
MonthDropdownItem.displayName = 'MonthDropdownItem';

export default MonthDropdownItem;

function useFormatMonth(): (month: PlainYearMonth) => string {
  const { locale: overrideLocale } = useCalendar();
  const { formatDate, getLocale } = useCustom('Calendar');
  const locale = getLocale('Calendar', overrideLocale);
  const isJalali = locale?.calendarSystem === 'jalali';

  return useCallback(
    (month: PlainYearMonth) => {
      // For Jalali: month.year and month.month are Jalali coordinates.
      // Convert to a Gregorian date, then format with the Jalali locale.
      const date = isJalali
        ? jalaliYearMonthToGregorianDate(month)
        : new Date(month.year, month.month - 1, 1);
      return formatDate(date, 'MMM');
    },
    [formatDate, isJalali]
  );
}
