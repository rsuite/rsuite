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
  seconds: '秒',
  formattedMonthPattern: 'yyyy年MM月',
  formattedDayPattern: 'yyyy年MM月dd日'
};

export default {
  common: {
    loading: '加载中...',
    emptyMessage: '数据为空'
  },
  Plaintext: {
    unfilled: '未填写',
    notSelected: '未选择',
    notUploaded: '未上传'
  },
  Pagination: {
    more: '更多',
    prev: '上一页',
    next: '下一页',
    first: '第一页',
    last: '最后一页',
    limit: '{0} 条/页',
    total: '共 {0} 条数据',
    skip: '跳至{0}页'
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
    noResultsText: '无匹配选项',
    placeholder: '选择',
    searchPlaceholder: '搜索',
    checkAll: '全部'
  },
  InputPicker: {
    newItem: '新选项',
    createOption: '新建选项 "{0}"'
  },
  Uploader: {
    inited: '初始状态',
    progress: '上传中',
    error: '上传出错',
    complete: '上传完成',
    emptyFile: '无文件',
    upload: '上传'
  },
  CloseButton: {
    closeLabel: '关闭'
  },
  Breadcrumb: {
    expandText: '显示路径'
  },
  Toggle: {
    on: '开启',
    off: '关闭'
  }
};
