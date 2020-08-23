import * as React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { useCalendarContext } from './CalendarContext';
import { HTMLAttributes } from 'react';

export interface TableHeaderRowProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  classPrefix?: string;
}

const defaultProps = {
  classPrefix: 'calendar-table'
};

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const TableHeaderRow = React.forwardRef(
  (props: TableHeaderRowProps, ref: React.Ref<HTMLDivElement>) => {
    const { className, classPrefix, ...rest } = props;
    const { locale, showWeekNumbers, isoWeek } = useCalendarContext();
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(prefix('row'), prefix('header-row'), className);
    let items = weekKeys;

    if (isoWeek) {
      items = weekKeys.filter(v => v !== 'sunday');
      items.push('sunday');
    }

    return (
      <div {...rest} ref={ref} role="row" className={classes}>
        {showWeekNumbers && <div className={prefix('cell')} role="columnheader" />}
        {items.map(key => (
          <div key={key} className={prefix('cell')} role="columnheader">
            <span className={prefix('cell-content')}>{locale?.[key]}</span>
          </div>
        ))}
      </div>
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
