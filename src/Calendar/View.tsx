import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { isSameMonth, setDate } from '../utils/dateUtils';
import { getMonthView, useClassNames } from '../utils';
import Table from './Table';
import composeFunctions from '../utils/composeFunctions';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type ViewProps = WithAsProps;

const defaultProps: Partial<ViewProps> = {
  classPrefix: 'calendar-view',
  as: 'div'
};

const View: RsRefForwardingComponent<'div', ViewProps> = React.forwardRef(
  (props: ViewProps, ref) => {
    const { className, classPrefix, as: Component, ...rest } = props;
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
      <Component {...rest} ref={ref} role="row" className={classes}>
        <Table rows={getMonthView(thisMonthDate, isoWeek)} inSameMonth={inSameThisMonthDate} />
      </Component>
    );
  }
);

View.displayName = 'View';
View.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
View.defaultProps = defaultProps;

export default View;
