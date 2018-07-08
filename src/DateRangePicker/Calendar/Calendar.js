// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';

import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';

type Props = {
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    type: string
  ) => boolean,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  index: number,
  calendarDate: Array<moment$Moment>,
  value?: Array<moment$Moment>,
  hoverValue?: Array<moment$Moment>,
  onMoveForword?: (nextPageDate: moment$Moment) => void,
  onMoveBackward?: (nextPageDate: moment$Moment) => void,
  onSelect?: (date: moment$Moment) => void,
  onMouseMove?: (date: moment$Moment) => void,
  onToggleMonthDropdown?: (event: SyntheticEvent<*>) => void,
  onChangePageDate?: (nextPageDate: moment$Moment, event: SyntheticEvent<*>) => void,
  format: string,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string,
  limitStartYear?: number,
  limitEndYear?: number
};

class Calendar extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'rs-calendar',
    calendarDate: [moment(), moment().add(1, 'month')],
    index: 0
  };

  getPageDate() {
    const { calendarDate, index } = this.props;
    return calendarDate[index];
  }

  handleMoveForword = () => {
    const { onMoveForword } = this.props;
    onMoveForword &&
      onMoveForword(
        this.getPageDate()
          .clone()
          .add(1, 'month')
      );
  };

  handleMoveBackward = () => {
    const { onMoveBackward } = this.props;
    onMoveBackward &&
      onMoveBackward(
        this.getPageDate()
          .clone()
          .add(-1, 'month')
      );
  };

  disabledBackward = () => {
    const { calendarDate, index } = this.props;
    const isAfter = calendarDate[1].isAfter(calendarDate[0].clone().add(1, 'month'), 'month');

    if (index === 0) {
      return false;
    }

    if (!isAfter) {
      return true;
    }

    return false;
  };

  disabledForword = () => {
    const { calendarDate, index } = this.props;
    const isAfter = calendarDate[1].isAfter(calendarDate[0].clone().add(1, 'month'), 'month');

    if (index === 1) {
      return false;
    }

    if (!isAfter) {
      return true;
    }

    return false;
  };

  disabledMonth = (date: moment$Moment) => {
    const { calendarDate, index } = this.props;
    let isAfter = true;

    if (index === 1) {
      isAfter = date.isAfter(calendarDate[0], 'month');
      return !isAfter;
    }

    isAfter = calendarDate[1].isAfter(date, 'month');
    return !isAfter;
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
      format,
      disabledDate,
      className,
      value,
      hoverValue,
      isoWeek,
      limitStartYear,
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
          limitStartYear={limitStartYear}
          limitEndYear={limitEndYear}
        />
      </div>
    );
  }
}

export default Calendar;
