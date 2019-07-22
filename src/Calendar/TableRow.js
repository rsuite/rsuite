// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import { isSameDay, addDays, getDate, format } from 'date-fns';

type Props = {
  weekendDate?: Date,
  selected?: Date,
  onSelect?: (date: Date) => void,
  disabledDate?: (date: Date) => boolean,
  inSameMonth?: (date: Date) => boolean,
  className?: string,
  classPrefix?: string,
  showWeekNumbers?: boolean
};

class TableRow extends React.PureComponent<Props> {
  static contextTypes = {
    locale: PropTypes.object
  };
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

    const days = [];

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

      let title = format(thisDate, 'YYYY-MM-DD');

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? `${title} (${_.get(this.context, 'locale.today')})` : title}
          onClick={this.handleSelect.bind(this, thisDate, disabled)}
          key={i}
        >
          <span className={this.addPrefix('cell-content')}>{getDate(thisDate)}</span>
        </div>
      );
    }
    return days;
  }

  renderWeekNumber() {
    const { weekendDate } = this.props;
    return <div className={this.addPrefix('cell-week-number')}>{format(weekendDate, 'W')}</div>;
  }

  render() {
    const { className, showWeekNumbers, ...rest } = this.props;

    const classes = classNames(this.addPrefix('row'), className);
    const unhandled = getUnhandledProps(TableRow, rest);

    return (
      <div {...unhandled} className={classes}>
        {showWeekNumbers && this.renderWeekNumber()}
        {this.renderDays()}
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-table'
});

export default enhance(TableRow);
