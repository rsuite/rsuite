import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { createChainedFunction, refType, mergeRefs, useClassNames } from '../utils';
import { FormPlaintextContext } from '../Form/FormContext';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';
import { StandardProps, TypeAttributes, FormControlBaseProps } from '../@types/common';
import { KEY_CODE } from '../constants';

export interface InputLocale {
  emptyPlaintext: string;
}

export interface InputProps
  extends StandardProps,
    Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>, 'size'>,
    FormControlBaseProps<string | number | ReadonlyArray<string>> {
  /** The HTML input type */
  type?: string;

  /** The HTML input id */
  id?: string;

  /** A component can have different sizes */
  size?: TypeAttributes.Size;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /** Called on press enter */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;

  /** Language configuration */
  locale?: InputLocale;
}

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    className,
    classPrefix = 'input',
    as: Component = 'input',
    locale = { emptyPlaintext: 'Unfilled' },
    type = 'text',
    disabled,
    value,
    defaultValue,
    inputRef,
    id,
    size,
    plaintext,
    readOnly,
    onFocus,
    onBlur,
    onPressEnter,
    onKeyDown,
    onChange,
    ...rest
  } = props;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === KEY_CODE.ENTER) {
        onPressEnter?.(event);
      }
      onKeyDown?.(event);
    },
    [onPressEnter, onKeyDown]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target?.value, event);
    },
    [onChange]
  );

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size));
  const inputGroupContext = useContext(InputGroupContext);
  const formGroupContext = useContext(FormGroupContext);
  const formPlaintextContext = useContext(FormPlaintextContext);

  // Make the Input component display in plain text,
  // and display default characters when there is no value.
  if (plaintext || formPlaintextContext?.plaintext) {
    const val = isUndefined(value) ? defaultValue : value;
    return (
      <div {...rest} className={classes}>
        {val || locale?.emptyPlaintext}
      </div>
    );
  }

  return (
    <Component
      {...rest}
      ref={mergeRefs(ref, inputRef)}
      className={classes}
      type={type}
      id={id || formGroupContext?.controlId}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={createChainedFunction(onFocus, inputGroupContext?.onFocus)}
      onBlur={createChainedFunction(onBlur, inputGroupContext?.onBlur)}
    />
  );
});

Input.displayName = 'Input';
Input.propTypes = {
  type: PropTypes.string,
  as: PropTypes.elementType,
  id: PropTypes.string,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  inputRef: refType,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPressEnter: PropTypes.func
};
export default Input;
