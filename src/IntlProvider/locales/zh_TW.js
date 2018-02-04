

const Calendar = {
  sunday: '日',
  monday: '壹',
  tuesday: '二',
  wednesday: '三',
  thursday: '四',
  friday: '五',
  saturday: '六',
  ok: '確定',
  today: '今天',
  yesterday: '昨天',
  hours: '時',
  minutes: '分',
  seconds: '秒'
};

export default {
  Pagination: {
    more: '更多',
    prev: '上壹頁',
    next: '下壹頁',
    first: '第壹頁',
    last: '最後壹頁'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: '最近 7 天',
  },
  Picker: {
    placeholder: '選擇',
    searchPlaceholder: '搜索'
  }
};
