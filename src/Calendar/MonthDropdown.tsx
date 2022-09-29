import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, FixedSizeList, ListChildComponentProps } from '../Windowing';
import { DateUtils, useClassNames } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export interface MonthDropdownProps extends WithAsProps {
  show?: boolean;
  limitStartYear?: number;
  limitEndYear?: number;
  height?: number;
  width?: number;
  disabledMonth?: (date: Date) => boolean;
}

export interface RowProps {
  /** Index of row */
  index: number;

  /** The List is currently being scrolled */
  isScrolling: boolean;

  /** This row is visible within the List (eg it is not an overscanned row) */
  isVisible: boolean;

  /** Unique key within array of rendered rows */
  key?: any;

  /** Reference to the parent List (instance) */
  parent: any;

  /** Style object to be applied to row (to position it); */
  style?: React.CSSProperties;
}

const monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const MonthDropdown: RsRefForwardingComponent<'div', MonthDropdownProps> = React.forwardRef(
  (props: MonthDropdownProps, ref) => {
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

    const { date = new Date() } = useCalendarContext();
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const thisYear = DateUtils.getYear(new Date());
    const startYear = limitStartYear ? thisYear - limitStartYear : 1900;

    const rowCount = useMemo(() => {
      const endYear = thisYear + limitEndYear;

      return endYear - startYear;
    }, [limitEndYear, startYear, thisYear]);

    const isMonthDisabled = useCallback(
      (year, month) => {
        if (disabledMonth) {
          const days = DateUtils.getDaysInMonth(new Date(year, month));

          // If all dates in a month are disabled, disable the current month
          for (let i = 1; i <= days; i++) {
            if (!disabledMonth(new Date(year, month, i))) {
              return false;
            }
          }
          return true;
        }

        return false;
      },
      [disabledMonth]
    );

    const rowRenderer = ({ index, style }: ListChildComponentProps) => {
      const selectedMonth = DateUtils.getMonth(date);
      const selectedYear = DateUtils.getYear(date);
      const year = startYear + index;
      const isSelectedYear = year === selectedYear;
      const titleClassName = prefix('year', { 'year-active': isSelectedYear });

      const rowClassName = merge(prefix('row'), {
        'first-row': index === 0,
        'last-row': index === rowCount - 1
      });

      return (
        <div className={rowClassName} role="row" style={style}>
          <div className={titleClassName} role="rowheader">
            {year}
          </div>
          <div className={prefix('list')} role="gridcell">
            {monthMap.map((item, month) => {
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
        </div>
      );
    };

    const classes = merge(className, withClassPrefix(), { show });
    const itemSize = 75;
    const initialItemIndex = DateUtils.getYear(date) - startYear;
    const initialScrollOffset = itemSize * initialItemIndex;

    return (
      <Component role="menu" {...rest} ref={ref} className={classes}>
        <div className={prefix('content')}>
          <div className={prefix('scroll')}>
            {show && (
              <AutoSizer defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
                {({ height, width }) => (
                  <FixedSizeList
                    className={prefix('row-wrapper')}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    itemSize={itemSize}
                    itemCount={rowCount}
                    initialScrollOffset={initialScrollOffset}
                  >
                    {rowRenderer}
                  </FixedSizeList>
                )}
              </AutoSizer>
            )}
          </div>
        </div>
      </Component>
    );
  }
);

MonthDropdown.displayName = 'MonthDropdown';
MonthDropdown.propTypes = {
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  show: PropTypes.bool,
  disabledMonth: PropTypes.func
};

export default MonthDropdown;
