import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import Input from '../Input';
import FormErrorMessage from '../FormErrorMessage';
import { useClassNames } from '../utils';
import { TypeAttributes, FormControlBaseProps, WithAsProps } from '../@types/common';
import FormContext, { FormValueContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { useWillUnmount } from '../utils';
import useRegisterModel from './useRegisterModel';
import type { CheckType } from 'schema-typed';

/**
 * Props that FormControl passes to its accepter
 */
export type FormControlAccepterProps<ValueType = any> = FormControlBaseProps<ValueType>;

export interface FormControlProps<P = any, ValueType = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLFormElement>, 'value' | 'onChange'> {
  /** Proxied components */
  accepter?: React.ElementType<P & FormControlBaseProps<ValueType>>;

  /** The name of form-control */
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

const FormControl: FormControlComponent = React.forwardRef((props: FormControlProps, ref) => {
  const {
    readOnly: readOnlyContext,
    plaintext: plaintextContext,
    disabled: disabledContext,
    errorFromContext,
    formDefaultValue = {},
    formError,
    removeFieldValue,
    removeFieldError,
    pushFieldRule,
    removeFieldRule,
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

  useWillUnmount(() => {
    if (shouldResetWithUnmount) {
      removeFieldValue?.(name);
      removeFieldError?.(name);
    }
  });

  const trigger = checkTrigger || contextCheckTrigger;
  const formValue = useContext(FormValueContext);
  const val = isUndefined(value) ? formValue?.[name] : value;

  const { withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = withClassPrefix('wrapper');

  const handleFieldChange = (value: any, event: React.SyntheticEvent) => {
    handleFieldCheck(value, trigger === 'change');
    onFieldChange?.(name, value, event);
    onChange?.(value, event);
  };

  const handleFieldBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    handleFieldCheck(val, trigger === 'blur');
    onBlur?.(event);
  };

  const handleFieldCheck = (value: any, isCheckTrigger: boolean) => {
    const callbackEvents = checkResult => {
      // The relevant event is triggered only when the inspection is allowed.
      if (isCheckTrigger) {
        if (checkResult.hasError) {
          onFieldError?.(name, checkResult?.errorMessage || checkResult);
        } else {
          onFieldSuccess?.(name);
        }
      }
      return checkResult;
    };

    const nextFormValue = { ...formValue, [name]: value };
    const model = getCombinedModel();
    if (checkAsync) {
      return model?.checkForFieldAsync(name, nextFormValue).then(checkResult => {
        return callbackEvents(checkResult);
      });
    }

    return Promise.resolve(callbackEvents(model?.checkForField(name, nextFormValue)));
  };

  let messageNode: React.ReactNode | null = null;

  if (!isUndefined(errorMessage)) {
    messageNode = errorMessage;
  } else if (errorFromContext) {
    const fieldError = formError?.[name];

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

  return (
    <Component className={classes} ref={ref}>
      <AccepterComponent
        id={controlId}
        aria-labelledby={controlId ? `${controlId}-control-label` : null}
        aria-describedby={ariaDescribedby}
        aria-invalid={fieldHasError || undefined}
        aria-errormessage={ariaErrormessage}
        {...rest}
        readOnly={readOnly}
        plaintext={plaintext}
        disabled={disabled}
        name={name}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
        defaultValue={defaultValue ?? formDefaultValue[name]}
        value={val}
      />

      <FormErrorMessage
        id={`${controlId}-error-message`}
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
  checkTrigger: PropTypes.oneOf(['change', 'blur', 'none']),
  checkAsync: PropTypes.bool,
  accepter: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  classPrefix: PropTypes.string,
  errorMessage: PropTypes.node,
  errorPlacement: PropTypes.oneOf([
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
