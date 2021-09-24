import React from 'react';
import { Schema } from 'schema-typed';
import { TypeAttributes } from '../@types/common';

export interface FormContextValue<
  T = Record<string, any>,
  errorMsgType = any,
  E = { [P in keyof T]?: errorMsgType }
> {
  model?: Schema;
  checkTrigger?: TypeAttributes.CheckTrigger;
  formDefaultValue?: T;
  errorFromContext?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  disabled?: boolean;
  formError?: E;
  onFieldChange?: (name: string, value: any, event: React.SyntheticEvent) => void;
  onFieldError?: (name: string, errorMessage: string) => void;
  onFieldSuccess?: (name: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({});
export const FormValueContext = React.createContext<Record<string, any>>({});
export const FormPlaintextContext = React.createContext<boolean>(false);

export default FormContext;
