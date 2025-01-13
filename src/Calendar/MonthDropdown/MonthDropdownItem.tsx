import React, { useMemo } from 'react';
import { forwardRef, composeFunctions } from '@/internals/utils';
import { setMonth, setYear } from '@/internals/utils/date';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../../CustomProvider';
import { useCalendar } from '../hooks';
import { getAriaLabel } from '../utils';
import type { WithAsProps } from '@/internals/types';

export interface MonthDropdownItemProps extends WithAsProps {
  month?: number;
  year?: number;
  active?: boolean;
  disabled?: boolean;
}

const MonthDropdownItem = forwardRef<'div', MonthDropdownItemProps>(
  (props: MonthDropdownItemProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-month-dropdown-cell',
      active,
      disabled,
      month = 0,
      year,
      ...rest
    } = props;

    const { date, onChangeMonth: onSelect, locale: overrideLocale } = useCalendar();
    const { getLocale, formatDate } = useCustom('Calendar');
    const { formattedMonthPattern: formatStr } = getLocale('Calendar', overrideLocale);

    const currentMonth = useMemo(() => {
      if (year && month) {
        return composeFunctions(
          d => setYear(d, year),
          d => setMonth(d, month - 1)
        )(date);
      }
      return date;
    }, [date, month, year]);

    const handleClick = useEventCallback((event: React.MouseEvent) => {
      if (disabled) {
        return;
      }

      onSelect?.(currentMonth, event);
    });

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active }), { disabled });
    const ariaLabel = currentMonth ? getAriaLabel(currentMonth, formatStr, formatDate) : '';

    return (
      <Component
        key={month}
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
        <span className={prefix('content')}>{formatDate(currentMonth, 'MMM')}</span>
      </Component>
    );
  }
);
MonthDropdownItem.displayName = 'MonthDropdownItem';

export default MonthDropdownItem;
