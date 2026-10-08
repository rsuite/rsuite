import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { nameToPath } from '../../useFormControl/utils/nameToPath';
import type { CheckResult } from 'schema-typed';
import type { Resolver } from '../resolvers';
import { createNativeValidationFrames } from '../utils/nativeValidationFrames';
import type { NativeValidationObservation } from '../utils/nativeValidationFrames';

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
  const nativeFramesRef = useRef<ReturnType<typeof createNativeValidationFrames> | null>(null);
  if (!nativeFramesRef.current) nativeFramesRef.current = createNativeValidationFrames();
  const nativeFrames = nativeFramesRef.current;

  const realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Returns true when an error value is considered non-empty (i.e. the field has an error).
   */
  const isValidError = (error: any): boolean =>
    error !== undefined && error !== null && error !== '';

  /**
   * Merges resolver errors into the current form error state, removing entries that
   * are no longer invalid according to the latest resolver result.
   */
  const mergeResolverErrors = (current: any, resolverErrors: any): any => {
    const next = { ...current };
    Object.keys({ ...current, ...resolverErrors }).forEach(key => {
      if (isValidError(resolverErrors[key])) {
        next[key] = resolverErrors[key];
      } else {
        delete next[key];
      }
    });
    return next;
  };

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
    const nativeObservations: NativeValidationObservation[number][] = [];
    let errorCount = 0;
    const model = getCombinedModel();

    const checkField = (
      key: string,
      type: any,
      value: any,
      formErrorObj: any,
      path: string[],
      selectorMapped: string
    ) => {
      model.setSchemaOptionsForAllType(formValue || {});

      const checkResult = type.check(value, formValue, key);
      for (const observation of nativeFrames.observe(checkResult, path, selectorMapped)) {
        nativeObservations.push(observation);
      }

      if (checkResult.hasError === true) {
        errorCount += 1;
        formErrorObj[key] = checkResult?.errorMessage || checkResult;
        if (!checkResult.object) {
          return;
        }
      }

      // Check nested object
      if (type?.objectTypeSchemaSpec) {
        Object.entries(type.objectTypeSchemaSpec).forEach(([nestedKey, nestedType]) => {
          formErrorObj[key] = formErrorObj[key] || { object: {} };
          checkField(
            nestedKey,
            nestedType,
            value?.[nestedKey],
            formErrorObj[key].object,
            [...path, 'object', nestedKey],
            `${selectorMapped}.object.${nestedKey}`
          );
        });
      }
    };

    Object.entries(model.getSchemaSpec()).forEach(([key, type]) => {
      checkField(key, type, formValue[key], formError, [key], key);
    });

    nativeFrames.publish(formError, nativeObservations);
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
        const hasFieldError = isValidError(fieldError);
        // Merge resolver errors with existing errors, clearing fields that now pass
        const nextFormError = mergeResolverErrors(realFormError, errors);

        setFormError(nextFormError);
        onCheck?.(nextFormError);
        const callbackResult = { hasError: hasFieldError, errorMessage: fieldError };
        callback?.(hasFieldError ? callbackResult : { hasError: false });
        if (Object.keys(nextFormError).length > 0) {
          onError?.(nextFormError);
        }
        return !hasFieldError;
      }

      const nativeCarry = nativeFrames.captureCarry(realFormError);
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
        const target = nativeFrames.nestedTarget(nextFormError, fieldName);
        const observed = target
          ? nativeFrames.observe(resultOfCurrentField, target, nameToPath(fieldName))
          : [];
        nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
        nativeFrames.publish(
          nextFormError,
          nativeFrames.anchored(nextFormError, target, resultOfCurrentField) ? observed : [],
          nativeCarry
        );
        setFormError(nextFormError);
        onCheck?.(nextFormError);
        callback?.(resultOfCurrentField);

        if (resultOfCurrentField.hasError) {
          onError?.(nextFormError);
        }

        return !resultOfCurrentField.hasError;
      } else {
        const allResults = model.getCheckResult();
        const nativeObservations: NativeValidationObservation[number][] = [];
        let hasError = false;

        Object.keys(allResults).forEach(key => {
          const currentResult = allResults[key];
          for (const observation of nativeFrames.observe(currentResult, [key], key)) {
            nativeObservations.push(observation);
          }
          if (currentResult.hasError) {
            nextFormError[key] = currentResult.errorMessage || currentResult;
            hasError = true;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = nextFormError;
            nextFormError = rest;
          }
        });

        nativeFrames.publish(nextFormError, nativeObservations, nativeCarry);
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
      const nativeObservations: NativeValidationObservation[number][] = [];
      let errorCount = 0;

      for (let i = 0; i < values.length; i++) {
        for (const observation of nativeFrames.observe(values[i], [keys[i]], keys[i], [keys[i]])) {
          nativeObservations.push(observation);
        }
        if (values[i].hasError) {
          errorCount += 1;
          const { errorMessage } = values[i];
          formError[keys[i]] = errorMessage === undefined ? values[i] : errorMessage;
        }
      }

      nativeFrames.publish(formError, nativeObservations);
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
        const hasFieldError = isValidError(fieldError);
        const nextFormError = mergeResolverErrors(realFormError, errors);

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
        const nativeCarry = nativeFrames.captureCarry(realFormError);
        let nextFormError = { ...realFormError };
        /**
         * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
         * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
         * so nestedField does not support proxy here
         */

        if (nestedField) {
          const target = nativeFrames.nestedTarget(nextFormError, fieldName);
          const observed = target
            ? nativeFrames.observe(resultOfCurrentField, target, nameToPath(fieldName))
            : [];
          nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
          nativeFrames.publish(
            nextFormError,
            nativeFrames.anchored(nextFormError, target, resultOfCurrentField) ? observed : [],
            nativeCarry
          );
          onCheck?.(nextFormError);
          setFormError(nextFormError);

          if (resultOfCurrentField.hasError) {
            onError?.(nextFormError);
          }

          return resultOfCurrentField;
        } else {
          const allResults = model.getCheckResult();
          const nativeObservations: NativeValidationObservation[number][] = [];
          let hasError = false;
          Object.keys(allResults).forEach(key => {
            const currentResult = allResults[key];
            for (const observation of nativeFrames.observe(currentResult, [key], key)) {
              nativeObservations.push(observation);
            }
            if (currentResult.hasError) {
              nextFormError[key] = currentResult.errorMessage || currentResult;
              hasError = true;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { [key]: _, ...rest } = nextFormError;
              nextFormError = rest;
            }
          });
          nativeFrames.publish(nextFormError, nativeObservations, nativeCarry);
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
      const source = realFormErrorRef.current;
      const nativeCarry = nativeFrames.captureCarry(source);
      const cloned = nativeFrames.omitClones(source, name, !!nestedField);
      const formError = omit(source, [nestedField ? nameToPath(name) : name]);
      nativeFrames.publish(formError, [], nativeCarry, cloned);

      realFormErrorRef.current = formError;
      setFormError(formError);
      onCheck?.(formError);

      return formError;
    },
    [nativeFrames, nestedField, onCheck, setFormError]
  );

  const cleanErrors = useEventCallback(() => {
    setFormError({});
  });

  const resetErrors = useEventCallback((formError: any = {}) => {
    setFormError(formError);
  });

  const cleanErrorForField = useEventCallback((fieldName: string) => {
    const nativeCarry = nativeFrames.captureCarry(realFormError);
    const cloned = nativeFrames.omitClones(realFormError, fieldName, !!nestedField);
    const nextFormError = omit(realFormError, [nestedField ? nameToPath(fieldName) : fieldName]);
    nativeFrames.publish(nextFormError, [], nativeCarry, cloned);
    setFormError(nextFormError);
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
    onRemoveError,
    readNativeValidation: nativeFrames.read,
    commitNativeValidationRetirement: nativeFrames.commitRetirement
  };
}
