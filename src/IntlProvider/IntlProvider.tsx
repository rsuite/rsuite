import * as React from 'react';
import createContext from '../utils/createContext';
import { IntlProviderProps } from './IntlProvider.d';

export const IntlGlobalContext = createContext<IntlProviderProps>(null);

const IntlProvider = ({ locale, rtl, children, formatDate }: IntlProviderProps) => {
  return (
    <IntlGlobalContext.Provider value={{ ...locale, rtl, formatDate }}>
      {children}
    </IntlGlobalContext.Provider>
  );
};

export default IntlProvider;
