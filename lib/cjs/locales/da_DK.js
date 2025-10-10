'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _da = _interopRequireDefault(require("date-fns/locale/da"));
var DateTimeFormats = {
  sunday: 'Sø',
  monday: 'Ma',
  tuesday: 'Ti',
  wednesday: 'On',
  thursday: 'To',
  friday: 'Fr',
  saturday: 'Lø',
  ok: 'OK',
  today: 'I dag',
  yesterday: 'I går',
  now: 'Nu',
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _da.default
};
var Combobox = {
  noResultsText: 'Ingen resultater fundet',
  placeholder: 'Vælg',
  searchPlaceholder: 'Søg',
  checkAll: 'Alle'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Ny besked',
  createOption: 'Opret mulighed "{0}"'
});
var _default = exports.default = {
  code: 'da-DK',
  common: {
    loading: 'Indlæser...',
    emptyMessage: 'Ingen data fundet',
    remove: 'Fjerne',
    clear: 'Ryd'
  },
  Plaintext: {
    unfilled: 'ubesatte',
    notSelected: 'Ikke valgt',
    notUploaded: 'Ikke uploadet'
  },
  Pagination: {
    more: 'Mere',
    prev: 'Tidligere',
    next: 'Næste',
    first: 'Først',
    last: 'Sidst',
    limit: '{0} / side',
    total: 'total: {0}',
    skip: 'Gå til{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Seneste 7 dage'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Initial',
    progress: 'Uploade',
    error: 'Fejl',
    complete: 'Færdig',
    emptyFile: 'Tom',
    upload: 'Upload',
    removeFile: 'Fjern fil'
  },
  CloseButton: {
    closeLabel: 'lukke ned'
  },
  Breadcrumb: {
    expandText: 'Vis sti'
  },
  Toggle: {
    on: 'på',
    off: 'Av'
  }
};