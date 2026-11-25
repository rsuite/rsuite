import type { CalendarLocaleLabels } from './types';
import { zhCN } from 'date-fns/locale/zh-CN';

const DateTimeFormats = {
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
  now: '此刻',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  formattedMonthPattern: 'yyyy年MM月',
  formattedDayPattern: 'yyyy年MM月dd日',
  shortDateFormat: 'yyyy-MM-dd',
  shortTimeFormat: 'aa hh:mm',
  dateLocale: zhCN as any
};

const Calendar: typeof DateTimeFormats & CalendarLocaleLabels = {
  ...DateTimeFormats,
  previousMonth: '上个月',
  nextMonth: '下个月',
  selectMonth: '选择月份',
  selectTime: '选择时间'
};

const DatePicker: typeof Calendar & { openPicker?: string } = {
  ...Calendar,
  openPicker: '打开选择器'
};

const Combobox = {
  noResultsText: '无匹配选项',
  placeholder: '选择',
  searchPlaceholder: '搜索',
  checkAll: '全部'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: '新选项',
  createOption: '新建选项 "{0}"'
};

export default {
  code: 'zh-CN',
  common: {
    loading: '加载中...',
    emptyMessage: '数据为空',
    remove: '移除',
    clear: '清除'
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
  DateTimeFormats,
  Calendar,
  DatePicker,
  DateRangePicker: {
    ...DatePicker,
    last7Days: '最近 7 天'
  },
  Combobox,
  CommandPalette: {
    errorText: '暂时无法搜索命令。',
    retryText: '重试'
  },
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: '初始状态',
    progress: '上传中',
    error: '上传出错',
    complete: '上传完成',
    emptyFile: '无文件',
    upload: '上传',
    removeFile: '删除文件'
  },
  CloseButton: {
    closeLabel: '关闭'
  },
  Breadcrumb: {
    expandText: '显示路径'
  },
  Carousel: {
    carouselRoleDescription: '轮播',
    slideRoleDescription: '幻灯片',
    slidePosition: '第 {0} 张，共 {1} 张',
    startRotation: '开始自动播放',
    stopRotation: '停止自动播放',
    selectSlide: '选择幻灯片',
    slideLabel: '第 {0} 张，共 {1} 张'
  },
  PinInput: {
    groupLabel: 'PIN 码输入',
    characterLabel: '第 {0} 个字符，共 {1} 个'
  },
  Toggle: {
    on: '开启',
    off: '关闭'
  },
  ColorPicker: {
    placeholder: '选择颜色',
    dialogTitle: '选择颜色',
    hue: '色相',
    saturation: '饱和度',
    brightness: '亮度',
    opacity: '不透明度',
    format: '格式',
    value: '颜色值',
    presets: '预设颜色',
    invalidColor: '请输入有效的 HEX、RGB 或 HSL 颜色。',
    clear: '清除',
    done: '完成'
  },
  Dialog: {
    alert: '提醒',
    confirm: '确认',
    ok: '确定',
    cancel: '取消'
  }
};
