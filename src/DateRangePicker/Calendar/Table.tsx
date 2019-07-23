import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps } from '../../utils';
import TableRow from './TableRow';
import TableHeaderRow from '../../Calendar/TableHeaderRow';

export interface TableProps {
  rows: any[];
  isoWeek?: boolean;
  selected?: Date[];
  hoverValue?: Date[];
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date) => void;
  onMouseMove?: (date: Date) => void;
  disabledDate?: (date: Date, selectValue: Date[], type: string) => boolean;
  inSameMonth?: (date: Date) => boolean;
}

class Table extends React.Component<TableProps> {
  static propTypes = {
    rows: PropTypes.array,
    isoWeek: PropTypes.bool,
    selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
    disabledDate: PropTypes.func,
    inSameMonth: PropTypes.func
  };
  static defaultProps = {
    rows: []
  };

  render() {
    const {
      rows,
      selected,
      hoverValue,
      onSelect,
      onMouseMove,
      disabledDate,
      inSameMonth,
      className,
      classPrefix,
      isoWeek,
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
            hoverValue={hoverValue}
            onSelect={onSelect}
            onMouseMove={onMouseMove}
            inSameMonth={inSameMonth}
            disabledDate={disabledDate}
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
