import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, DATERANGE_DISABLED_TARGET, DateUtils, TimeZone } from '../../utils';
import { CalendarContext } from '../../Calendar';
import { WithAsProps } from '../../@types/common';

export interface TableRowProps extends WithAsProps {
  weekendDate?: Date;
  selected: Date[];
  hoverValue: Date[];
  inSameMonth?: (date: Date) => boolean;
  onMouseMove?: (date: Date) => void;
}

const defaultProps: Partial<TableRowProps> = {
  as: 'div',
  classPrefix: 'calendar-table',
  selected: [],
  hoverValue: []
};

const TableRow = React.forwardRef((props: TableRowProps, ref) => {
  const {
    as: Component,
    className,
    classPrefix,
    weekendDate,
    selected,
    hoverValue,
    inSameMonth,
    onMouseMove,
    ...rest
  } = props;

  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix('row'));

  const {
    locale,
    isoWeek,
    showWeekNumbers,
    timeZone,
    disabledDate,
    formatDate,
    onSelect
  } = useContext(CalendarContext);

  const renderDays = () => {
    const formatStr = locale?.formattedDayPattern || 'yyyy-MM-dd';

    const days = [];
    const selectedStartDate = selected[0];
    const selectedEndDate = selected[1];
    const hoverStartDate = hoverValue[0] || null;
    const hoverEndDate = hoverValue[1] || null;
    const todayDate = TimeZone.zonedDate(timeZone);

    for (let i = 0; i < 7; i += 1) {
      const thisDate = DateUtils.addDays(weekendDate, i);
      const selectValue = [selectedStartDate, selectedEndDate];
      const disabled = disabledDate?.(thisDate, selectValue, DATERANGE_DISABLED_TARGET.CALENDAR);
      const isToday = DateUtils.isSameDay(thisDate, todayDate);
      const unSameMonth = !inSameMonth?.(thisDate);
      const isStartSelected =
        !unSameMonth && selectedStartDate && DateUtils.isSameDay(thisDate, selectedStartDate);
      const isEndSelected =
        !unSameMonth && selectedEndDate && DateUtils.isSameDay(thisDate, selectedEndDate);
      const isSelected = isStartSelected || isEndSelected;

      let inRange = false;
      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (
          DateUtils.isBefore(thisDate, selectedEndDate) &&
          DateUtils.isAfter(thisDate, selectedStartDate)
        ) {
          inRange = true;
        }
        if (
          DateUtils.isBefore(thisDate, selectedStartDate) &&
          DateUtils.isAfter(thisDate, selectedEndDate)
        ) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (
          !DateUtils.isAfter(thisDate, hoverEndDate) &&
          !DateUtils.isBefore(thisDate, hoverStartDate)
        ) {
          inRange = true;
        }
        if (
          !DateUtils.isAfter(thisDate, hoverStartDate) &&
          !DateUtils.isBefore(thisDate, hoverEndDate)
        ) {
          inRange = true;
        }
      }

      const classes = prefix('cell', {
        'cell-un-same-month': unSameMonth,
        'cell-is-today': isToday,
        'cell-selected-start': isStartSelected,
        'cell-selected-end': isEndSelected,
        'cell-selected': isSelected,
        'cell-in-range': !unSameMonth && inRange,
        'cell-disabled': disabled
      });

      const title = formatDate
        ? formatDate(thisDate, formatStr)
        : DateUtils.format(thisDate, formatStr);

      days.push(
        <div
          key={title}
          className={classes}
          tabIndex={-1}
          title={isToday ? `${title} (${locale?.today})` : title}
          onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined}
          onClick={!disabled ? onSelect?.bind(null, thisDate) : undefined}
        >
          <span className={prefix('cell-content')}>{DateUtils.getDate(thisDate)}</span>
        </div>
      );
    }
    return days;
  };

  return (
    <Component {...rest} ref={ref} className={classes}>
      {showWeekNumbers && (
        <div className={prefix('cell-week-number')}>
          {DateUtils.format(weekendDate, isoWeek ? 'I' : 'w')}
        </div>
      )}
      {renderDays()}
    </Component>
  );
});

TableRow.displayName = 'TableRow';
TableRow.defaultProps = defaultProps;
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  inSameMonth: PropTypes.func,
  onMouseMove: PropTypes.func
};

export default TableRow;
