import React from 'react';
import { getClassNamePrefix } from '../utils/prefix';
import { Locale } from '../locales';

export interface CustomValue<T = Locale> {
  /** Language configuration */
  locale?: T;

  /** Support right-to-left */
  rtl?: boolean;

  /**
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * Example:
   *
   *  import format from 'date-fns/format';
   *  import eo from 'date-fns/locale/eo'
   *
   *  function formatDate(date, formatStr) {
   *    return format(date, formatStr, { locale: eo });
   *  }
   *
   * */
  formatDate?: (date: Date | string | number, format?: string) => string;

  /**
   * Return the date parsed from string using the given format string.
   *
   * Example:
   *
   *  import parse from 'date-fns/parse';
   *  import eo from 'date-fns/locale/eo'
   *
   *  function parseDate(date, formatStr) {
   *    return parse(date, formatStr, new Date(), { locale: eo });
   *  }
   *
   * */
  parseDate?: (dateString: string, formatString: string) => Date;
}

export interface CustomProviderProps<T = Locale> extends CustomValue<T> {
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
  const { children, classPrefix = getClassNamePrefix(), ...rest } = props;

  const value = React.useMemo(() => ({ classPrefix, ...rest }), [classPrefix, rest]);

  return <Provider value={value}>{children}</Provider>;
};

export { CustomContext, Consumer as CustomConsumer };

export default CustomProvider;
