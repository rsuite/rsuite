import * as React from 'react';
import createContext from '../utils/createContext';
import { getClassNamePrefix } from '../utils/prefix';

export interface CustomProviderProps {
  /** Supported themes */
  theme?: 'default' | 'dark' | 'high-contrast';

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Language configuration */
  locale?: any;

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

const CustomContext = createContext<CustomProviderProps>(null);
const { Consumer, Provider } = CustomContext;

const CustomProvider = (props: CustomProviderProps) => {
  const { children, classPrefix = getClassNamePrefix(), ...rest } = props;
  const value = React.useMemo(() => ({ classPrefix, ...rest }), [rest, classPrefix]);

  return <Provider value={value}>{children}</Provider>;
};

export { CustomContext, Consumer as CustomConsumer };

export default CustomProvider;
