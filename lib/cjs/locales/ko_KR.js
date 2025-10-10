'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ko = _interopRequireDefault(require("date-fns/locale/ko"));
var DateTimeFormats = {
  sunday: '일',
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  ok: '승인',
  today: '오늘',
  yesterday: '어제',
  now: '지금',
  hours: '시간',
  minutes: '분',
  seconds: '초',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'yyyy 년 MM 월',
  formattedDayPattern: 'yyyy 년 MM 월 dd 일',
  shortDateFormat: 'yyyy.MM.dd',
  shortTimeFormat: 'HH:mm',
  dateLocale: _ko.default
};
var Combobox = {
  noResultsText: '일치하지 않습니다',
  placeholder: '고르십시오',
  searchPlaceholder: '검색',
  checkAll: '모두'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: '새 옵션',
  createOption: '+새 옵션 "{0}"'
});
var _default = exports.default = {
  code: 'ko-KR',
  common: {
    loading: '로딩...',
    emptyMessage: '데이터가 없습니다',
    remove: '제거하다',
    clear: '분명한'
  },
  Plaintext: {
    unfilled: '채워지지 않은',
    notSelected: '선택되지 않은',
    notUploaded: '업로드되지 않음'
  },
  Pagination: {
    more: '더',
    prev: '이전',
    next: '다음',
    first: '첫 페이지',
    last: '마지막',
    limit: '행 표시 {0}',
    total: '전체 {0} 개',
    skip: '이동{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: '지난 7 일'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: '머리 글자',
    progress: '업로드 중',
    error: '오류',
    complete: '끝마친',
    emptyFile: '빈',
    upload: '업로드',
    removeFile: '파일 삭제'
  },
  CloseButton: {
    closeLabel: '종료'
  },
  Breadcrumb: {
    expandText: '경로 표시'
  },
  Toggle: {
    on: '켜기',
    off: '끄기'
  }
};