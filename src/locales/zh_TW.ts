import type { CalendarLocaleLabels } from './types';
import { zhTW } from 'date-fns/locale/zh-TW';

const DateTimeFormats = {
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
  dateLocale: zhTW as any
};

const Calendar: typeof DateTimeFormats & CalendarLocaleLabels = {
  ...DateTimeFormats,
  previousMonth: '上個月',
  nextMonth: '下個月',
  selectMonth: '選擇月份',
  selectTime: '選擇時間'
};

const DatePicker: typeof Calendar & { openPicker?: string } = {
  ...Calendar,
  openPicker: '開啟選擇器'
};

const Combobox = {
  noResultsText: '沒有符合的選項',
  placeholder: '選擇',
  searchPlaceholder: '搜索',
  checkAll: '全部'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: '新選項',
  createOption: '新建選項 "{0}"'
};

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
  DateTimeFormats,
  Calendar,
  DatePicker,
  DateRangePicker: {
    ...DatePicker,
    last7Days: '最近 7 天'
  },
  Combobox,
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
  Carousel: {
    carouselRoleDescription: '輪播',
    slideRoleDescription: '幻燈片',
    slidePosition: '第 {0} 張，共 {1} 張',
    startRotation: '開始自動播放',
    stopRotation: '停止自動播放',
    selectSlide: '選擇投影片',
    slideLabel: '第 {0} 張，共 {1} 張'
  },
  PinInput: {
    groupLabel: 'PIN 碼輸入',
    characterLabel: '第 {0} 個字元，共 {1} 個'
  },
  Toggle: {
    on: '開啟',
    off: '關閉'
  },
  ColorPicker: {
    placeholder: '選擇顏色',
    dialogTitle: '選擇顏色',
    hue: '色相',
    saturation: '飽和度',
    brightness: '亮度',
    opacity: '不透明度',
    format: '格式',
    value: '顏色值',
    presets: '預設顏色',
    invalidColor: '請輸入有效的 HEX、RGB 或 HSL 顏色。',
    clear: '清除',
    done: '完成'
  },
  Dialog: {
    alert: '提醒',
    confirm: '確認',
    ok: '確定',
    cancel: '取消'
  }
};
