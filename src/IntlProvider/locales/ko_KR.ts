const Calendar = {
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
  hours: '시간',
  minutes: '의사록',
  seconds: '초',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'YYYY 년 MM 월',
  formattedDayPattern: 'YYYY 년 MM 월 DD 일'
};
export default {
  Pagination: {
    more: '더',
    prev: '이전',
    next: '다음',
    first: '먼저',
    last: '마지막'
  },
  Table: {
    emptyMessage: '데이터가 없습니다',
    loading: '로딩...'
  },
  TablePagination: {
    lengthMenuInfo: '페이지 당 {0} 개',
    totalInfo: '총 {0} 데이터'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: '지난 7 일'
  },
  Picker: {
    noResultsText: '검색 결과가 없습니다',
    placeholder: '고르다',
    searchPlaceholder: '검색',
    checkAll: '모두'
  },
  InputPicker: {
    newItem: '새로운 물품',
    createOption: '새로운 옵션 "{0}"'
  },
  Uploader: {
    inited: '머리 글자',
    progress: '업로드 중',
    error: '오류',
    complete: '끝마친',
    emptyFile: '빈',
    upload: '업로드'
  }
};
