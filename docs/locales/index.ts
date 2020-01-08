import en from './en-US';
import zh from './zh-CN';
import { canUseDOM } from 'dom-lib';

const dict = {
  en: en,
  zh: zh
};

export function getMessages(locale?: any) {
  if (!canUseDOM) {
    return zh;
  }
  const localeKey = localStorage?.getItem('localeKey');
  const key = locale ? locale : localeKey;

  if (key === 'en' || key === 'en-US') {
    return en;
  }

  return zh;
}

export default dict;
