const Calendar = {
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
  hours: 'Tunnit',
  minutes: 'Minuuttia',
  seconds: 'Sekunttia',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM YYYY',
  formattedDayPattern: 'DD MMM YYYY'
};

export default {
  Pagination: {
    more: 'Lisää',
    prev: 'Edellinen',
    next: 'Seuraava',
    first: 'Ensimmäinen',
    last: 'Viimeinen'
  },
  Table: {
    emptyMessage: 'Dataa ei löytynyt',
    loading: 'Hetkinen...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / sivu',
    totalInfo: 'yhteensä: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Viimeiset 7 päivää'
  },
  Picker: {
    noResultsText: 'Ei tuloksia',
    placeholder: 'Valitse',
    searchPlaceholder: 'Etsi',
    checkAll: 'Kaikki'
  },
  InputPicker: {
    newItem: 'Uusi nimike',
    createOption: 'Luo vaihtoehto "{0}"'
  },
  Uploader: {
    inited: 'Ensimmäinen',
    progress: 'Lataa',
    error: 'Virhe',
    complete: 'Valmis',
    emptyFile: 'Tyhjä',
    upload: 'Lataa'
  }
};
