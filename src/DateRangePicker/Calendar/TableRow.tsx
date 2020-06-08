import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format } from 'date-fns';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import getDate from 'date-fns/getDate';

import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import IntlContext from '../../IntlProvider/IntlContext';
import { DATERANGE_DISABLED_TARGET } from '../../constants';
import { formatNewDate } from '../../utils/formatUtils';

import { legacyParse, convertTokens } from '@date-fns/upgrade/v2';

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
  static contextType = IntlContext;
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

    const { formatDate, formattedDayPattern, today } = this.context || {};
    const formatStr = formatNewDate(formattedDayPattern) || 'yyyy-MM-dd';

    const days = [];
    const selectedStartDate = selected[0];
    const selectedEndDate = selected[1];
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;

    for (let i = 0; i < 7; i += 1) {
      const thisDate = addDays(legacyParse(weekendDate), i);
      const selectValue = [selectedStartDate, selectedEndDate];
      const disabled = disabledDate?.(thisDate, selectValue, DATERANGE_DISABLED_TARGET.CALENDAR);
      const isToday = isSameDay(legacyParse(thisDate), legacyParse(new Date()));
      const unSameMonth = !inSameMonth?.(thisDate);
      const isStartSelected =
        !unSameMonth && selectedStartDate && isSameDay(legacyParse(thisDate), legacyParse(selectedStartDate));
      const isEndSelected = !unSameMonth && selectedEndDate && isSameDay(legacyParse(thisDate), legacyParse(selectedEndDate));
      const isSelected = isStartSelected || isEndSelected;

      let inRange = false;
      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (isBefore(legacyParse(thisDate), legacyParse(selectedEndDate)) && isAfter(legacyParse(thisDate), legacyParse(selectedStartDate))) {
          inRange = true;
        }
        if (isBefore(legacyParse(thisDate), legacyParse(selectedStartDate)) && isAfter(legacyParse(thisDate), legacyParse(selectedEndDate))) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!isAfter(legacyParse(thisDate), legacyParse(hoverEndDate)) && !isBefore(legacyParse(thisDate), legacyParse(hoverStartDate))) {
          inRange = true;
        }
        if (!isAfter(legacyParse(thisDate), legacyParse(hoverStartDate)) && !isBefore(legacyParse(thisDate), legacyParse(hoverEndDate))) {
          inRange = true;
        }
      }

      const classes = classNames(this.addPrefix('cell'), {
        [this.addPrefix('cell-un-same-month')]: unSameMonth,
        [this.addPrefix('cell-is-today')]: isToday,
        [this.addPrefix('cell-selected-start')]: isStartSelected,
        [this.addPrefix('cell-selected-end')]: isEndSelected,
        [this.addPrefix('cell-selected')]: isSelected,
        [this.addPrefix('cell-in-range')]: !unSameMonth && inRange,
        [this.addPrefix('cell-disabled')]: disabled
      });

      const title = formatDate ? formatDate(thisDate, formatStr) : format(legacyParse(thisDate), convertTokens(formatStr));

      days.push(
        <div
          key={title}
          className={classes}
          role="menu"
          tabIndex={-1}
          title={isToday ? `${title} (${today})` : title}
          onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined}
          onClick={!disabled ? onSelect?.bind(null, thisDate) : undefined}
        >
          <span className={this.addPrefix('cell-content')}>{getDate(legacyParse(thisDate))}</span>
        </div>
      );
    }
    return days;
  }

  renderWeekNumber() {
    return (
      <div className={this.addPrefix('cell-week-number')}>
        {format(legacyParse(this.props.weekendDate), 'w')}
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
