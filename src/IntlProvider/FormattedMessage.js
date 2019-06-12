// @flow

import * as React from 'react';
import IntlContext from './IntlContext';

type Props = {
  id: string
};

const FormattedMessage = ({ id }: Props) => {
  return (
    <IntlContext.Consumer>
      {context => {
        if (context && typeof context[id] !== 'undefined') {
          return context[id];
        }
        return id;
      }}
    </IntlContext.Consumer>
  );
};

export default FormattedMessage;
