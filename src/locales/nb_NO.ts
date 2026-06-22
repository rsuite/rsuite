import { nb } from 'date-fns/locale/nb';

const DateTimeFormats = {
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
  now: 'Nå',
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: nb as any
};

const Combobox = {
  noResultsText: 'Ingen resultater funnet',
  placeholder: 'Velg',
  searchPlaceholder: 'Søk',
  checkAll: 'Alle'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Nytt element',
  createOption: 'Opprett alternativ "{0}"'
};

export default {
  code: 'nb-NO',
  common: {
    loading: 'Laster...',
    emptyMessage: 'Fant ingen data',
    remove: 'Fjern',
    clear: 'Tøm'
  },
  Plaintext: {
    unfilled: 'Ikke utfylt',
    notSelected: 'Ikke valgt',
    notUploaded: 'Ikke lastet opp'
  },
  Pagination: {
    more: 'Mer',
    prev: 'Forrige',
    next: 'Neste',
    first: 'Første',
    last: 'Siste',
    limit: '{0} / side',
    total: 'Totalt antall rader: {0}',
    skip: 'Gå til {0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Siste 7 dager'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Klar',
    progress: 'Laster opp',
    error: 'Feil',
    complete: 'Fullført',
    emptyFile: 'Tom',
    upload: 'Last opp',
    removeFile: 'Fjern fil'
  },
  CloseButton: {
    closeLabel: 'Lukk'
  },
  Breadcrumb: {
    expandText: 'Vis sti'
  },
  Toggle: {
    on: 'PÅ',
    off: 'AV'
  },
  Dialog: {
    alert: 'Varsel',
    confirm: 'Bekreft',
    ok: 'OK',
    cancel: 'Avbryt'
  }
};
