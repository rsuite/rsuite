import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export interface TableProps extends WithAsProps {
  rows: any[];
}

const Table: RsRefForwardingComponent<'div', TableProps> = React.forwardRef(
  (props: TableProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-table',
      rows = [],
      ...rest
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const { targetId } = useCalendarContext();

    return (
      <Component
        role="grid"
        tabIndex={-1}
        id={targetId ? `${targetId}-${classPrefix}` : undefined}
        {...rest}
        ref={ref}
        className={classes}
      >
        <TableHeaderRow />
        {rows.map((week, index) => (
          <TableRow key={index} weekendDate={week} rowIndex={index + 1} />
        ))}
      </Component>
    );
  }
);

Table.displayName = 'CalendarTable';
Table.propTypes = {
  rows: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default Table;
