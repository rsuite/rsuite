// @flow

import * as React from 'react';
import classNames from 'classnames';

import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { defaultProps } from '../utils';

type Props = {
  rows: any[],
  isoWeek?: boolean,
  selected?: Date,
  onSelect?: (date: Date) => void,
  disabledDate?: (date: Date) => boolean,
  inSameMonth?: (date: Date) => boolean,
  className?: string,
  classPrefix?: string,
  showWeekNumbers?: boolean
};

class Table extends React.PureComponent<Props> {
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
            showWeekNumbers={showWeekNumbers}
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
