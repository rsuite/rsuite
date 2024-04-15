import { useRef, useImperativeHandle } from 'react';
import omit from 'lodash/omit';
import useEventCallback from '../../utils/useEventCallback';
import { nameToPath } from '../../FormControl/utils';
import type { CheckResult } from 'schema-typed';

export interface FormImperativeMethods<
  T = Record<string, any>,
  M = string,
  E = { [P in keyof T]?: M }
> {
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
}

export interface FormInstance<T = Record<string, any>, M = string, E = { [P in keyof T]?: M }>
  extends FormImperativeMethods<T, M, E> {
  /**
   * Form root element
   */
  root: HTMLFormElement | null;
}

export default function useFormRef(ref, props) {
  const rootRef = useRef<HTMLFormElement>(null);

  const {
    formError,
    setFormError,
    nestedField,
    check,
    checkForField,
    checkAsync,
    checkForFieldAsync
  } = props;

  const cleanErrors = useEventCallback(() => {
    setFormError({});
  });

  const resetErrors = useEventCallback((formError: any = {}) => {
    setFormError(formError);
  });

  const cleanErrorForField = useEventCallback((fieldName: string) => {
    setFormError(omit(formError, [nestedField ? nameToPath(fieldName) : fieldName]));
  });

  useImperativeHandle(ref, () => {
    return {
      root: rootRef.current,
      check,
      checkForField,
      checkAsync,
      checkForFieldAsync,
      cleanErrors,
      cleanErrorForField,
      resetErrors
    };
  });

  return rootRef;
}
