import React, { type ReactNode, useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import Input from '../Input';
import FormErrorMessage from '../FormErrorMessage';
import { useClassNames } from '../utils';
import { TypeAttributes, FormControlBaseProps, WithAsProps } from '../@types/common';
import FormContext, { FormValueContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { useWillUnmount, useEventCallback } from '../utils';
import { oneOf } from '../internals/propTypes';
import { useRegisterModel } from './useRegisterModel';
import { useRegisterDependencies } from './useRegisterDependencies';
import type { CheckType } from 'schema-typed';
import Toggle from '../Toggle';

/**
 * Props that FormControl passes to its accepter
 */
export type FormControlAccepterProps<ValueType = any> = FormControlBaseProps<ValueType>;

export interface FormControlProps<P = any, ValueType = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLFormElement>, 'value' | 'onChange'> {
  /** Proxied components */
  accepter?: React.ElementType<P & FormControlBaseProps<ValueType>>;

  /**
   * The name of form-control, support nested path. such as `address.city`.
   * The path will be used to get and set form values.
   *
   * @example
   * ```js
   * <Form formValue={{ address: { city: 'Shanghai' } }}>
   *   <FormControl name="address.city" />
   * </Form>
   * ```
   **/
  name: string;

  /** Value */
  value?: ValueType;

  /** Callback fired when data changing */
  onChange?(value: ValueType, event: React.SyntheticEvent): void;

  /** The data validation trigger type, and it wiill overrides the setting on <Form> */
  checkTrigger?: TypeAttributes.CheckTrigger;

  /** Show error messages */
  errorMessage?: React.ReactNode;

  /** The placement of error messages */
  errorPlacement?: TypeAttributes.Placement8;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Disable the form control. */
  disabled?: boolean;

  /** Asynchronous check value */
  checkAsync?: boolean;

  /** Remove field value and error message when component is unmounted  */
  shouldResetWithUnmount?: boolean;

  /** Validation rule */
  rule?: CheckType<unknown, any>;

  /**
   * The dependent fields for the check.
   * @version 5.50.0
   */
  ruleDependencies?: string[];
}

interface FormControlComponent extends React.FC<FormControlProps> {
  <Accepter extends React.ElementType = typeof Input>(
    props: FormControlProps & { accepter?: Accepter } & React.ComponentPropsWithRef<Accepter>
  ): React.ReactElement | null;
}

/**
 * The `<Form.Control>` component is used to wrap the components that need to be validated.
 * @see https://rsuitejs.com/components/form/
 */
const FormControl: FormControlComponent = React.forwardRef((props: FormControlProps, ref) => {
  const {
    readOnly: readOnlyContext,
    plaintext: plaintextContext,
    disabled: disabledContext,
    errorFromContext,
    formError,
    nestedField,
    removeFieldValue,
    removeFieldError,
    pushFieldRule,
    removeFieldRule,
    onFieldChange,
    getCombinedModel,
    pushDependencies,
    removeDependencies,
    getShouldValidateFieldNames,
    onErrorChange,
    checkTrigger: contextCheckTrigger
  } = useContext(FormContext);

  const {
    as: Component = 'div',
    accepter: AccepterComponent = Input,
    classPrefix = 'form-control',
    checkAsync,
    checkTrigger,
    errorPlacement = 'bottomStart',
    errorMessage,
    name,
    value,
    readOnly = readOnlyContext,
    plaintext = plaintextContext,
    disabled = disabledContext,
    onChange,
    onBlur,
    defaultValue,
    shouldResetWithUnmount = false,
    rule,
    ruleDependencies,
    ...rest
  } = props;

  const { controlId } = useContext(FormGroupContext);

  if (!onFieldChange) {
    throw new Error(`
      <FormControl> must be inside a component decorated with <Form>.
      And need to update React to 16.6.0 +.
    `);
  }

  useRegisterModel(name, pushFieldRule, removeFieldRule, rule);
  useRegisterDependencies(name, pushDependencies, removeDependencies, ruleDependencies);

  useWillUnmount(() => {
    if (shouldResetWithUnmount) {
      removeFieldValue?.(name);
      removeFieldError?.(name);
    }
  });

  const trigger = checkTrigger || contextCheckTrigger;
  const formValue = useContext(FormValueContext);

  const getFieldValue = (fieldName: string) => {
    if (!isUndefined(value)) {
      return value;
    }

    return nestedField ? get(formValue, fieldName) : formValue?.[name];
  };

  const setFieldValue = (fieldName: string, fieldValue: any) => {
    if (nestedField) {
      return set({ ...formValue }, fieldName, fieldValue);
    }

    return { ...formValue, [fieldName]: fieldValue };
  };

  const getFieldError = (fieldName: string) => {
    if (nestedField) {
      const name = fieldName.includes('.')
        ? fieldName.replace('.', '.object.') + '.errorMessage'
        : fieldName;

      return get(formError, name);
    }

    return formError?.[fieldName];
  };

  const getFieldCheckName = (fieldName: string) => {
    if (nestedField) {
      return fieldName.split('.')[0];
    }
    return fieldName;
  };

  const fieldValue = getFieldValue(name);

  const { withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = withClassPrefix('wrapper');

  const handleFieldChange = useEventCallback((value: any, event: React.SyntheticEvent) => {
    trigger === 'change' && handleFieldCheck(value);
    onFieldChange?.(name, value, event);
    onChange?.(value, event);
  });

  const handleFieldBlur = useEventCallback((event: React.FocusEvent<HTMLFormElement>) => {
    trigger === 'blur' && handleFieldCheck(fieldValue);
    onBlur?.(event);
  });

  const handleFieldCheck = useEventCallback((value: any) => {
    const checkFieldNames = [...getShouldValidateFieldNames(name), name].map(getFieldCheckName);
    const nextFormValue = setFieldValue(name, value);
    const model = getCombinedModel();

    const checkedCallback = (checkedErrors: Record<string, ReactNode>) => {
      const nextError = {
        ...omit(formError, checkFieldNames),
        ...checkedErrors
      };
      onErrorChange(nextError);
    };

    if (checkAsync) {
      Promise.all(
        checkFieldNames.map(checkFieldName =>
          model?.checkForFieldAsync(checkFieldName, nextFormValue)
        )
      ).then(checkResults => {
        const checkedErrors = checkResults.reduce((acc, checkResult, index) => {
          if (checkResult.hasError) {
            acc[checkFieldNames[index]] = checkResult.errorMessage || checkResult;
          }
          return acc;
        }, {} as Record<string, ReactNode>);

        checkedCallback(checkedErrors);
      });
    } else {
      const checkedErrors = checkFieldNames.reduce((acc, checkFieldName) => {
        const checkResult = model?.checkForField(checkFieldName, nextFormValue);
        if (checkResult.hasError) {
          acc[checkFieldName] = checkResult.errorMessage || checkResult;
        }
        return acc;
      }, {} as Record<string, ReactNode>);
      checkedCallback(checkedErrors);
    }
  });

  let messageNode: React.ReactNode | null = null;

  if (!isUndefined(errorMessage)) {
    messageNode = errorMessage;
  } else if (errorFromContext) {
    const fieldError = getFieldError(name);

    if (
      typeof fieldError === 'string' ||
      (!fieldError?.array && !fieldError?.object && fieldError?.hasError)
    ) {
      messageNode = fieldError;
    }
  }

  const ariaDescribedby = controlId ? `${controlId}-help-text` : null;

  const fieldHasError = Boolean(messageNode);
  const ariaErrormessage = fieldHasError && controlId ? `${controlId}-error-message` : undefined;

  let valueKey = 'value';

  // Toggle component is a special case that uses `checked` and `defaultChecked` instead of `value` and `defaultValue` props.
  if (AccepterComponent === Toggle) {
    valueKey = 'checked';
  }

  const accepterProps = {
    // need to distinguish between undefined and null
    [valueKey]: fieldValue === undefined ? defaultValue : fieldValue
  };

  return (
    <Component className={classes} ref={ref} data-testid="form-control-wrapper">
      <AccepterComponent
        id={controlId}
        aria-labelledby={controlId ? `${controlId}-control-label` : null}
        aria-describedby={ariaDescribedby}
        aria-invalid={fieldHasError || undefined}
        aria-errormessage={ariaErrormessage}
        {...accepterProps}
        {...rest}
        readOnly={readOnly}
        plaintext={plaintext}
        disabled={disabled}
        name={name}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />

      <FormErrorMessage
        id={controlId ? `${controlId}-error-message` : undefined}
        role="alert"
        aria-relevant="all"
        show={!!messageNode}
        className={prefix`message-wrapper`}
        placement={errorPlacement}
      >
        {messageNode}
      </FormErrorMessage>
    </Component>
  );
});

FormControl.displayName = 'FormControl';
FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  checkTrigger: oneOf(['change', 'blur', 'none']),
  checkAsync: PropTypes.bool,
  accepter: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  classPrefix: PropTypes.string,
  errorMessage: PropTypes.node,
  errorPlacement: oneOf([
    'bottomStart',
    'bottomEnd',
    'topStart',
    'topEnd',
    'leftStart',
    'rightStart',
    'leftEnd',
    'rightEnd'
  ]),
  value: PropTypes.any
};

export default FormControl;
