import * as React from 'react';

export interface IntlProviderProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Language configuration */
  locale: object;
}

declare const IntlProvider: React.ComponentType<IntlProviderProps>;

export default IntlProvider;
