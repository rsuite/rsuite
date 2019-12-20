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
  minutes: '분',
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
    first: '첫 페이지',
    last: '마지막'
  },
  Table: {
    emptyMessage: '데이터가 없습니다',
    loading: '로딩...'
  },
  TablePagination: {
    lengthMenuInfo: '행 표시 {0}',
    totalInfo: '전체 {0} 개'
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
    noResultsText: '일치하지 않습니다',
    placeholder: '고르십시오',
    searchPlaceholder: '검색',
    checkAll: '모두'
  },
  InputPicker: {
    newItem: '새 옵션',
    createOption: '+새 옵션 "{0}"'
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
