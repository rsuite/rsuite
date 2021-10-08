import React from 'react';
import PropTypes from 'prop-types';
import { DateUtils, useClassNames } from '../utils';
import Table from './Table';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type ViewProps = WithAsProps;

const View: RsRefForwardingComponent<'div', ViewProps> = React.forwardRef(
  (props: ViewProps, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-view', ...rest } = props;
    const { date = new Date(), isoWeek } = useCalendarContext();
    const thisMonthDate = DateUtils.setDate(date, 1);
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component role="row" {...rest} ref={ref} className={classes}>
        <Table rows={DateUtils.getMonthView(thisMonthDate, isoWeek)} />
      </Component>
    );
  }
);

View.displayName = 'View';
View.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default View;
