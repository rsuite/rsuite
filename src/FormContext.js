//@flow

import * as React from 'react';

function createContext(defaultValue) {
  const context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };

  return React.createContext ? React.createContext(defaultValue) : context;
}

export const FormContext = createContext({});
export const FormValueContext = createContext({});
export const FormErrorContext = createContext({});

export default FormContext;
