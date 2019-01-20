// @flow

import * as React from 'react';
import classNames from 'classnames';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import { isSameDay, addDays, getDate } from 'date-fns';

type Props = {
  weekendDate?: Date,
  selected?: Date,
  onSelect?: (date: Date) => void,
  disabledDate?: (date: Date) => boolean,
  inSameMonth?: (date: Date) => boolean,
  className?: string,
  classPrefix?: string
};

class TableRow extends React.PureComponent<Props> {
  static defaultProps = {
    selected: new Date(),
    weekendDate: new Date()
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (date: Date, disabled: boolean | void) => {
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
      let thisDate = addDays(weekendDate, i);
      let disabled = disabledDate && disabledDate(thisDate);
      let isToday = isSameDay(thisDate, new Date());
      let classes = classNames(this.addPrefix('cell'), {
        [this.addPrefix('cell-un-same-month')]: !(inSameMonth && inSameMonth(thisDate)),
        [this.addPrefix('cell-is-today')]: isToday,
        [this.addPrefix('cell-selected')]: isSameDay(thisDate, selected),
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
          <span className={this.addPrefix('cell-content')}>{getDate(thisDate)}</span>
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
