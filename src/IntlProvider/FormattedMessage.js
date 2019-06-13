// @flow

import * as React from 'react';
import IntlContext from './IntlContext';

type Props = {
  id: string | React.Node,
  componentClass?: React.ElementType
};

const FormattedMessage = ({ id, componentClass }: Props) => {
  const Component = componentClass || 'span';
  return (
    <Component>
      <IntlContext.Consumer>
        {context => {
          if (context && typeof id === 'string' && typeof context[id] !== 'undefined') {
            return context[id];
          }
          return id;
        }}
      </IntlContext.Consumer>
    </Component>
  );
};

export default FormattedMessage;
