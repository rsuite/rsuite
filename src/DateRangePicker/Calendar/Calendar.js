// @flow

import * as React from 'react';
import classNames from 'classnames';

import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';
import { addMonths, isAfter } from 'date-fns';

type Props = {
  disabledDate?: (date: Date, selectValue: ?Array<Date>, type: string) => boolean,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  index: number,
  calendarDate: Array<Date>,
  value?: Array<Date>,
  hoverValue?: Array<Date>,
  onMoveForword?: (nextPageDate: Date) => void,
  onMoveBackward?: (nextPageDate: Date) => void,
  onSelect?: (date: Date) => void,
  onMouseMove?: (date: Date) => void,
  onToggleMonthDropdown?: (event: SyntheticEvent<*>) => void,
  onChangePageDate?: (nextPageDate: Date, event: SyntheticEvent<*>) => void,
  format: string,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string,
  limitEndYear?: number
};

class Calendar extends React.Component<Props> {
  static defaultProps = {
    calendarDate: [new Date(), addMonths(new Date(), 1)],
    index: 0
  };

  getPageDate() {
    const { calendarDate, index } = this.props;
    return calendarDate[index];
  }

  handleMoveForword = () => {
    const { onMoveForword } = this.props;
    onMoveForword && onMoveForword(addMonths(this.getPageDate(), 1));
  };

  handleMoveBackward = () => {
    const { onMoveBackward } = this.props;
    onMoveBackward && onMoveBackward(addMonths(this.getPageDate(), -1));
  };

  disabledBackward = () => {
    const { calendarDate, index } = this.props;
    const after = isAfter(calendarDate[1], addMonths(calendarDate[0], 1));

    if (index === 0) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  };

  disabledForword = () => {
    const { calendarDate, index } = this.props;
    const after = isAfter(calendarDate[1], addMonths(calendarDate[0], 1));

    if (index === 1) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  };

  disabledMonth = (date: Date) => {
    const { calendarDate, value, index, disabledDate } = this.props;
    let after = true;

    if (disabledDate && disabledDate(date, value, 'MONTH')) {
      return true;
    }

    if (index === 1) {
      after = isAfter(date, calendarDate[0]);
      return !after;
    }

    after = isAfter(calendarDate[1], date);

    return !after;
  };

  shouldMountDate(props: Props) {
    const { format } = props || this.props;
    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  }
  render() {
    const {
      calendarState,
      onSelect,
      onMouseMove,
      onToggleMonthDropdown,
      onChangePageDate,
      disabledDate,
      className,
      value,
      hoverValue,
      isoWeek,
      limitEndYear,
      classPrefix,
      ...rest
    } = this.props;

    const pageDate = this.getPageDate();
    const dropMonth = calendarState === 'DROP_MONTH';
    const addPrefix = prefix(classPrefix);
    const calendarClasses = classNames(classPrefix, className, {
      [addPrefix('show-month-dropdown')]: dropMonth
    });

    const unhandled = getUnhandledProps(Calendar, rest);

    return (
      <div {...unhandled} className={calendarClasses}>
        <Header
          showMonth={true}
          date={pageDate}
          disabledBackward={this.disabledBackward()}
          disabledForword={this.disabledForword()}
          onMoveForword={this.handleMoveForword}
          onMoveBackward={this.handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
        />

        <View
          activeDate={pageDate}
          value={value}
          hoverValue={hoverValue}
          onSelect={onSelect}
          onMouseMove={onMouseMove}
          disabledDate={disabledDate}
          isoWeek={isoWeek}
        />

        <MonthDropdown
          date={pageDate}
          show={dropMonth}
          disabledMonth={this.disabledMonth}
          onSelect={onChangePageDate}
          limitEndYear={limitEndYear}
        />
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar'
});

export default enhance(Calendar);
