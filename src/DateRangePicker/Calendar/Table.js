// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps } from '../../utils';
import TableRow from './TableRow';
import TableHeaderRow from '../../Calendar/TableHeaderRow';

type Props = {
  rows: any[],
  isoWeek?: boolean,
  selected?: Array<Date>,
  hoverValue?: Array<Date>,
  onSelect?: (date: Date) => void,
  onMouseMove?: (date: Date) => void,
  disabledDate?: (date: Date, selectValue: Array<Date | null>, type: string) => boolean,
  inSameMonth?: (date: Date) => boolean,
  className?: string,
  classPrefix?: string
};

class Table extends React.Component<Props> {
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

const enhance = defaultProps({
  classPrefix: 'calendar-table'
});

export default enhance(Table);
