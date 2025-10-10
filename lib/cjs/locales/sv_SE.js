'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _sv = _interopRequireDefault(require("date-fns/locale/sv"));
var DateTimeFormats = {
  sunday: 'Sö',
  monday: 'Må',
  tuesday: 'Ti',
  wednesday: 'On',
  thursday: 'To',
  friday: 'Fr',
  saturday: 'Lö',
  ok: 'OK',
  today: 'I dag',
  yesterday: 'I går',
  now: 'Nu',
  hours: 'Timmar',
  minutes: 'Minuter',
  seconds: 'Sekunder',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'yyyy-MM-dd',
  shortTimeFormat: 'HH:mm',
  dateLocale: _sv.default
};
var Combobox = {
  noResultsText: 'Inga resultat funna',
  placeholder: 'Välj',
  searchPlaceholder: 'Sök',
  checkAll: 'Alla'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Ny inkorg',
  createOption: 'Skapa meddelande "{0}"'
});
var _default = exports.default = {
  code: 'sv-SE',
  common: {
    loading: 'Laddar...',
    emptyMessage: 'Kunde inte hitta data',
    remove: 'Ta bort',
    clear: 'Rensa'
  },
  Plaintext: {
    unfilled: 'Ofylld',
    notSelected: 'Ej valt',
    notUploaded: 'Ej uppladdad'
  },
  Pagination: {
    more: 'Mer',
    prev: 'Föregående',
    next: 'Nästa',
    first: 'Första',
    last: 'Sista',
    limit: '{0} / sida',
    total: 'totalt: {0}',
    skip: 'Gå til{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Senaste 7 dagarna'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Första',
    progress: 'Uppladdning',
    error: 'Fel',
    complete: 'Färdig',
    emptyFile: 'Tom',
    upload: 'Ladda upp',
    removeFile: 'Radera filer'
  },
  CloseButton: {
    closeLabel: 'Stänga av'
  },
  Breadcrumb: {
    expandText: 'Visa väg'
  },
  Toggle: {
    on: 'På',
    off: 'Av'
  }
};