'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import sv from 'date-fns/locale/sv';
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
  dateLocale: sv
};
var Combobox = {
  noResultsText: 'Inga resultat funna',
  placeholder: 'Välj',
  searchPlaceholder: 'Sök',
  checkAll: 'Alla'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Ny inkorg',
  createOption: 'Skapa meddelande "{0}"'
});
export default {
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
  DateRangePicker: _extends({}, DateTimeFormats, {
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