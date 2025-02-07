import { nl } from 'date-fns/locale/nl';

const DateTimeFormats = {
  sunday: 'Zo',
  monday: 'Ma',
  tuesday: 'Di',
  wednesday: 'Wo',
  thursday: 'Do',
  friday: 'Vr',
  saturday: 'Za',
  ok: 'Oke',
  today: 'Vandaag',
  yesterday: 'Gisteren',
  now: 'Nu',
  hours: 'Uren',
  minutes: 'Mimnuten',
  seconds: 'Seconden',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  shortDateFormat: 'dd-MM-yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: nl as any
};

const Combobox = {
  noResultsText: 'Geen resultaten gevonden',
  placeholder: 'Selecteren',
  searchPlaceholder: 'Zoeken',
  checkAll: 'Alles'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Nieuw item',
  createOption: 'Creëer optie "{0}"'
};

export default {
  code: 'nl-NL',
  common: {
    loading: 'Laden...',
    emptyMessage: 'Geen data gevonden',
    remove: 'Verwijderen',
    clear: 'Duidelijk'
  },
  Plaintext: {
    unfilled: 'Ongevuld',
    notSelected: 'Niet geselecteerd',
    notUploaded: 'Niet geupload'
  },
  Pagination: {
    more: 'Meer',
    prev: 'Vorige',
    next: 'Volgende',
    first: 'Eerste',
    last: 'Laatste',
    limit: '{0} / pagina',
    total: 'Totaal Rijen: {0}',
    skip: 'Ga naar{0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Laatste 7 Dagen'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Gestart',
    progress: 'Uploaden',
    error: 'Error',
    complete: 'Voltooid',
    emptyFile: 'Leeg',
    upload: 'Upload',
    removeFile: 'Verwijder bestand'
  },
  CloseButton: {
    closeLabel: 'Sluiten'
  },
  Breadcrumb: {
    expandText: 'Toon pad'
  },
  Toggle: {
    on: 'Open',
    off: 'Sluit'
  }
};
