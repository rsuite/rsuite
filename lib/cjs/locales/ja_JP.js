'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ja = _interopRequireDefault(require("date-fns/locale/ja"));
var DateTimeFormats = {
  sunday: '日',
  monday: '月',
  tuesday: '火',
  wednesday: '水',
  thursday: '木',
  friday: '金',
  saturday: '土',
  ok: '確認',
  today: '今日',
  yesterday: '昨日',
  now: '現在',
  hours: '時',
  minutes: '分',
  seconds: '秒',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'yyyy年 MMM',
  formattedDayPattern: 'yyyy年 MMM dd',
  shortDateFormat: 'yyyy/MM/dd',
  shortTimeFormat: 'HH:mm',
  dateLocale: _ja.default
};
var Combobox = {
  noResultsText: '結果は見つかりませんでした。',
  placeholder: '選択',
  searchPlaceholder: '検索',
  checkAll: 'すべて'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: '新要素',
  createOption: 'オプション作成: "{0}"'
});
var _default = exports.default = {
  code: 'ja-JP',
  common: {
    loading: '読み込み中...',
    emptyMessage: 'データはありません。',
    remove: '取り除く',
    clear: 'クリア'
  },
  Plaintext: {
    unfilled: '未記入',
    notSelected: '選択しない',
    notUploaded: 'アップロードされない'
  },
  Pagination: {
    more: 'もっと見る',
    prev: '前へ',
    next: '次へ',
    first: '最初',
    last: '最後',
    limit: '{0} / ページ',
    total: '合計: {0}',
    skip: '{0}に逝く'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: '直近7日間'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: '始動',
    progress: 'アップロード中',
    error: 'エラー',
    complete: '終了',
    emptyFile: '空',
    upload: 'アップロード',
    removeFile: 'ファイル削除'
  },
  CloseButton: {
    closeLabel: '終了'
  },
  Breadcrumb: {
    expandText: 'パス表示'
  },
  Toggle: {
    on: '開く',
    off: '閉じる'
  }
};