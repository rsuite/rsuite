import React, { useCallback, useMemo } from 'react';
import MonthDropdownItem from './MonthDropdownItem';
import { forwardRef } from '@/internals/utils';
import { getMonth, getYear } from '@/internals/utils/date';
import { AutoSizer, FixedSizeList, ListChildComponentProps } from '@/internals/Windowing';
import { useStyles, useCustom } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';
import { plainYearMonthToString } from '@/internals/utils/date/plainDate';
import type { PlainYearMonth } from '@/internals/utils/date/types';
import { getJalaliYear, getJalaliMonth } from '@/internals/utils/date/jalali';

export interface MonthDropdownProps extends WithAsProps {
  show?: boolean;
  limitStartYear?: number;
  limitEndYear?: number;
  height?: number;
  width?: number;
  isMonthDisabled?: (yearMonth: PlainYearMonth) => boolean;
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
    isMonthDisabled,
    ...rest
  } = props;

  const { date = new Date(), targetId, monthDropdownProps, locale: overrideLocale } = useCalendar();
  const { prefix, merge, withPrefix } = useStyles(classPrefix);
  const { getLocale } = useCustom();
  const locale = getLocale('Calendar', overrideLocale);
  const isJalali = locale?.calendarSystem === 'jalali';

  // Use Jalali or Gregorian current year/month
  const currentYear = isJalali ? getJalaliYear(date) : getYear(date);
  const currentMonth = isJalali ? getJalaliMonth(date) - 1 : getMonth(date); // 0-indexed for comparison

  // For Jalali, start year is around 1300-1350 depending on the limit
  const thisYear = isJalali ? getJalaliYear(new Date()) : getYear(new Date());
  const startYear = limitStartYear ? thisYear - limitStartYear + 1 : isJalali ? 1300 : 1900;

  const rowCount = useMemo(() => {
    const endYear = thisYear + limitEndYear;

    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);

  const {
    className: listClassName,
    itemClassName,
    as: List,
    itemAs: Item = 'div',
    ...restListProps
  } = monthDropdownProps || {};

  const rowRenderer = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const selectedMonth = currentMonth;
      const selectedYear = currentYear;
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
            {MONTHS_INDEX.map(month => {
              const yearMonth = { year, month: month + 1 }; // TODO: Doma - Should we make a constant pool for optimization?
              return (
                <MonthDropdownItem
                  key={plainYearMonthToString(yearMonth)}
                  yearMonth={yearMonth}
                  disabled={isMonthDisabled?.(yearMonth)}
                  active={isSelectedYear && month === selectedMonth}
                />
              );
            })}
          </div>
        </Item>
      );
    },
    [
      Item,
      currentMonth,
      currentYear,
      isMonthDisabled,
      merge,
      prefix,
      itemClassName,
      rowCount,
      startYear
    ]
  );

  const classes = merge(className, withPrefix(), { show });
  const initialItemIndex = currentYear - startYear;
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
