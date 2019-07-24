import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { defaultProps } from '../utils';

export interface TableProps {
  rows: any[];
  isoWeek?: boolean;
  selected?: Date;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  disabledDate?: (date: Date) => boolean;
  inSameMonth?: (date: Date) => boolean;
  renderCell?: (date: Date) => React.ReactNode;
}

class Table extends React.PureComponent<TableProps> {
  static propTypes = {
    rows: PropTypes.array,
    isoWeek: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
    disabledDate: PropTypes.func,
    inSameMonth: PropTypes.func,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    renderCell: PropTypes.func
  };
  static defaultProps = {
    rows: []
  };
  render() {
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
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div {...rest} className={classes}>
        <TableHeaderRow isoWeek={isoWeek} showWeekNumbers={showWeekNumbers} />

        {rows.map((week, index) => (
          <TableRow
            /* eslint-disable */
            key={index}
            weekendDate={week}
            selected={selected}
            onSelect={onSelect}
            inSameMonth={inSameMonth}
            disabledDate={disabledDate}
            renderCell={renderCell}
            showWeekNumbers={showWeekNumbers}
          />
        ))}
      </div>
    );
  }
}

const enhance = defaultProps<TableProps>({
  classPrefix: 'calendar-table'
});

export default enhance(Table);
