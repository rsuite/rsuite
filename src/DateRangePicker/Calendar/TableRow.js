// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps } from '../../utils';

import Type from '../Type';
import { addDays, isSameDay, isBefore, isAfter } from 'date-fns';
import { getDate, format } from 'date-fns';

type Props = {
  weekendDate?: Date,
  selected: Array<Date>,
  hoverValue: Array<Date>,
  onSelect?: (date: Date) => void,
  disabledDate?: (date: Date, selectValue: Array<Date | null>, type: string) => boolean,
  inSameMonth?: (date: Date) => boolean,
  onMouseMove?: (date: Date) => void,
  className?: string,
  classPrefix?: string
};

class TableRow extends React.Component<Props> {
  static contextTypes = {
    locale: PropTypes.object
  };
  static defaultProps = {
    selected: [],
    hoverValue: []
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  renderDays() {
    const {
      weekendDate,
      disabledDate,
      inSameMonth,
      selected,
      hoverValue,
      onSelect,
      onMouseMove
    } = this.props;

    const days = [];
    const selectedStartDate = selected[0];
    const selectedEndDate = selected[1];
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;

    for (let i = 0; i < 7; i += 1) {
      let thisDate = addDays(weekendDate, i);
      let selectValue = [selectedStartDate, selectedEndDate];

      let disabled = disabledDate && disabledDate(thisDate, selectValue, Type.CALENDAR);
      let isToday = isSameDay(thisDate, new Date());
      let inRange = false;

      let unSameMonth = !(inSameMonth && inSameMonth(thisDate));

      const isStartSelected =
        !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
      const isEndSelected = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);

      const isSelected = isStartSelected || isEndSelected;

      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (isBefore(thisDate, selectedEndDate) && isAfter(thisDate, selectedStartDate)) {
          inRange = true;
        }
        if (isBefore(thisDate, selectedStartDate) && isAfter(thisDate, selectedEndDate)) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
          inRange = true;
        }
        if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }

      let classes = classNames(this.addPrefix('cell'), {
        [this.addPrefix('cell-un-same-month')]: unSameMonth,
        [this.addPrefix('cell-is-today')]: isToday,
        [this.addPrefix('cell-selected-start')]: isStartSelected,
        [this.addPrefix('cell-selected-end')]: isEndSelected,
        [this.addPrefix('cell-selected')]: isSelected,
        [this.addPrefix('cell-in-range')]: !unSameMonth && inRange,
        [this.addPrefix('cell-disabled')]: disabled
      });

      let title = format(thisDate, 'YYYY-MM-DD');

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? `${title} (${_.get(this.context, 'locale.today')})` : title}
          onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined}
          onClick={
            !disabled && onSelect ? _.debounce(onSelect.bind(null, thisDate), 100) : undefined
          }
          key={title}
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
