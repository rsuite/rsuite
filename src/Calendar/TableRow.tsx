import React from 'react';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import { addDays, format, getDate, isAfter, isBefore, isSameDay } from '../utils/dateUtils';
import { useClassNames } from '../utils';
import { zonedDate } from '../utils/timeZone';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { DATERANGE_DISABLED_TARGET } from '../constants';

export interface TableRowProps extends WithAsProps {
  weekendDate?: Date;
  inSameMonth?: (date: Date) => boolean;
}
const defaultProps: Partial<TableRowProps> = {
  weekendDate: new Date(),
  classPrefix: 'calendar-table',
  as: 'div'
};

const TableRow: RsRefForwardingComponent<'div', TableRowProps> = React.forwardRef(
  (props: TableRowProps, ref) => {
    const { as: Component, className, classPrefix, inSameMonth, weekendDate, ...rest } = props;
    const {
      date: selected = new Date(),
      disabledDate,
      formatDate,
      isoWeek,
      locale: { formattedDayPattern, today } = {},
      onSelect,
      renderCell,
      showWeekNumbers,
      timeZone,
      onMouseMove,
      dateRange,
      hoverRangeValue
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
      const [selectedStartDate, selectedEndDate] = dateRange || [];
      const [hoverStartDate, hoverEndDate] = hoverRangeValue || [];
      const isRangeSelectionMode = typeof dateRange !== 'undefined';
      const todayDate = zonedDate(timeZone);

      for (let i = 0; i < 7; i += 1) {
        const thisDate = addDays(weekendDate, i);
        const disabled = disabledDate?.(thisDate, dateRange, DATERANGE_DISABLED_TARGET.CALENDAR);
        const isToday = isSameDay(thisDate, todayDate);
        const unSameMonth = !inSameMonth?.(thisDate);
        const isStartSelected =
          !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
        const isEndSelected =
          !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
        const isSelected = isStartSelected || isEndSelected;

        let inRange = false;
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

        console.log(!unSameMonth, inRange, )
        const classes = merge(prefix('cell'), {
          [prefix('cell-un-same-month')]: unSameMonth,
          [prefix('cell-is-today')]: isToday,
          [prefix('cell-selected')]: isRangeSelectionMode
            ? isSelected
            : isSameDay(thisDate, selected),
          [prefix('cell-selected-start')]: isStartSelected,
          [prefix('cell-selected-end')]: isEndSelected,
          [prefix('cell-in-range')]: !unSameMonth && inRange,
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
            onMouseEnter={!disabled && onMouseMove && onMouseMove.bind(null, thisDate)}
            onClick={partial(handleSelect, thisDate, disabled)}
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

    const classes = merge(className, prefix('row'));

    return (
      <Component {...rest} ref={ref} role="row" className={classes}>
        {showWeekNumbers && renderWeekNumber()}
        {renderDays()}
      </Component>
    );
  }
);

TableRow.displayName = 'TableRow';
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  inSameMonth: PropTypes.func
};

TableRow.defaultProps = defaultProps;

export default TableRow;
