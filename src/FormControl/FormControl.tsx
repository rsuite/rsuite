import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import Input from '../Input';
import FormErrorMessage from '../FormErrorMessage';
import { useClassNames } from '../utils';
import { TypeAttributes, StandardProps, FormControlBaseProps } from '../@types/common';
import FormContext, { FormValueContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';

/**
 * Props that FormControl passes to its accepter
 */
export type FormControlAccepterProps<ValueType = any> = FormControlBaseProps<ValueType>;

export interface FormControlProps<P = any, ValueType = any>
  extends StandardProps,
    Omit<Omit<React.HTMLAttributes<HTMLFormElement>, 'value'>, 'onChange'> {
  /** Proxied components */
  accepter?: React.ElementType<P & FormControlBaseProps<ValueType>>;

  /** The name of form-control */
  name: string;

  /** Value */
  value?: ValueType;

  /** Callback fired when data changing */
  onChange?(value: ValueType, event: React.SyntheticEvent<HTMLElement>): void;

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

  /** Asynchronous check value */
  checkAsync?: boolean;
}

const FormControl = React.forwardRef((props: FormControlProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    accepter: AccepterComponent = Input,
    classPrefix = 'form-control',
    className,
    checkAsync,
    checkTrigger,
    errorPlacement = 'bottomStart',
    errorMessage,
    name,
    value,
    onChange,
    onBlur,
    ...rest
  } = props;

  const {
    readOnly,
    plaintext,
    errorFromContext,
    formDefaultValue = {},
    formError,
    onFieldChange,
    onFieldError,
    onFieldSuccess,
    model,
    checkTrigger: contextCheckTrigger
  } = useContext(FormContext) || {};

  const { controlId } = useContext(FormGroupContext) || {};

  if (!onFieldChange) {
    throw new Error(`
      <FormControl> must be inside a component decorated with <Form>.
      And need to update React to 16.6.0 +.
    `);
  }

  const trigger = checkTrigger || contextCheckTrigger;
  const formValue = useContext(FormValueContext);
  const val = isUndefined(value) ? formValue?.[name] : value;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix('wrapper'));

  const handleFieldChange = (value: any, event: React.SyntheticEvent<any>) => {
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
          onFieldError?.(name, checkResult.errorMessage);
        } else {
          onFieldSuccess?.(name);
        }
      }
      return checkResult;
    };

    if (checkAsync) {
      return model.checkForFieldAsync(name, value, formValue).then(checkResult => {
        return callbackEvents(checkResult);
      });
    }

    return Promise.resolve(callbackEvents(model.checkForField(name, value, formValue)));
  };

  const renderErrorMessage = () => {
    let messageNode = null;

    if (!isUndefined(errorMessage)) {
      messageNode = errorMessage;
    } else if (errorFromContext) {
      messageNode = formError?.[name];
    }

    if (!messageNode) {
      return null;
    }

    return (
      <FormErrorMessage
        show={!!messageNode}
        className={prefix`message-wrapper`}
        placement={errorPlacement}
      >
        {messageNode}
      </FormErrorMessage>
    );
  };

  return (
    <div className={classes} ref={ref}>
      <AccepterComponent
        {...rest}
        aria-labelledby={controlId ? `${controlId}-control-label` : null}
        aria-describedby={controlId ? `${controlId}-control-label` : null}
        readOnly={readOnly}
        plaintext={plaintext}
        name={name}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
        defaultValue={formDefaultValue[name]}
        value={val}
      />

      {renderErrorMessage()}
    </div>
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
