import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import { useClassNames, DateUtils, TimeZone } from '../utils';
import { CalendarContext } from './Calendar';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export interface TableRowProps extends WithAsProps {
  weekendDate?: Date;
  inSameMonth?: (date: Date) => boolean;
}
const defaultProps: Partial<TableRowProps> = {
  as: 'div',
  classPrefix: 'calendar-table',
  weekendDate: new Date()
};

const TableRow: RsRefForwardingComponent<'div', TableRowProps> = React.forwardRef(
  (props: TableRowProps, ref) => {
    const { as: Component, className, classPrefix, inSameMonth, weekendDate, ...rest } = props;
    const {
      date: selectedDate = new Date(),
      disabledDate,
      formatDate,
      onSelect,
      renderCell,
      isoWeek,
      locale,
      showWeekNumbers,
      timeZone
    } = useContext(CalendarContext);
    const { prefix, merge } = useClassNames(classPrefix);

    const handleSelect = useCallback(
      (date: Date, disabled: boolean | void, event: React.MouseEvent) => {
        if (disabled) {
          return;
        }

        onSelect?.(date, event);
      },
      [onSelect]
    );

    const renderDays = () => {
      const formatStr = locale?.formattedDayPattern || 'yyyy-MM-dd';
      const days = [];
      const todayDate = TimeZone.zonedDate(timeZone);

      for (let i = 0; i < 7; i += 1) {
        const thisDate = DateUtils.addDays(weekendDate, i);
        const disabled = disabledDate?.(thisDate);
        const isToday = DateUtils.isSameDay(thisDate, todayDate);
        const cellClasses = prefix('cell', {
          'cell-un-same-month': !(inSameMonth && inSameMonth(thisDate)),
          'cell-is-today': isToday,
          'cell-selected': DateUtils.isSameDay(thisDate, selectedDate),
          'cell-disabled': disabled
        });

        const title = formatDate
          ? formatDate(thisDate, formatStr)
          : DateUtils.format(thisDate, formatStr);
        days.push(
          <div role="cell" key={title} className={cellClasses}>
            <div
              role="button"
              className={prefix('cell-content')}
              tabIndex={-1}
              title={isToday ? `${title} (${locale?.today})` : title}
              onClick={partial(handleSelect, thisDate, disabled)}
            >
              <span className={prefix('cell-day')}>{DateUtils.getDate(thisDate)}</span>
              {renderCell && renderCell(thisDate)}
            </div>
          </div>
        );
      }
      return days;
    };

    const classes = merge(className, prefix('row'));

    return (
      <Component {...rest} ref={ref} role="row" className={classes}>
        {showWeekNumbers && (
          <div className={prefix('cell-week-number')} role="cell">
            {DateUtils.format(props.weekendDate, isoWeek ? 'I' : 'w')}
          </div>
        )}
        {renderDays()}
      </Component>
    );
  }
);

TableRow.displayName = 'TableRow';
TableRow.defaultProps = defaultProps;
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  inSameMonth: PropTypes.func
};

export default TableRow;
