import * as React from 'react';
import * as moment from 'moment';

import { PickerBaseProps, FormControlBaseProps } from './index';

type ValueType = [moment.Moment, moment.Moment];

export interface RangeType {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export interface DateRangePickerProps extends PickerBaseProps, FormControlBaseProps<ValueType> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Format date */
  format: string;

  /** The date range that will be selected when you click on the date */
  hoverRange?: 'week' | 'month' | ((date: moment.Moment) => moment.Moment[]);

  /** Whether to click once on selected date range，Can be used with hoverRange */
  oneTap?: boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Set an optional year limit relative to the current selection date */
  limitStartYear?: number;

  /** Set the lower limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Disabled date */
  disabledDate?: (
    date: moment.Moment,
    selectValue: [moment.Moment | null, moment.Moment | null],
    doneSelected: boolean,
    type: string
  ) => boolean;

  /** Called when the option is selected */
  onSelect?: (date: moment.Moment, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after clicking the OK button */
  onOk?: (date: moment.Moment, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const DateRangePicker: React.ComponentType<DateRangePickerProps>;

export default DateRangePicker;
