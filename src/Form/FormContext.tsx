import React from 'react';
import { TypeAttributes } from '../@types/common';
import type { Schema } from 'schema-typed';
import type { RegisterFieldRuleType } from './useSchemaModel';
export interface FormContextValue<
  T = Record<string, any>,
  errorMsgType = any,
  E = { [P in keyof T]?: errorMsgType }
> {
  generatorModel?: () => Schema;
  checkTrigger?: TypeAttributes.CheckTrigger;
  formDefaultValue?: T;
  errorFromContext?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  disabled?: boolean;
  formError?: E;
  removeFieldValue?: (name: string) => void;
  removeFieldError?: (name: string) => void;
  registerModel?: (name: string, subType: RegisterFieldRuleType) => () => void;
  onFieldChange?: (name: string, value: any, event: React.SyntheticEvent) => void;
  onFieldError?: (name: string, errorMessage: string) => void;
  onFieldSuccess?: (name: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({});
export const FormValueContext = React.createContext<Record<string, any> | undefined>({});
export const FormPlaintextContext = React.createContext<boolean>(false);

export default FormContext;
