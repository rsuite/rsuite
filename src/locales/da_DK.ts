import da from 'date-fns/locale/da';

const Calendar = {
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
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: da as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Seneste 7 dage'
  },
  Picker: {
    noResultsText: 'Ingen resultater fundet',
    placeholder: 'Vælg',
    searchPlaceholder: 'Søg',
    checkAll: 'Alle'
  },
  InputPicker: {
    newItem: 'Ny besked',
    createOption: 'Opret mulighed "{0}"'
  },
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
