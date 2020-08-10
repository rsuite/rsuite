import * as React from 'react';
import { getClassNamePrefix } from '../utils/prefix';

export interface CustomValue<T = any> {
  /** Language configuration */
  locale?: T;

  /** Support right-to-left */
  rtl?: boolean;

  /** Date Formatting API */
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

const CustomContext = React.createContext<CustomProviderProps>(null);
const { Consumer, Provider } = CustomContext;

const CustomProvider = (props: CustomProviderProps) => {
  const { children, classPrefix = getClassNamePrefix(), ...rest } = props;
  const value = React.useMemo(() => ({ classPrefix, ...rest }), [rest, classPrefix]);

  return <Provider value={value}>{children}</Provider>;
};

export { CustomContext, Consumer as CustomConsumer };

export default CustomProvider;
