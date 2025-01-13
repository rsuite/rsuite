import React, { FormHTMLAttributes } from 'react';
import FormControl, { FormControlComponent } from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import useSchemaModel from './hooks/useSchemaModel';
import useFormValidate from './hooks/useFormValidate';
import useFormValue from './hooks/useFormValue';
import useFormClassNames from './hooks/useFormClassNames';
import useFormRef, { FormInstance, FormImperativeMethods } from './hooks/useFormRef';
import { forwardRef } from '@/internals/utils';
import { Schema, SchemaModel } from 'schema-typed';
import { useEventCallback } from '@/internals/hooks';
import { FormValueProvider, FormProvider } from './FormContext';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, CheckTriggerType } from '@/internals/types';

export interface FormProps<V = Record<string, any>, M = any, E = { [P in keyof V]?: M }>
  extends WithAsProps,
    Omit<FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit' | 'onError' | 'onReset'> {
  /**
   * Set the left and right columns of the layout of the elements within the form。
   *
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /**
   * The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts.
   */
  fluid?: boolean;

  /**
   * Current value of the input. Creates a controlled component
   */
  formValue?: V | null;

  /**
   * Initial value
   */
  formDefaultValue?: V | null;

  /**
   * Error message of form
   */
  formError?: E | null;

  /**
   * Trigger the type of form validation.
   *
   * @default 'change'
   */
  checkTrigger?: CheckTriggerType;

  /**
   * SchemaModel object
   *
   * @see https://github.com/rsuite/schema-typed
   */
  model?: Schema;

  /**
   * Make the form readonly
   */
  readOnly?: boolean;

  /**
   * Render the form as plain text
   */
  plaintext?: boolean;

  /**
   * Disable the form
   */
  disabled?: boolean;

  /**
   * The error message comes from context
   */
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

  /**
   * Callback fired when data changing
   */
  onChange?: (formValue: V, event?: React.SyntheticEvent) => void;

  /**
   * Callback fired when error checking
   */
  onError?: (formError: E) => void;

  /**
   * Callback fired when data cheking
   */
  onCheck?: (formError: E) => void;

  /**
   * Callback fired when form submit，only when the form data is validated will trigger
   */
  onSubmit?: (formValue: V | null, event?: React.FormEvent<HTMLFormElement>) => void;

  /**
   * Callback fired when form reset
   */
  onReset?: (formValue: V | null, event?: React.FormEvent<HTMLFormElement>) => void;
}

const defaultSchema = SchemaModel({});

const Subcomponents = {
  Control: FormControl as FormControlComponent,
  ControlLabel: FormControlLabel,
  ErrorMessage: FormErrorMessage,
  Group: FormGroup,
  HelpText: FormHelpText
};

/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
const Form = forwardRef<
  'form',
  FormProps & { ref?: React.Ref<FormInstance> },
  typeof Subcomponents
>((props, ref) => {
  const { propsWithDefaults } = useCustom('Form', props);
  const {
    checkTrigger = 'change',
    classPrefix = 'form',
    errorFromContext = true,
    formDefaultValue = {},
    formValue: controlledFormValue,
    formError: controlledFormError,
    fluid,
    nestedField = false,
    layout = 'vertical',
    model: formModel = defaultSchema,
    readOnly,
    plaintext,
    className,
    children,
    disabled,
    onSubmit,
    onReset,
    onCheck,
    onError,
    onChange,
    ...rest
  } = propsWithDefaults;

  const { getCombinedModel, pushFieldRule, removeFieldRule } = useSchemaModel(
    formModel,
    nestedField
  );
  const { formValue, onRemoveValue, setFieldValue, resetFormValue } = useFormValue(
    controlledFormValue,
    { formDefaultValue, nestedField }
  );

  const formValidateProps = {
    formValue,
    getCombinedModel,
    onCheck,
    onError,
    nestedField
  };

  const {
    formError,
    onRemoveError,
    check,
    checkAsync,
    checkForField,
    checkFieldForNextValue,
    checkForFieldAsync,
    checkFieldAsyncForNextValue,
    cleanErrors,
    resetErrors,
    cleanErrorForField
  } = useFormValidate(controlledFormError, formValidateProps);

  const classes = useFormClassNames({
    classPrefix,
    className,
    fluid,
    layout,
    readOnly,
    plaintext,
    disabled
  });

  const submit = useEventCallback((event?: React.FormEvent<HTMLFormElement>) => {
    // Check the form before submitting
    if (check()) {
      onSubmit?.(formValue, event);
    }
  });

  const reset = useEventCallback((event?: React.FormEvent<HTMLFormElement>) => {
    resetErrors();
    onReset?.(resetFormValue(), event);
  });

  const handleSubmit = useEventCallback((event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    // Prevent submission when the form is disabled, readOnly, or plaintext
    if (disabled || readOnly || plaintext) {
      return;
    }

    submit(event);
  });

  const handleReset = useEventCallback((event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    // Prevent reset when the form is disabled, readOnly, or plaintext
    if (disabled || readOnly || plaintext) {
      return;
    }

    reset(event);
  });

  const imperativeMethods: FormImperativeMethods = {
    check,
    checkForField,
    checkAsync,
    checkForFieldAsync,
    cleanErrors,
    cleanErrorForField,
    reset,
    resetErrors,
    submit
  };

  const formRef = useFormRef(ref, { imperativeMethods });

  const removeFieldValue = useEventCallback((name: string) => {
    const formValue = onRemoveValue(name);
    onChange?.(formValue);
  });

  const removeFieldError = useEventCallback((name: string) => {
    onRemoveError(name);
  });

  const onFieldChange = useEventCallback(
    (name: string, value: any, event: React.SyntheticEvent) => {
      const nextFormValue = setFieldValue(name, value);
      onChange?.(nextFormValue, event);
    }
  );

  const formContextValue = {
    errorFromContext,
    checkTrigger,
    plaintext,
    readOnly,
    disabled,
    formError,
    nestedField,
    pushFieldRule,
    removeFieldValue,
    removeFieldError,
    removeFieldRule,
    onFieldChange,
    checkFieldForNextValue,
    checkFieldAsyncForNextValue
  };

  return (
    <form {...rest} ref={formRef} onSubmit={handleSubmit} onReset={handleReset} className={classes}>
      <FormProvider value={formContextValue}>
        <FormValueProvider value={formValue}>{children}</FormValueProvider>
      </FormProvider>
    </form>
  );
}, Subcomponents);

Form.displayName = 'Form';

export default Form;
