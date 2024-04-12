import React, { useMemo, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { Schema, SchemaModel } from 'schema-typed';
import type { CheckResult } from 'schema-typed';
import FormContext, { FormValueContext } from './FormContext';
import FormControl from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import { useEventCallback } from '../utils';
import { oneOf } from '../internals/propTypes';
import useSchemaModel from './hooks/useSchemaModel';
import useFormError from './hooks/useFormError';
import useFormValue from './hooks/useFormValue';
import useFormClassNames from './hooks/useFormClassNames';

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

  /**
   * The form data is nested.
   * You may now nest fields with "dot syntax" (e.g. address.city).
   *
   * @default false
   * @version v5.51.0
   * @example
   * ```jsx
   * <Form formValue={{ address: { city: 'Shanghai' } }} nestedField>
   *  <FormControl name="address.city" />
   * </Form>
   * ```
   */
  nestedField?: boolean;

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

/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
const Form: FormComponent = React.forwardRef((props: FormProps, ref: React.Ref<FormInstance>) => {
  const {
    checkTrigger = 'change',
    classPrefix = 'form',
    errorFromContext = true,
    formDefaultValue = {},
    formValue: formValueProp,
    formError: formErrorProp,
    fluid,
    nestedField = false,
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

  const { formValue, setFormValue, onRemoveValue } = useFormValue(formValueProp, formDefaultValue);
  const { formError, setFormError, onRemoveError } = useFormError(formErrorProp);

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

  const cleanErrors = useEventCallback(() => {
    setFormError({});
  });

  const cleanErrorForField = useEventCallback((fieldName: string) => {
    setFormError(omit(formError, [fieldName]));
  });

  const resetErrors = useEventCallback((formError: any = {}) => {
    setFormError(formError);
  });

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

  const removeFieldError = useEventCallback((name: string) => {
    const formError = onRemoveError(name);

    setFormError(formError);
    onCheck?.(formError);
  });

  const removeFieldValue = useEventCallback((name: string) => {
    const formValue = onRemoveValue(name);

    onChange?.(formValue);
  });

  const handleSubmit = useEventCallback((event: React.FormEvent<HTMLFormElement>) => {
    if (disabled || readOnly || plaintext) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const checkStatus = check();
    onSubmit?.(checkStatus, event);
  });

  const handleFieldError = useEventCallback((name: string, errorMessage: React.ReactNode) => {
    const nextFormError = {
      ...formError,
      [name]: errorMessage
    };
    setFormError(nextFormError);
    onError?.(nextFormError);
    onCheck?.(nextFormError);
  });

  const handleFieldSuccess = useEventCallback((name: string) => {
    removeFieldError(name);
  });

  const setFieldValue = (formValue: Record<string, any>, fieldName: string, fieldValue: any) => {
    if (nestedField) {
      return set({ ...formValue }, fieldName, fieldValue);
    }

    return { ...formValue, [fieldName]: fieldValue };
  };

  const handleFieldChange = useEventCallback(
    (name: string, value: any, event: React.SyntheticEvent) => {
      const nextFormValue = setFieldValue(formValue, name, value);

      setFormValue(nextFormValue);
      onChange?.(nextFormValue, event);
    }
  );

  const rootRef = useRef<HTMLFormElement>(null);
  const formContextValue = useMemo(
    () => ({
      getCombinedModel,
      checkTrigger,
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      formError,
      nestedField,
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
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      formError,
      nestedField,
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
  layout: oneOf(['horizontal', 'vertical', 'inline']),
  fluid: PropTypes.bool,
  formValue: PropTypes.object,
  formDefaultValue: PropTypes.object,
  formError: PropTypes.object,
  checkTrigger: oneOf(['change', 'blur', 'none']),
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
