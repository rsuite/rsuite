import en from './en-US';
import zh from './zh-CN';

type Locale<T> = {
  [keys in keyof T]: T[keys];
};

export type ENDict = Locale<typeof en>;
export type ZHDict = Locale<typeof zh>;

export type Dict = {
  en: ENDict;
  zh: ZHDict;
};

const dict: Dict = {
  en: en,
  zh: zh
};

export function getMessages(key?: any) {
  if (key === 'zh' || key === 'zh-CN') {
    return zh as ZHDict;
  }

  return en as ENDict;
}

export default dict;
