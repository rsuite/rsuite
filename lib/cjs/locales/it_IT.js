'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _it = _interopRequireDefault(require("date-fns/locale/it"));
var DateTimeFormats = {
  sunday: 'Do',
  monday: 'Lu',
  tuesday: 'Ma',
  wednesday: 'Me',
  thursday: 'Gi',
  friday: 'Ve',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Oggi',
  yesterday: 'Ieri',
  now: 'Adesso',
  hours: 'Ore',
  minutes: 'Minuti',
  seconds: 'Secondi',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _it.default
};
var Combobox = {
  noResultsText: 'Nessun risultato trovato',
  placeholder: 'Seleziona',
  searchPlaceholder: 'Cerca',
  checkAll: 'Tutti'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Nuovo elemento',
  createOption: 'Crea opzione "{0}"'
});
var _default = exports.default = {
  code: 'it-IT',
  common: {
    loading: 'Caricamento in corso...',
    emptyMessage: 'Nessun elemento trovato',
    remove: 'Rimuovi',
    clear: 'Chiaro'
  },
  Plaintext: {
    unfilled: 'Vacanti',
    notSelected: 'Non selezionato',
    notUploaded: 'Non caricato'
  },
  Pagination: {
    more: 'Mostra di più',
    prev: 'Indietro',
    next: 'Avanti',
    first: 'Inizio',
    last: 'Fine',
    limit: '{0} / pagina',
    total: 'Totale: {0}',
    skip: 'Vai a{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Ultimi 7 Giorni'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Inizializzato',
    progress: 'Avanzamento',
    error: 'Errore',
    complete: 'Completato',
    emptyFile: 'Vuoto',
    upload: 'Carica',
    removeFile: 'Rimuovi file'
  },
  CloseButton: {
    closeLabel: 'spegnimento'
  },
  Breadcrumb: {
    expandText: 'Mostra percorso'
  },
  Toggle: {
    on: 'Acceso',
    off: 'Spento'
  }
};