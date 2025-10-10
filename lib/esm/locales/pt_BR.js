'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import ptBR from 'date-fns/locale/pt-BR';
var DateTimeFormats = {
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
  now: 'Agora',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: ptBR
};
var Combobox = {
  noResultsText: 'Nenhum resultado encontrado',
  placeholder: 'Selecionar',
  searchPlaceholder: 'Pesquisar',
  checkAll: 'Todos'
};
var CreatableComboBox = _extends({}, Combobox, {
  newItem: 'Novo item',
  createOption: 'Criar opção "{0}"'
});
export default {
  code: 'pt-BR',
  common: {
    loading: 'Carregando...',
    emptyMessage: 'Nenhum dado encontrado',
    remove: 'Remover',
    clear: 'Claro'
  },
  Plaintext: {
    unfilled: 'sin llenar',
    notSelected: 'Não selecionado',
    notUploaded: 'Não carregado'
  },
  Pagination: {
    more: 'Mais',
    prev: 'Anterior',
    next: 'Próximo',
    first: 'Primeiro',
    last: 'Último',
    limit: '{0} / página',
    total: 'Total: {0}',
    skip: 'Ir{0}'
  },
  DateTimeFormats: DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: _extends({}, DateTimeFormats, {
    last7Days: 'Últimos 7 dias'
  }),
  Combobox: Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Inicializado',
    progress: 'Em progresso',
    error: 'Erro',
    complete: 'Finalizado',
    emptyFile: 'Em branco',
    upload: 'Upload',
    removeFile: 'Remover arquivo'
  },
  CloseButton: {
    closeLabel: 'Apagar'
  },
  Breadcrumb: {
    expandText: 'Mostrar caminho'
  },
  Toggle: {
    on: 'Ligado',
    off: 'Desligado'
  }
};