'use client';
import React, { useContext } from 'react';
export var FormContext = /*#__PURE__*/React.createContext({});
export var FormValueContext = /*#__PURE__*/React.createContext({});
export var FormProvider = FormContext.Provider;
export var FormValueProvider = FormValueContext.Provider;
export function useFormContext() {
  return useContext(FormContext);
}
export default FormContext;