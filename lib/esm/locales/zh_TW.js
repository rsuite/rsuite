'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import zhTW from 'date-fns/locale/zh-TW';
var DateTimeFormats = {
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
  now: '此刻',
  hours: '時',
  minutes: '分',
  seconds: '秒',
  formattedMonthPattern: 'yyyy年MM月',
  formattedDayPattern: 'yyyy年MM月dd日',
  shortDateFormat: 'yyyy-MM-dd',
  shortTimeFormat: 'aa hh:mm',
  dateLocale: zhTW
};
var Combobox = {
  noResultsText: '沒有符合的選項',
  placeholder: '選擇',
  searchPlaceholder: '搜索',
  checkAll: '全部'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: '新選項',
  createOption: '新建選項 "{0}"'
});
export default {
  code: 'zh-TW',
  common: {
    loading: '讀取中...',
    emptyMessage: '沒有資料',
    remove: '移除',
    clear: '清除'
  },
  Plaintext: {
    unfilled: '未填寫',
    notSelected: '未選擇',
    notUploaded: '未上傳'
  },
  Pagination: {
    more: '更多',
    prev: '上一頁',
    next: '下一頁',
    first: '第一頁',
    last: '最後一頁',
    limit: '{0} 條/頁',
    total: '共 {0} 條資料',
    skip: '跳至{0}頁'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: '最近 7 天'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: '初始狀態',
    progress: '上傳中',
    error: '上傳出錯',
    complete: '上傳完成',
    emptyFile: '無文件',
    upload: '上傳',
    removeFile: '刪除文件'
  },
  CloseButton: {
    closeLabel: '關閉'
  },
  Breadcrumb: {
    expandText: '顯示路徑'
  },
  Toggle: {
    on: '開啟',
    off: '關閉'
  }
};