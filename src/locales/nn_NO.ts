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
  dateLocale: nn
};

const Calendar = {
  ...DateTimeFormats,
  previousMonth: 'Førre månad',
  nextMonth: 'Neste månad',
  selectMonth: 'Vel månad',
  selectTime: 'Vel tidspunkt'
};

const DatePicker = {
  ...Calendar,
  openPicker: 'Opne datoveljaren'
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
  Calendar,
  DatePicker,
  DateRangePicker: {
    ...DatePicker,
    last7Days: 'Siste 7 dagar'
  },
  Combobox,
  CommandPalette: {
    errorText: 'Kunne ikkje søkje etter kommandoar.',
    retryText: 'Prøv igjen'
  },
  ColorPicker: {
    placeholder: 'Vel farge',
    dialogTitle: 'Vel farge',
    hue: 'Fargetone',
    saturation: 'Metting',
    brightness: 'Lysstyrke',
    opacity: 'Dekkevne',
    format: 'Format',
    value: 'Fargeverdi',
    presets: 'Førehandsdefinerte fargar',
    invalidColor: 'Skriv inn ein gyldig HEX-, RGB- eller HSL-farge.',
    clear: 'Tøm',
    done: 'Ferdig'
  },
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
  Carousel: {
    carouselRoleDescription: 'karusell',
    slideRoleDescription: 'lysbilete',
    slidePosition: '{0} av {1}',
    startRotation: 'Start automatisk byte av lysbilete',
    stopRotation: 'Stopp automatisk byte av lysbilete',
    selectSlide: 'Vel lysbilete',
    slideLabel: 'Lysbilete {0} av {1}'
  },
  PinInput: {
    groupLabel: 'PIN-kode',
    characterLabel: 'Teikn {0} av {1}'
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
