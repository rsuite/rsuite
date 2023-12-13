import tr from 'date-fns/locale/tr';

const Calendar = {
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
  hours: 'Saat',
  minutes: 'Dakika',
  seconds: 'Saniye',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: tr as any
};

export default {
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
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Son 7 Gün'
  },
  Picker: {
    noResultsText: 'Sonuç bulunamadı',
    placeholder: 'Seç',
    searchPlaceholder: 'Ara',
    checkAll: 'Tümü'
  },
  InputPicker: {
    newItem: 'Yeni öğe',
    createOption: 'Seçenek ekle "{0}"'
  },
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
