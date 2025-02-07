import React, { useCallback, useMemo } from 'react';
import MonthDropdownItem from './MonthDropdownItem';
import { forwardRef } from '@/internals/utils';
import { getMonth, getYear } from '@/internals/utils/date';
import { AutoSizer, FixedSizeList, ListChildComponentProps } from '@/internals/Windowing';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';
import { isEveryDateInMonth } from '../utils';

export interface MonthDropdownProps extends WithAsProps {
  show?: boolean;
  limitStartYear?: number;
  limitEndYear?: number;
  height?: number;
  width?: number;
  disabledMonth?: (date: Date) => boolean;
}

// Array representing the index of each month
const MONTHS_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// The height of each item
const ITEM_SIZE = 108;

const MonthDropdown = forwardRef<'div', MonthDropdownProps>((props: MonthDropdownProps, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar-month-dropdown',
    limitStartYear,
    limitEndYear = 5,
    show,
    height: defaultHeight = 221,
    width: defaultWidth = 256,
    disabledMonth,
    ...rest
  } = props;

  const { date = new Date(), targetId, monthDropdownProps } = useCalendar();
  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const thisYear = getYear(new Date());
  const startYear = limitStartYear ? thisYear - limitStartYear + 1 : 1900;

  const rowCount = useMemo(() => {
    const endYear = thisYear + limitEndYear;

    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);

  const isMonthDisabled = useCallback(
    (year, month) => {
      if (disabledMonth) {
        return isEveryDateInMonth(year, month, disabledMonth);
      }

      return false;
    },
    [disabledMonth]
  );

  const {
    className: listClassName,
    itemClassName,
    as: List,
    itemAs: Item = 'div',
    ...restListProps
  } = monthDropdownProps || {};

  const rowRenderer = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const selectedMonth = getMonth(date);
      const selectedYear = getYear(date);
      const year = startYear + index;
      const isSelectedYear = year === selectedYear;
      const titleClassName = prefix('year', { 'year-active': isSelectedYear });

      return (
        <Item
          role="row"
          aria-label={`${year}`}
          className={merge(itemClassName, prefix('row'), {
            'first-row': index === 0,
            'last-row': index === rowCount - 1
          })}
          style={style}
        >
          <div className={titleClassName} role="rowheader">
            {year}
          </div>
          <div className={prefix('list')}>
            {MONTHS_INDEX.map((item, month) => {
              return (
                <MonthDropdownItem
                  disabled={isMonthDisabled(year, month)}
                  active={isSelectedYear && month === selectedMonth}
                  key={`${month}_${item}`}
                  month={month + 1}
                  year={year}
                />
              );
            })}
          </div>
        </Item>
      );
    },
    [Item, date, isMonthDisabled, merge, prefix, itemClassName, rowCount, startYear]
  );

  const classes = merge(className, withClassPrefix(), { show });
  const initialItemIndex = getYear(date) - startYear;
  const initialScrollOffset = ITEM_SIZE * initialItemIndex;

  if (!show) {
    return null;
  }

  return (
    <Component
      ref={ref}
      role="grid"
      tabIndex={-1}
      className={classes}
      aria-labelledby={targetId ? `${targetId}-grid-label` : undefined}
      id={targetId ? `${targetId}-calendar-month-dropdown` : undefined}
      data-testid="calendar-month-dropdown"
      {...rest}
    >
      <div className={prefix('scroll')}>
        <AutoSizer defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
          {({ height, width }) => (
            <FixedSizeList
              className={merge(prefix('row-wrapper'), listClassName)}
              width={width || defaultWidth}
              height={height || defaultHeight}
              itemSize={ITEM_SIZE}
              itemCount={rowCount}
              initialScrollOffset={initialScrollOffset}
              innerElementType={List}
              {...restListProps}
            >
              {rowRenderer}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </Component>
  );
});

MonthDropdown.displayName = 'MonthDropdown';

export default MonthDropdown;
