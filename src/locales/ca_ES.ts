import ca from 'date-fns/locale/ca';
const Calendar = {
  sunday: 'Dg',
  monday: 'Dl',
  tuesday: 'Dt',
  wednesday: 'Dc',
  thursday: 'Dj',
  friday: 'Dv',
  saturday: 'Ds',
  ok: 'Acceptar',
  today: 'Avui',
  yesterday: 'Ahir',
  hours: 'Hores',
  minutes: 'Minuts',
  seconds: 'Segons',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: ca
};
export default {
  common: {
    loading: 'Carregant...',
    emptyMessage: 'Sense dades',
    remove: 'Eliminar',
    clear: 'Netejar'
  },
  Plaintext: {
    unfilled: 'Sense omplir',
    notSelected: 'No seleccionat',
    notUploaded: 'No pujat'
  },
  Pagination: {
    more: 'Més',
    prev: 'Anterior',
    next: 'Següent',
    first: 'Primer',
    last: 'Últim',
    limit: '{0} / pàgines',
    total: 'Total: {0}',
    skip: 'Anar{0}'
  },
  Calendar: Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Últims 7 dies'
  },
  Picker: {
    noResultsText: "No s'han trobat resultats",
    placeholder: 'Seleccionar',
    searchPlaceholder: 'Cercar',
    checkAll: 'Tots'
  },
  InputPicker: {
    newItem: 'Nou',
    createOption: 'Crear opció "{0}"'
  },
  Uploader: {
    inited: 'Inicial',
    progress: 'Pujant',
    error: 'Error',
    complete: 'Completat',
    emptyFile: 'Buit',
    upload: 'Pujar',
    removeFile: 'Eliminar fitxer'
  },
  CloseButton: {
    closeLabel: 'Tancar'
  },
  Breadcrumb: {
    expandText: 'Mostrar ruta'
  },
  Toggle: {
    on: 'Encendre',
    off: 'Apagar'
  }
};
