import defaultLocale from './default';
export { default as arEG } from './ar_EG';
export { default as daDK } from './da_DK';
export { default as enGB } from './en_GB';
export { default as enUS } from './en_US';
export { default as esAR } from './es_AR';
export { default as esES } from './es_ES';
export { default as fiFI } from './fi_FI';
export { default as itIT } from './it_IT';
export { default as koKR } from './ko_KR';
export { default as ptBR } from './pt_BR';
export { default as ruRU } from './ru_RU';
export { default as svSE } from './sv_SE';
export { default as zhCN } from './zh_CN';
export { default as zhTw } from './zh_TW';

type PickKeys<T> = {
  [keys in keyof T]?: T[keys];
};

export type Locale = PickKeys<typeof defaultLocale>;
export type CommonLocale = PickKeys<typeof defaultLocale.common>;
export type CalendarLocale = PickKeys<typeof defaultLocale.Calendar>;
export type PlaintextLocale = PickKeys<typeof defaultLocale.Plaintext>;
export type PaginationLocale = PickKeys<typeof defaultLocale.Pagination>;
export type TableLocale = CommonLocale;
export type TablePaginationLocale = PickKeys<typeof defaultLocale.TablePagination>;
export type DatePickerLocale = PickKeys<typeof defaultLocale.DatePicker>;
export type DateRangePickerLocale = PickKeys<typeof defaultLocale.DateRangePicker>;
export type PickerLocale = PickKeys<typeof defaultLocale.Picker> & CommonLocale;
export type InputPickerLocale = PickerLocale & PickKeys<typeof defaultLocale.InputPicker>;
export type UploaderLocale = PickKeys<typeof defaultLocale.Uploader>;
export type CloseButtonLocale = PickKeys<typeof defaultLocale.CloseButton>;
export type BreadcrumbLocale = PickKeys<typeof defaultLocale.Breadcrumb>;
export type ToggleLocale = PickKeys<typeof defaultLocale.Toggle>;
