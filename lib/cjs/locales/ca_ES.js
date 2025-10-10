'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ca = _interopRequireDefault(require("date-fns/locale/ca"));
var DateTimeFormats = {
  sunday: 'Dg',
  monday: 'Dl',
  tuesday: 'Dt',
  wednesday: 'Dc',
  thursday: 'Dj',
  friday: 'Dv',
  saturday: 'Ds',
  ok: 'Acceptar',
  today: 'Avui',
  yesterday: 'Ahir',
  now: 'Ara',
  hours: 'Hores',
  minutes: 'Minuts',
  seconds: 'Segons',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _ca.default
};
var Combobox = {
  noResultsText: "No s'han trobat resultats",
  placeholder: 'Seleccionar',
  searchPlaceholder: 'Cercar',
  checkAll: 'Tots'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Nou',
  createOption: 'Crear opció "{0}"'
});
var _default = exports.default = {
  code: 'ca-ES',
  common: {
    loading: 'Carregant...',
    emptyMessage: 'Sense dades',
    remove: 'Eliminar',
    clear: 'Netejar'
  },
  Plaintext: {
    unfilled: 'Sense omplir',
    notSelected: 'No seleccionat',
    notUploaded: 'No pujat'
  },
  Pagination: {
    more: 'Més',
    prev: 'Anterior',
    next: 'Següent',
    first: 'Primer',
    last: 'Últim',
    limit: '{0} / pàgines',
    total: 'Total: {0}',
    skip: 'Anar{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Últims 7 dies'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Inicial',
    progress: 'Pujant',
    error: 'Error',
    complete: 'Completat',
    emptyFile: 'Buit',
    upload: 'Pujar',
    removeFile: 'Eliminar fitxer'
  },
  CloseButton: {
    closeLabel: 'Tancar'
  },
  Breadcrumb: {
    expandText: 'Mostrar ruta'
  },
  Toggle: {
    on: 'Encendre',
    off: 'Apagar'
  }
};