import * as React from 'react';
import * as moment from 'moment';

import { PickerBaseProps, FormControlBaseProps } from './index';

export interface RangeType {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: moment.Moment | ((pageDate?: moment.Moment) => moment.Moment);
}

export interface DatePickerProps extends PickerBaseProps, FormControlBaseProps<moment.Moment> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Calendar panel default presentation date and time */
  calendarDefaultDate?: moment.Moment;

  /** Format date */
  format?: string;

  /** Display date panel when component initial */
  inline?: boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Set the lower limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Disabled date */
  disabledDate?: (date?: moment.Moment) => boolean;

  /** Disabled hours */
  disabledHours?: (hour: number, date: moment.Moment) => boolean;

  /** Disabled minutes */
  disabledMinutes?: (minute: number, date: moment.Moment) => boolean;

  /** Disabled seconds */
  disabledSeconds?: (second: number, date: moment.Moment) => boolean;

  /** Hidden hours */
  hideHours?: (hour: number, date: moment.Moment) => boolean;

  /** Hidden minutes */
  hideMinutes?: (minute: number, date: moment.Moment) => boolean;

  /** Hidden seconds */
  hideSeconds?: (second: number, date: moment.Moment) => boolean;

  /** Called when the calendar panel date changes */
  onChangeCalendarDate?: (date: moment.Moment, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when opening the month view */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /** Called when opening the time view */
  onToggleTimeDropdown?: (toggle: boolean) => void;

  /** Called when the option is selected */
  onSelect?: (date: moment.Moment, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after the prev month */
  onPrevMonth?: (date: moment.Moment) => void;

  /** Called after the next month */
  onNextMonth?: (date: moment.Moment) => void;

  /** Called after clicking the OK button */
  onOk?: (date: moment.Moment, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
