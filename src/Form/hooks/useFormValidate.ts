import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import type { CheckResult } from 'schema-typed';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { nameToPath } from '../../FormControl/utils';

export interface FormErrorProps {
  formValue: any;
  getCombinedModel: () => any;
  onCheck?: (formError: any) => void;
  onError?: (formError: any) => void;
  nestedField?: boolean;
}

export default function useFormValidate(_formError: any, props: FormErrorProps) {
  const { formValue, getCombinedModel, onCheck, onError, nestedField } = props;
  const [realFormError, setFormError] = useControlled(_formError, {});
  const checkOptions = { nestedObject: nestedField };

  const realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  const check = useEventCallback((callback?: (formError: any) => void) => {
    const formError = {};
    let errorCount = 0;
    const model = getCombinedModel();

    const checkField = (key: string, type: any, value: any, formErrorObj: any) => {
      model.setSchemaOptionsForAllType(formValue || {});

      const checkResult = type.check(value, formValue, key);

      if (checkResult.hasError === true) {
        errorCount += 1;
        formErrorObj[key] = checkResult?.errorMessage || checkResult;
      }

      // Check nested object
      if (type?.objectTypeSchemaSpec) {
        Object.entries(type.objectTypeSchemaSpec).forEach(([nestedKey, nestedType]) => {
          formErrorObj[key] = formErrorObj[key] || { object: {} };
          checkField(nestedKey, nestedType, value?.[nestedKey], formErrorObj[key].object);
        });
      }
    };

    Object.entries(model.getSchemaSpec()).forEach(([key, type]) => {
      checkField(key, type, formValue[key], formError);
    });

    setFormError(formError);
    onCheck?.(formError);
    callback?.(formError);

    if (errorCount > 0) {
      onError?.(formError);
      return false;
    }

    return true;
  });

  const checkFieldForNextValue = useEventCallback(
    (
      fieldName: string,
      nextValue: Record<string, unknown>,
      callback?: (checkResult: unknown) => void
    ) => {
      const model = getCombinedModel();
      const resultOfCurrentField = model.checkForField(fieldName, nextValue, checkOptions);
      let nextFormError = {
        ...realFormError
      };
      /**
       * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
       * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
       * so nestedField does not support proxy here
       */
      if (nestedField) {
        nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
        setFormError(nextFormError);
        onCheck?.(nextFormError);
        callback?.(resultOfCurrentField);

        if (resultOfCurrentField.hasError) {
          onError?.(nextFormError);
        }

        return !resultOfCurrentField.hasError;
      } else {
        const allResults = model.getCheckResult();
        let hasError = false;

        Object.keys(allResults).forEach(key => {
          const currentResult = allResults[key];
          if (currentResult.hasError) {
            nextFormError[key] = currentResult.errorMessage || currentResult;
            hasError = true;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = nextFormError;
            nextFormError = rest;
          }
        });

        setFormError(nextFormError);
        onCheck?.(nextFormError);
        callback?.(resultOfCurrentField);
        if (hasError) {
          onError?.(nextFormError);
        }

        return !hasError;
      }
    }
  );
  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  const checkForField = useEventCallback(
    (fieldName: string, callback?: (checkResult: any) => void) => {
      return checkFieldForNextValue(fieldName, formValue || {}, callback);
    }
  );

  /**
   * Check form data asynchronously and return a Promise
   */
  const checkAsync = useEventCallback(() => {
    const promises: Promise<CheckResult>[] = [];
    const keys: string[] = [];
    const model = getCombinedModel();

    Object.keys(model.getSchemaSpec()).forEach(key => {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue || {}, checkOptions));
    });

    return Promise.all(promises).then(values => {
      const formError = {};
      let errorCount = 0;

      for (let i = 0; i < values.length; i++) {
        if (values[i].hasError) {
          errorCount += 1;
          formError[keys[i]] = values[i].errorMessage;
        }
      }

      onCheck?.(formError);
      setFormError(formError);

      if (errorCount > 0) {
        onError?.(formError);
      }

      return { hasError: errorCount > 0, formError };
    });
  });

  const checkFieldAsyncForNextValue = useEventCallback((fieldName, nextValue) => {
    const model = getCombinedModel();
    return model
      .checkForFieldAsync(fieldName, nextValue, checkOptions)
      .then(resultOfCurrentField => {
        let nextFormError = { ...realFormError };
        /**
         * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
         * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
         * so nestedField does not support proxy here
         */

        if (nestedField) {
          nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
          onCheck?.(nextFormError);
          setFormError(nextFormError);

          if (resultOfCurrentField.hasError) {
            onError?.(nextFormError);
          }

          return resultOfCurrentField;
        } else {
          const allResults = model.getCheckResult();
          let hasError = false;
          Object.keys(allResults).forEach(key => {
            const currentResult = allResults[key];
            if (currentResult.hasError) {
              nextFormError[key] = currentResult.errorMessage || currentResult;
              hasError = true;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { [key]: _, ...rest } = nextFormError;
              nextFormError = rest;
            }
          });
          setFormError(nextFormError);
          onCheck?.(nextFormError);
          if (hasError) {
            onError?.(nextFormError);
          }
          return resultOfCurrentField;
        }
      });
  });

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  const checkForFieldAsync = useEventCallback((fieldName: string) => {
    return checkFieldAsyncForNextValue(fieldName, formValue || {});
  });

  const onRemoveError = useCallback(
    (name: string) => {
      /**
       * when this function is called when the children component is unmount,
       * it's an old render frame so use Ref to get future error
       */
      const formError = omit(realFormErrorRef.current, [nestedField ? nameToPath(name) : name]);

      realFormErrorRef.current = formError;
      setFormError(formError);
      onCheck?.(formError);

      return formError;
    },
    [nestedField, onCheck, setFormError]
  );

  const cleanErrors = useEventCallback(() => {
    setFormError({});
  });

  const resetErrors = useEventCallback((formError: any = {}) => {
    setFormError(formError);
  });

  const cleanErrorForField = useEventCallback((fieldName: string) => {
    setFormError(omit(realFormError, [nestedField ? nameToPath(fieldName) : fieldName]));
  });

  return {
    formError: realFormError,
    check,
    checkForField,
    checkFieldForNextValue,
    checkAsync,
    checkForFieldAsync,
    checkFieldAsyncForNextValue,
    cleanErrors,
    resetErrors,
    cleanErrorForField,
    onRemoveError
  };
}
