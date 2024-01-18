import React from 'react';
import { TypeAttributes } from '../@types/common';
import type { Schema } from 'schema-typed';
import type { FieldRuleType } from './useSchemaModel';

interface TrulyFormContextValue<
  T = Record<string, any>,
  errorMsgType = any,
  E = { [P in keyof T]?: errorMsgType }
> {
  getCombinedModel: () => Schema;
  formError: E;
  nestedField: boolean;
  removeFieldValue: (name: string) => void;
  removeFieldError: (name: string) => void;
  pushFieldRule: (name: string, fieldRule: FieldRuleType) => void;
  removeFieldRule: (name: string) => void;
  onFieldChange: (name: string, value: any, event: React.SyntheticEvent) => void;
  onFieldError: (name: string, errorMessage: string) => void;
  onFieldSuccess: (name: string) => void;
}

type ExternalPropsContextValue = {
  checkTrigger?: TypeAttributes.CheckTrigger;
  errorFromContext?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  disabled?: boolean;
};

type InitialContextType = Partial<Record<keyof TrulyFormContextValue, undefined>>;

export type FormContextValue<T = Record<string, any>, errorMsgType = any> = (
  | TrulyFormContextValue<T, errorMsgType>
  | InitialContextType
) &
  ExternalPropsContextValue;

export const FormContext = React.createContext<FormContextValue>({});
export const FormValueContext = React.createContext<Record<string, any> | undefined>({});
export const FormPlaintextContext = React.createContext<boolean>(false);

export default FormContext;
