import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import type { CheckResult } from 'schema-typed';
import { useControlled } from '../../utils';
import { nameToPath } from '../../FormControl/utils';
import useEventCallback from '../../utils/useEventCallback';

export interface FormErrorProps {
  formValue: any;
  getCombinedModel: () => any;
  onCheck?: (formError: any) => void;
  onError?: (formError: any) => void;
  nestedField?: boolean;
}

export default function useFormValidate(formError: any, props: FormErrorProps) {
  const { formValue, getCombinedModel, onCheck, onError, nestedField } = props;
  const [realFormError, setFormError] = useControlled(formError, {});

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

    Object.keys(model.getSchemaSpec()).forEach(key => {
      const checkResult = model.checkForField(key, formValue || {});
      if (checkResult.hasError === true) {
        errorCount += 1;
        formError[key] = checkResult?.errorMessage || checkResult;
      }
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

  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  const checkForField = useEventCallback(
    (fieldName: string, callback?: (checkResult: any) => void) => {
      const model = getCombinedModel();

      const checkResult = model.checkForField(fieldName, formValue || {});

      const nextFormError = {
        ...formError,
        [fieldName]: checkResult?.errorMessage || checkResult
      };

      setFormError(nextFormError);
      onCheck?.(nextFormError);
      callback?.(checkResult);

      if (checkResult.hasError) {
        onError?.(nextFormError);
      }

      return !checkResult.hasError;
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
      promises.push(model.checkForFieldAsync(key, formValue || {}));
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

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  const checkForFieldAsync = useEventCallback((fieldName: string) => {
    const model = getCombinedModel();

    return model.checkForFieldAsync(fieldName, formValue || {}).then(checkResult => {
      const nextFormError = { ...formError, [fieldName]: checkResult.errorMessage };

      onCheck?.(nextFormError);
      setFormError(nextFormError);

      if (checkResult.hasError) {
        onError?.(nextFormError);
      }

      return checkResult;
    });
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

  const setFieldError = useCallback(
    (fieldName: string, checkResult: string | CheckResult) => {
      const nextFormError = nestedField
        ? set({ ...formError }, nameToPath(fieldName), checkResult)
        : { ...formError, [fieldName]: checkResult };

      setFormError(nextFormError);
      onError?.(nextFormError);
      onCheck?.(nextFormError);

      return nextFormError;
    },
    [formError, nestedField, onCheck, onError, setFormError]
  );

  const imperativeMethods = {
    check,
    checkForField,
    checkAsync,
    checkForFieldAsync
  };

  return {
    formError: realFormError,
    setFormError,
    setFieldError,
    onRemoveError,
    imperativeMethods
  };
}
