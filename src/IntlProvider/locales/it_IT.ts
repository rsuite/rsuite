const Calendar = {
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
  hours: 'Ore',
  minutes: 'Minuti',
  seconds: 'Secondi',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM YYYY',
  formattedDayPattern: 'DD MMM YYYY'
};

export default {
  Pagination: {
    more: 'Mostra di più',
    prev: 'Indietro',
    next: 'Avanti',
    first: 'Inizio',
    last: 'Fine'
  },
  Table: {
    emptyMessage: 'Nessun elemento trovato',
    loading: 'Caricamento in corso...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / pagina',
    totalInfo: 'Totale: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Ultimi 7 Giorni'
  },
  Picker: {
    noResultsText: 'Nessun risultato trovato',
    placeholder: 'Seleziona',
    searchPlaceholder: 'Cerca',
    checkAll: 'Tutti'
  },
  InputPicker: {
    newItem: 'Nuovo elemento',
    createOption: 'Crea opzione "{0}"'
  },
  Uploader: {
    inited: 'Inizializzato',
    progress: 'Avanzamento',
    error: 'Errore',
    complete: 'Completato',
    emptyFile: 'Vuoto',
    upload: 'Carica'
  }
};
