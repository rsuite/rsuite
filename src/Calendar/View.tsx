import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { getMonthView, useClassNames, DateUtils } from '../utils';
import Table from './Table';
import composeFunctions from '../utils/composeFunctions';
import { CalendarContext } from './Calendar';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type ViewProps = WithAsProps;

const defaultProps: Partial<ViewProps> = {
  as: 'div',
  classPrefix: 'calendar-view'
};

const View: RsRefForwardingComponent<'div', ViewProps> = React.forwardRef(
  (props: ViewProps, ref) => {
    const { as: Component, className, classPrefix, ...rest } = props;
    const { date = new Date(), isoWeek } = useContext(CalendarContext);

    const inSameThisMonthDate = useCallback(
      (date: Date) =>
        composeFunctions(
          d => DateUtils.setDate(d, 1),
          d => DateUtils.isSameMonth(d, date)
        )(date),
      []
    );

    const thisMonthDate = DateUtils.setDate(date, 1);
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component role="row" {...rest} ref={ref} className={classes}>
        <Table rows={getMonthView(thisMonthDate, isoWeek)} inSameMonth={inSameThisMonthDate} />
      </Component>
    );
  }
);

View.displayName = 'View';
View.defaultProps = defaultProps;
View.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default View;
