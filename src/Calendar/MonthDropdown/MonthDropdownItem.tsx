import React, { useCallback, useMemo } from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { useCalendar } from '../hooks';
import type { WithAsProps } from '@/internals/types';
import type { PlainYearMonth } from '@/internals/utils/date/types';

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

    const { onChangeMonth: onSelect } = useCalendar();
    const formatMonth = useFormatMonth();
    const getAriaLabelForMonth = useGetAriaLabelForMonth();

    const handleClick = useEventCallback((event: React.MouseEvent) => {
      if (disabled) {
        return;
      }

      onSelect?.(new Date(yearMonth.year, yearMonth.month - 1, 1), event);
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
  const { formatDate } = useCustom('Calendar');

  return useCallback(
    (month: PlainYearMonth) => formatDate(new Date(month.year, month.month - 1, 1), 'MMM'),
    [formatDate]
  );
}

function useGetAriaLabelForMonth(): (month: PlainYearMonth) => string {
  const { locale: overrideLocale } = useCalendar();
  const { getLocale, formatDate } = useCustom('Calendar');

  const { formattedMonthPattern } = useMemo(
    () => getLocale('Calendar', overrideLocale),
    [getLocale, overrideLocale]
  );

  return useCallback(
    (month: PlainYearMonth) =>
      formatDate(new Date(month.year, month.month - 1, 1), formattedMonthPattern),
    [formatDate, formattedMonthPattern]
  );
}
