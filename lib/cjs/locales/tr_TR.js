'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _tr = _interopRequireDefault(require("date-fns/locale/tr"));
var DateTimeFormats = {
  sunday: 'Pz',
  monday: 'Pt',
  tuesday: 'Sa',
  wednesday: 'Ça',
  thursday: 'Pe',
  friday: 'Cu',
  saturday: 'Ct',
  ok: 'Tamam',
  today: 'Bugün',
  yesterday: 'Dün',
  now: 'Şimdi',
  hours: 'Saat',
  minutes: 'Dakika',
  seconds: 'Saniye',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd.MM.yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: _tr.default
};
var Combobox = {
  noResultsText: 'Sonuç bulunamadı',
  placeholder: 'Seç',
  searchPlaceholder: 'Ara',
  checkAll: 'Tümü'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Yeni öğe',
  createOption: 'Seçenek ekle "{0}"'
});
var _default = exports.default = {
  code: 'tr-TR',
  common: {
    loading: 'Yükleniyor...',
    emptyMessage: 'Veri bulunamadı',
    remove: 'Kaldır',
    clear: 'Temizlemek'
  },
  Plaintext: {
    unfilled: 'Doldurulmadı',
    notSelected: 'Seçilmedi',
    notUploaded: 'Yüklenmedi'
  },
  Pagination: {
    more: 'Daha',
    prev: 'Önceki',
    next: 'Sonraki',
    first: 'İlk',
    last: 'Son',
    limit: '{0} / sayfa',
    total: 'Toplam Satır: {0}',
    skip: 'Git{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
    last7Days: 'Son 7 Gün'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Başlangıç',
    progress: 'Yükleniyor',
    error: 'Hata',
    complete: 'Tamamlandı',
    emptyFile: 'Boş',
    upload: 'Yükle',
    removeFile: 'Dosyayı kaldır'
  },
  CloseButton: {
    closeLabel: 'Kapat'
  },
  Breadcrumb: {
    expandText: 'Yolu göster'
  },
  Toggle: {
    on: 'Açık',
    off: 'Kapalı'
  }
};