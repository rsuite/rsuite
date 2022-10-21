import React, { useMemo, useCallback, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Schema, SchemaModel } from 'schema-typed';
import type { CheckResult } from 'schema-typed';
import FormContext, { FormValueContext } from './FormContext';
import FormControl from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import { useFormClassNames } from './useFormClassNames';
import useSchemaModel from './useSchemaModel';
import { useControlled } from '../utils';

export interface FormProps<
  T = Record<string, any>,
  errorMsgType = any,
  E = { [P in keyof T]?: errorMsgType }
> extends WithAsProps,
    Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit' | 'onError'> {
  /** Set the left and right columns of the layout of the elements within the form */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts. */
  fluid?: boolean;

  /** Current value of the input. Creates a controlled component */
  formValue?: T;

  /** Initial value */
  formDefaultValue?: T;

  /** Error message of form */
  formError?: E;

  /** Trigger the type of form validation */
  checkTrigger?: TypeAttributes.CheckTrigger;

  /** SchemaModel object */
  model?: Schema;

  /** Make the form readonly */
  readOnly?: boolean;

  /** Render the form as plain text */
  plaintext?: boolean;

  /** Disable the form. */
  disabled?: boolean;

  /** The error message comes from context */
  errorFromContext?: boolean;

  /** Callback fired when data changing */
  onChange?: (formValue: T, event?: React.SyntheticEvent) => void;

  /** Callback fired when error checking */
  onError?: (formError: E) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: E) => void;

  /** Callback fired when form submit */
  onSubmit?: (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => void;
}

export interface FormInstance<
  T = Record<string, any>,
  errorMsg = string,
  E = { [P in keyof T]?: errorMsg }
> {
  root: HTMLFormElement | null;

  /** Verify form data */
  check: (callback?: (formError: E) => void) => boolean;

  /** Asynchronously check form data */
  checkAsync: () => Promise<any>;

  /** Check the data field */
  checkForField: (
    fieldName: keyof T,
    callback?: (checkResult: CheckResult<errorMsg>) => void
  ) => boolean;

  /** Asynchronous verification as a data field */
  checkForFieldAsync: (fieldName: keyof T) => Promise<CheckResult>;

  /** Clear all error messages */
  cleanErrors: (callback?: () => void) => void;

  /** Clear the error message of the specified field */
  cleanErrorForField: (fieldName: keyof E, callback?: () => void) => void;

  /** All error messages are reset, and an initial value can be set */
  resetErrors: (formError: E, callback?: () => void) => void;
}

export interface FormComponent
  extends RsRefForwardingComponent<'form', FormProps & { ref?: React.Ref<FormInstance> }> {
  Control: typeof FormControl;
  ControlLabel: typeof FormControlLabel;
  ErrorMessage: typeof FormErrorMessage;
  Group: typeof FormGroup;
  HelpText: typeof FormHelpText;
}

const Form: FormComponent = React.forwardRef((props: FormProps, ref: React.Ref<FormInstance>) => {
  const {
    checkTrigger = 'change',
    classPrefix = 'form',
    errorFromContext = true,
    formDefaultValue = {},
    formValue,
    formError,
    fluid,
    layout = 'vertical',
    model: formModel = SchemaModel({}),
    readOnly,
    plaintext,
    className,
    children,
    disabled,
    onSubmit,
    onCheck,
    onError,
    onChange,
    ...rest
  } = props;

  const { getCombinedModel, pushFieldRule, removeFieldRule } = useSchemaModel(formModel);

  const classes = useFormClassNames({
    classPrefix,
    className,
    fluid,
    layout,
    readOnly,
    plaintext,
    disabled
  });

  const [realFormValue, setFormValue] = useControlled(formValue, formDefaultValue);
  const [realFormError, setFormError] = useControlled(formError, {});

  const realFormValueRef = useRef(realFormValue);
  realFormValueRef.current = realFormValue;

  const realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  const check = useCallback(
    (callback?: (formError: any) => void) => {
      const formValue = realFormValue || {};
      const formError = {};
      let errorCount = 0;
      const model = getCombinedModel();

      Object.keys(model.spec).forEach(key => {
        const checkResult = model.checkForField(key, formValue);
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
    },
    [realFormValue, getCombinedModel, setFormError, onCheck, onError]
  );

  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  const checkForField = useCallback(
    (fieldName: string, callback?: (checkResult: any) => void) => {
      const formValue = realFormValue || {};
      const model = getCombinedModel();

      const checkResult = model.checkForField(fieldName, formValue);

      const formError = {
        ...realFormError,
        [fieldName]: checkResult?.errorMessage || checkResult
      };

      setFormError(formError);
      onCheck?.(formError);
      callback?.(checkResult);

      if (checkResult.hasError) {
        onError?.(formError);
      }

      return !checkResult.hasError;
    },
    [realFormValue, getCombinedModel, realFormError, setFormError, onCheck, onError]
  );

  /**
   * Check form data asynchronously and return a Promise
   */
  const checkAsync = useCallback(() => {
    const formValue = realFormValue || {};
    const promises: Promise<CheckResult>[] = [];
    const keys: string[] = [];
    const model = getCombinedModel();

    Object.keys(model.spec).forEach(key => {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue));
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
  }, [realFormValue, getCombinedModel, onCheck, setFormError, onError]);

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  const checkForFieldAsync = useCallback(
    (fieldName: string) => {
      const formValue = realFormValue || {};
      const model = getCombinedModel();

      return model.checkForFieldAsync(fieldName, formValue).then(checkResult => {
        const formError = { ...realFormError, [fieldName]: checkResult.errorMessage };

        onCheck?.(formError);
        setFormError(formError);

        if (checkResult.hasError) {
          onError?.(formError);
        }

        return checkResult;
      });
    },
    [realFormValue, getCombinedModel, realFormError, onCheck, setFormError, onError]
  );

  const cleanErrors = useCallback(() => {
    setFormError({});
  }, [setFormError]);

  const cleanErrorForField = useCallback(
    (fieldName: string) => {
      setFormError(omit(realFormError, [fieldName]));
    },
    [realFormError, setFormError]
  );

  const resetErrors = useCallback(
    (formError: any = {}) => {
      setFormError(formError);
    },
    [setFormError]
  );

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    check,
    checkForField,
    checkAsync,
    checkForFieldAsync,
    cleanErrors,
    cleanErrorForField,
    resetErrors
  }));

  const removeFieldError = useCallback(
    (name: string) => {
      /**
       * when this function is called when the children component is unmount, it's an old render frame
       * so use Ref to get future error
       */
      const formError = omit(realFormErrorRef.current, [name]);
      setFormError(formError);
      onCheck?.(formError);
    },
    [onCheck, setFormError]
  );

  const removeFieldValue = useCallback(
    (name: string) => {
      /**
       * when this function is called when the children component is unmount, it's an old render frame
       * so use Ref to get future value
       */
      const formValue = omit(realFormValueRef.current, [name]);
      setFormValue(formValue);
      onChange?.(formValue);
    },
    [onChange, setFormValue]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (disabled || readOnly || plaintext) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const checkStatus = check();
      onSubmit?.(checkStatus, event);
    },
    [disabled, readOnly, plaintext, check, onSubmit]
  );

  const handleFieldError = useCallback(
    (name: string, errorMessage: React.ReactNode) => {
      const formError = {
        ...realFormError,
        [name]: errorMessage
      };
      setFormError(formError);
      onError?.(formError);
      onCheck?.(formError);
    },
    [realFormError, setFormError, onError, onCheck]
  );

  const handleFieldSuccess = useCallback(
    (name: string) => {
      removeFieldError(name);
    },
    [removeFieldError]
  );

  const handleFieldChange = useCallback(
    (name: string, value: any, event: React.SyntheticEvent) => {
      const formValue = realFormValue;
      const nextFormValue = {
        ...formValue,
        [name]: value
      };
      setFormValue(nextFormValue);
      onChange?.(nextFormValue, event);
    },
    [realFormValue, setFormValue, onChange]
  );

  const rootRef = useRef<HTMLFormElement>(null);
  const formContextValue = useMemo(
    () => ({
      getCombinedModel,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      formError: realFormError,
      removeFieldValue,
      removeFieldError,
      pushFieldRule,
      removeFieldRule,
      onFieldChange: handleFieldChange,
      onFieldError: handleFieldError,
      onFieldSuccess: handleFieldSuccess
    }),
    [
      getCombinedModel,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      realFormError,
      removeFieldValue,
      removeFieldError,
      pushFieldRule,
      removeFieldRule,
      handleFieldChange,
      handleFieldError,
      handleFieldSuccess
    ]
  );

  return (
    <form {...rest} ref={rootRef} onSubmit={handleSubmit} className={classes}>
      <FormContext.Provider value={formContextValue}>
        <FormValueContext.Provider value={formValue}>{children}</FormValueContext.Provider>
      </FormContext.Provider>
    </form>
  );
}) as unknown as FormComponent;

Form.Control = FormControl;
Form.ControlLabel = FormControlLabel;
Form.ErrorMessage = FormErrorMessage;
Form.Group = FormGroup;
Form.HelpText = FormHelpText;
Form.Control = FormControl;

Form.displayName = 'Form';
Form.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  errorFromContext: PropTypes.bool,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
  fluid: PropTypes.bool,
  formValue: PropTypes.object,
  formDefaultValue: PropTypes.object,
  formError: PropTypes.object,
  checkTrigger: PropTypes.oneOf(['change', 'blur', 'none']),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onCheck: PropTypes.func,
  onSubmit: PropTypes.func,
  model: PropTypes.any,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Form;
