"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var Calendar = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  formattedMonthPattern: 'MMM, YYYY',
  formattedDayPattern: 'MMM DD, YYYY'
};
var _default = {
  Pagination: {
    more: 'More',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last'
  },
  Table: {
    emptyMessage: 'No data found',
    loading: 'Loading...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / page',
    totalInfo: 'total: {0}'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'Last 7 Days'
  }),
  Picker: {
    noResultsText: 'No results found',
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    checkAll: 'All'
  },
  InputPicker: {
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  Uploader: {
    inited: 'Initial',
    progress: 'Uploading',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Empty',
    upload: 'Upload'
  }
};
exports.default = _default;
module.exports = exports.default;