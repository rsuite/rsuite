import { gu } from 'date-fns/locale/gu';

const DateTimeFormats = {
  sunday: 'રવિ',
  monday: 'સોમ',
  tuesday: 'મંગળ',
  wednesday: 'બુધ',
  thursday: 'ગુરુ',
  friday: 'શુક્ર',
  saturday: 'શનિ',
  ok: 'OK',
  today: 'આજે',
  yesterday: 'ગઈ કાલે',
  now: 'અત્યારે',
  hours: 'કલાક',
  minutes: 'મિનિટ',
  seconds: 'સેકંડ',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'MM/dd/yyyy',
  shortTimeFormat: 'hh:mm aa',
  dateLocale: gu as any
};

const Combobox = {
  noResultsText: 'કોઈ પરિણામો મળ્યા નથી',
  placeholder: 'પસંદ કરો',
  searchPlaceholder: 'શોધો',
  checkAll: 'બધા પસંદ કરો'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'નવી આઇટમ',
  createOption: 'વિકલ્પ બનાવો "{0}"'
};

export default {
  code: 'gu-IN',
  common: {
    loading: 'લોડ થઈ રહ્યું છે...',
    emptyMessage: 'પરિણામો મળ્યા નથી',
    remove: 'હટાવો',
    clear: 'સાફ કરો'
  },
  Plaintext: {
    unfilled: 'અપૂર્ણ',
    notSelected: 'પસંદ ન કરાયું',
    notUploaded: 'ઉમેરાયું નથી'
  },
  Pagination: {
    more: 'વધુ',
    prev: 'પાછળ',
    next: 'આગળ',
    first: 'પ્રથમ',
    last: 'છેલ્લું',
    limit: '{0} / પૃષ્ઠ',
    total: 'કુલ હરોળ: {0}',
    skip: 'જા ઑ{0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'છેલ્લા 7 દિવસ'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'પ્રારંભિક',
    progress: 'અપલોડ થઈ રહ્યું છે',
    error: 'ભૂલ',
    complete: 'પૂર્ણ',
    emptyFile: 'ખાલી',
    upload: 'અપલોડ કરો',
    removeFile: 'ફાઇલ હટાવો'
  },
  CloseButton: {
    closeLabel: 'બંધ કરો'
  },
  Breadcrumb: {
    expandText: 'પાથ બતાવો'
  },
  Toggle: {
    on: 'શરૂ',
    off: 'બંધ'
  },
  Dialog: {
    alert: 'ચેતવણી',
    confirm: 'પુષ્ટિ',
    ok: 'બરાબર',
    cancel: 'રદ કરો'
  }
};
