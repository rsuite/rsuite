import ja from 'date-fns/locale/ja';

const Calendar = {
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
  hours: '時',
  minutes: '分',
  seconds: '秒',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'yyyy年 MMM',
  formattedDayPattern: 'yyyy年 MMM dd',
  dateLocale: ja as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: '直近7日間'
  },
  Picker: {
    noResultsText: '結果は見つかりませんでした。',
    placeholder: '選択',
    searchPlaceholder: '検索',
    checkAll: 'すべて'
  },
  InputPicker: {
    newItem: '新要素',
    createOption: 'オプション作成: "{0}"'
  },
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
