'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uk = _interopRequireDefault(require("date-fns/locale/uk"));
var DateTimeFormats = {
  sunday: 'Нд',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'ОК',
  today: 'Сьогодні',
  yesterday: 'Вчора',
  now: 'Зараз',
  hours: 'Години',
  minutes: 'Хвилини',
  seconds: 'Секунди',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _uk.default
};
var Combobox = {
  noResultsText: 'Результати не знайдено',
  placeholder: 'Вибрати',
  searchPlaceholder: 'Пошук',
  checkAll: 'Усі'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Новий',
  createOption: 'Створити опцію "{0}"'
});
var _default = exports.default = {
  code: 'uk-UA',
  common: {
    loading: 'Завантаження...',
    emptyMessage: 'Дані не знайдено',
    remove: 'Видалити',
    clear: 'Очистити'
  },
  Plaintext: {
    unfilled: 'Незаповнено',
    notSelected: 'Не вибрано',
    notUploaded: 'Не завантажено'
  },
  Pagination: {
    more: 'Більше',
    prev: 'Попередня',
    next: 'Наступна',
    first: 'Перша',
    last: 'Остання',
    limit: '{0} / сторінка',
    total: 'Всього: {0}',
    skip: 'Перейти до {0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Останні 7 днів'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Ініційовано',
    progress: 'Завантаження',
    error: 'Помилка',
    complete: 'Завершено',
    emptyFile: 'Порожній',
    upload: 'Завантажити',
    removeFile: 'Видалити файл'
  },
  CloseButton: {
    closeLabel: 'Закрити'
  },
  Breadcrumb: {
    expandText: 'Показати шлях'
  },
  Toggle: {
    on: 'Увімкнено',
    off: 'Вимкнено'
  }
};