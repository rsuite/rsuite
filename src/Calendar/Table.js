// @flow

import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { defaultProps } from '../utils';

type Props = {
  rows: any[],
  isoWeek?: boolean,
  selected?: dayjs.Dayjs,
  onSelect?: (date: dayjs.Dayjs) => void,
  disabledDate?: (date: dayjs.Dayjs) => boolean,
  inSameMonth?: (date: dayjs.Dayjs) => boolean,
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
