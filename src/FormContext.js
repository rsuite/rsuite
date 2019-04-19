//@flow

import * as React from 'react';

function createContext(defaultValue) {
  const context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };

  const ReactContext: React.Context<any> = React.createContext
    ? React.createContext(defaultValue)
    : context;

  return ReactContext;
}

export const FormContext = createContext({});
export const FormValueContext = createContext({});
export const FormErrorContext = createContext({});
export const FormPlaintextContext = createContext(false);

export default FormContext;
