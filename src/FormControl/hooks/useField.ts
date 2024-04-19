import { useCallback, useMemo } from 'react';
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
      return get(formError, nameToPath(name))?.errorMessage;
    }

    const fieldError = formError?.[name];

    if (typeof fieldError === 'string') {
      return fieldError;
    }

    return fieldError?.errorMessage;
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
