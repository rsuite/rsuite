import * as React from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from '../Picker/VirtualizedList';
import { useClassNames } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { getDaysInMonth, getMonth, getYear } from '../utils/dateUtils';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export interface MonthDropdownProps extends WithAsProps {
  limitEndYear?: number;
  show: boolean;
  disabledMonth?: (date: Date) => boolean;
}

export interface RowProps {
  index: number; // Index of row
  isScrolling: boolean; // The List is currently being scrolled
  isVisible: boolean; // This row is visible within the List (eg it is not an overscanned row)
  key?: any; // Unique key within array of rendered rows
  parent: any; // Reference to the parent List (instance)
  style?: React.CSSProperties; // Style object to be applied to row (to position it);
}

const monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const defaultHeight = 221;
const defaultWidth = 256;

function getRowHeight(count: number) {
  return ({ index }) => {
    if (index === 0 || count - 1 === index) {
      return 75 + 1;
    }
    return 75;
  };
}

const defaultProps: Partial<MonthDropdownProps> = {
  show: false,
  limitEndYear: 5,
  classPrefix: 'calendar-month-dropdown',
  as: 'div'
};

const MonthDropdown: RsRefForwardingComponent<'div', MonthDropdownProps> = React.forwardRef(
  (props: MonthDropdownProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      disabledMonth,
      limitEndYear,
      show,
      ...rest
    } = props;
    const { date = new Date() } = useCalendarContext();

    const getRowCount = useCallback(() => getYear(new Date()) + limitEndYear, [limitEndYear]);

    const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

    const isMonthDisabled = useCallback(
      (year, month) => {
        if (disabledMonth) {
          const days = getDaysInMonth(new Date(year, month));

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

    const rowRenderer = useCallback(
      ({ index, key, style }: RowProps) => {
        const selectedMonth = getMonth(date);
        const selectedYear = getYear(date);
        const year = index + 1;
        const isSelectedYear = year === selectedYear;
        const count = getRowCount();
        const titleClassName = merge(prefix('year'), {
          [prefix('year-active')]: isSelectedYear
        });

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
      },
      [date, getRowCount, isMonthDisabled, merge, prefix]
    );

    const count = getRowCount();
    const classes = merge(rootPrefix(classPrefix), className, {
      show
    });

    return (
      <Component {...rest} ref={ref} role="menu" className={classes}>
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
                    scrollToIndex={getYear(date)}
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
MonthDropdown.propTypes = {
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  show: PropTypes.bool,
  disabledMonth: PropTypes.func
};
MonthDropdown.defaultProps = defaultProps;

export default MonthDropdown;
