// @flow

import * as React from 'react';
import IntlContext from './IntlContext';

type Props = {
  locale: Object,
  children?: React.Node
};

const IntlProvider = ({ locale, children }: Props) => {
  return <IntlContext.Provider value={locale}>{children}</IntlContext.Provider>;
};

export default IntlProvider;
