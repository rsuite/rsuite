import React from 'react';
import Input, { InputProps } from '../Input';
import InputGroup from '../InputGroup';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom, useControlled, useEventCallback } from '@/internals/hooks';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'plaintext'> {
  /** Controls whether the password is visible */
  visible?: boolean;

  /** Default visibility state of the password */
  defaultVisible?: boolean;

  /** The icon element to display before the input field */
  startIcon?: React.ReactNode;

  /**  The icon element to display after the input field */
  endIcon?: React.ReactNode;

  /** Custom icon for visibility toggle */
  renderVisibilityIcon?: (visible: boolean) => React.ReactNode;

  /** Callback function triggered when the password visibility changes */
  onVisibleChange?: (visible: boolean) => void;
}

const PasswordInput = forwardRef<'input', PasswordInputProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PasswordInput', props);

  const {
    classPrefix = 'password-input',
    className,
    visible: controlVisible,
    size,
    defaultVisible,
    value,
    defaultValue,
    placeholder,
    id,
    name,
    readOnly,
    inputRef,
    startIcon,
    endIcon,
    onChange,
    onVisibleChange,
    renderVisibilityIcon,
    ...rest
  } = propsWithDefaults;
  const { withPrefix, merge } = useStyles(classPrefix);
  const [visible, setVisible] = useControlled(controlVisible, defaultVisible);
  const classes = merge(className, withPrefix());

  const handleToggleVisibility = useEventCallback(() => {
    setVisible(!visible);
    onVisibleChange?.(!visible);
  });

  return (
    <InputGroup inside ref={ref} size={size} className={classes} {...rest}>
      {startIcon && <InputGroup.Addon>{startIcon}</InputGroup.Addon>}

      <Input
        type={visible ? 'text' : 'password'}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
        readOnly={readOnly}
        name={name}
        id={id}
        inputRef={inputRef}
      />

      {endIcon ? (
        <InputGroup.Addon>{endIcon}</InputGroup.Addon>
      ) : (
        <InputGroup.Button
          tabIndex={-1}
          onClick={handleToggleVisibility}
          aria-label="Toggle password visibility"
        >
          {renderVisibilityIcon?.(visible ?? false) ||
            (visible ? <EyeCloseIcon /> : <VisibleIcon />)}
        </InputGroup.Button>
      )}
    </InputGroup>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
