// @flow

import * as React from 'react';
import classNames from 'classnames';
import { scrollTop } from 'dom-lib';
import moment from 'moment';
import { prefix, getUnhandledProps, defaultProps } from '../utils';

import MonthDropdownItem from './MonthDropdownItem';
import scrollTopAnimation from '../utils/scrollTopAnimation';

type Props = {
  onSelect?: (month: moment$Moment, event: SyntheticEvent<*>) => void,
  date: moment$Moment,
  limitStartYear?: number,
  limitEndYear?: number,
  className?: string,
  classPrefix?: string,
  disabledMonth?: (date: moment$Moment) => boolean,
  show: boolean
};

const minYear = 1950;
const blockHeight = 84;
const monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class MonthDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    show: false,
    limitStartYear: 5,
    limitEndYear: 5,
    date: moment()
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  getStartYear() {
    const { date, limitStartYear = 5 } = this.props;
    const startYear = date.year() - limitStartYear;
    return Math.max(startYear, minYear);
  }

  updatePosition(props?: Props) {
    const { date } = props || this.props;
    date && this.scrollTo(date);
  }

  scrollTo = (date: moment$Moment) => {
    const year = date.year();
    const top = (year - this.getStartYear()) * blockHeight;

    scrollTopAnimation(this.scroll, top, scrollTop(this.scroll) !== 0);
  };

  scroll = null;

  bindScrollRef = (ref: React.ElementRef<*>) => {
    this.scroll = ref;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderBlock() {
    const { date, onSelect, limitEndYear, disabledMonth } = this.props;

    const ret = [];
    const selectedMonth = date.month();
    const selectedYear = date.year();
    const startYear = this.getStartYear();
    let nextYear = 0;

    for (let i = 0; i < 100 && nextYear < selectedYear + limitEndYear; i += 1) {
      nextYear = startYear + i;

      let isSelectedYear = nextYear === selectedYear;
      let titleClasses = classNames(this.addPrefix('year'), {
        [this.addPrefix('year-active')]: isSelectedYear
      });

      ret.push(
        <div className={this.addPrefix('row')} key={i}>
          <div className={titleClasses}>{nextYear}</div>
          <div className={this.addPrefix('list')}>
            {monthMap.map((i, month) => {
              let disabled =
                disabledMonth &&
                disabledMonth(
                  moment()
                    .year(nextYear)
                    .month(month)
                );

              return (
                <MonthDropdownItem
                  date={date}
                  onSelect={onSelect}
                  disabled={disabled}
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
    }

    return ret;
  }

  render() {
    const { classPrefix, className, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('content')}>
          <div className={this.addPrefix('scroll')} ref={this.bindScrollRef}>
            {this.renderBlock()}
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
