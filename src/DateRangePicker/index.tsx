import DateRangePicker from './DateRangePicker';
import * as utils from './disabledDateUtils';

Object.keys(utils).forEach(key => {
  DateRangePicker[key] = utils[key];
});

export type { DateRangePickerComponent, DateRangePickerProps } from './DateRangePicker';
export type { ValueType, DateRange, RangeType, DisabledDateFunction } from './types';
export default DateRangePicker;
