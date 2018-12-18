// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { getUnhandledProps, prefix, defaultProps } from '../utils';

type Props = {
  weekendDate?: moment$Moment,
  selected?: moment$Moment,
  onSelect?: (date: moment$Moment) => void,
  disabledDate?: (date: moment$Moment) => boolean,
  inSameMonth?: (date: moment$Moment) => boolean,
  className?: string,
  classPrefix?: string
};

class TableRow extends React.PureComponent<Props> {
  static defaultProps = {
    selected: moment()
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (date: moment$Moment, disabled: boolean | void) => {
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
      let thisDate = moment(weekendDate).add(i, 'd');
      let disabled = disabledDate && disabledDate(thisDate.clone());
      let isToday = thisDate.isSame(moment(), 'date');
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
