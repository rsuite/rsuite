// @flow

import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { getUnhandledProps, prefix, defaultProps } from '../utils';

type Props = {
  weekendDate?: dayjs.Dayjs,
  selected?: dayjs.Dayjs,
  onSelect?: (date: dayjs.Dayjs) => void,
  disabledDate?: (date: dayjs.Dayjs) => boolean,
  inSameMonth?: (date: dayjs.Dayjs) => boolean,
  className?: string,
  classPrefix?: string
};

class TableRow extends React.PureComponent<Props> {
  static defaultProps = {
    selected: dayjs()
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (date: dayjs.Dayjs, disabled: boolean | void) => {
    const { onSelect } = this.props;
    if (disabled) {
      return;
    }
    onSelect && onSelect(date);
  };

  renderDays() {
    const { weekendDate, disabledDate, inSameMonth, selected } = this.props;

    let days = [];
    for (let i = 0; i < 7; i += 1) {
      let thisDate = dayjs(weekendDate).add(i, 'd');
      let disabled = disabledDate && disabledDate(thisDate.clone());
      let isToday = thisDate.isSame(dayjs(), 'date');
      let classes = classNames(this.addPrefix('cell'), {
        [this.addPrefix('cell-un-same-month')]: !(inSameMonth && inSameMonth(thisDate)),
        [this.addPrefix('cell-is-today')]: isToday,
        [this.addPrefix('cell-selected')]: thisDate.isSame(selected, 'date'),
        [this.addPrefix('cell-disabled')]: disabled
      });

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? 'Today' : ''}
          onClick={this.handleSelect.bind(this, thisDate, disabled)}
          key={i}
        >
          <span className={this.addPrefix('cell-content')}>{thisDate.date()}</span>
        </div>
      );
    }
    return days;
  }

  render() {
    const { className, ...rest } = this.props;

    const classes = classNames(this.addPrefix('row'), className);
    const unhandled = getUnhandledProps(TableRow, rest);

    return (
      <div {...unhandled} className={classes}>
        {this.renderDays()}
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-table'
});

export default enhance(TableRow);
