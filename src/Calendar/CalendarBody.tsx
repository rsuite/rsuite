import React from 'react';
import { getWeekStartDates, startOfMonth } from '@/internals/utils/date';
import { useClassNames, useCustom } from '@/internals/hooks';
import Table from './Table';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';

export type CalendarBodyProps = WithAsProps;

const CalendarBody: RsRefForwardingComponent<'div', CalendarBodyProps> = React.forwardRef(
  (props, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-body', ...rest } = props;
    const { date = new Date(), isoWeek, locale: overrideLocale, weekStart } = useCalendarContext();
    const { locale, formatDate } = useCustom('Calendar', overrideLocale);

    const firstDayOfMonth = startOfMonth(date);
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component {...rest} ref={ref} className={classes}>
        <Table
          rows={getWeekStartDates(firstDayOfMonth, {
            isoWeek,
            weekStart,
            locale: locale?.dateLocale
          })}
          aria-label={formatDate(firstDayOfMonth, locale.formattedMonthPattern)}
        />
      </Component>
    );
  }
);

CalendarBody.displayName = 'CalendarBody';

export default CalendarBody;
