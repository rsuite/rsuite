// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';

import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldTime, shouldDate, shouldMonth } from '../utils/formatUtils';

const { namespace } = constants;

type Props = {
  pageDate: moment$Moment,
  disabledDate?: (date: moment$Moment) => boolean,
  disabledHours?: (hour: number, date: moment$Moment) => boolean,
  disabledMinutes?: (minute: number, date: moment$Moment) => boolean,
  disabledSeconds?: (second: number, date: moment$Moment) => boolean,
  hideHours?: (hour: number, date: moment$Moment) => boolean,
  hideMinutes?: (minute: number, date: moment$Moment) => boolean,
  hideSeconds?: (second: number, date: moment$Moment) => boolean,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  onMoveForword?: (nextPageDate: moment$Moment) => void,
  onMoveBackward?: (nextPageDate: moment$Moment) => void,
  onSelect?: (date: moment$Moment) => void,
  onToggleMonthDropdown?: (event: SyntheticEvent<*>) => void,
  onToggleTimeDropdown?: (event: SyntheticEvent<*>) => void,
  onChangePageDate?: (nextPageDate: moment$Moment, event: SyntheticEvent<*>) => void,
  onChangePageTime?: (nextPageTime: moment$Moment, event: SyntheticEvent<*>) => void,
  calendarRef?: React.ElementRef<*>,
  format?: string,
  isoWeek?: boolean,
  limitStartYear?: number,
  limitEndYear?: number,
  className?: string,
  classPrefix?: string
};

class Calendar extends React.PureComponent<Props> {
  static defaultProps = {
    classPrefix: `${namespace}-calendar`
  };
  disabledDate = (date: moment$Moment) => {
    const { disabledDate } = this.props;
    if (disabledDate && disabledDate(date)) {
      return true;
    }
    return false;
  };

  disabledTime = (date: moment$Moment) => disabledTime(this.props, date);

  handleMoveForword = () => {
    const { onMoveForword, pageDate } = this.props;
    onMoveForword && onMoveForword(pageDate.clone().add(1, 'month'));
  };

  handleMoveBackward = () => {
    const { onMoveBackward, pageDate } = this.props;
    onMoveBackward && onMoveBackward(pageDate.clone().add(-1, 'month'));
  };

  render() {
    const {
      calendarState,
      pageDate,
      onSelect,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onChangePageDate,
      onChangePageTime,
      format,
      calendarRef,
      className,
      isoWeek,
      limitStartYear,
      limitEndYear,
      classPrefix,
      ...rest
    } = this.props;

    const showDate = shouldDate(format);
    const showTime = shouldTime(format);
    const showMonth = shouldMonth(format);

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
    const dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;
    const addPrefix = prefix(classPrefix);

    const calendarClasses = classNames(classPrefix, className, {
      [addPrefix('show-time-dropdown')]: dropTime,
      [addPrefix('show-month-dropdown')]: dropMonth
    });

    const unhandled = getUnhandledProps(Calendar, rest);
    const timeDropdownProps = _.pick(rest, calendarOnlyProps);
    return (
      <div {...unhandled} className={calendarClasses} ref={calendarRef}>
        <Header
          date={pageDate}
          format={format}
          showMonth={showMonth}
          showDate={showDate}
          showTime={showTime}
          disabledDate={this.disabledDate}
          disabledTime={this.disabledTime}
          onMoveForword={this.handleMoveForword}
          onMoveBackward={this.handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
          onToggleTimeDropdown={onToggleTimeDropdown}
        />
        {showDate && (
          <View
            key="MonthView"
            activeDate={pageDate}
            onSelect={onSelect}
            isoWeek={isoWeek}
            disabledDate={this.disabledDate}
          />
        )}
        {showMonth && (
          <MonthDropdown
            date={pageDate}
            onSelect={onChangePageDate}
            show={dropMonth}
            limitStartYear={limitStartYear}
            limitEndYear={limitEndYear}
          />
        )}
        {showTime && (
          <TimeDropdown
            {...timeDropdownProps}
            date={pageDate}
            format={format}
            show={dropTime}
            onSelect={onChangePageTime}
          />
        )}
      </div>
    );
  }
}

export default Calendar;
