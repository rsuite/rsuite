// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';

import Type from '../Type';

type Props = {
  weekendDate?: moment$Moment,
  selected: Array<moment$Moment>,
  hoverValue: Array<moment$Moment>,
  onSelect?: (date: moment$Moment) => void,
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    type: string
  ) => boolean,
  inSameMonth?: (date: moment$Moment) => boolean,
  onMouseMove?: (date: moment$Moment) => void,
  className?: string,
  classPrefix?: string
};

const { namespace } = constants;

class TableRow extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${namespace}-calendar-table`,
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
    const selectedStartDate = selected[0] ? selected[0].clone() : null;
    const selectedEndDate = selected[1] ? selected[1].clone() : null;
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;

    for (let i = 0; i < 7; i += 1) {
      let thisDate = moment(weekendDate).add(i, 'd');
      let selectValue = [selectedStartDate, selectedEndDate].sort(
        (a, b) => (a ? a.unix() : 0) - (b ? b.unix() : 0)
      );

      let disabled = disabledDate && disabledDate(thisDate.clone(), selectValue, Type.CALENDAR);
      let isToday = thisDate.isSame(moment(), 'date');
      let inRange = false;

      let unSameMonth = !(inSameMonth && inSameMonth(thisDate));

      const isStartSelected =
        !unSameMonth && selectedStartDate && thisDate.isSame(selectedStartDate, 'date');
      const isEndSelected =
        !unSameMonth && selectedEndDate && thisDate.isSame(selectedEndDate, 'date');

      const isSelected = isStartSelected || isEndSelected;

      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (
          thisDate.isBefore(selectedEndDate, 'date') &&
          thisDate.isAfter(selectedStartDate, 'date')
        ) {
          inRange = true;
        }
        if (
          thisDate.isBefore(selectedStartDate, 'date') &&
          thisDate.isAfter(selectedEndDate, 'date')
        ) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!thisDate.isAfter(hoverEndDate, 'date') && !thisDate.isBefore(hoverStartDate, 'date')) {
          inRange = true;
        }
        if (!thisDate.isAfter(hoverStartDate, 'date') && !thisDate.isBefore(hoverEndDate, 'date')) {
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

      let title = thisDate.format('YYYY-MM-DD');

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? `${title} (Today)` : title}
          onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined}
          onClick={
            !disabled && onSelect ? _.debounce(onSelect.bind(null, thisDate), 100) : undefined
          }
          key={title}
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

export default TableRow;
