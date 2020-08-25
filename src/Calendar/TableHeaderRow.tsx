import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export type TableHeaderRowProps = WithAsProps;

const defaultProps: Partial<TableHeaderRowProps> = {
  classPrefix: 'calendar-table',
  as: 'div'
};

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const TableHeaderRow: RsRefForwardingComponent<'div', TableHeaderRowProps> = React.forwardRef(
  (props: TableHeaderRowProps, ref) => {
    const { as: Component, className, classPrefix, ...rest } = props;
    const { locale, showWeekNumbers, isoWeek } = useCalendarContext();
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('row'), prefix('header-row'));
    let items = weekKeys;

    if (isoWeek) {
      items = weekKeys.filter(v => v !== 'sunday');
      items.push('sunday');
    }

    return (
      <Component {...rest} ref={ref} role="row" className={classes}>
        {showWeekNumbers && <div className={prefix('cell')} role="columnheader" />}
        {items.map(key => (
          <div key={key} className={prefix('cell')} role="columnheader">
            <span className={prefix('cell-content')}>{locale?.[key]}</span>
          </div>
        ))}
      </Component>
    );
  }
);

TableHeaderRow.displayName = 'TableHeaderRow';
TableHeaderRow.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
TableHeaderRow.defaultProps = defaultProps;

export default TableHeaderRow;
