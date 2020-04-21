import * as React from 'react';
import PropTypes from 'prop-types';
import { addMonths } from 'date-fns';
import Calendar from './Calendar';

import { ValueType } from './DateRangePicker.d';

export interface DatePickerProps {
  value?: ValueType;
  hoverValue?: ValueType;
  calendarDate?: ValueType;
  index: number;
  format: string;
  isoWeek?: boolean;
  limitEndYear?: number;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  showOneCalendar?: boolean;
  disabledDate?: (date: Date, selectValue: ValueType, type: string) => boolean;
  onSelect?: (date: Date, event?: React.SyntheticEvent<any>) => void;
  onMouseMove?: (date: Date) => void;
  onChangeCalendarDate?: (index: number, nextPageDate: Date) => void;
}

interface DatePickerState {
  calendarState?: 'DROP_MONTH' | 'DROP_TIME';
}

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    index: PropTypes.number,
    format: PropTypes.string,
    isoWeek: PropTypes.bool,
    limitEndYear: PropTypes.number,
    classPrefix: PropTypes.string,
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
    onChangeCalendarDate: PropTypes.func
  };
  static defaultProps = {
    value: [],
    calendarDate: [new Date(), addMonths(new Date(), 1)],
    format: 'YYYY-MM-DD',
    index: 0
  };

  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      calendarState: undefined
    };
  }

  onMoveForword = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate?.(index, nextPageDate);
  };

  onMoveBackward = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate?.(index, nextPageDate);
  };

  handleChangePageDate = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate?.(index, nextPageDate);
    this.setState({
      calendarState: undefined
    });
  };

  toggleMonthDropdown = () => {
    const { calendarState } = this.state;
    if (calendarState === 'DROP_MONTH') {
      this.setState({ calendarState: undefined });
    } else {
      this.setState({ calendarState: 'DROP_MONTH' });
    }
  };

  render() {
    const {
      format,
      value,
      hoverValue,
      index,
      calendarDate,
      onSelect,
      onMouseMove,
      disabledDate,
      isoWeek,
      limitEndYear,
      classPrefix,
      showWeekNumbers,
      showOneCalendar
    } = this.props;

    const { calendarState } = this.state;

    return (
      <Calendar
        classPrefix={classPrefix}
        disabledDate={disabledDate}
        format={format}
        value={value}
        isoWeek={isoWeek}
        hoverValue={hoverValue}
        calendarState={calendarState}
        calendarDate={calendarDate}
        index={index}
        onMoveForword={this.onMoveForword}
        onMoveBackward={this.onMoveBackward}
        onSelect={onSelect}
        onMouseMove={onMouseMove}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onChangePageDate={this.handleChangePageDate}
        limitEndYear={limitEndYear}
        showWeekNumbers={showWeekNumbers}
        showOneCalendar={showOneCalendar}
      />
    );
  }
}

export default DatePicker;
