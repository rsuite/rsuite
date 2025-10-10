'use client';
import DateRangePicker from "./DateRangePicker.js";
import * as utils from "./disabledDateUtils.js";
Object.keys(utils).forEach(function (key) {
  DateRangePicker[key] = utils[key];
});
export default DateRangePicker;