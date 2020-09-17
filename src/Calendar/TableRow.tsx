import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSameDay, addDays, getDate, format } from 'date-fns';

import { getUnhandledProps, prefix, defaultProps } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';

export interface TableRowProps {
  weekendDate?: Date;
  selected?: Date;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  disabledDate?: (date: Date) => boolean;
  inSameMonth?: (date: Date) => boolean;
  renderCell?: (date: Date) => React.ReactNode;
}

class TableRow extends React.PureComponent<TableRowProps> {
  static contextType = IntlContext;
  static propTypes = {
    weekendDate: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onSelect: PropTypes.func,
    disabledDate: PropTypes.func,
    inSameMonth: PropTypes.func,
    renderCell: PropTypes.func
  };
  static defaultProps = {
    selected: new Date(),
    weekendDate: new Date()
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (
    date: Date,
    disabled: boolean | void,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (disabled) {
      return;
    }
    this.props.onSelect?.(date, event);
  };

  renderDays() {
    const { weekendDate, disabledDate, inSameMonth, selected, renderCell } = this.props;
    const { formatDate, formattedDayPattern, today } = this.context || {};
    const formatStr = formattedDayPattern || 'YYYY-MM-DD';
    const days = [];

    for (let i = 0; i < 7; i += 1) {
      const thisDate = addDays(weekendDate, i);
      const disabled = disabledDate?.(thisDate);
      const isToday = isSameDay(thisDate, new Date());
      const classes = classNames(this.addPrefix('cell'), {
        [this.addPrefix('cell-un-same-month')]: !(inSameMonth && inSameMonth(thisDate)),
        [this.addPrefix('cell-is-today')]: isToday,
        [this.addPrefix('cell-selected')]: isSameDay(thisDate, selected),
        [this.addPrefix('cell-disabled')]: disabled
      });

      const title = formatDate ? formatDate(thisDate, formatStr) : format(thisDate, formatStr);
      days.push(
        <div
          key={title}
          className={classes}
          role="menu"
          tabIndex={-1}
          title={isToday ? `${title} (${today})` : title}
          onClick={this.handleSelect.bind(this, thisDate, disabled)}
        >
          <div className={this.addPrefix('cell-content')}>
            <span className={this.addPrefix('cell-day')}>{getDate(thisDate)}</span>
            {renderCell && renderCell(thisDate)}
          </div>
        </div>
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
