import { isValidElement, useCallback, useMemo } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import { nameToPath } from '../utils';

interface FieldProps {
  name: string;
  formValue?: Record<string, any>;
  formError?: Record<string, any>;
  value: any;
  nestedField: boolean;
  errorMessage: React.ReactNode;
  errorFromContext?: boolean;
}

interface ErrorType {
  errorMessage?: string;
  array: { errorMessage?: string; hasError: boolean }[];
}

function getErrorMessage(error?: ErrorType | string) {
  if (typeof error === 'string') {
    return error;
  }

  /**
   * When using some components as the field, such as TagInput, and using `ArrayType().of` as the validation rule,
   * the error object won't contain the errorMessage directly. @see https://github.com/rsuite/rsuite/issues/3866
   */
  if (error?.array && error.array?.length > 0) {
    return error.array.find(item => item.hasError)?.errorMessage;
  }

  if (isValidElement(error)) {
    return error;
  }

  return error?.errorMessage;
}

function useField(props: FieldProps) {
  const { name, formValue, formError, value, nestedField, errorMessage, errorFromContext } = props;
  const fieldValue = useMemo(() => {
    if (typeof value !== 'undefined') {
      return value;
    }

    return nestedField ? get(formValue, name) : formValue?.[name];
  }, [formValue, name, nestedField, value]);

  const fieldError = useMemo(() => {
    if (typeof errorMessage !== 'undefined' || !errorFromContext) {
      return errorMessage;
    }

    if (nestedField) {
      return getErrorMessage(get(formError, nameToPath(name)));
    }

    const fieldError = formError?.[name];

    if (typeof fieldError === 'string') {
      return fieldError;
    }

    return getErrorMessage(fieldError);
  }, [errorFromContext, errorMessage, formError, name, nestedField]);

  const setFieldValue = useCallback(
    (fieldName: string, fieldValue: any) => {
      if (nestedField) {
        return set({ ...formValue }, fieldName, fieldValue);
      }

      return { ...formValue, [fieldName]: fieldValue };
    },
    [formValue, nestedField]
  );

  return { fieldValue, fieldError, setFieldValue };
}

export default useField;
