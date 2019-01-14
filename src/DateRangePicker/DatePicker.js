// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import Calendar from './Calendar';

type Props = {
  disabledDate?: (
    date: dayjs.Dayjs,
    selectValue: Array<dayjs.Dayjs | null>,
    type: string
  ) => boolean,
  value?: Array<dayjs.Dayjs>,
  hoverValue?: Array<dayjs.Dayjs>,
  calendarDate?: Array<dayjs.Dayjs>,
  index: number,
  format: string,
  onSelect?: (date: dayjs.Dayjs, event?: SyntheticEvent<*>) => void,
  onMouseMove?: (date: dayjs.Dayjs) => void,
  onChangeCalendarDate?: (index: number, nextPageDate: dayjs.Dayjs) => void,
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
    calendarDate: [dayjs(), dayjs().add(1, 'month')],
    format: 'YYYY-MM-DD',
    index: 0
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      calendarState: undefined
    };
  }

  onMoveForword = (nextPageDate: dayjs.Dayjs) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  onMoveBackward = (nextPageDate: dayjs.Dayjs) => {
    const { onChangeCalendarDate, index } = this.props;
    onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
  };

  handleChangePageDate = (nextPageDate: dayjs.Dayjs) => {
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
