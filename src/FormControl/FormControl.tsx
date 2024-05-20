import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import type { CheckType } from 'schema-typed';
import Input from '../Input';
import FormErrorMessage from '../FormErrorMessage';
import { useClassNames } from '@/internals/hooks';
import { TypeAttributes, FormControlBaseProps, WithAsProps } from '@/internals/types';
import FormContext, { FormValueContext } from '../Form/FormContext';
import { useFormGroup } from '../FormGroup';
import { useWillUnmount, useEventCallback } from '@/internals/hooks';
import { oneOf } from '@/internals/propTypes';
import useRegisterModel from './hooks/useRegisterModel';
import useField from './hooks/useField';
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
    onFieldChange,
    onFieldError,
    onFieldSuccess,
    getCombinedModel,
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
    id,
    ...rest
  } = props;

  const { controlId, helpTextId, labelId, errorMessageId } = useFormGroup(id);

  if (!onFieldChange) {
    throw new Error(`
      <FormControl> must be inside a component decorated with <Form>.
      And need to update React to 16.6.0 +.
    `);
  }

  useRegisterModel(name, rule);

  useWillUnmount(() => {
    if (shouldResetWithUnmount) {
      removeFieldValue?.(name);
      removeFieldError?.(name);
    }
  });

  const trigger = checkTrigger || contextCheckTrigger;
  const formValue = useContext(FormValueContext);

  const { fieldValue, fieldError, setFieldValue } = useField({
    name,
    errorMessage,
    formValue,
    formError,
    value,
    nestedField,
    errorFromContext
  });

  const { withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = withClassPrefix('wrapper');

  const handleFieldChange = useEventCallback((value: any, event: React.SyntheticEvent) => {
    if (trigger === 'change') {
      handleFieldCheck(value);
    }

    onFieldChange?.(name, value, event);
    onChange?.(value, event);
  });

  const handleFieldBlur = useEventCallback((event: React.FocusEvent<HTMLFormElement>) => {
    if (trigger === 'blur') {
      handleFieldCheck(fieldValue);
    }
    onBlur?.(event);
  });

  const handleFieldCheck = useEventCallback((value: any) => {
    const callbackEvents = checkResult => {
      if (checkResult.hasError) {
        const { errorMessage } = checkResult;
        const fieldError = nestedField ? checkResult : errorMessage || checkResult;

        onFieldError?.(name, fieldError);
      } else {
        onFieldSuccess?.(name);
      }

      return checkResult;
    };

    const nextFormValue = setFieldValue(name, value);
    const model = getCombinedModel();
    const checkOptions = { nestedObject: nestedField };
    if (checkAsync) {
      return model
        ?.checkForFieldAsync(name, nextFormValue, checkOptions)
        .then(checkResult => callbackEvents(checkResult));
    }

    return Promise.resolve(callbackEvents(model?.checkForField(name, nextFormValue, checkOptions)));
  });

  const fieldHasError = Boolean(fieldError);

  // Toggle component is a special case that uses `checked` and `defaultChecked` instead of `value` and `defaultValue` props.
  const valueKey = AccepterComponent === Toggle ? 'checked' : 'value';
  const accepterProps = {
    // need to distinguish between undefined and null
    [valueKey]: fieldValue === undefined ? defaultValue : fieldValue
  };

  return (
    <Component className={classes} ref={ref} data-testid="form-control-wrapper">
      <AccepterComponent
        id={controlId}
        aria-labelledby={labelId}
        aria-describedby={helpTextId}
        aria-invalid={fieldHasError || undefined}
        aria-errormessage={fieldHasError ? errorMessageId : undefined}
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
        id={errorMessageId}
        role="alert"
        aria-relevant="all"
        show={fieldHasError}
        className={prefix`message-wrapper`}
        placement={errorPlacement}
      >
        {fieldError}
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
