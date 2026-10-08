import { useRef, useCallback } from 'react';
import { useEventCallback } from '@/internals/hooks';
import useFormEventCallback from './useFormEventCallback';
import useFormError from './useFormError';
import type { CheckResult } from 'schema-typed';
import { SchemaModel } from 'schema-typed';
import type { Resolver } from '../resolvers';
import { createNativeValidationFrames } from '../utils/nativeValidationFrames';
import { createValidationRequests } from '../utils/validationRequests';
import { getFieldError, setFieldError, removeFieldError } from '../utils/fieldError';
import type { NativeValidationObservation } from '../utils/nativeValidationFrames';

export interface FormErrorProps {
  getFormValue: () => any;
  getCombinedModel: () => any;
  onCheck?: (formError: any) => void;
  onError?: (formError: any) => void;
  nestedField?: boolean;
  resolver?: Resolver;
}

export default function useFormValidate(_formError: any, props: FormErrorProps) {
  const { getFormValue, getCombinedModel, onCheck, onError, nestedField, resolver } = props;
  const {
    formError: realFormError,
    formErrorRef: realFormErrorRef,
    isControlled,
    setFormError
  } = useFormError(_formError);
  const checkOptions = { nestedObject: nestedField };
  const nativeFramesRef = useRef<ReturnType<typeof createNativeValidationFrames> | null>(null);
  if (!nativeFramesRef.current) nativeFramesRef.current = createNativeValidationFrames();
  const nativeFrames = nativeFramesRef.current;

  const requestsRef = useRef<ReturnType<typeof createValidationRequests> | null>(null);
  if (!requestsRef.current) requestsRef.current = createValidationRequests();
  const startValidation = (fieldName?: string) =>
    requestsRef.current!.start(resolver ? undefined : fieldName, nestedField);

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
  const check = useFormEventCallback((callback?: (formError: any) => void) => {
    const formValue = getFormValue();
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
      startValidation();
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
    startValidation();
    let errorCount = 0;
    const model = getCombinedModel();

    const checkField = (key: string, type: any, value: any, formErrorObj: any, path: string[]) => {
      model.setSchemaOptionsForAllType(formValue || {});

      const checkResult = type.check(value, formValue, key);
      for (const observation of nativeFrames.observe(checkResult, path)) {
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
          checkField(nestedKey, nestedType, value?.[nestedKey], formErrorObj[key].object, [
            ...path,
            'object',
            nestedKey
          ]);
        });
      }
    };

    Object.entries(model.getSchemaSpec()).forEach(([key, type]) => {
      checkField(key, type, formValue[key], formError, [key]);
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

  const checkFieldForNextValue = useFormEventCallback(
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
        startValidation(fieldName);
        const fieldError = getFieldError(errors, fieldName, !!nestedField);
        const hasFieldError = isValidError(fieldError);
        // Merge resolver errors with existing errors, clearing fields that now pass
        const mergedFormError = mergeResolverErrors(realFormErrorRef.current, errors);
        const nextFormError = hasFieldError
          ? mergedFormError
          : removeFieldError(mergedFormError, fieldName, !!nestedField);

        setFormError(nextFormError);
        onCheck?.(nextFormError);
        const callbackResult = { hasError: hasFieldError, errorMessage: fieldError };
        callback?.(hasFieldError ? callbackResult : { hasError: false });
        if (Object.keys(nextFormError).length > 0) {
          onError?.(nextFormError);
        }
        return !hasFieldError;
      }

      const nativeCarry = nativeFrames.captureCarry(realFormErrorRef.current);
      const { claimField } = startValidation(fieldName);
      const model = SchemaModel.combine(getCombinedModel());
      const resultOfCurrentField = model.checkForField(fieldName, nextValue, checkOptions);
      let nextFormError = {
        ...realFormErrorRef.current
      };
      /**
       * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
       * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
       * so nestedField does not support proxy here
       */
      if (nestedField) {
        const target = nativeFrames.nestedTarget(nextFormError, fieldName);
        const observed = target ? nativeFrames.observe(resultOfCurrentField, target) : [];
        const { copies, record } = nativeFrames.trackCopies();
        nextFormError = setFieldError(nextFormError, fieldName, resultOfCurrentField, record);
        nativeFrames.publish(
          nextFormError,
          nativeFrames.anchored(nextFormError, target, resultOfCurrentField) ? observed : [],
          nativeCarry,
          copies
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
          if (!claimField(key)) {
            return;
          }
          const currentResult = allResults[key];
          for (const observation of nativeFrames.observe(currentResult, [key])) {
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
  const checkForField = useFormEventCallback(
    (fieldName: string, callback?: (checkResult: any) => void) => {
      const formValue = getFormValue();
      return checkFieldForNextValue(fieldName, formValue || {}, callback);
    }
  );

  /**
   * Check form data asynchronously and return a Promise
   */
  const checkAsync = useFormEventCallback(() => {
    const formValue = getFormValue();
    const { isCurrent } = startValidation();
    if (resolver) {
      return Promise.resolve(resolver(formValue || {})).then(({ errors }) => {
        const hasError = Object.keys(errors).length > 0;
        if (isCurrent()) {
          onCheck?.(errors);
          if (isCurrent()) {
            setFormError(errors);
            if (hasError) {
              onError?.(errors);
            }
          }
        }
        return { hasError, formError: errors };
      });
    }

    const promises: Promise<CheckResult>[] = [];
    const keys: string[] = [];
    const model = SchemaModel.combine(getCombinedModel());

    Object.keys(model.getSchemaSpec()).forEach(key => {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue || {}, checkOptions));
    });

    return Promise.all(promises).then(values => {
      const formError = {};
      const nativeObservations: NativeValidationObservation[number][] = [];
      let errorCount = 0;

      for (let i = 0; i < values.length; i++) {
        let projectionRoot: string[] | undefined = [keys[i]];
        if (values[i].hasError) {
          errorCount += 1;
          const { errorMessage } = values[i];
          formError[keys[i]] = errorMessage === undefined ? values[i] : errorMessage;
          if (errorMessage === undefined) projectionRoot = undefined;
        }
        for (const observation of nativeFrames.observe(values[i], [keys[i]], projectionRoot)) {
          nativeObservations.push(observation);
        }
      }

      // The returned map keeps its native provenance if the owner explicitly selects it later.
      nativeFrames.publish(formError, nativeObservations);
      if (isCurrent()) {
        onCheck?.(formError);
        if (isCurrent()) {
          setFormError(formError);
          if (errorCount > 0) {
            onError?.(formError);
          }
        }
      }

      return { hasError: errorCount > 0, formError };
    });
  });

  const checkFieldAsyncForNextValue = useFormEventCallback((fieldName: string, nextValue: any) => {
    const { isCurrent, claimField } = startValidation(fieldName);
    if (resolver) {
      return Promise.resolve(resolver(nextValue)).then(({ errors }) => {
        const fieldError = getFieldError(errors, fieldName, !!nestedField);
        const hasFieldError = isValidError(fieldError);
        if (isCurrent()) {
          const mergedFormError = mergeResolverErrors(realFormErrorRef.current, errors);
          const nextFormError = hasFieldError
            ? mergedFormError
            : removeFieldError(mergedFormError, fieldName, !!nestedField);
          onCheck?.(nextFormError);
          if (isCurrent()) {
            setFormError(nextFormError);
            if (Object.keys(nextFormError).length > 0) {
              onError?.(nextFormError);
            }
          }
        }

        return { hasError: hasFieldError, errorMessage: fieldError };
      });
    }

    // schema-typed writes its result cache before this continuation, including for stale requests.
    const model = SchemaModel.combine(getCombinedModel());
    return model
      .checkForFieldAsync(fieldName, nextValue, checkOptions)
      .then(resultOfCurrentField => {
        if (!isCurrent()) {
          return resultOfCurrentField;
        }
        const nativeCarry = nativeFrames.captureCarry(realFormErrorRef.current);
        let nextFormError = { ...realFormErrorRef.current };
        /**
         * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
         * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
         * so nestedField does not support proxy here
         */

        if (nestedField) {
          const target = nativeFrames.nestedTarget(nextFormError, fieldName);
          const observed = target ? nativeFrames.observe(resultOfCurrentField, target) : [];
          const { copies, record } = nativeFrames.trackCopies();
          nextFormError = setFieldError(nextFormError, fieldName, resultOfCurrentField, record);
          nativeFrames.publish(
            nextFormError,
            nativeFrames.anchored(nextFormError, target, resultOfCurrentField) ? observed : [],
            nativeCarry,
            copies
          );
          onCheck?.(nextFormError);
          if (isCurrent()) {
            setFormError(nextFormError);
            if (resultOfCurrentField.hasError) {
              onError?.(nextFormError);
            }
          }

          return resultOfCurrentField;
        } else {
          const allResults = model.getCheckResult();
          const nativeObservations: NativeValidationObservation[number][] = [];
          let hasError = false;
          Object.keys(allResults).forEach(key => {
            if (!claimField(key)) {
              return;
            }
            const currentResult = allResults[key];
            for (const observation of nativeFrames.observe(currentResult, [key])) {
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
          if (hasError && isCurrent()) {
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
  const checkForFieldAsync = useFormEventCallback((fieldName: string) => {
    const formValue = getFormValue();
    return checkFieldAsyncForNextValue(fieldName, formValue || {});
  });

  const onRemoveError = useCallback(
    (name: string) => {
      // Keep a newer owner so an older proxy cannot restore the removed error.
      requestsRef.current!.invalidate(name, nestedField);
      /**
       * when this function is called when the children component is unmount,
       * it's an old render frame so use Ref to get future error
       */
      const source = realFormErrorRef.current;
      const nativeCarry = nativeFrames.captureCarry(source);
      const { copies, record } = nativeFrames.trackCopies();
      const formError = removeFieldError(source, name, !!nestedField, record);
      nativeFrames.publish(formError, [], nativeCarry, copies);

      realFormErrorRef.current = formError;
      setFormError(formError);
      onCheck?.(formError);

      return formError;
    },
    [nativeFrames, nestedField, onCheck, setFormError]
  );

  const cleanErrors = useEventCallback(() => {
    if (isControlled()) return;
    requestsRef.current!.invalidate();
    setFormError({});
  });

  const resetErrors = useEventCallback((formError: any = {}) => {
    requestsRef.current!.invalidate();
    setFormError(formError);
  });

  const cleanErrorForField = useEventCallback((fieldName: string) => {
    const nativeCarry = nativeFrames.captureCarry(realFormError);
    const { copies, record } = nativeFrames.trackCopies();
    const nextFormError = removeFieldError(realFormError, fieldName, !!nestedField, record);
    nativeFrames.publish(nextFormError, [], nativeCarry, copies);
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
