'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import cs from 'date-fns/locale/cs';
var DateTimeFormats = {
  sunday: 'Ne',
  monday: 'Po',
  tuesday: 'Út',
  wednesday: 'St',
  thursday: 'Čt',
  friday: 'Pá',
  saturday: 'So',
  ok: 'OK',
  today: 'Dnes',
  yesterday: 'Včera',
  now: 'Nyní',
  hours: 'Hodiny',
  minutes: 'Minuty',
  seconds: 'Sekundy',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd. MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: cs
};
var Combobox = {
  noResultsText: 'Nenalezeny žádné výsledky',
  placeholder: 'Vybrat',
  searchPlaceholder: 'Vyhledat',
  checkAll: 'Vybrat vše'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Nová položka ',
  createOption: 'Vytvořit možnost "{0}"'
});
export default {
  code: 'cs-CZ',
  common: {
    loading: 'Načítaní...',
    emptyMessage: 'Nejsou k dispozici žádné data',
    remove: 'Odstarnit',
    clear: 'Vymazat'
  },
  Plaintext: {
    unfilled: 'Nevyplněno',
    notSelected: 'Nevybráno',
    notUploaded: 'Nenahráno'
  },
  Pagination: {
    more: 'Víc',
    prev: 'Předchozí',
    next: 'Další',
    first: 'První',
    last: 'Poslední',
    limit: '{0} / stránku',
    total: 'Celkový počet řádků : {0}',
    skip: 'Jít na {0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: 'Posledních 7 dní'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Púvodní',
    progress: 'Nahrávání',
    error: 'Error',
    complete: 'Dokočeno',
    emptyFile: 'Prázdný soubor',
    upload: 'Nahrát',
    removeFile: 'Odstranit soubor'
  },
  CloseButton: {
    closeLabel: 'Zavřít'
  },
  Breadcrumb: {
    expandText: 'Zobrazit cestu'
  },
  Toggle: {
    on: 'Otevřít',
    off: 'Zavřít'
  }
};