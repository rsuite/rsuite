import { kk } from 'date-fns/locale/kk';

const DateTimeFormats = {
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
  dateLocale: kk as any
};

const Combobox = {
  noResultsText: 'Нәтижелер жоқ',
  placeholder: 'Таңдаңыз',
  searchPlaceholder: 'Іздеу',
  checkAll: 'Барлығын таңдау'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Жаңа элемент',
  createOption: 'Жаңа элемент "{0}" құру'
};

export default {
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
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Соңғы 7 күн'
  },
  Combobox,
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
