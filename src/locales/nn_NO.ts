import { nn } from 'date-fns/locale/nn';

const DateTimeFormats = {
  sunday: 'Su',
  monday: 'Må',
  tuesday: 'Ty',
  wednesday: 'On',
  thursday: 'To',
  friday: 'Fr',
  saturday: 'La',
  ok: 'OK',
  today: 'I dag',
  yesterday: 'I går',
  now: 'No',
  hours: 'Timar',
  minutes: 'Minutt',
  seconds: 'Sekund',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: nn as any
};

const Combobox = {
  noResultsText: 'Ingen resultat funne',
  placeholder: 'Vel',
  searchPlaceholder: 'Søk',
  checkAll: 'Alle'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Nytt element',
  createOption: 'Opprett alternativ "{0}"'
};

export default {
  code: 'nn-NO',
  common: {
    loading: 'Lastar...',
    emptyMessage: 'Fann ingen data',
    remove: 'Fjern',
    clear: 'Tøm'
  },
  Plaintext: {
    unfilled: 'Ikkje utfylt',
    notSelected: 'Ikkje vald',
    notUploaded: 'Ikkje lasta opp'
  },
  Pagination: {
    more: 'Meir',
    prev: 'Førre',
    next: 'Neste',
    first: 'Første',
    last: 'Siste',
    limit: '{0} / side',
    total: 'Totalt tal rader: {0}',
    skip: 'Gå til {0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Siste 7 dagar'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Klar',
    progress: 'Lastar opp',
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
    confirm: 'Stadfest',
    ok: 'OK',
    cancel: 'Avbryt'
  }
};
