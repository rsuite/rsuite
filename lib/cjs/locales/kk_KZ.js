'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _kk = _interopRequireDefault(require("date-fns/locale/kk"));
var DateTimeFormats = {
  sunday: 'Жк',
  monday: 'Дс',
  tuesday: 'Сс',
  wednesday: 'Ср',
  thursday: 'Бс',
  friday: 'Жм',
  saturday: 'Сн',
  ok: 'ОК',
  today: 'Бүгін',
  yesterday: 'Кеше',
  now: 'Қазір',
  hours: 'Сағат',
  minutes: 'Минут',
  seconds: 'Секунд',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _kk.default
};
var Combobox = {
  noResultsText: 'Нәтижелер жоқ',
  placeholder: 'Таңдаңыз',
  searchPlaceholder: 'Іздеу',
  checkAll: 'Барлығын таңдау'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Жаңа элемент',
  createOption: 'Жаңа элемент "{0}" құру'
});
var _default = exports.default = {
  code: 'kk-KZ',
  common: {
    loading: 'Жүктелуде...',
    emptyMessage: 'Мәліметтер жоқ',
    remove: 'Жою',
    clear: 'Таза'
  },
  Plaintext: {
    unfilled: 'Мәліметтер жоқ',
    notSelected: 'Таңдалмаған',
    notUploaded: 'Жүктелмеген'
  },
  Pagination: {
    more: 'Көбірек',
    prev: 'Алдыңғы',
    next: 'Келесі',
    first: 'Бірінші',
    last: 'Соңғы',
    limit: '{0} / бет',
    total: 'Барлығы: {0}',
    skip: '{0}-бетке өтіңіз'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Соңғы 7 күн'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Бастау',
    progress: 'Жүктеу',
    error: 'Қате',
    complete: 'Жүктелді',
    emptyFile: 'Бос',
    upload: 'Жүктеу',
    removeFile: 'Файлды жою'
  },
  CloseButton: {
    closeLabel: 'Жабу'
  },
  Breadcrumb: {
    expandText: 'Көрсету'
  },
  Toggle: {
    on: 'Қосу',
    off: 'Өшіру'
  }
};