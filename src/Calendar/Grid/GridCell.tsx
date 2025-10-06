import React from 'react';
import partial from 'lodash/partial';
import { forwardRef } from '@/internals/utils';
import type { PlainDate } from '@/internals/utils/date';
import { isSameDay } from '@/internals/utils/date/plainDate';
import { useStyles, useCustom } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';
import { getAriaLabel } from '../utils';

export interface GridCellProps extends WithAsProps {
  date: PlainDate;
  disabled?: boolean;
  selected?: boolean;
  unSameMonth?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  inRange?: boolean;
  onSelect?: (date: PlainDate, disabled: boolean | void, event: React.MouseEvent) => void;
}

const GridCell = forwardRef<'div', GridCellProps>((props: GridCellProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'calendar-table',
    disabled,
    selected,
    date,
    onSelect,
    unSameMonth,
    rangeStart,
    rangeEnd,
    inRange,
    ...rest
  } = props;
  const jsDate = new Date(date.year, date.month - 1, date.day);

  const {
    onMouseMove,
    cellClassName,
    renderCell,
    renderCellOnPicker,
    locale: overrideLocale
  } = useCalendar();
  const { prefix, merge } = useStyles(classPrefix);
  const { getLocale, formatDate } = useCustom();
  const { formattedDayPattern, today } = getLocale('Calendar', overrideLocale);

  const formatStr = formattedDayPattern;
  const ariaLabel = getAriaLabel(jsDate, formatStr, formatDate);
  const isToday = isSameDay(date, new Date());

  const classes = merge(
    prefix('cell', {
      'cell-un-same-month': unSameMonth,
      'cell-is-today': isToday,
      'cell-selected': selected,
      'cell-selected-start': rangeStart,
      'cell-selected-end': rangeEnd,
      'cell-in-range': !unSameMonth && inRange,
      'cell-disabled': disabled
    }),
    cellClassName?.(date)
  );

  return (
    <Component
      ref={ref}
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={selected ? 0 : -1}
      title={isToday ? `${ariaLabel} (${today})` : ariaLabel}
      className={classes}
      onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, jsDate) : undefined}
      onClick={onSelect ? partial(onSelect, date, disabled) : undefined}
      {...rest}
    >
      <div className={prefix('cell-content')}>
        {renderCellOnPicker ? (
          renderCellOnPicker(date)
        ) : (
          <span className={prefix('cell-day')}>{date.day}</span>
        )}
        {renderCell?.(jsDate)}
      </div>
    </Component>
  );
});

GridCell.displayName = 'CalendarGridCell';

export default GridCell;
