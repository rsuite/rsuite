import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addDays, isSameDay, isBefore, isAfter, getDate, format } from 'date-fns';

import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import { TYPE } from '../utils';
import IntlContext from '../../IntlProvider/IntlContext';

export interface TableRowProps {
  weekendDate?: Date;
  selected: Date[];
  hoverValue: Date[];
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent) => void;
  disabledDate?: (date: Date, selectValue: Date[], type: string) => boolean;
  inSameMonth?: (date: Date) => boolean;
  onMouseMove?: (date: Date) => void;
}

class TableRow extends React.Component<TableRowProps> {
  static propTypes = {
    weekendDate: PropTypes.instanceOf(Date),
    selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onSelect: PropTypes.func,
    disabledDate: PropTypes.func,
    inSameMonth: PropTypes.func,
    onMouseMove: PropTypes.func
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
      onMouseMove,
      onSelect
    } = this.props;

    const days = [];
    const selectedStartDate = selected[0];
    const selectedEndDate = selected[1];
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;

    for (let i = 0; i < 7; i += 1) {
      let thisDate = addDays(weekendDate, i);
      let selectValue = [selectedStartDate, selectedEndDate];

      let disabled = disabledDate?.(thisDate, selectValue, TYPE.CALENDAR);
      let isToday = isSameDay(thisDate, new Date());
      let inRange = false;

      let unSameMonth = !inSameMonth?.(thisDate);

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
        <IntlContext.Consumer key={title}>
          {context => (
            <div
              className={classes}
              role="menu"
              tabIndex={-1}
              title={isToday ? `${title} (${context?.today})` : title}
              onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined}
              onClick={!disabled && onSelect?.bind(null, thisDate)}
            >
              <span className={this.addPrefix('cell-content')}>{getDate(thisDate)}</span>
            </div>
          )}
        </IntlContext.Consumer>
      );
    }
    return days;
  }

  renderWeekNumber() {
    return (
      <div className={this.addPrefix('cell-week-number')}>
        {format(this.props.weekendDate, 'W')}
      </div>
    );
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

const enhance = defaultProps<TableRowProps>({
  classPrefix: 'calendar-table'
});

export default enhance(TableRow);
