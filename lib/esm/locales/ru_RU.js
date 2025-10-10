'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import ru from 'date-fns/locale/ru';
var DateTimeFormats = {
  sunday: 'Вс',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'ОК',
  today: 'Сегодня',
  yesterday: 'Вчера',
  now: 'Сейчас',
  hours: 'Часов',
  minutes: 'Минут',
  seconds: 'Секунд',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: ru
};
var Combobox = {
  noResultsText: 'Результаты не найдены',
  placeholder: 'Выбрать',
  searchPlaceholder: 'Поиск',
  checkAll: 'Все'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Новый',
  createOption: 'Создать опцию "{0}"'
});
export default {
  code: 'ru-RU',
  common: {
    loading: 'Загрузка...',
    emptyMessage: 'Данные не найдены',
    remove: 'Удалять',
    clear: 'Прозрачный'
  },
  Plaintext: {
    unfilled: 'незаполненной',
    notSelected: 'Не выбрано',
    notUploaded: 'Не загружено'
  },
  Pagination: {
    more: 'Больше',
    prev: 'Предыдущая',
    next: 'Следующая',
    first: 'Первая',
    last: 'Последняя',
    limit: '{0} / страниц',
    total: 'всего: {0}',
    skip: 'Перейти к {0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: 'Последние 7 дней'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Начало',
    progress: 'Загрузка',
    error: 'Ошибка',
    complete: 'Завершено',
    emptyFile: 'Пусто',
    upload: 'Загрузить',
    removeFile: 'Удалить файл'
  },
  CloseButton: {
    closeLabel: 'Закрыть'
  },
  Breadcrumb: {
    expandText: 'Показать путь'
  },
  Toggle: {
    on: 'Вкл',
    off: 'Выкл'
  }
};