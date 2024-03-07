import React from 'react';
import partial from 'lodash/partial';
import { useClassNames, useCustom } from '../utils';
import { isSameDay, getDate } from '../utils/dateUtils';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { getAriaLabel } from './utils';

export interface TableCellProps extends WithAsProps {
  date: Date;
  disabled?: boolean;
  selected?: boolean;
  unSameMonth?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  inRange?: boolean;
  onSelect?: (date: Date, disabled: boolean | void, event: React.MouseEvent) => void;
}

const TableCell: RsRefForwardingComponent<'div', TableCellProps> = React.forwardRef(
  (props: TableCellProps, ref) => {
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

    const {
      onMouseMove,
      cellClassName,
      renderCell,
      renderCellOnPicker,
      locale: overrideLocale
    } = useCalendarContext();
    const { prefix, merge } = useClassNames(classPrefix);
    const { locale, formatDate } = useCustom('Calendar', overrideLocale);
    const formatStr = locale.formattedDayPattern;
    const ariaLabel = getAriaLabel(date, formatStr, formatDate);
    const todayDate = new Date();
    const isToday = isSameDay(date, todayDate);

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
        title={isToday ? `${ariaLabel} (${locale?.today})` : ariaLabel}
        className={classes}
        onMouseEnter={!disabled && onMouseMove ? onMouseMove.bind(null, date) : undefined}
        onClick={onSelect ? partial(onSelect, date, disabled) : undefined}
        {...rest}
      >
        <div className={prefix('cell-content')}>
          {renderCellOnPicker ? (
            renderCellOnPicker(date)
          ) : (
            <span className={prefix('cell-day')}>{getDate(date)}</span>
          )}
          {renderCell?.(date)}
        </div>
      </Component>
    );
  }
);

TableCell.displayName = 'CalendarTableCell';

export default TableCell;
