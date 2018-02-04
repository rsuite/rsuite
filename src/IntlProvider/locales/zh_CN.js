

const Calendar = {
  sunday: '日',
  monday: '一',
  tuesday: '二',
  wednesday: '三',
  thursday: '四',
  friday: '五',
  saturday: '六',
  ok: '确定',
  today: '今天',
  yesterday: '昨天',
  hours: '时',
  minutes: '分',
  seconds: '秒'
};

export default {
  Pagination: {
    more: '更多',
    prev: '上一页',
    next: '下一页',
    first: '第一页',
    last: '最后一页'
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
    placeholder: '选择',
    searchPlaceholder: '搜索'
  }
};
