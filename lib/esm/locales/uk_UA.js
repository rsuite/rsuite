'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import uk from 'date-fns/locale/uk';
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
  dateLocale: uk
};
var Combobox = {
  noResultsText: 'Результати не знайдено',
  placeholder: 'Вибрати',
  searchPlaceholder: 'Пошук',
  checkAll: 'Усі'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Новий',
  createOption: 'Створити опцію "{0}"'
});
export default {
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
  DateRangePicker: _extends({}, DateTimeFormats, {
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