// @flow

import * as React from 'react';
import classNames from 'classnames';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';
import { getYear, setYear, setMonth, getMonth } from 'date-fns';
import composeFunctions from '../utils/composeFunctions';

type Props = {
  onSelect?: (month: Date, event: SyntheticEvent<*>) => void,
  date: Date,
  limitEndYear?: number,
  className?: string,
  classPrefix?: string,
  disabledMonth?: (date: Date) => boolean,
  show: boolean
};

type RowProps = {
  index: number, // Index of row
  isScrolling: boolean, // The List is currently being scrolled
  isVisible: boolean, // This row is visible within the List (eg it is not an overscanned row)
  key?: any, // Unique key within array of rendered rows
  parent: any, // Reference to the parent List (instance)
  style?: Object // Style object to be applied to row (to position it);
};

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

class MonthDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    show: false,
    limitEndYear: 5,
    date: new Date()
  };

  componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
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
      return disabledMonth(
        composeFunctions(d => setYear(d, year), d => setMonth(d, month))(new Date())
      );
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
          {monthMap.map((i, month) => {
            return (
              <MonthDropdownItem
                date={date}
                onSelect={onSelect}
                disabled={this.disabledMonth(year, month)}
                active={isSelectedYear && month === selectedMonth}
                key={month}
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
          </div>
        </div>
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-month-dropdown'
});
export default enhance(MonthDropdown);
