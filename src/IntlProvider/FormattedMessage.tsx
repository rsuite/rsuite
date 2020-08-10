import * as React from 'react';
import IntlContext from './IntlContext';

export interface FormattedMessageProps {
  id: string | React.ReactNode;
  as?: React.ElementType;
}

const FormattedMessage = ({ id, as }: FormattedMessageProps) => {
  const Component = as || 'span';
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
