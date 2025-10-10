'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ptBR = _interopRequireDefault(require("date-fns/locale/pt-BR"));
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
  dateLocale: _ptBR.default
};
var Combobox = {
  noResultsText: 'Nenhum resultado encontrado',
  placeholder: 'Selecionar',
  searchPlaceholder: 'Pesquisar',
  checkAll: 'Todos'
};
var CreatableComboBox = (0, _extends2.default)({}, Combobox, {
  newItem: 'Novo item',
  createOption: 'Criar opção "{0}"'
});
var _default = exports.default = {
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
  DateRangePicker: (0, _extends2.default)({}, DateTimeFormats, {
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