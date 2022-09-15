import React from 'react';
import PropTypes from 'prop-types';
import { DateUtils, useClassNames, useCustom } from '../utils';
import Table from './Table';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type CalendarBodyProps = WithAsProps;

const CalendarBody: RsRefForwardingComponent<'div', CalendarBodyProps> = React.forwardRef(
  (props, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-body', ...rest } = props;
    const { date = new Date(), isoWeek, locale: overrideLocale } = useCalendarContext();
    const { locale, formatDate } = useCustom('Calendar', overrideLocale);
    const thisMonthDate = DateUtils.setDate(date, 1);
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component {...rest} ref={ref} className={classes}>
        <Table
          rows={DateUtils.getMonthView(thisMonthDate, isoWeek)}
          aria-label={formatDate(thisMonthDate, locale.formattedMonthPattern)}
        />
      </Component>
    );
  }
);

CalendarBody.displayName = 'CalendarBody';
CalendarBody.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default CalendarBody;
