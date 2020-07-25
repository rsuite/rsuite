const Calendar = {
  sunday: 'Do',
  monday: 'Se',
  tuesday: 'Te',
  wednesday: 'Qu',
  thursday: 'Qu',
  friday: 'Se',
  saturday: 'Sá',
  ok: 'OK',
  today: 'Hoje',
  yesterday: 'Ontem',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  formattedMonthPattern: 'MMM, YYYY',
  formattedDayPattern: 'DD MMM, YYYY'
};

export default {
  Pagination: {
    more: 'Mais',
    prev: 'Anterior',
    next: 'Próximo',
    first: 'Primeiro',
    last: 'Último'
  },
  Table: {
    emptyMessage: 'Nenhum dado encontrado',
    loading: 'Carregando...'
  },
  TablePagination: {
    lengthMenuInfo: '{0} / página',
    totalInfo: 'total: {0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Últimos 7 dias'
  },
  Picker: {
    noResultsText: 'Nenhum resultado encontrado',
    placeholder: 'Selecionar',
    searchPlaceholder: 'Pesquisar',
    checkAll: 'Todos'
  },
  InputPicker: {
    newItem: 'Novo item',
    createOption: 'Criar opção "{0}"'
  },
  Uploader: {
    inited: 'Inicializado',
    progress: 'Em progresso',
    error: 'Erro',
    complete: 'Finalizado',
    emptyFile: 'Em branco',
    upload: 'Upload'
  }
};
