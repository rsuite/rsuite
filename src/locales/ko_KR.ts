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
  formattedMonthPattern: 'yyyy 년 MM 월',
  formattedDayPattern: 'yyyy 년 MM 월 dd 일'
};
export default {
  common: {
    loading: '로딩...',
    emptyMessage: '데이터가 없습니다'
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
