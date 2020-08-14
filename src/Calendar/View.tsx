import React, { HTMLAttributes, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isSameMonth, setDate } from '../utils/dateUtils';
import { getMonthView, useClassNames } from '../utils';
import Table from './Table';
import composeFunctions from '../utils/composeFunctions';
import { useCalendarContext } from './CalendarContext';

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  classPrefix?: string;
}

const defaultProps = {
  classPrefix: 'calendar-view'
};

const View = React.forwardRef((props: ViewProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, classPrefix, ...rest } = props;
  const { date = new Date(), isoWeek } = useCalendarContext();

  const inSameThisMonthDate = useCallback(
    (date: Date) =>
      composeFunctions(
        d => setDate(d, 1),
        d => isSameMonth(d, date)
      )(date),
    []
  );

  const thisMonthDate = setDate(date, 1);
  const { merge, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(rootPrefix(classPrefix), className);

  return (
    <div {...rest} ref={ref} className={classes}>
      <Table rows={getMonthView(thisMonthDate, isoWeek)} inSameMonth={inSameThisMonthDate} />
    </div>
  );
});

View.displayName = 'View';
View.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
View.defaultProps = defaultProps;

export default View;
