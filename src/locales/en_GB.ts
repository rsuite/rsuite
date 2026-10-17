import type { CalendarLocaleLabels } from './types';
import { enGB } from 'date-fns/locale/en-GB';

const DateTimeFormats = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  now: 'Now',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: enGB as any
};

const Calendar: typeof DateTimeFormats & CalendarLocaleLabels = {
  ...DateTimeFormats,
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  selectMonth: 'Select month',
  selectTime: 'Select time'
};

const DatePicker: typeof Calendar & { openPicker?: string } = {
  ...Calendar,
  openPicker: 'Open picker'
};

const Combobox = {
  noResultsText: 'No results found',
  placeholder: 'Select',
  searchPlaceholder: 'Search',
  checkAll: 'All'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'New item',
  createOption: 'Create option "{0}"'
};

export default {
  code: 'en-GB',
  common: {
    loading: 'Loading...',
    emptyMessage: 'No data found',
    remove: 'Remove',
    clear: 'Clear'
  },
  Plaintext: {
    unfilled: 'Unfilled',
    notSelected: 'Not selected',
    notUploaded: 'Not uploaded'
  },
  Pagination: {
    more: 'More',
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    limit: '{0} / page',
    total: 'Total Rows: {0}',
    skip: 'Go to{0}'
  },
  DateTimeFormats,
  Calendar,
  DatePicker,
  DateRangePicker: {
    ...DatePicker,
    last7Days: 'Last 7 Days'
  },
  Combobox,
  ColorPicker: {
    placeholder: 'Select color',
    dialogTitle: 'Choose color',
    hue: 'Hue',
    saturation: 'Saturation',
    brightness: 'Brightness',
    opacity: 'Opacity',
    format: 'Format',
    value: 'Color value',
    presets: 'Preset colors',
    invalidColor: 'Enter a valid HEX, RGB or HSL color.',
    clear: 'Clear',
    done: 'Done'
  },
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Initial',
    progress: 'Uploading',
    error: 'Error',
    complete: 'Finished',
    emptyFile: 'Empty',
    upload: 'Upload',
    removeFile: 'Remove file'
  },
  CloseButton: {
    closeLabel: 'Close'
  },
  Breadcrumb: {
    expandText: 'Show path'
  },
  Carousel: {
    carouselRoleDescription: 'carousel',
    slideRoleDescription: 'slide',
    slidePosition: '{0} of {1}',
    startRotation: 'Start slide rotation',
    stopRotation: 'Stop slide rotation',
    selectSlide: 'Choose slide',
    slideLabel: 'Slide {0} of {1}'
  },
  PinInput: {
    groupLabel: 'PIN input',
    characterLabel: 'Character {0} of {1}'
  },
  Toggle: {
    on: 'ON',
    off: 'OFF'
  },
  Dialog: {
    alert: 'Alert',
    confirm: 'Confirm',
    ok: 'OK',
    cancel: 'Cancel'
  }
};
