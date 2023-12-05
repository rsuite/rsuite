import nl from 'date-fns/locale/nl';

const Calendar = {
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
  hours: 'Uren',
  minutes: 'Mimnuten',
  seconds: 'Seconden',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  dateLocale: nl as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Laatste 7 Dagen'
  },
  Picker: {
    noResultsText: 'Geen resultaten gevonden',
    placeholder: 'Selecteren',
    searchPlaceholder: 'Zoeken',
    checkAll: 'Alles'
  },
  InputPicker: {
    newItem: 'Nieuw item',
    createOption: 'Creëer optie "{0}"'
  },
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
