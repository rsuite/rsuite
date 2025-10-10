/// <reference types="react" />
import type { CheckResult } from 'schema-typed';
export interface FormImperativeMethods<T = Record<string, any>, M = string, E = {
    [P in keyof T]?: M;
}> {
    /**
     * Verify form data
     */
    check: (callback?: (formError: E) => void) => boolean;
    /**
     * Asynchronously check form data
     */
    checkAsync: () => Promise<any>;
    /**
     * Check the data field
     */
    checkForField: (fieldName: keyof T, callback?: (checkResult: CheckResult<M>) => void) => boolean;
    /**
     * Asynchronous verification as a data field
     */
    checkForFieldAsync: (fieldName: keyof T) => Promise<CheckResult>;
    /**
     * Clear all error messages
     */
    cleanErrors: (callback?: () => void) => void;
    /**
     * Clear the error message of the specified field
     */
    cleanErrorForField: (fieldName: keyof E, callback?: () => void) => void;
    /**
     * All error messages are reset, and an initial value can be set
     */
    resetErrors: (formError?: E) => void;
    /**
     * Reset form data to initial value and clear all error messages
     */
    reset: () => void;
    /**
     * Submit form data and verify
     */
    submit: () => void;
}
export interface FormInstance<T = Record<string, any>, M = string, E = {
    [P in keyof T]?: M;
}> extends FormImperativeMethods<T, M, E> {
    /**
     * Form root element
     */
    root: HTMLFormElement | null;
}
interface FormRefProps<T = Record<string, any>, M = string, E = {
    [P in keyof T]?: M;
}> {
    imperativeMethods: FormImperativeMethods<T, M, E>;
}
export default function useFormRef(ref: React.Ref<FormInstance>, props: FormRefProps): import("react").RefObject<HTMLFormElement>;
export {};
