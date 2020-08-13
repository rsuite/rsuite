import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';

export interface TableProps {
  rows: any[];
  isoWeek?: boolean;
  selected?: Date;
  timeZone?: string;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  disabledDate?: (date: Date) => boolean;
  inSameMonth?: (date: Date) => boolean;
  renderCell?: (date: Date) => React.ReactNode;
}

const defaultProps = {
  rows: [],
  classPrefix: 'calendar-table'
};

const Table = React.forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const {
    rows,
    selected,
    onSelect,
    disabledDate,
    inSameMonth,
    className,
    classPrefix,
    isoWeek,
    renderCell,
    showWeekNumbers,
    timeZone,
    ...rest
  } = props;

  const classes = classNames(classPrefix, className);

  return (
    <div {...rest} ref={ref} className={classes}>
      <TableHeaderRow isoWeek={isoWeek} showWeekNumbers={showWeekNumbers} />

      {rows.map((week, index) => (
        <TableRow
          key={index}
          weekendDate={week}
          timeZone={timeZone}
          selected={selected}
          onSelect={onSelect}
          inSameMonth={inSameMonth}
          disabledDate={disabledDate}
          renderCell={renderCell}
          showWeekNumbers={showWeekNumbers}
          isoWeek={isoWeek}
        />
      ))}
    </div>
  );
});

Table.displayName = 'Table';
Table.propTypes = {
  rows: PropTypes.array,
  isoWeek: PropTypes.bool,
  timeZone: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  inSameMonth: PropTypes.func,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  renderCell: PropTypes.func
};
Table.defaultProps = defaultProps;

export default Table;
