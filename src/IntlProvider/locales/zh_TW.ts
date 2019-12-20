const Calendar = {
  sunday: '日',
  monday: '一',
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
  seconds: '秒',
  formattedMonthPattern: 'YYYY年MM月',
  formattedDayPattern: 'YYYY年MM月DD日'
};

export default {
  Pagination: {
    more: '更多',
    prev: '上一頁',
    next: '下一頁',
    first: '第一頁',
    last: '最後一頁'
  },
  Table: {
    emptyMessage: '沒有資料',
    loading: '讀取中...'
  },
  TablePagination: {
    lengthMenuInfo: '每頁 {0} 條',
    totalInfo: '共 {0} 條資料'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: '最近 7 天'
  },
  Picker: {
    noResultsText: '沒有符合的選項',
    placeholder: '選擇',
    searchPlaceholder: '搜索',
    checkAll: '全部'
  },
  InputPicker: {
    newItem: '新選項',
    createOption: '新建選項 "{0}"'
  },
  Uploader: {
    inited: '初始狀態',
    progress: '上傳中',
    error: '上傳出錯',
    complete: '上傳完成',
    emptyFile: '無文件',
    upload: '上傳'
  }
};
