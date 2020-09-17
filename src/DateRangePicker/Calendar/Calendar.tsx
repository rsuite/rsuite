import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addMonths, isAfter, setDate } from 'date-fns';

import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';

export interface CalendarProps {
  calendarState?: 'DROP_MONTH' | 'DROP_TIME';
  index: number;
  calendarDate: Date[];
  value?: Date[];
  hoverValue?: Date[];
  format: string;
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
  limitEndYear?: number;
  showWeekNumbers?: boolean;
  showOneCalendar?: boolean;
  disabledDate?: (date: Date, selectValue: Date[], type: string) => boolean;
  onMoveForword?: (nextPageDate: Date) => void;
  onMoveBackward?: (nextPageDate: Date) => void;
  onSelect?: (date: Date) => void;
  onMouseMove?: (date: Date) => void;
  onToggleMonthDropdown?: (event: React.SyntheticEvent<any>) => void;
  onChangePageDate?: (nextPageDate: Date, event: React.SyntheticEvent<any>) => void;
}

class Calendar extends React.Component<CalendarProps> {
  static propTypes = {
    calendarState: PropTypes.oneOf(['DROP_MONTH', 'DROP_TIME']),
    index: PropTypes.number,
    calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    format: PropTypes.string,
    isoWeek: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    limitEndYear: PropTypes.number,
    disabledDate: PropTypes.func,
    onMoveForword: PropTypes.func,
    onMoveBackward: PropTypes.func,
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
    onToggleMonthDropdown: PropTypes.func,
    onChangePageDate: PropTypes.func,
    showOneCalendar: PropTypes.bool
  };
  static defaultProps = {
    calendarDate: [new Date(), addMonths(new Date(), 1)],
    index: 0
  };

  getPageDate() {
    const { calendarDate, index } = this.props;
    return calendarDate[index];
  }

  handleMoveForword = () => {
    this.props.onMoveForword?.(addMonths(this.getPageDate(), 1));
  };

  handleMoveBackward = () => {
    this.props.onMoveBackward?.(addMonths(this.getPageDate(), -1));
  };

  disabledBackward = () => {
    const { calendarDate, index } = this.props;
    const after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

    if (index === 0) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  };

  disabledForword = () => {
    const { calendarDate, index, showOneCalendar } = this.props;
    if (showOneCalendar) return false;
    const after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

    if (index === 1) {
      return false;
    }

    if (!after) {
      return true;
    }

    return false;
  };

  disabledMonth = (date: Date) => {
    const { calendarDate, value, index, disabledDate, showOneCalendar } = this.props;
    let after = true;

    if (disabledDate?.(date, value, 'MONTH')) {
      return true;
    }
    if (showOneCalendar) return false;

    if (index === 1) {
      after = isAfter(date, calendarDate[0]);

      return !after;
    }

    after = isAfter(calendarDate[1], date);

    return !after;
  };

  shouldMountDate(props: CalendarProps) {
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
      showWeekNumbers,
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
          showWeekNumbers={showWeekNumbers}
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

const enhance = defaultProps<CalendarProps>({
  classPrefix: 'calendar'
});

export default enhance(Calendar);
