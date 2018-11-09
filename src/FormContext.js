//@flow

import * as React from 'react';

function createContext(defaultValue) {
  return React.createContext ? React.createContext() : null;
}

export const FormContext = createContext({});
export const FormValueContext = createContext({});
export const FormErrorContext = createContext({});

export default FormContext;
