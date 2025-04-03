import React, { useContext } from 'react';
import type { CheckTriggerType } from '@/internals/types';
import type { FieldRuleType } from './hooks/useSchemaModel';

type RecordAny = Record<string, any>;

interface TrulyFormContextValue<T = RecordAny, M = any, E = { [P in keyof T]?: M }> {
  formError: E;
  nestedField: boolean;
  removeFieldValue: (name: string) => void;
  removeFieldError: (name: string) => void;
  removeFieldRule: (name: string) => void;
  pushFieldRule: (name: string, fieldRule: FieldRuleType) => void;
  onFieldChange: (name: string, value: any, event: React.SyntheticEvent) => void;
  checkFieldForNextValue: (
    name: string,
    nextValue: Record<string, unknown>,
    callback?: (checkResult: Record<string, unknown>) => void
  ) => boolean;
  checkFieldAsyncForNextValue: (
    name: string,
    nextValue: Record<string, unknown>
  ) => Promise<Record<string, unknown>>;
}

type ExternalPropsContextValue = {
  checkTrigger?: CheckTriggerType;
  errorFromContext?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  disabled?: boolean;
};

type InitialContextType = Partial<Record<keyof TrulyFormContextValue, undefined>>;

export type FormContextValue<T = RecordAny, errorMsgType = any> = (
  | TrulyFormContextValue<T, errorMsgType>
  | InitialContextType
) &
  ExternalPropsContextValue;

export const FormContext = React.createContext<FormContextValue>({});
export const FormValueContext = React.createContext<RecordAny | undefined>({});

export const FormProvider = FormContext.Provider;
export const FormValueProvider = FormValueContext.Provider;

export function useFormContext<T = RecordAny, E = any>() {
  return useContext(FormContext) as FormContextValue<T, E>;
}

export default FormContext;
