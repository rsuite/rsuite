import sv from 'date-fns/locale/sv';

const Calendar = {
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
  hours: 'Timmar',
  minutes: 'Minuter',
  seconds: 'Sekunder',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: sv as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Senaste 7 dagarna'
  },
  Picker: {
    noResultsText: 'Inga resultat funna',
    placeholder: 'Välj',
    searchPlaceholder: 'Sök',
    checkAll: 'Alla'
  },
  InputPicker: {
    newItem: 'Ny inkorg',
    createOption: 'Skapa meddelande "{0}"'
  },
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
