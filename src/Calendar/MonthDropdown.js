// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import MonthDropdownItem from './MonthDropdownItem';

type Props = {
  onSelect?: (month: moment$Moment, event: SyntheticEvent<*>) => void,
  date: moment$Moment,
  limitEndYear?: number,
  className?: string,
  classPrefix?: string,
  disabledMonth?: (date: moment$Moment) => boolean,
  show: boolean,
  rows: any[]
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

function getRowHeight(length: number) {
  return ({ index }) => {
    if (index === 0 || length - 1 === index) {
      return 75 + 1;
    }
    return 75;
  };
}

class MonthDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    show: false,
    limitEndYear: 5,
    date: moment()
  };

  componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
  }

  getRows = () => {
    const { limitEndYear } = this.props;
    return [...new Array(moment().year() + limitEndYear)];
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
        moment()
          .year(year)
          .month(month)
      );
    }
    return false;
  }

  rowRenderer = (length: number) => {
    return ({ index, key, style }: RowProps) => {
      const { date, onSelect } = this.props;
      const selectedMonth = date.month();
      const selectedYear = date.year();
      const year = index + 1;
      const isSelectedYear = year === selectedYear;
      const titleClassName = classNames(this.addPrefix('year'), {
        [this.addPrefix('year-active')]: isSelectedYear
      });

      const rowClassName = classNames(this.addPrefix('row'), {
        'first-row': index === 0,
        'last-row': index === length - 1
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
  };
  render() {
    const { classPrefix, className, date, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    const rows = this.getRows();
    const length = rows.length;

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
                  rowHeight={getRowHeight(length)}
                  rowCount={length}
                  scrollToIndex={moment(date).year()}
                  rowRenderer={this.rowRenderer(length)}
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
