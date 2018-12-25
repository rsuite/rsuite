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

class MonthDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    show: false,
    limitEndYear: 5,
    date: moment()
  };
  list = null;
  componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
  }

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

  rowRenderer = ({ index, key, style }: RowProps) => {
    const { date, onSelect } = this.props;
    const selectedMonth = date.month();
    const selectedYear = date.year();
    let year = index + 1;
    let isSelectedYear = year === selectedYear;
    let titleClasses = classNames(this.addPrefix('year'), {
      [this.addPrefix('year-active')]: isSelectedYear
    });

    return (
      <div className={this.addPrefix('row')} key={key} style={style}>
        <div className={titleClasses}>{year}</div>
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
    const { classPrefix, className, limitEndYear, date, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    const list = [...new Array(moment().year() + limitEndYear)];

    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('content')}>
          <div className={this.addPrefix('scroll')}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className={this.addPrefix('list')}
                  ref={this.bindListRef}
                  width={width}
                  height={height}
                  rowHeight={86}
                  rowCount={list.length}
                  scrollToIndex={moment(date).year()}
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
