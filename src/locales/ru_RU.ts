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
  formattedDayPattern: 'MMM dd, yyyy'
};

export default {
  Pagination: {
    more: 'Больше',
    prev: 'Предыдущая',
    next: 'Следующая',
    first: 'Первая',
    last: 'Последняя'
  },
  Table: {
    emptyMessage: 'Данные не найдены',
    loading: 'Загрузка...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / страниц',
    totalInfo: 'всего: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Последние 7 дней'
  },
  Input: {
    emptyPlaintext: 'незаполненной'
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
    progress: 'Выгрузка',
    error: 'Ошибка',
    complete: 'Завершенно',
    emptyFile: 'Пусто',
    upload: 'Загрузить'
  },
  CloseButton: {
    closeLabel: 'неисправность'
  }
};
