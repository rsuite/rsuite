// @flow

import * as React from 'react';
import Calendar from './Calendar';
import { addMonths } from 'date-fns';

type Props = {
  disabledDate?: (date: Date, selectValue: Array<Date | null>, type: string) => boolean,
  value?: Array<Date>,
  hoverValue?: Array<Date>,
  calendarDate?: Array<Date>,
  index: number,
  format: string,
  onSelect?: (date: Date, event?: SyntheticEvent<*>) => void,
  onMouseMove?: (date: Date) => void,
  onChangeCalendarDate?: (index: number, nextPageDate: Date) => void,
  isoWeek?: boolean,
  limitEndYear?: number,
  classPrefix?: string
};

type State = {
  calendarState?: 'DROP_MONTH' | 'DROP_TIME'
};

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    value: [],
    calendarDate: [new Date(), addMonths(new Date(), 1)],
    format: 'YYYY-MM-DD',
    index: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      calendarState: undefined
    };
  }

  onMoveForword = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  onMoveBackward = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  handleChangePageDate = (nextPageDate: Date) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
    this.setState({
      calendarState: undefined
    });
  };

  showMonthDropdown() {
    this.setState({ calendarState: 'DROP_MONTH' });
  }

  hideMonthDropdown() {
    this.setState({ calendarState: undefined });
  }

  toggleMonthDropdown = () => {
    const { calendarState } = this.state;

    if (calendarState === 'DROP_MONTH') {
      this.hideMonthDropdown();
    } else {
      this.showMonthDropdown();
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
      classPrefix
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
      />
    );
  }
}

export default DatePicker;
