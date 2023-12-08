import de from 'date-fns/locale/de';

const Calendar = {
  sunday: 'So',
  monday: 'Mo',
  tuesday: 'Di',
  wednesday: 'Mi',
  thursday: 'Do',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Heute',
  yesterday: 'Gestern',
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: de as any
};

export default {
  common: {
    loading: 'am laden...',
    emptyMessage: 'Keine Daten gefunden',
    remove: 'Entfernen',
    clear: 'Entfernen'
  },
  Plaintext: {
    unfilled: 'Unausgefüllt',
    notSelected: 'Nicht ausgewählt',
    notUploaded: 'Nicht hochgeladen'
  },
  Pagination: {
    more: 'Mehr',
    prev: 'Vorherige',
    next: 'Nächste',
    first: 'Erste',
    last: 'Letzte',
    limit: '{0} / Seite',
    total: 'Gesamt: {0}',
    skip: 'Gehe zu{0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Letzten 7 Tage'
  },
  Picker: {
    noResultsText: 'Keine Ergebnisse gefunden',
    placeholder: 'Auswählen',
    searchPlaceholder: 'Suchen',
    checkAll: 'Alle'
  },
  InputPicker: {
    newItem: 'Neues Element',
    createOption: 'Option erstellen: "{0}"'
  },
  Uploader: {
    inited: 'Startend',
    progress: 'Am hochladen',
    error: 'Fehler',
    complete: 'Beendet',
    emptyFile: 'Leer',
    upload: 'Hochladen',
    removeFile: 'Dateien löschen'
  },
  CloseButton: {
    closeLabel: 'Schließen'
  },
  Breadcrumb: {
    expandText: 'Pfad anzeigen'
  },
  Toggle: {
    on: 'Öffnen',
    off: 'Schließen'
  }
};
