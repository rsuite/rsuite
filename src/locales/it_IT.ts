import it from 'date-fns/locale/it';

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
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: it as any
};

export default {
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
