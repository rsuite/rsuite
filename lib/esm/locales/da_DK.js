'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import da from 'date-fns/locale/da';
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
  dateLocale: da
};
var Combobox = {
  noResultsText: 'Ingen resultater fundet',
  placeholder: 'Vælg',
  searchPlaceholder: 'Søg',
  checkAll: 'Alle'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Ny besked',
  createOption: 'Opret mulighed "{0}"'
});
export default {
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
  DateRangePicker: _extends({}, DateTimeFormats, {
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