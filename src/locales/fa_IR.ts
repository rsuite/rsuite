import { faIR } from 'date-fns-jalali/locale';

const DateTimeFormats = {
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
  formattedMonthPattern: 'MMMM yyyy',
  formattedDayPattern: 'dd MMMM yyyy',
  shortDateFormat: 'yyyy/MM/dd',
  shortTimeFormat: 'HH:mm',
  dateLocale: faIR as any,
  calendarSystem: 'jalali' as const
};

const Combobox = {
  noResultsText: 'نتیجه ایی یافت نشد',
  placeholder: 'انتخاب',
  searchPlaceholder: 'جستجو',
  checkAll: 'همه'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'گزینه جدید',
  createOption: 'ساخت گزینه "{0}"'
};

export default {
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
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: '7 روز اخر'
  },
  Combobox,
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
  },
  Dialog: {
    alert: 'هشدار',
    confirm: 'تایید',
    ok: 'تایید',
    cancel: 'انصراف'
  }
};
