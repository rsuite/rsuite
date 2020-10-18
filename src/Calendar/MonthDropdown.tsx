import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from '../Picker/VirtualizedList';
import { DateUtils, useClassNames } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export interface MonthDropdownProps extends WithAsProps {
  show?: boolean;
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

/**
 * Set the row height.
 * Add 1px to the first and last lines.
 */
function getRowHeight(count: number) {
  return ({ index }) => {
    if (index === 0 || count - 1 === index) {
      return 75 + 1;
    }
    return 75;
  };
}

const defaultProps: Partial<MonthDropdownProps> = {
  as: 'div',
  classPrefix: 'calendar-month-dropdown',
  limitEndYear: 5,
  height: 221,
  width: 256
};

const MonthDropdown: RsRefForwardingComponent<'div', MonthDropdownProps> = React.forwardRef(
  (props: MonthDropdownProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      limitEndYear,
      show,
      height: defaultHeight,
      width: defaultWidth,
      disabledMonth,
      ...rest
    } = props;

    const { date = new Date() } = useCalendarContext();
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const getRowCount = useCallback(() => DateUtils.getYear(new Date()) + limitEndYear, [
      limitEndYear
    ]);

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

    const rowRenderer = ({ index, key, style }: RowProps) => {
      const selectedMonth = DateUtils.getMonth(date);
      const selectedYear = DateUtils.getYear(date);
      const year = index + 1;
      const isSelectedYear = year === selectedYear;
      const count = getRowCount();
      const titleClassName = prefix('year', { 'year-active': isSelectedYear });

      const rowClassName = merge(prefix('row'), {
        'first-row': index === 0,
        'last-row': index === count - 1
      });

      return (
        <div className={rowClassName} role="row" key={key} style={style}>
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

    const count = getRowCount();
    const classes = merge(className, withClassPrefix(), { show });

    return (
      <Component role="menu" {...rest} ref={ref} className={classes}>
        <div className={prefix('content')}>
          <div className={prefix('scroll')}>
            {show && (
              <AutoSizer defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
                {({ height, width }) => (
                  <List
                    className={prefix('row-wrapper')}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    rowHeight={getRowHeight(count)}
                    rowCount={count}
                    scrollToIndex={DateUtils.getYear(date)}
                    rowRenderer={rowRenderer}
                  />
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
MonthDropdown.defaultProps = defaultProps;
MonthDropdown.propTypes = {
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  show: PropTypes.bool,
  disabledMonth: PropTypes.func
};

export default MonthDropdown;
