import React from 'react';
import Grid from './Grid';
import { getWeekStartDates, setDate } from '@/internals/utils/date';
import { useClassNames } from '@/internals/hooks';
import { useCalendar } from './hooks';
import { useCustom } from '../CustomProvider';
import type { RsRefForwardingComponent, WithAsProps } from '@/internals/types';

export type CalendarBodyProps = WithAsProps;

const CalendarBody: RsRefForwardingComponent<'div', CalendarBodyProps> = React.forwardRef(
  (props, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-body', ...rest } = props;
    const { date = new Date(), isoWeek, locale: overrideLocale, weekStart } = useCalendar();
    const { getLocale, formatDate } = useCustom();

    const locale = getLocale('Calendar', overrideLocale);
    const thisMonthDate = setDate(date, 1);

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component {...rest} ref={ref} className={classes}>
        <Grid
          rows={getWeekStartDates(thisMonthDate, {
            isoWeek,
            weekStart,
            locale: locale?.dateLocale
          })}
          aria-label={formatDate(thisMonthDate, locale.formattedMonthPattern)}
        />
      </Component>
    );
  }
);

CalendarBody.displayName = 'CalendarBody';

export default CalendarBody;
