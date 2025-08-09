import React, { useCallback } from 'react';
import GridCell from './GridCell';
import { forwardRef } from '@/internals/utils';
import { format, type PlainDate } from '@/internals/utils/date';
import { DATERANGE_DISABLED_TARGET } from '@/internals/constants';
import { useStyles } from '@/internals/hooks';
import { useCalendar } from '../hooks';
import { WithAsProps } from '@/internals/types';
import { addDays, compare, isSameDay } from '@/internals/utils/date/plainDate';

/**
 * A row in the calendar month view grid, i.e. a week of days.
 */
export interface GridRowProps extends WithAsProps {
  /**
   * The starting day of the row of dates.
   */
  startingDate: PlainDate;

  /** The index of the row */
  rowIndex?: number;
}

const GridRow = forwardRef<'div', GridRowProps>((props: GridRowProps, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar-table',
    startingDate,
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
    disabledDate,
    onSelect
  } = useCalendar();

  const { prefix, merge } = useStyles(classPrefix);

  const handleSelect = useCallback(
    (date: PlainDate, disabled: boolean | void, event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      onSelect?.(new Date(date.year, date.month - 1, date.day), event);
    },
    [onSelect]
  );

  const renderDays = () => {
    const days: React.ReactElement[] = [];
    const [selectedStartDateJS, selectedEndDateJS] = dateRange || [];
    const [hoverStartDateJS, hoverEndDateJS] = hoverRangeValue ?? [];
    const isRangeSelectionMode = typeof dateRange !== 'undefined';

    for (let i = 0; i < 7; i += 1) {
      const thisDate = addDays(startingDate, i);
      const thisDateJS = new Date(thisDate.year, thisDate.month - 1, thisDate.day);
      const disabled = disabledDate?.(thisDateJS, dateRange, DATERANGE_DISABLED_TARGET.CALENDAR);

      const unSameMonth =
        selected.getFullYear() !== thisDate.year || selected.getMonth() + 1 !== thisDate.month;

      const rangeStart =
        !unSameMonth && selectedStartDateJS && isSameDay(thisDate, selectedStartDateJS);
      const rangeEnd = !unSameMonth && selectedEndDateJS && isSameDay(thisDate, selectedEndDateJS);
      const isSelected = isRangeSelectionMode
        ? rangeStart || rangeEnd
        : isSameDay(thisDate, selected);

      // TODO-Doma Move those logic that's for DatePicker/DateRangePicker to a separate component
      //           Calendar is not supposed to be reused this way
      let inRange = false;
      // for Selected
      if (selectedStartDateJS && selectedEndDateJS) {
        const selectedStartDate = {
          year: selectedStartDateJS.getFullYear(),
          month: selectedStartDateJS.getMonth() + 1,
          day: selectedStartDateJS.getDate()
        };
        const selectedEndDate = {
          year: selectedEndDateJS.getFullYear(),
          month: selectedEndDateJS.getMonth() + 1,
          day: selectedEndDateJS.getDate()
        };
        if (compare(thisDate, selectedEndDate) < 0 && compare(thisDate, selectedStartDate) > 0) {
          inRange = true;
        }
        if (compare(thisDate, selectedStartDate) < 0 && compare(thisDate, selectedEndDate) > 0) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverStartDateJS && hoverEndDateJS) {
        const hoverStartDate = {
          year: hoverStartDateJS.getFullYear(),
          month: hoverStartDateJS.getMonth() + 1,
          day: hoverStartDateJS.getDate()
        };
        const hoverEndDate = {
          year: hoverEndDateJS.getFullYear(),
          month: hoverEndDateJS.getMonth() + 1,
          day: hoverEndDateJS.getDate()
        };
        if (compare(thisDate, hoverEndDate) <= 0 && compare(thisDate, hoverStartDate) >= 0) {
          inRange = true;
        }
        if (compare(thisDate, hoverStartDate) <= 0 && compare(thisDate, hoverEndDate) >= 0) {
          inRange = true;
        }
      }

      days.push(
        <GridCell
          key={format(thisDateJS, 'yyyy-MM-dd')}
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
  const { firstWeekContainsDate } = locale?.dateLocale?.options ?? {};
  // ISO week starts on Monday
  const date = isoWeek ? addDays(startingDate, 1) : startingDate;
  const week = format(new Date(date.year, date.month - 1, date.day), isoWeek ? 'I' : 'w', {
    locale: locale?.dateLocale,
    firstWeekContainsDate,
    weekStartsOn: weekStart
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
});

GridRow.displayName = 'CalendarGridRow';

export default GridRow;
