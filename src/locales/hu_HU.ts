import hu from 'date-fns/locale/hu';

const Calendar = {
  sunday: 'V',
  monday: 'H',
  tuesday: 'K',
  wednesday: 'Sze',
  thursday: 'Cs',
  friday: 'P',
  saturday: 'Szo',
  ok: 'Rendben',
  today: 'Ma',
  yesterday: 'Tegnap',
  hours: 'Óra',
  minutes: 'Perc',
  seconds: 'Másodperc',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'yyyy MMM',
  formattedDayPattern: 'yyyy MMM dd',
  dateLocale: hu as any
};

export default {
  common: {
    loading: 'Betöltés...',
    emptyMessage: 'Nem található adat'
  },
  Plaintext: {
    unfilled: 'Kitöltetlen',
    notSelected: 'Nincs kiválasztva',
    notUploaded: 'Nincs feltöltve',
    remove: 'Távolítsa el',
    clear: 'Egyértelmű'
  },
  Pagination: {
    more: 'Több',
    prev: 'Előző',
    next: 'Következő',
    first: 'Első',
    last: 'Utolsó',
    limit: '{0} / oldal',
    total: 'Összes sor: {0}',
    skip: 'Lapozz ide: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Utolsó 7 nap'
  },
  Picker: {
    noResultsText: 'Nincs találat',
    placeholder: 'Válassza ki',
    searchPlaceholder: 'Keresés',
    checkAll: 'Összes'
  },
  InputPicker: {
    newItem: 'Új elem',
    createOption: 'Opció létrehozása "{0}"'
  },
  Uploader: {
    inited: 'Kezdés',
    progress: 'Feltöltés',
    error: 'Hiba',
    complete: 'Befejezett',
    emptyFile: 'Üres',
    upload: 'Feltöltés',
    removeFile: 'Fájl törlése'
  },
  CloseButton: {
    closeLabel: 'Bezárás'
  },
  Breadcrumb: {
    expandText: 'Útvonal megjelenítése'
  },
  Toggle: {
    on: 'Be',
    off: 'Ki'
  }
};
