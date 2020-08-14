import * as React from 'react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized/dist/commonjs/List';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { getUnhandledProps, useClassNames } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { getDaysInMonth, getMonth, getYear } from '../utils/dateUtils';
import { useCalendarContext } from './CalendarContext';

export interface MonthDropdownProps {
  limitEndYear?: number;
  className?: string;
  classPrefix?: string;
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

const defaultProps = {
  show: false,
  limitEndYear: 5,
  classPrefix: 'calendar-month-dropdown'
};

const MonthDropdown = React.forwardRef<HTMLDivElement, MonthDropdownProps>((props, ref) => {
  const { classPrefix, disabledMonth, className, show, limitEndYear, ...rest } = props;
  const { date = new Date() } = useCalendarContext();
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.forceUpdateGrid();
  }, [props]);

  const getRowCount = () => getYear(new Date()) + limitEndYear;

  const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

  const isMonthDisabled = (year, month) => {
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
  };
  const rowRenderer = ({ index, key, style }: RowProps) => {
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
      <div className={rowClassName} key={key} style={style}>
        <div className={titleClassName}>{year}</div>
        <div className={prefix('list')}>
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
  const unhandled = getUnhandledProps(MonthDropdown, rest);
  const count = getRowCount();
  const classes = merge(rootPrefix(classPrefix), className, {
    show
  });

  return (
    <div {...unhandled} ref={ref} className={classes}>
      <div className={prefix('content')}>
        <div className={prefix('scroll')}>
          {show && (
            <AutoSizer defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
              {({ height, width }) => (
                <List
                  className={prefix('row-wrapper')}
                  ref={listRef}
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
    </div>
  );
});

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
