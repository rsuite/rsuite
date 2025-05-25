import th from 'date-fns/locale/th';

const DateTimeFormats = {
  sunday: 'อา.',
  monday: 'จ.',
  tuesday: 'อ.',
  wednesday: 'พ.',
  thursday: 'พฤ.',
  friday: 'ศ.',
  saturday: 'ส.',
  ok: 'ตกลง',
  today: 'วันนี้',
  yesterday: 'เมื่อวาน',
  now: 'ตอนนี้',
  hours: 'ชั่วโมง',
  minutes: 'นาที',
  seconds: 'วินาที',

  /**
   * Reference from en_US without modifications.
   **/
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  shortDateFormat: 'MM/dd/yyyy',
  shortTimeFormat: 'hh:mm aa',

  dateLocale: th as any
};

const Combobox = {
  noResultsText: 'ไม่พบผลลัพธ์',
  placeholder: 'เลือก',
  searchPlaceholder: 'ค้นหา',
  checkAll: 'ทั้งหมด'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'รายการใหม่',
  createOption: 'สร้างรายการ "{0}"'
};

export default {
  code: 'th-TH',
  common: {
    loading: 'กำลังโหลด...',
    emptyMessage: 'ไม่พบข้อมูล',
    remove: 'ลบ',
    clear: 'ล้าง'
  },
  Plaintext: {
    unfilled: 'ไม่ได้ระบุ',
    notSelected: 'ไม่ได้เลือก',
    notUploaded: 'ไม่ได้อัพโหลด'
  },
  Pagination: {
    more: 'เพิ่มเติม',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    first: 'หน้าแรก',
    last: 'หน้าสุดท้าย',
    limit: '{0} / หน้า',
    total: 'รายการทั้งหมด: {0}',
    skip: 'ไปที่{0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: '7 วันที่ผ่านมา'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'เริ่มต้น',
    progress: 'กำลังอัพโหลด',
    error: 'ข้อผิดพลาด',
    complete: 'เสร็จสมบูรณ์',
    emptyFile: 'ว่างเปล่า',
    upload: 'อัพโหลด',
    removeFile: 'ลบไฟล์'
  },
  CloseButton: {
    closeLabel: 'ปิด'
  },
  Breadcrumb: {
    expandText: 'แสดงเส้นทาง'
  },
  Toggle: {
    on: 'เปิด',
    off: 'ปิด'
  }
};
