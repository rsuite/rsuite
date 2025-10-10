'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import pl from 'date-fns/locale/pl';
var DateTimeFormats = {
  sunday: 'Ndz',
  monday: 'Pon',
  tuesday: 'Wt',
  wednesday: 'Śr',
  thursday: 'Czw',
  friday: 'Pt',
  saturday: 'Sob',
  ok: 'OK',
  today: 'Dzisiaj',
  yesterday: 'Wczoraj',
  now: 'Teraz',
  hours: 'Godziny',
  minutes: 'Minuty',
  seconds: 'Sekundy',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: pl
};
var Combobox = {
  noResultsText: 'Nie znaleziono',
  placeholder: 'Wybierz',
  searchPlaceholder: 'Szukaj',
  checkAll: 'Wszystkie'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Nowy item',
  createOption: 'Stwórz opcję "{0}"'
});
export default {
  code: 'pl-PL',
  common: {
    loading: 'Ładowanie...',
    emptyMessage: 'Nie znaleziono',
    remove: 'Usuń',
    clear: 'Wyczyść'
  },
  Plaintext: {
    unfilled: 'Nie wypełnione',
    notSelected: 'Nie wybrane',
    notUploaded: 'Nie wysłane'
  },
  Pagination: {
    more: 'Więcej',
    prev: 'Poprzednie',
    next: 'Następne',
    first: 'Pierwsze',
    last: 'Ostatnie',
    limit: '{0} / stron',
    total: 'Wierszy: {0}',
    skip: 'Omiń{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: 'Ostatnie 7 dni'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Początkowy',
    progress: 'Wysyłanie',
    error: 'Błąd',
    complete: 'Ukończone',
    emptyFile: 'Pusty',
    upload: 'Wyślij',
    removeFile: 'Usuń plik'
  },
  CloseButton: {
    closeLabel: 'Zamknij'
  },
  Breadcrumb: {
    expandText: 'Pokaż ścieżkę'
  },
  Toggle: {
    on: 'Otwórz',
    off: 'Zamknij'
  }
};