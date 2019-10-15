import * as React from 'react';

export interface IntlProviderProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Language configuration */
  locale?: object;

  /** Support right-to-left */

  rtl?: boolean;
}

declare const IntlProvider: React.ComponentType<IntlProviderProps>;

export default IntlProvider;
