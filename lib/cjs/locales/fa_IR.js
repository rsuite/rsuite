'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _faIR = _interopRequireDefault(require("date-fns/locale/fa-IR"));
var DateTimeFormats = {
  sunday: 'ی',
  monday: 'د',
  tuesday: 'س',
  wednesday: 'چ',
  thursday: 'پ',
  friday: 'ج',
  saturday: 'ش',
  ok: 'تایید',
  today: 'امروز',
  yesterday: 'دیروز',
  now: 'هم  اکنون',
  hours: 'ساعت',
  minutes: 'دقیقه',
  seconds: 'ثانیه',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'yyyy/MM/dd',
  shortTimeFormat: 'hh:mm aa',
  dateLocale: _faIR.default
};
var Combobox = {
  noResultsText: 'نتیجه ایی یافت نشد',
  placeholder: 'انتخاب',
  searchPlaceholder: 'جستجو',
  checkAll: 'همه'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'گزینه جدید',
  createOption: 'ساخت گزینه "{0}"'
});
var _default = exports.default = {
  code: 'fa-IR',
  common: {
    loading: 'در حال بارگذاری...',
    emptyMessage: 'داده ایی پیدا نشد',
    remove: 'برداشتن',
    clear: 'پاک کردن'
  },
  Plaintext: {
    unfilled: 'خالی',
    notSelected: 'انتخاب نشده',
    notUploaded: 'اپلود نشده'
  },
  Pagination: {
    more: 'بیشتر',
    prev: 'قبلی',
    next: 'بعدی',
    first: 'اول',
    last: 'اخر',
    limit: '{0} / صفحه',
    total: 'مجموع ردیف ها: {0}',
    skip: 'برو به{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: '7 روز اخر'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'اولیه',
    progress: 'در حال اپلود',
    error: 'مشکل',
    complete: 'تمام شد',
    emptyFile: 'خالی',
    upload: 'اپلود',
    removeFile: 'حذف فایل'
  },
  CloseButton: {
    closeLabel: 'بستن'
  },
  Breadcrumb: {
    expandText: 'نمایش مسیر'
  },
  Toggle: {
    on: 'باز کردن',
    off: 'بستن'
  }
};