"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var Calendar = {
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
  formattedMonthPattern: 'YYYY年MM月',
  formattedDayPattern: 'YYYY年MM月DD日'
};
var _default = {
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
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: '最近 7 天'
  }),
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
  }
};
exports.default = _default;
module.exports = exports.default;