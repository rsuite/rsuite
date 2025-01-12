import DateRangePicker from './DateRangePicker';
import * as utils from './disabledDateUtils';

// export types
export type { DateRangePickerComponent, DateRangePickerProps } from './DateRangePicker';
export type { DateRange, DisabledDateFunction } from './types';

// export utils
export * from './disabledDateUtils';

Object.keys(utils).forEach(key => {
  DateRangePicker[key] = utils[key];
});

// export components
export { DateRangePicker };
export default DateRangePicker;
