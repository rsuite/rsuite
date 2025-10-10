'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _pl = _interopRequireDefault(require("date-fns/locale/pl"));
var DateTimeFormats = {
  sunday: 'Ndz',
  monday: 'Pon',
  tuesday: 'Wt',
  wednesday: 'Śr',
  thursday: 'Czw',
  friday: 'Pt',
  saturday: 'Sob',
  ok: 'OK',
  today: 'Dzisiaj',
  yesterday: 'Wczoraj',
  now: 'Teraz',
  hours: 'Godziny',
  minutes: 'Minuty',
  seconds: 'Sekundy',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _pl.default
};
var Combobox = {
  noResultsText: 'Nie znaleziono',
  placeholder: 'Wybierz',
  searchPlaceholder: 'Szukaj',
  checkAll: 'Wszystkie'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Nowy item',
  createOption: 'Stwórz opcję "{0}"'
});
var _default = exports.default = {
  code: 'pl-PL',
  common: {
    loading: 'Ładowanie...',
    emptyMessage: 'Nie znaleziono',
    remove: 'Usuń',
    clear: 'Wyczyść'
  },
  Plaintext: {
    unfilled: 'Nie wypełnione',
    notSelected: 'Nie wybrane',
    notUploaded: 'Nie wysłane'
  },
  Pagination: {
    more: 'Więcej',
    prev: 'Poprzednie',
    next: 'Następne',
    first: 'Pierwsze',
    last: 'Ostatnie',
    limit: '{0} / stron',
    total: 'Wierszy: {0}',
    skip: 'Omiń{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Ostatnie 7 dni'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Początkowy',
    progress: 'Wysyłanie',
    error: 'Błąd',
    complete: 'Ukończone',
    emptyFile: 'Pusty',
    upload: 'Wyślij',
    removeFile: 'Usuń plik'
  },
  CloseButton: {
    closeLabel: 'Zamknij'
  },
  Breadcrumb: {
    expandText: 'Pokaż ścieżkę'
  },
  Toggle: {
    on: 'Otwórz',
    off: 'Zamknij'
  }
};