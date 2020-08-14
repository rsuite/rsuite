import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { useClassNames } from '../utils';
import { HTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  rows: any[];
  className?: string;
  classPrefix?: string;
  inSameMonth?: (date: Date) => boolean;
}

const defaultProps = {
  rows: [],
  classPrefix: 'calendar-table'
};

const Table = React.forwardRef((props: TableProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, classPrefix, inSameMonth, rows, ...rest } = props;
  const { merge, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(rootPrefix(classPrefix), className);

  return (
    <div {...rest} ref={ref} className={classes}>
      <TableHeaderRow />
      {rows.map((week, index) => (
        <TableRow key={index} weekendDate={week} inSameMonth={inSameMonth} />
      ))}
    </div>
  );
});

Table.displayName = 'Table';
Table.propTypes = {
  rows: PropTypes.array,
  inSameMonth: PropTypes.func,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
Table.defaultProps = defaultProps;

export default Table;
