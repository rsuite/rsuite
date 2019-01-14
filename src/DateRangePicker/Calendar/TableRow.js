// @flow

import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import { getUnhandledProps, prefix, defaultProps } from '../../utils';

import Type from '../Type';

type Props = {
  weekendDate?: dayjs.Dayjs,
  selected: Array<dayjs.Dayjs>,
  hoverValue: Array<dayjs.Dayjs>,
  onSelect?: (date: dayjs.Dayjs) => void,
  disabledDate?: (
    date: dayjs.Dayjs,
    selectValue: Array<dayjs.Dayjs | null>,
    type: string
  ) => boolean,
  inSameMonth?: (date: dayjs.Dayjs) => boolean,
  onMouseMove?: (date: dayjs.Dayjs) => void,
  className?: string,
  classPrefix?: string
};

class TableRow extends React.Component<Props> {
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
    const selectedStartDate = selected[0] ? selected[0].clone() : null;
    const selectedEndDate = selected[1] ? selected[1].clone() : null;
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;

    for (let i = 0; i < 7; i += 1) {
      let thisDate = dayjs(weekendDate).add(i, 'd');
      let selectValue = [selectedStartDate, selectedEndDate];

      let disabled = disabledDate && disabledDate(thisDate.clone(), selectValue, Type.CALENDAR);
      let isToday = thisDate.isSame(dayjs(), 'date');
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

const enhance = defaultProps({
  classPrefix: 'calendar-table'
});

export default enhance(TableRow);
