import React, { useMemo } from 'react';
import { setMonth, setYear } from '@/internals/utils/date';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { composeFunctions } from '@/internals/utils';
import { useCustom } from '../../CustomProvider';
import { useCalendar } from '../hooks';
import { getAriaLabel } from '../utils';
import type { RsRefForwardingComponent, WithAsProps } from '@/internals/types';

export interface MonthDropdownItemProps extends WithAsProps {
  month?: number;
  year?: number;
  active?: boolean;
  disabled?: boolean;
}

const MonthDropdownItem: RsRefForwardingComponent<'div', MonthDropdownItemProps> = React.forwardRef(
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
    const ariaLabel = currentMonth
      ? getAriaLabel(currentMonth, formatStr, formatDate, { locale: overrideLocale?.dateLocale })
      : '';

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
        <span className={prefix('content')}>
          {formatDate(currentMonth, 'MMM', { locale: overrideLocale?.dateLocale })}
        </span>
      </Component>
    );
  }
);
MonthDropdownItem.displayName = 'MonthDropdownItem';

export default MonthDropdownItem;
