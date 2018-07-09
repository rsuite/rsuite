// @flow

import * as React from 'react';
import moment from 'moment';
import Calendar from './Calendar';

type Props = {
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    type: string
  ) => boolean,
  value?: Array<moment$Moment>,
  hoverValue?: Array<moment$Moment>,
  calendarDate?: Array<moment$Moment>,
  index: number,
  format: string,
  onSelect?: (date: moment$Moment, event?: SyntheticEvent<*>) => void,
  onMouseMove?: (date: moment$Moment) => void,
  onChangeCalendarDate?: (index: number, nextPageDate: moment$Moment) => void,
  isoWeek?: boolean,
  limitStartYear?: number,
  limitEndYear?: number
};

type State = {
  calendarState?: 'DROP_MONTH' | 'DROP_TIME'
};

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    value: [],
    calendarDate: [moment(), moment().add(1, 'month')],
    format: 'YYYY-MM-DD',
    index: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      calendarState: undefined
    };
  }

  onMoveForword = (nextPageDate: moment$Moment) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  onMoveBackward = (nextPageDate: moment$Moment) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  handleChangePageDate = (nextPageDate: moment$Moment) => {
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
      limitStartYear,
      limitEndYear
    } = this.props;

    const { calendarState } = this.state;

    return (
      <Calendar
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
        limitStartYear={limitStartYear}
        limitEndYear={limitEndYear}
      />
    );
  }
}

export default DatePicker;
