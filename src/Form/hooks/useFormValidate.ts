import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { nameToPath } from '../../useFormControl/utils/nameToPath';
import type { CheckResult } from 'schema-typed';
import type { Resolver } from '../resolvers';

export interface FormErrorProps {
  formValue: any;
  getCombinedModel: () => any;
  onCheck?: (formError: any) => void;
  onError?: (formError: any) => void;
  nestedField?: boolean;
  resolver?: Resolver;
}

export default function useFormValidate(_formError: any, props: FormErrorProps) {
  const { formValue, getCombinedModel, onCheck, onError, nestedField, resolver } = props;
  const [realFormError, setFormError] = useControlled(_formError, {});
  const checkOptions = { nestedObject: nestedField };

  const realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   *
   * When a `resolver` is provided and the resolver returns a Promise (async resolver),
   * this method cannot resolve the result synchronously. In that case it returns `false`
   * immediately and you should use `checkAsync()` instead.
   * @param callback
   */
  const check = useEventCallback((callback?: (formError: any) => void) => {
    if (resolver) {
      const result = resolver(formValue || {});

      // Async resolver: cannot handle synchronously
      if (result instanceof Promise) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[rsuite] The `resolver` provided to <Form> returns a Promise. ' +
              'Use `checkAsync()` or rely on `onSubmit` for async validation.'
          );
        }
        return false;
      }

      const { errors } = result;
      const hasError = Object.keys(errors).length > 0;
      setFormError(errors);
      onCheck?.(errors);
      callback?.(errors);
      if (hasError) {
        onError?.(errors);
      }
      return !hasError;
    }

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
      if (resolver) {
        const result = resolver(nextValue);

        if (result instanceof Promise) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              '[rsuite] The `resolver` provided to <Form> returns a Promise. ' +
                'Use `checkAsync()` or `checkForFieldAsync()` for async validation.'
            );
          }
          return false;
        }

        const { errors } = result;
        const fieldError = errors[fieldName];
        const hasFieldError = fieldError !== undefined && fieldError !== null && fieldError !== '';
        // Merge resolver errors with existing errors, clearing fields that now pass
        const nextFormError = { ...realFormError, ...errors };
        // Remove errors for fields that are no longer invalid
        Object.keys(nextFormError).forEach(key => {
          if (errors[key] === undefined || errors[key] === null || errors[key] === '') {
            delete nextFormError[key];
          }
        });

        setFormError(nextFormError);
        onCheck?.(nextFormError);
        callback?.(fieldError !== undefined ? { hasError: hasFieldError, errorMessage: fieldError } : { hasError: false });
        if (Object.keys(nextFormError).length > 0) {
          onError?.(nextFormError);
        }
        return !hasFieldError;
      }

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
    if (resolver) {
      return Promise.resolve(resolver(formValue || {})).then(({ errors }) => {
        const hasError = Object.keys(errors).length > 0;
        onCheck?.(errors);
        setFormError(errors);
        if (hasError) {
          onError?.(errors);
        }
        return { hasError, formError: errors };
      });
    }

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

  const checkFieldAsyncForNextValue = useEventCallback((fieldName: string, nextValue: any) => {
    if (resolver) {
      return Promise.resolve(resolver(nextValue)).then(({ errors }) => {
        const fieldError = errors[fieldName];
        const hasFieldError = fieldError !== undefined && fieldError !== null && fieldError !== '';
        const nextFormError = { ...realFormError };
        // Merge: update all keys from errors, remove those that now pass
        Object.keys({ ...realFormError, ...errors }).forEach(key => {
          if (errors[key] !== undefined && errors[key] !== null && errors[key] !== '') {
            nextFormError[key] = errors[key];
          } else {
            delete nextFormError[key];
          }
        });

        onCheck?.(nextFormError);
        setFormError(nextFormError);
        if (Object.keys(nextFormError).length > 0) {
          onError?.(nextFormError);
        }

        return { hasError: hasFieldError, errorMessage: fieldError };
      });
    }

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
