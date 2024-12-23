import { enUS } from 'date-fns/locale/en-US';

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
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'MM/dd/yyyy',
  shortTimeFormat: 'hh:mm aa',
  dateLocale: enUS as any
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
  code: 'en-US',
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
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Last 7 Days'
  },
  Combobox,
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
  Toggle: {
    on: 'Open',
    off: 'Close'
  }
};
