'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import ca from 'date-fns/locale/ca';
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
  dateLocale: ca
};
var Combobox = {
  noResultsText: "No s'han trobat resultats",
  placeholder: 'Seleccionar',
  searchPlaceholder: 'Cercar',
  checkAll: 'Tots'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Nou',
  createOption: 'Crear opció "{0}"'
});
export default {
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
  DateRangePicker: _extends({}, DateTimeFormats, {
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