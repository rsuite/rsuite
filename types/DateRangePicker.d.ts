import * as React from 'react';

import { PickerBaseProps, FormControlBaseProps } from './index';

type ValueType = [Date, Date];

export interface RangeType {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export interface DateRangePickerProps extends PickerBaseProps, FormControlBaseProps<ValueType> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Format date */
  format?: string;

  /** The date range that will be selected when you click on the date */
  hoverRange?: 'week' | 'month' | ((date: Date) => Date[]);

  /** Whether to click once on selected date range，Can be used with hoverRange */
  oneTap?: boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Set the lower limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Disabled date */
  disabledDate?: (
    date: Date,
    selectValue: [Date | null, Date | null],
    doneSelected: boolean,
    type: string
  ) => boolean;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after clicking the OK button */
  onOk?: (date: Date, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Custom render value */
  renderValue?: (value: ValueType, format: string) => React.ReactNode;
}

declare const DateRangePicker: React.ComponentType<DateRangePickerProps>;

export default DateRangePicker;
