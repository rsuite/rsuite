import React, { useCallback, useContext } from 'react';
import { FormValueContext, useFormContext } from '../Form/FormContext';
import { useWillUnmount, useEventCallback } from '@/internals/hooks';
import useRegisterModel from './hooks/useRegisterModel';
import useField from './hooks/useField';
import type { CheckType } from 'schema-typed';
import type { CheckTriggerType } from '@/internals/types';

export interface UseFormControlProps {
  /** The name of form field */
  name: string;
  /** The current value (controlled) */
  value?: any;
  /** The data validation trigger type */
  checkTrigger?: CheckTriggerType;
  /** Show error messages */
  errorMessage?: React.ReactNode;
  /** Asynchronous check value */
  checkAsync?: boolean;
  /** Remove field value and error message when component is unmounted */
  shouldResetWithUnmount?: boolean;
  /** Validation rule */
  rule?: CheckType<unknown, any>;
}

/**
 * Hook for accessing form control functionality.
 * Must be used within a Form component.
 *
 * @param props The form control properties
 * @returns Form control functionality for the specified field
 */
export function useFormControl(props: UseFormControlProps) {
  const {
    name,
    value: controlledValue,
    checkTrigger,
    errorMessage,
    checkAsync = false,
    shouldResetWithUnmount = false,
    rule
  } = props;

  const {
    readOnly,
    plaintext,
    disabled,
    errorFromContext,
    formError,
    nestedField,
    onFieldChange,
    removeFieldValue,
    removeFieldError,
    checkTrigger: contextCheckTrigger,
    checkFieldForNextValue,
    checkFieldAsyncForNextValue
  } = useFormContext();

  // Throw an error if not used within a Form component
  if (!onFieldChange) {
    throw new Error(`
      <useFormControl> must be used inside a component decorated with <Form>.
      And need to update React to 16.6.0 +.
    `);
  }

  const formValue = useContext(FormValueContext);

  // Register form field model
  useRegisterModel(name, rule);

  // Cleanup on unmount if shouldResetWithUnmount is true
  useWillUnmount(() => {
    if (shouldResetWithUnmount) {
      removeFieldValue?.(name);
      removeFieldError?.(name);
    }
  });

  // Use the useField hook to handle field value and error
  const {
    fieldValue: value,
    fieldError: error,
    setFieldValue
  } = useField({
    name,
    errorMessage,
    formValue,
    formError,
    value: controlledValue,
    nestedField,
    errorFromContext
  });

  const trigger = checkTrigger || contextCheckTrigger;

  // Handler for field check (validation)
  const onCheck = useEventCallback((value: any) => {
    // Don't perform validation when checkTrigger is null
    if (trigger === null) {
      return;
    }

    const nextFormValue = setFieldValue(name, value);
    if (checkAsync) {
      checkFieldAsyncForNextValue?.(name, nextFormValue);
    } else {
      checkFieldForNextValue?.(name, nextFormValue);
    }
  });

  // Handler for field change
  const onChange = useEventCallback((value: any, event: React.SyntheticEvent) => {
    if (trigger === 'change') {
      onCheck(value);
    }
    onFieldChange?.(name, value, event);
  });

  // Handler for field blur
  const onBlur = useEventCallback(() => {
    if (trigger === 'blur') {
      onCheck(value);
    }
  });

  /**
   * Directly sets the field value without triggering validation or onChange events.
   * Useful for programmatically updating field values.
   * @param value The new value to set
   * @param shouldValidate Whether to trigger validation (defaults to false)
   */
  const setValue = useCallback(
    (value: any, shouldValidate = false) => {
      const nextFormValue = setFieldValue(name, value);

      onFieldChange?.(name, value);

      if (shouldValidate && trigger !== null) {
        if (checkAsync) {
          checkFieldAsyncForNextValue?.(name, nextFormValue);
        } else {
          checkFieldForNextValue?.(name, nextFormValue);
        }
      }
    },
    [name, setFieldValue, trigger, checkAsync, checkFieldAsyncForNextValue, checkFieldForNextValue]
  );

  return {
    value,
    error,
    plaintext,
    readOnly,
    disabled,
    checkTrigger,
    onChange,
    onCheck,
    onBlur,
    setValue
  };
}

export default useFormControl;
