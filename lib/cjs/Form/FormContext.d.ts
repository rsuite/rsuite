import React from 'react';
import { TypeAttributes } from '../internals/types';
import type { FieldRuleType } from './hooks/useSchemaModel';
type RecordAny = Record<string, any>;
interface TrulyFormContextValue<T = RecordAny, M = any, E = {
    [P in keyof T]?: M;
}> {
    formError: E;
    nestedField: boolean;
    removeFieldValue: (name: string) => void;
    removeFieldError: (name: string) => void;
    removeFieldRule: (name: string) => void;
    pushFieldRule: (name: string, fieldRule: FieldRuleType) => void;
    onFieldChange: (name: string, value: any, event: React.SyntheticEvent) => void;
    checkFieldForNextValue: (name: string, nextValue: Record<string, unknown>, callback?: (checkResult: Record<string, unknown>) => void) => boolean;
    checkFieldAsyncForNextValue: (name: string, nextValue: Record<string, unknown>) => Promise<Record<string, unknown>>;
}
type ExternalPropsContextValue = {
    checkTrigger?: TypeAttributes.CheckTrigger;
    errorFromContext?: boolean;
    readOnly?: boolean;
    plaintext?: boolean;
    disabled?: boolean;
};
type InitialContextType = Partial<Record<keyof TrulyFormContextValue, undefined>>;
export type FormContextValue<T = RecordAny, errorMsgType = any> = (TrulyFormContextValue<T, errorMsgType> | InitialContextType) & ExternalPropsContextValue;
export declare const FormContext: React.Context<FormContextValue<RecordAny, any>>;
export declare const FormValueContext: React.Context<RecordAny | undefined>;
export declare const FormProvider: React.Provider<FormContextValue<RecordAny, any>>;
export declare const FormValueProvider: React.Provider<RecordAny | undefined>;
export declare function useFormContext<T = RecordAny, E = any>(): FormContextValue<T, E>;
export default FormContext;
