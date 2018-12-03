// @flow

import * as React from 'react';
import classNames from 'classnames';

import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { defaultProps } from '../utils';

type Props = {
  rows: any[],
  isoWeek?: boolean,
  selected?: moment$Moment,
  onSelect?: (date: moment$Moment) => void,
  disabledDate?: (date: moment$Moment) => boolean,
  inSameMonth?: (date: moment$Moment) => boolean,
  className?: string,
  classPrefix?: string
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
            onSelect={onSelect}
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
