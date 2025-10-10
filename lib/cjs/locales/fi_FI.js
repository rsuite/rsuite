'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _fi = _interopRequireDefault(require("date-fns/locale/fi"));
var DateTimeFormats = {
  sunday: 'Su',
  monday: 'Ma',
  tuesday: 'Ti',
  wednesday: 'Ke',
  thursday: 'To',
  friday: 'Pe',
  saturday: 'La',
  ok: 'OK',
  today: 'Tänään',
  yesterday: 'Eilen',
  now: 'Nyt',
  hours: 'Tunnit',
  minutes: 'Minuuttia',
  seconds: 'Sekunttia',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH.mm',
  dateLocale: _fi.default
};
var Combobox = {
  noResultsText: 'Ei tuloksia',
  placeholder: 'Valitse',
  searchPlaceholder: 'Etsi',
  checkAll: 'Kaikki'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Uusi nimike',
  createOption: 'Luo vaihtoehto "{0}"'
});
var _default = exports.default = {
  code: 'fi-FI',
  common: {
    loading: 'Hetkinen...',
    emptyMessage: 'Dataa ei löytynyt',
    remove: 'Poista',
    clear: 'Asia selvä'
  },
  Plaintext: {
    unfilled: 'täyttämättömät',
    notSelected: 'Ei valittu',
    notUploaded: 'Ei ladattu'
  },
  Pagination: {
    more: 'Lisää',
    prev: 'Edellinen',
    next: 'Seuraava',
    first: 'Ensimmäinen',
    last: 'Viimeinen',
    limit: '{0} / sivu',
    total: 'yhteensä: {0}',
    skip: 'Mene{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Viimeiset 7 päivää'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Ensimmäinen',
    progress: 'Lataa',
    error: 'Virhe',
    complete: 'Valmis',
    emptyFile: 'Tyhjä',
    upload: 'Lataa',
    removeFile: 'Poista tiedosto'
  },
  CloseButton: {
    closeLabel: 'Sammuttaa'
  },
  Breadcrumb: {
    expandText: 'Näytä polku'
  },
  Toggle: {
    on: 'Päällä',
    off: 'Pois päältä'
  }
};