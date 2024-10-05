import React from 'react';
import partial from 'lodash/partial';
import { isSameDay, getDate } from '@/internals/utils/date';
import { useClassNames, useCustom } from '@/internals/hooks';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';
import { getAriaLabel } from '../utils';

export interface GridCellProps extends WithAsProps {
  date: Date;
  disabled?: boolean;
  selected?: boolean;
  unSameMonth?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  inRange?: boolean;
  onSelect?: (date: Date, disabled: boolean | void, event: React.MouseEvent) => void;
}

const GridCell: RsRefForwardingComponent<'div', GridCellProps> = React.forwardRef(
  (props: GridCellProps, ref) => {
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
    } = useCalendar();
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

GridCell.displayName = 'CalendarGridCell';

export default GridCell;
