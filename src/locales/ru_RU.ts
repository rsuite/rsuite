import ru from 'date-fns/locale/ru';

const Calendar = {
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
  hours: 'Часов',
  minutes: 'Минут',
  seconds: 'Секунд',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: ru as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Последние 7 дней'
  },
  Picker: {
    noResultsText: 'Результаты не найдены',
    placeholder: 'Выбрать',
    searchPlaceholder: 'Поиск',
    checkAll: 'Все'
  },
  InputPicker: {
    newItem: 'Новый',
    createOption: 'Создать опцию "{0}"'
  },
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
