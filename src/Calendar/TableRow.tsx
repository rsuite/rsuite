import React from 'react';
import { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { addDays, format, getDate, isSameDay } from '../utils/dateUtils';
import { useClassNames } from '../utils';
import { zonedDate } from '../utils/timeZone';
import { useCalendarContext } from './CalendarContext';

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  weekendDate?: Date;
  className?: string;
  classPrefix?: string;
  inSameMonth?: (date: Date) => boolean;
}
const defaultProps = {
  weekendDate: new Date(),
  classPrefix: 'calendar-table'
};

const TableRow = React.forwardRef((props: TableRowProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, classPrefix, inSameMonth, weekendDate, ...rest } = props;
  const {
    date: selected = new Date(),
    disabledDate,
    formatDate,
    isoWeek,
    locale: { formattedDayPattern, today } = {},
    onSelect,
    renderCell,
    showWeekNumbers,
    timeZone
  } = useCalendarContext();
  const { prefix, merge } = useClassNames(classPrefix);

  const handleSelect = (
    date: Date,
    disabled: boolean | void,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (disabled) {
      return;
    }
    onSelect?.(date, event);
  };

  const renderDays = () => {
    const formatStr = formattedDayPattern || 'yyyy-MM-dd';
    const days = [];
    const todayDate = zonedDate(timeZone);

    for (let i = 0; i < 7; i += 1) {
      const thisDate = addDays(weekendDate, i);
      const disabled = disabledDate?.(thisDate);
      const isToday = isSameDay(thisDate, todayDate);
      const classes = merge(prefix('cell'), {
        [prefix('cell-un-same-month')]: !(inSameMonth && inSameMonth(thisDate)),
        [prefix('cell-is-today')]: isToday,
        [prefix('cell-selected')]: isSameDay(thisDate, selected),
        [prefix('cell-disabled')]: disabled
      });

      const title = formatDate ? formatDate(thisDate, formatStr) : format(thisDate, formatStr);
      days.push(
        <div
          key={title}
          className={classes}
          role="cell"
          tabIndex={-1}
          title={isToday ? `${title} (${today})` : title}
          onClick={_.partial(handleSelect, thisDate, disabled)}
        >
          <div className={prefix('cell-content')} role="button">
            <span className={prefix('cell-day')}>{getDate(thisDate)}</span>
            {renderCell && renderCell(thisDate)}
          </div>
        </div>
      );
    }
    return days;
  };

  const renderWeekNumber = () => {
    return (
      <div className={prefix('cell-week-number')} role="cell">
        {format(props.weekendDate, isoWeek ? 'I' : 'w')}
      </div>
    );
  };

  const classes = merge(prefix('row'), className);

  return (
    <div {...rest} ref={ref} role="row" className={classes}>
      {showWeekNumbers && renderWeekNumber()}
      {renderDays()}
    </div>
  );
});

TableRow.displayName = 'TableRow';
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  inSameMonth: PropTypes.func
};

TableRow.defaultProps = defaultProps;

export default TableRow;
