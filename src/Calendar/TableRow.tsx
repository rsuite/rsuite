import React, { useCallback } from 'react';
import { isSameDay, addDays, isBefore, isAfter, format } from '@/internals/utils/date';
import { DATERANGE_DISABLED_TARGET } from '@/internals/constants';
import { useClassNames } from '@/internals/hooks';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import TableCell from './TableCell';
export interface TableRowProps extends WithAsProps {
  weekendDate?: Date;
  rowIndex?: number;
}

const TableRow: RsRefForwardingComponent<'div', TableRowProps> = React.forwardRef(
  (props: TableRowProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-table',
      weekendDate = new Date(),
      rowIndex,
      ...rest
    } = props;

    const {
      date: selected = new Date(),
      dateRange,
      hoverRangeValue,
      isoWeek,
      weekStart,
      showWeekNumbers,
      locale,
      inSameMonth,
      disabledDate,
      onSelect
    } = useCalendarContext();

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
      const days: React.ReactElement[] = [];
      const [selectedStartDate, selectedEndDate] = dateRange || [];
      const [hoverStartDate, hoverEndDate] = hoverRangeValue ?? [];
      const isRangeSelectionMode = typeof dateRange !== 'undefined';

      for (let i = 0; i < 7; i += 1) {
        const thisDate = addDays(weekendDate, i);
        const disabled = disabledDate?.(thisDate, dateRange, DATERANGE_DISABLED_TARGET.CALENDAR);

        const unSameMonth = !inSameMonth?.(thisDate);
        const rangeStart =
          !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
        const rangeEnd = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
        const isSelected = isRangeSelectionMode
          ? rangeStart || rangeEnd
          : isSameDay(thisDate, selected);

        // TODO-Doma Move those logic that's for DatePicker/DateRangePicker to a separate component
        //           Calendar is not supposed to be reused this way
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
        if (!isSelected && hoverStartDate && hoverEndDate) {
          if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
            inRange = true;
          }
          if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
            inRange = true;
          }
        }

        days.push(
          <TableCell
            key={format(thisDate, 'yyyy-MM-dd')}
            date={thisDate}
            disabled={disabled}
            selected={isSelected}
            onSelect={handleSelect}
            unSameMonth={unSameMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            inRange={inRange}
          />
        );
      }
      return days;
    };

    const classes = merge(className, prefix('row'));
    const { firstWeekContainsDate, weekStartsOn } = locale?.dateLocale?.options ?? {};

    const week = format(weekendDate, isoWeek ? 'I' : 'w', {
      locale: locale?.dateLocale,
      firstWeekContainsDate,
      weekStartsOn: weekStart || weekStartsOn
    });

    return (
      <Component {...rest} ref={ref} role="row" aria-rowindex={rowIndex} className={classes}>
        {showWeekNumbers && (
          <div role="rowheader" aria-label={`Week ${week}`} className={prefix('cell-week-number')}>
            {week}
          </div>
        )}
        {renderDays()}
      </Component>
    );
  }
);

TableRow.displayName = 'CalendarTableRow';

export default TableRow;
