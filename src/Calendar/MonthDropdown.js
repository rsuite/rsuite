// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { getWidth, getHeight } from 'dom-lib';
import classNames from 'classnames';
import moment from 'moment';
import List from 'react-virtualized/dist/es/list';
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

type State = {
  listWidth: number,
  listHeight: number
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

class MonthDropdown extends React.PureComponent<Props, State> {
  static defaultProps = {
    show: false,
    limitEndYear: 5,
    date: moment()
  };
  list = null;
  scroll = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      listWidth: 256,
      listHeight: 221
    };
  }

  componentDidMount() {
    this.resizeListWidth();
  }

  componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
    this.resizeListWidth();
  }

  bindScrollRef = ref => {
    this.scroll = ref;
  };

  bindListRef = ref => {
    this.list = ref;
  };

  resizeListWidth = () => {
    const scroll = findDOMNode(this.scroll);
    if (scroll) {
      this.setState({
        listWidth: getWidth(scroll) || this.state.listWidth,
        listHeight: getHeight(scroll) || this.state.listHeight
      });
    }
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  disabledMonth(nextYear, month) {
    const { disabledMonth } = this.props;

    if (disabledMonth) {
      return disabledMonth(
        moment()
          .year(nextYear)
          .month(month)
      );
    }
    return false;
  }

  rowRenderer = ({ index, key, style }: RowProps) => {
    const { date, onSelect } = this.props;
    const selectedMonth = date.month();
    const selectedYear = date.year();
    let nextYear = index;
    let isSelectedYear = nextYear === selectedYear;
    let titleClasses = classNames(this.addPrefix('year'), {
      [this.addPrefix('year-active')]: isSelectedYear
    });

    return (
      <div className={this.addPrefix('row')} key={key} style={style}>
        <div className={titleClasses}>{nextYear}</div>
        <div className={this.addPrefix('list')}>
          {monthMap.map((i, month) => {
            return (
              <MonthDropdownItem
                date={date}
                onSelect={onSelect}
                disabled={this.disabledMonth(nextYear, month)}
                active={isSelectedYear && month === selectedMonth}
                key={month}
                month={month + 1}
                year={nextYear}
              />
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    const { classPrefix, className, limitEndYear, date, ...rest } = this.props;
    const { listWidth, listHeight } = this.state;
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    const list = [...new Array(moment().year() + limitEndYear)];

    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('content')}>
          <div ref={this.bindScrollRef} className={this.addPrefix('scroll')}>
            <List
              ref={this.bindListRef}
              width={listWidth}
              height={listHeight}
              rowCount={list.length}
              scrollToIndex={moment(date).year() + 1}
              rowHeight={86}
              rowRenderer={this.rowRenderer}
            />
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
