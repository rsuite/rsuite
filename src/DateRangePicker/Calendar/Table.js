// @flow

import * as React from 'react';
import classNames from 'classnames';

import TableRow from './TableRow';
import TableHeaderRow from '../../Calendar/TableHeaderRow';

type Props = {
  rows: Array<any>,
  isoWeek?: boolean,
  selected?: Array<moment$Moment>,
  hoverValue?: Array<moment$Moment>,
  onSelect?: (date: moment$Moment) => void,
  onMouseMove?: (date: moment$Moment) => void,
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    type: string
  ) => boolean,
  inSameMonth?: (date: moment$Moment) => boolean,
  className?: string,
  classPrefix?: string
};

class Table extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'rs-calendar-table',
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
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div {...rest} className={classes}>
        <TableHeaderRow isoWeek={isoWeek} />
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
          />
        ))}
      </div>
    );
  }
}

export default Table;
