import React from 'react';
import Grid from './Grid';
import { forwardRef } from '@/internals/utils';
import { getWeekStartDates } from '@/internals/utils/date';
import { useStyles, useCustom } from '@/internals/hooks';
import { useCalendar } from './hooks';
import type { WithAsProps } from '@/internals/types';
import type { PlainYearMonth } from '@/internals/utils/date/types';
import { useGetAriaLabelForMonth } from './utils/getAriaLabel';

export type CalendarBodyProps = WithAsProps & {
  yearMonth: PlainYearMonth;
};

/**
 * The calendar month view, i.e. grid of dates.
 */
const CalendarBody = forwardRef<'div', CalendarBodyProps>((props, ref) => {
  const {
    yearMonth,
    as: Component = 'div',
    className,
    classPrefix = 'calendar-body',
    ...rest
  } = props;
  const { locale: overrideLocale, weekStart } = useCalendar();
  const { getLocale } = useCustom();

  const locale = getLocale('Calendar', overrideLocale);
  const getAriaLabelForMonth = useGetAriaLabelForMonth();

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Component {...rest} ref={ref} className={classes}>
      <Grid
        rows={getWeekStartDates(yearMonth, {
          weekStart,
          locale: locale?.dateLocale
        })}
        aria-label={getAriaLabelForMonth(yearMonth)}
      />
    </Component>
  );
});

CalendarBody.displayName = 'CalendarBody';

export default CalendarBody;
