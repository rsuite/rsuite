import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { getUnhandledProps, defaultProps, prefix, refType } from '../utils';
import { disabledTime, calendarOnlyProps } from '../utils/timeUtils';
import { shouldTime, shouldDate, shouldMonth } from '../utils/formatUtils';
import { addMonths } from 'date-fns';

import { tuple } from '../@types/utils';

const CalendarState = tuple('DROP_TIME', 'DROP_MONTH');

export interface CalendarProps {
  pageDate: Date;
  calendarState?: typeof CalendarState[number];
  calendarRef?: React.Ref<any>;
  format?: string;
  isoWeek?: boolean;
  limitEndYear?: number;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  showMeridian?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
  onMoveForword?: (nextPageDate: Date) => void;
  onMoveBackward?: (nextPageDate: Date) => void;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  onToggleMeridian?: (event: React.MouseEvent) => void;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
  renderCell?: (date: Date) => React.ReactNode;
}

class Calendar extends React.Component<CalendarProps> {
  static propTypes = {
    pageDate: PropTypes.instanceOf(Date),
    calendarState: PropTypes.oneOf(CalendarState),
    calendarRef: refType,
    format: PropTypes.string,
    isoWeek: PropTypes.bool,
    limitEndYear: PropTypes.number,
    className: PropTypes.string,
    showWeekNumbers: PropTypes.bool,
    showMeridian: PropTypes.bool,
    classPrefix: PropTypes.string,
    disabledDate: PropTypes.func,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideHours: PropTypes.func,
    hideMinutes: PropTypes.func,
    hideSeconds: PropTypes.func,
    onMoveForword: PropTypes.func,
    onMoveBackward: PropTypes.func,
    onSelect: PropTypes.func,
    onToggleMonthDropdown: PropTypes.func,
    onToggleTimeDropdown: PropTypes.func,
    onChangePageDate: PropTypes.func,
    onChangePageTime: PropTypes.func,
    onToggleMeridian: PropTypes.func,
    renderTitle: PropTypes.func,
    renderToolbar: PropTypes.func,
    renderCell: PropTypes.func
  };
  disabledDate = (date: Date) => {
    if (this.props.disabledDate?.(date)) {
      return true;
    }
    return false;
  };

  disabledTime = (date: Date) => disabledTime(this.props, date);

  handleMoveForword = () => {
    const { onMoveForword, pageDate } = this.props;
    onMoveForword?.(addMonths(pageDate, 1));
  };

  handleMoveBackward = () => {
    const { onMoveBackward, pageDate } = this.props;
    onMoveBackward?.(addMonths(pageDate, -1));
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
      onToggleMeridian,
      format,
      calendarRef,
      className,
      isoWeek,
      limitEndYear,
      classPrefix,
      renderTitle,
      renderToolbar,
      renderCell,
      showWeekNumbers,
      showMeridian,
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

    const calendarClasses = classNames(className, classPrefix, {
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
          showMeridian={showMeridian}
          disabledDate={this.disabledDate}
          disabledTime={this.disabledTime}
          onMoveForword={this.handleMoveForword}
          onMoveBackward={this.handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
          onToggleTimeDropdown={onToggleTimeDropdown}
          onToggleMeridian={onToggleMeridian}
          renderTitle={renderTitle}
          renderToolbar={renderToolbar}
        />
        {showDate && (
          <View
            key="MonthView"
            activeDate={pageDate}
            onSelect={onSelect}
            isoWeek={isoWeek}
            disabledDate={this.disabledDate}
            renderCell={renderCell}
            showWeekNumbers={showWeekNumbers}
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
            showMeridian={showMeridian}
            onSelect={onChangePageTime}
          />
        )}
      </div>
    );
  }
}

export default defaultProps<CalendarProps>({
  classPrefix: 'calendar'
})(Calendar);
