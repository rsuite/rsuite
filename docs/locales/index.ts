import en from './en-US';
import zh from './zh-CN';

type Locale<T> = {
  [keys in keyof T]: T[keys];
};

export type LocaleEn = Locale<typeof en>;
export type LocaleZh = Locale<typeof zh>;

export type Locales = {
  en: LocaleEn;
  zh: LocaleZh;
};

const locales: Locales = {
  en: en,
  zh: zh
};

export function getMessages(key?: any) {
  if (key === 'zh' || key === 'zh-CN') {
    return zh as LocaleZh;
  }

  return en as LocaleEn;
}

export default locales;
