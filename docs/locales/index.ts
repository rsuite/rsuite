import en from './en-US';
import zh from './zh-CN';

const dict = {
  en: en,
  zh: zh
};

export function getMessages(key?: any) {
  if (key === 'en' || key === 'en-US') {
    return en;
  }

  return zh;
}

export default dict;
