import React from 'react';
import { getClassNamePrefix } from '../utils/prefix';
import { format } from '../utils/dateUtils';
import { Locale } from '../locales';

export interface CustomValue<T = Locale> {
  /** Language configuration */
  locale?: T;

  /** Support right-to-left */
  rtl?: boolean;

  /**
   * Date Formatting API
   *
   * Example:
   *
   *  import format from 'date-fns/format';
   *  import ru from 'date-fns/locale/ru';
   *
   *  function formatDate(data, formatStr) {
   *    return format(data, formatStr, { locale: ru });
   *  }
   *
   * */
  formatDate?: (
    date: Date | string | number,
    format?: string,
    options?: {
      locale?: any;
    }
  ) => string;
}

export interface CustomProviderProps<T = any> extends CustomValue<T> {
  /** Supported themes */
  theme?: 'default' | 'dark' | 'high-contrast';

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Primary content */
  children?: React.ReactNode;
}

const CustomContext = React.createContext<CustomProviderProps>({});
const { Consumer, Provider } = CustomContext;

const CustomProvider = (props: CustomProviderProps) => {
  const { children, classPrefix = getClassNamePrefix(), formatDate = format, ...rest } = props;
  const value = React.useMemo(() => ({ classPrefix, formatDate, ...rest }), [
    classPrefix,
    formatDate,
    rest
  ]);

  return <Provider value={value}>{children}</Provider>;
};

export { CustomContext, Consumer as CustomConsumer };

export default CustomProvider;
