import * as React from 'react';
import IntlContext from './IntlContext';

import { IntlProviderProps } from './IntlProvider.d';

const IntlProvider = ({ locale, children }: IntlProviderProps) => {
  return <IntlContext.Provider value={locale}>{children}</IntlContext.Provider>;
};

export default IntlProvider;
