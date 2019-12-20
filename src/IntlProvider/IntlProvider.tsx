import * as React from 'react';
import IntlContext from './IntlContext';

import { IntlProviderProps } from './IntlProvider.d';

const IntlProvider = ({ locale, rtl, children }: IntlProviderProps) => {
  return <IntlContext.Provider value={{ ...locale, rtl }}>{children}</IntlContext.Provider>;
};

export default IntlProvider;
