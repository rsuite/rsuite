import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { addDays, format, getDate, isSameDay } from '../utils/dateUtils';
import { getUnhandledProps, useClassNames, useCustom } from '../utils';
import { zonedDate } from '../utils/timeZone';
import { CalendarLocaleTypes } from './types';

export interface TableRowProps {
  weekendDate?: Date;
  selected?: Date;
  timeZone?: string;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  isoWeek?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  disabledDate?: (date: Date) => boolean;
  inSameMonth?: (date: Date) => boolean;
  renderCell?: (date: Date) => React.ReactNode;
}
const defaultProps = {
  selected: new Date(),
  weekendDate: new Date(),
  classPrefix: 'calendar-table'
};

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>((props, ref) => {
  const {
    classPrefix,
    onSelect,
    weekendDate,
    disabledDate,
    inSameMonth,
    selected,
    renderCell,
    timeZone,
    className,
    showWeekNumbers,
    ...rest
  } = props;
  const { formatDate, formattedDayPattern, today } = useCustom<CalendarLocaleTypes>('Calendar');
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
          role="menu"
          tabIndex={-1}
          title={isToday ? `${title} (${today})` : title}
          onClick={_.partial(handleSelect, thisDate, disabled)}
        >
          <div className={prefix('cell-content')}>
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
      <div className={prefix('cell-week-number')}>
        {format(props.weekendDate, props.isoWeek ? 'I' : 'w')}
      </div>
    );
  };

  const classes = merge(prefix('row'), className);
  const unhandled = getUnhandledProps(TableRow, rest);

  return (
    <div {...unhandled} ref={ref} className={classes}>
      {showWeekNumbers && renderWeekNumber()}
      {renderDays()}
    </div>
  );
});

TableRow.displayName = 'TableRow';
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  timeZone: PropTypes.string,
  showWeekNumbers: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  renderCell: PropTypes.func,
  isoWeek: PropTypes.bool
};

TableRow.defaultProps = defaultProps;

export default TableRow;
