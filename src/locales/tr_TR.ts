import { tr } from 'date-fns/locale/tr';

const DateTimeFormats = {
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
  dateLocale: tr as any
};

const Combobox = {
  noResultsText: 'Sonuç bulunamadı',
  placeholder: 'Seç',
  searchPlaceholder: 'Ara',
  checkAll: 'Tümü'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Yeni öğe',
  createOption: 'Seçenek ekle "{0}"'
};

export default {
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
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Son 7 Gün'
  },
  Combobox,
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
