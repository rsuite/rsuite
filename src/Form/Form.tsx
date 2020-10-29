import React, { useMemo, useCallback, useState, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import { Schema, SchemaModel } from 'schema-typed';
import { CheckResult } from 'schema-typed/types/Type';
import { useClassNames } from '../utils';
import FormContext, { FormValueContext } from './FormContext';
import FormControl from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';

export interface FormProps<
  T = Record<string, any>,
  errorMsgType = string,
  E = { [P in keyof T]?: errorMsgType }
>
  extends WithAsProps,
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
  onChange?: (formValue: T, event: React.SyntheticEvent<HTMLElement>) => void;

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
  root: React.FormHTMLAttributes<HTMLFormElement>;

  /** Verify form data */
  check?: (callback?: (formError: E) => void) => boolean;

  /** Asynchronously check form data */
  checkAsync?: () => Promise<any>;

  /** Check the data field */
  checkForField?: (
    fieldName: keyof T,
    callback?: (checkResult: CheckResult<errorMsg>) => void
  ) => boolean;

  /** Asynchronous verification as a data field */
  checkForFieldAsync?: (fieldName: keyof T) => Promise<CheckResult>;

  /** Clear all error messages */
  cleanErrors?: (callback?: () => void) => void;

  /** Clear the error message of the specified field */
  cleanErrorForField?: (fieldName: keyof E, callback?: () => void) => void;

  /** All error messages are reset, and an initial value can be set */
  resetErrors?: (formError: E, callback?: () => void) => void;
}

export interface FormComponent
  extends RsRefForwardingComponent<'form', FormProps & { ref?: React.Ref<FormInstance> }> {
  Control?: typeof FormControl;
  ControlLabel?: typeof FormControlLabel;
  ErrorMessage?: typeof FormErrorMessage;
  Group?: typeof FormGroup;
  HelpText?: typeof FormHelpText;
}

const defaultProps: Partial<FormProps> = {
  checkTrigger: 'change',
  classPrefix: 'form',
  errorFromContext: true,
  formDefaultValue: {},
  layout: 'vertical',
  model: SchemaModel({})
};

const Form: FormComponent = React.forwardRef((props: FormProps, ref) => {
  const {
    checkTrigger,
    classPrefix,
    errorFromContext,
    formDefaultValue,
    formValue,
    formError,
    fluid,
    layout,
    model,
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(layout, fluid && layout === 'vertical' ? 'fluid' : 'fixed-width', {
      readonly: readOnly,
      disabled,
      plaintext
    })
  );
  const [_formValue, setFormValue] = useState(formDefaultValue);
  const [_formError, setFormError] = useState(formError || {});

  const getFormValue = useCallback(() => {
    return isUndefined(formValue) ? _formValue : formValue;
  }, [_formValue, formValue]);

  const getFormError = useCallback(() => {
    return isUndefined(formError) ? _formError : formError;
  }, [formError, _formError]);

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  const check = useCallback(
    (callback?: (formError: any) => void) => {
      const formValue = getFormValue() || {};
      const formError = {};
      let errorCount = 0;

      Object.keys(model.schema).forEach(key => {
        const checkResult = model.checkForField(key, formValue[key], formValue);
        if (checkResult.hasError === true) {
          errorCount += 1;
          formError[key] = checkResult.errorMessage;
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
    [onCheck, onError, model, getFormValue]
  );

  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  const checkForField = useCallback(
    (fieldName: string, callback?: (checkResult: any) => void) => {
      const formValue = getFormValue() || {};
      const checkResult = model.checkForField(fieldName, formValue[fieldName], formValue);

      const formError = {
        ...getFormError(),
        [fieldName]: checkResult.errorMessage
      };

      setFormError(formError);
      onCheck?.(formError);
      callback?.(checkResult);

      if (checkResult.hasError) {
        onError?.(formError);
      }

      return !checkResult.hasError;
    },
    [model, getFormValue, getFormError, onCheck, onError]
  );

  /**
   * Check form data asynchronously and return a Promise
   */
  const checkAsync = useCallback(() => {
    const formValue = getFormValue() || {};
    const promises = [];
    const keys = [];

    Object.keys(model.schema).forEach(key => {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue[key], formValue));
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
  }, [model, getFormValue, onCheck, onError]);

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  const checkForFieldAsync = useCallback(
    (fieldName: string) => {
      const formValue = getFormValue() || {};
      return model
        .checkForFieldAsync(fieldName, formValue[fieldName], formValue)
        .then(checkResult => {
          const formError = { ...getFormError(), [fieldName]: checkResult.errorMessage };

          onCheck?.(formError);
          setFormError(formError);

          if (checkResult.hasError) {
            onError?.(formError);
          }

          return checkResult;
        });
    },
    [model, getFormValue, getFormError, onCheck, onError]
  );

  const cleanErrors = useCallback(() => {
    setFormError({});
  }, []);

  const cleanErrorForField = useCallback(
    (fieldName: string) => {
      setFormError(omit(_formError, [fieldName]));
    },
    [_formError]
  );

  const resetErrors = useCallback((formError: any = {}) => {
    setFormError(formError);
  }, []);

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
    (name: string, errorMessage: string) => {
      const formError = {
        ...getFormError(),
        [name]: errorMessage
      };
      setFormError(formError);
      onError?.(formError);
      onCheck?.(formError);
    },
    [onError, onCheck, getFormError]
  );

  const handleFieldSuccess = useCallback(
    (name: string) => {
      const formError = omit(getFormError(), [name]);
      setFormError(formError);
      onCheck?.(formError);
    },
    [onCheck, getFormError]
  );

  const handleFieldChange = useCallback(
    (name: string, value: any, event: React.SyntheticEvent<any>) => {
      const formValue = getFormValue();
      const nextFormValue = {
        ...formValue,
        [name]: value
      };
      setFormValue(nextFormValue);
      onChange?.(nextFormValue, event);
    },
    [onChange, getFormValue]
  );

  const rootRef = useRef();
  const formContextValue = useMemo(
    () => ({
      model,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      formError: getFormError(),
      onFieldChange: handleFieldChange,
      onFieldError: handleFieldError,
      onFieldSuccess: handleFieldSuccess
    }),
    [
      model,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      readOnly,
      plaintext,
      disabled,
      getFormError,
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
});

Form.Control = FormControl;
Form.ControlLabel = FormControlLabel;
Form.ErrorMessage = FormErrorMessage;
Form.Group = FormGroup;
Form.HelpText = FormHelpText;
Form.Control = FormControl;

Form.displayName = 'Form';
Form.defaultProps = defaultProps;
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
