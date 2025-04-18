import React from 'react';
import Grid from './Grid';
import { forwardRef } from '@/internals/utils';
import { getWeekStartDates, setDate } from '@/internals/utils/date';
import { useStyles } from '@/internals/hooks';
import { useCalendar } from './hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export type CalendarBodyProps = WithAsProps;

const CalendarBody = forwardRef<'div', CalendarBodyProps>((props, ref) => {
  const { as: Component = 'div', className, classPrefix = 'calendar-body', ...rest } = props;
  const { date = new Date(), locale: overrideLocale, weekStart } = useCalendar();
  const { getLocale, formatDate } = useCustom();

  const locale = getLocale('Calendar', overrideLocale);
  const thisMonthDate = setDate(date, 1);

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return (
    <Component {...rest} ref={ref} className={classes}>
      <Grid
        rows={getWeekStartDates(thisMonthDate, {
          weekStart,
          locale: locale?.dateLocale
        })}
        aria-label={formatDate(thisMonthDate, locale.formattedMonthPattern)}
      />
    </Component>
  );
});

CalendarBody.displayName = 'CalendarBody';

export default CalendarBody;
