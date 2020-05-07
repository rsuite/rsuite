import * as React from 'react';

export interface IntlProviderProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Language configuration */
  locale?: object;

  /** Support right-to-left */
  rtl?: boolean;

  /** Date Formatting API */
  formatDate?: (
    date: Date | string | number,
    format?: string,
    options?: {
      locale?: object;
    }
  ) => string;
}

declare const IntlProvider: React.ComponentType<IntlProviderProps>;

export default IntlProvider;
