const Calendar = {
  sunday: 'ح',
  monday: 'ن',
  tuesday: 'ث',
  wednesday: 'ر',
  thursday: 'خ',
  friday: 'ج',
  saturday: 'س',
  ok: 'حسناً',
  today: 'اليوم',
  yesterday: 'أمس',
  hours: 'ساعات',
  minutes: 'دقائق',
  seconds: 'ثواني',
  formattedMonthPattern: 'MMM, YYYY',
  formattedDayPattern: 'MMM DD, YYYY'
};

export default {
  Pagination: {
    more: 'المزيد',
    prev: 'السابق',
    next: 'التالي',
    first: 'الأول',
    last: 'الأخير'
  },
  Table: {
    emptyMessage: 'لا يوجد المزيد من البيانات',
    loading: 'جاري التحميل...'
  },
  TablePagination: {
    lengthMenuInfo: 'صفحة / {0}',
    totalInfo: 'الإجمالي: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'أخر 7 أيام'
  },
  Picker: {
    noResultsText: 'لا يوجد نتائج',
    placeholder: 'إختيار',
    searchPlaceholder: 'البحث',
    checkAll: 'الجميع'
  },
  InputPicker: {
    newItem: 'عنصر جديد',
    createOption: 'إنشاء العنصر "{0}"'
  },
  Uploader: {
    inited: 'تم البدء',
    progress: 'جاري الرفع',
    error: 'خطأ',
    complete: 'تم الإنتهاء',
    emptyFile: 'فارغ',
    upload: 'رفع'
  }
};
