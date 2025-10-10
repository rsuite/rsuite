'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import enGB from 'date-fns/locale/en-GB';
var DateTimeFormats = {
  sunday: 'आ',
  monday: 'सो',
  tuesday: 'म',
  wednesday: 'बु',
  thursday: 'बि',
  friday: 'शु',
  saturday: 'श',
  ok: 'हुन्छ',
  today: 'आज',
  yesterday: 'हिजो',
  now: 'अब',
  hours: 'घण्टा',
  minutes: 'मिनेट',
  seconds: 'सेकेन्ड',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: enGB
};
var Combobox = {
  noResultsText: 'कुनै परिणाम फेला परेन',
  placeholder: 'चयन गर्नुहोस्',
  searchPlaceholder: 'खोजी गर्नुहोस्',
  checkAll: 'सबै'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'नयाँ थप्नुहोस्',
  createOption: 'विकल्प सिर्जना गर्नुहोस् "{0}"'
});
export default {
  code: 'ne-NP',
  common: {
    loading: 'लोड हुँदैछ...',
    emptyMessage: 'कुनै डाटा छैन',
    remove: 'हटाउनुहोस्',
    clear: 'खाली गर्नुहोस्'
  },
  Plaintext: {
    unfilled: 'भरिएको छैन',
    notSelected: 'चयन गरिएको छैन',
    notUploaded: 'अपलोड गरिएको छैन'
  },
  Pagination: {
    more: 'थप',
    prev: 'अघिल्लो',
    next: 'अर्को',
    first: 'पहिलो',
    last: 'अन्तिम',
    limit: '{0} / पृष्ठ',
    total: 'कुल पङ्क्तिहरू: {0}',
    skip: '{0} पृष्ठमा जानुहोस्'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: 'पछिल्लो ७ दिन'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'प्रारम्भिक',
    progress: 'अपलोड गर्दै',
    error: 'त्रुटि भयो',
    complete: 'समाप्त',
    emptyFile: 'खाली',
    upload: 'अपलोड गर्नुहोस्',
    removeFile: 'फाइल हटाउनुहोस्'
  },
  CloseButton: {
    closeLabel: 'बन्द गर्नुहोस्'
  },
  Breadcrumb: {
    expandText: 'स्थान देखाउनुहोस्'
  },
  Toggle: {
    on: 'खोल्नुहोस्',
    off: 'बन्द गर्नुहोस्'
  }
};