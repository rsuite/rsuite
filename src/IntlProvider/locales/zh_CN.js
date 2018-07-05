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
  Table: {
    emptyMessage: '数据为空',
    loading: '加载中...'
  },
  TablePagination: {
    lengthMenuInfo: '每页 {0} 条',
    totalInfo: '共 {0} 条数据'
  },
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: '最近 7 天'
  },
  Picker: {
    placeholder: '选择',
    searchPlaceholder: '搜索'
  },
  CheckPicker: {
    selectedValues: '已选择 {0} 项'
  },
  CheckTreePicker: {
    selectedValues: '已选择 {0} 项'
  },
  Uploader: {
    inited: '初始状态',
    progress: '上传中',
    error: '上传出错',
    complete: '上传完成',
    emptyFile: '无文件',
    upload: '上传'
  }
};
