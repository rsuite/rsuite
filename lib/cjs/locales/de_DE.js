'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _de = _interopRequireDefault(require("date-fns/locale/de"));
var DateTimeFormats = {
  sunday: 'So',
  monday: 'Mo',
  tuesday: 'Di',
  wednesday: 'Mi',
  thursday: 'Do',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Heute',
  yesterday: 'Gestern',
  now: 'Jetzt',
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _de.default
};
var Combobox = {
  noResultsText: 'Keine Ergebnisse gefunden',
  placeholder: 'Auswählen',
  searchPlaceholder: 'Suchen',
  checkAll: 'Alle'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Neues Element',
  createOption: 'Option erstellen: "{0}"'
});
var _default = exports.default = {
  code: 'de-DE',
  common: {
    loading: 'am laden...',
    emptyMessage: 'Keine Daten gefunden',
    remove: 'Entfernen',
    clear: 'Entfernen'
  },
  Plaintext: {
    unfilled: 'Unausgefüllt',
    notSelected: 'Nicht ausgewählt',
    notUploaded: 'Nicht hochgeladen'
  },
  Pagination: {
    more: 'Mehr',
    prev: 'Vorherige',
    next: 'Nächste',
    first: 'Erste',
    last: 'Letzte',
    limit: '{0} / Seite',
    total: 'Gesamt: {0}',
    skip: 'Gehe zu{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Letzten 7 Tage'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Startend',
    progress: 'Am hochladen',
    error: 'Fehler',
    complete: 'Beendet',
    emptyFile: 'Leer',
    upload: 'Hochladen',
    removeFile: 'Dateien löschen'
  },
  CloseButton: {
    closeLabel: 'Schließen'
  },
  Breadcrumb: {
    expandText: 'Pfad anzeigen'
  },
  Toggle: {
    on: 'Öffnen',
    off: 'Schließen'
  }
};