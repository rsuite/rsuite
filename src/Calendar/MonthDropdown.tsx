import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { getYear, getMonth, getDaysInMonth } from 'date-fns';

export interface MonthDropdownProps {
  date: Date;
  limitEndYear?: number;
  className?: string;
  classPrefix?: string;
  show: boolean;
  onSelect?: (month: Date, event: React.MouseEvent) => void;
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

class MonthDropdown extends React.PureComponent<MonthDropdownProps> {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    limitEndYear: PropTypes.number,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    show: PropTypes.bool,
    onSelect: PropTypes.func,
    disabledMonth: PropTypes.func
  };
  static defaultProps = {
    show: false,
    limitEndYear: 5,
    date: new Date()
  };

  componentDidUpdate() {
    this.list?.forceUpdateGrid();
  }

  getRowCount = () => {
    const { limitEndYear } = this.props;
    return getYear(new Date()) + limitEndYear;
  };

  list = null;

  bindListRef = ref => {
    this.list = ref;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  disabledMonth(year, month) {
    const { disabledMonth } = this.props;

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
  }
  rowRenderer = ({ index, key, style }: RowProps) => {
    const { date, onSelect } = this.props;
    const selectedMonth = getMonth(date);
    const selectedYear = getYear(date);
    const year = index + 1;
    const isSelectedYear = year === selectedYear;
    const count = this.getRowCount();
    const titleClassName = classNames(this.addPrefix('year'), {
      [this.addPrefix('year-active')]: isSelectedYear
    });

    const rowClassName = classNames(this.addPrefix('row'), {
      'first-row': index === 0,
      'last-row': index === count - 1
    });

    return (
      <div className={rowClassName} key={key} style={style}>
        <div className={titleClassName}>{year}</div>
        <div className={this.addPrefix('list')}>
          {monthMap.map((item, month) => {
            return (
              <MonthDropdownItem
                date={date}
                onSelect={onSelect}
                disabled={this.disabledMonth(year, month)}
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
  render() {
    const { classPrefix, className, date, show, ...rest } = this.props;
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    const count = this.getRowCount();
    const classes = classNames(classPrefix, className, {
      show
    });

    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('content')}>
          <div className={this.addPrefix('scroll')}>
            {show && (
              <AutoSizer defaultHeight={defaultHeight} defaultWidth={defaultWidth}>
                {({ height, width }) => (
                  <List
                    className={this.addPrefix('row-wrapper')}
                    ref={this.bindListRef}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    rowHeight={getRowHeight(count)}
                    rowCount={count}
                    scrollToIndex={getYear(date)}
                    rowRenderer={this.rowRenderer}
                  />
                )}
              </AutoSizer>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const enhance = defaultProps<MonthDropdownProps>({
  classPrefix: 'calendar-month-dropdown'
});
export default enhance(MonthDropdown);
