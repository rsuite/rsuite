"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var Calendar = {
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
var _default = {
  Pagination: {
    more: 'المزيد',
    prev: 'السابق',
    next: 'التالي',
    first: 'الاول',
    last: 'الاخير'
  },
  Table: {
    emptyMessage: 'لا يوجد بيانات',
    loading: 'جاري التحميل...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / صفحة',
    totalInfo: 'الاجمالي: {0}'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'اخر 7 ايام'
  }),
  Picker: {
    noResultsText: 'لا يوجد نتائج',
    placeholder: 'إختيار',
    searchPlaceholder: 'بحث',
    checkAll: 'الجميع'
  },
  InputPicker: {
    newItem: 'عنصر جديد',
    createOption: 'إنشاء خيار "{0}"'
  },
  Uploader: {
    inited: 'البدء',
    progress: 'جاري الرفع',
    error: 'خطأ',
    complete: 'تم الإنتهاء',
    emptyFile: 'فارغ',
    upload: 'رفع'
  }
};
exports.default = _default;
module.exports = exports.default;
