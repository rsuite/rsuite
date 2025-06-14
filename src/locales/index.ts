import defaultLocale from './en_GB';
import { Locale as DateFnsLocale } from 'date-fns';

export { default as arEG } from './ar_EG';
export { default as daDK } from './da_DK';
export { default as deDE } from './de_DE';
export { default as enGB } from './en_GB';
export { default as enUS } from './en_US';
export { default as esAR } from './es_AR';
export { default as esES } from './es_ES';
export { default as caES } from './ca_ES';
export { default as fiFI } from './fi_FI';
export { default as huHU } from './hu_HU';
export { default as itIT } from './it_IT';
export { default as kkKZ } from './kk_KZ';
export { default as koKR } from './ko_KR';
export { default as nlNL } from './nl_NL';
export { default as ptBR } from './pt_BR';
export { default as ruRU } from './ru_RU';
export { default as svSE } from './sv_SE';
export { default as trTR } from './tr_TR';
export { default as zhCN } from './zh_CN';
export { default as zhTW } from './zh_TW';
export { default as faIR } from './fa_IR';
export { default as frFR } from './fr_FR';
export { default as jaJP } from './ja_JP';
export { default as neNP } from './ne_NP';
export { default as csCZ } from './cs_CZ';
export { default as plPL } from './pl_PL';
export { default as ukUA } from './uk_UA';
export { default as thTH } from './th_TH';
export { default as guIN } from './gu_IN';

type PickKeys<T> = {
  [keys in keyof T]?: T[keys];
};

export type Locale = PickKeys<typeof defaultLocale>;
export type CommonLocale = typeof defaultLocale.common;
export type PlaintextLocale = PickKeys<typeof defaultLocale.Plaintext>;
export type PaginationLocale = PickKeys<typeof defaultLocale.Pagination>;
export type TableLocale = CommonLocale;
export type DatePickerLocale = PickKeys<typeof defaultLocale.DatePicker> & CommonLocale;
export type DateRangePickerLocale = PickKeys<typeof defaultLocale.DateRangePicker> & CommonLocale;
export type PickerLocale = typeof defaultLocale.Combobox & CommonLocale;
export type InputPickerLocale = PickerLocale & typeof defaultLocale.InputPicker;
export type UploaderLocale = PickKeys<typeof defaultLocale.Uploader> & CommonLocale;
export type CloseButtonLocale = PickKeys<typeof defaultLocale.CloseButton>;
export type BreadcrumbLocale = PickKeys<typeof defaultLocale.Breadcrumb>;
export type ToggleLocale = PickKeys<typeof defaultLocale.Toggle>;

export interface CalendarLocale extends PickKeys<typeof defaultLocale.Calendar> {
  dateLocale?: DateFnsLocale;
}
