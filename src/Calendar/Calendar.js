// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import dayjs from 'dayjs';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldTime, shouldDate, shouldMonth } from '../utils/formatUtils';

type Props = {
  pageDate: dayjs.Dayjs,
  disabledDate?: (date: dayjs.Dayjs) => boolean,
  disabledHours?: (hour: number, date: dayjs.Dayjs) => boolean,
  disabledMinutes?: (minute: number, date: dayjs.Dayjs) => boolean,
  disabledSeconds?: (second: number, date: dayjs.Dayjs) => boolean,
  hideHours?: (hour: number, date: dayjs.Dayjs) => boolean,
  hideMinutes?: (minute: number, date: dayjs.Dayjs) => boolean,
  hideSeconds?: (second: number, date: dayjs.Dayjs) => boolean,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  onMoveForword?: (nextPageDate: dayjs.Dayjs) => void,
  onMoveBackward?: (nextPageDate: dayjs.Dayjs) => void,
  onSelect?: (date: dayjs.Dayjs) => void,
  onToggleMonthDropdown?: (event: SyntheticEvent<*>) => void,
  onToggleTimeDropdown?: (event: SyntheticEvent<*>) => void,
  onChangePageDate?: (nextPageDate: dayjs.Dayjs, event: SyntheticEvent<*>) => void,
  onChangePageTime?: (nextPageTime: dayjs.Dayjs, event: SyntheticEvent<*>) => void,
  calendarRef?: React.ElementRef<*>,
  format?: string,
  isoWeek?: boolean,
  limitEndYear?: number,
  className?: string,
  classPrefix?: string
};

class Calendar extends React.PureComponent<Props> {
  disabledDate = (date: dayjs.Dayjs) => {
    const { disabledDate } = this.props;
    if (disabledDate && disabledDate(date)) {
      return true;
    }
    return false;
  };

  disabledTime = (date: dayjs.Dayjs) => disabledTime(this.props, date);

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
            limitEndYear={limitEndYear}
            disabledMonth={this.disabledDate}
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

const enhance = defaultProps({
  classPrefix: 'calendar'
});

export default enhance(Calendar);
