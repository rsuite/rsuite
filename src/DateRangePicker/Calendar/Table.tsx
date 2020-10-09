import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../../utils';
import TableRow from './TableRow';
import TableHeaderRow from '../../Calendar/TableHeaderRow';
import { WithAsProps } from '../../@types/common';

export interface TableProps extends WithAsProps {
  rows: Date[];
  selected?: Date[];
  hoverValue?: Date[];
  onMouseMove?: (date: Date) => void;
  inSameMonth?: (date: Date) => boolean;
}

const defaultProps: Partial<TableProps> = {
  as: 'div',
  classPrefix: 'calendar-table',
  rows: []
};

const Table = React.forwardRef((props: TableProps, ref) => {
  const {
    as: Component,
    rows,
    selected,
    hoverValue,
    className,
    classPrefix,
    onMouseMove,
    inSameMonth,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <Component {...rest} ref={ref} className={classes}>
      <TableHeaderRow />
      {rows.map((week, index) => (
        <TableRow
          key={index}
          weekendDate={week}
          selected={selected}
          hoverValue={hoverValue}
          onMouseMove={onMouseMove}
          inSameMonth={inSameMonth}
        />
      ))}
    </Component>
  );
});

Table.displayName = 'Table';
Table.defaultProps = defaultProps;
Table.propTypes = {
  rows: PropTypes.array,
  selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onMouseMove: PropTypes.func,
  inSameMonth: PropTypes.func
};

export default Table;
