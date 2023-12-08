import fi from 'date-fns/locale/fi';

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
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: fi as any
};

export default {
  common: {
    loading: 'Hetkinen...',
    emptyMessage: 'Dataa ei löytynyt',
    remove: 'Poista',
    clear: 'Asia selvä'
  },
  Plaintext: {
    unfilled: 'täyttämättömät',
    notSelected: 'Ei valittu',
    notUploaded: 'Ei ladattu'
  },
  Pagination: {
    more: 'Lisää',
    prev: 'Edellinen',
    next: 'Seuraava',
    first: 'Ensimmäinen',
    last: 'Viimeinen',
    limit: '{0} / sivu',
    total: 'yhteensä: {0}',
    skip: 'Mene{0}'
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
    checkAll: 'Kaikki',
    loading: 'Hetkinen...'
  },
  Input: {
    emptyPlaintext: 'täyttämättömät'
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
    upload: 'Lataa',
    removeFile: 'Poista tiedosto'
  },
  CloseButton: {
    closeLabel: 'Sammuttaa'
  },
  Breadcrumb: {
    expandText: 'Näytä polku'
  },
  Toggle: {
    on: 'Päällä',
    off: 'Pois päältä'
  }
};
