import React, { useContext } from 'react';
import Plaintext from '@/internals/Plaintext';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeRefs, createChainedFunction } from '@/internals/utils';
import { useFormGroup } from '../../FormGroup';
import { InputGroupContext } from '../../InputGroup';
import { KEY_VALUES } from '@/internals/constants';
import { useStyles } from '@/internals/hooks';
import { PrependParameters } from '@/internals/types/utils';
import type { PropsWithoutChange, FormControlBaseProps, Size } from '@/internals/types';

export interface InputBaseLocaleType {
  unfilled: string;
}

export interface InputBaseCommonProps extends BoxProps, PropsWithoutChange<FormControlBaseProps> {
  /** A component can have different sizes */
  size?: Size;

  /** The HTML input id */
  id?: string;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /** Is plaintext display mode */
  plaintext?: boolean;

  /** Input placeholder text */
  placeholder?: string;
}

export interface InputBaseProps extends InputBaseCommonProps {
  /** Component element type */
  as?: React.ElementType;

  /** Class prefix for component */
  classPrefix?: string;

  /** HTML input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  /** Event handler for focus event */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Event handler for blur event */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Event handler for keydown event */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Input specific props like handling enter key for Input */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** The callback function in which value is changed. */
  onChange?: PrependParameters<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    [value: string]
  >;
}

/**
 * The `InputBase` component serves as the base for both Input and Textarea components.
 * It provides common functionality for both components.
 */
const InputBase = forwardRef<'input' | 'textarea', InputBaseProps>((props, ref) => {
  const {
    as,
    className,
    classPrefix,
    disabled,
    value,
    defaultValue,
    inputRef,
    id,
    size,
    plaintext,
    placeholder,
    readOnly,
    inputProps,
    onPressEnter,
    onFocus,
    onBlur,
    onKeyDown,
    onChange,
    ...rest
  } = props;

  const inputGroup = useContext(InputGroupContext);
  const { controlId } = useFormGroup();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === KEY_VALUES.ENTER) {
      onPressEnter?.(event);
    }
    onKeyDown?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(event.target?.value, event);
  };

  const { withPrefix, merge } = useStyles(classPrefix || 'input');
  const classes = merge(className, withPrefix(size, { plaintext }));

  // Make the component display in plain text,
  // and display default characters when there is no value.
  if (plaintext) {
    return (
      <Plaintext ref={ref} localeKey="unfilled" placeholder={placeholder}>
        {typeof value === 'undefined' ? defaultValue : value}
      </Plaintext>
    );
  }

  const inputable = !disabled && !readOnly;
  const eventProps: React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> = {};

  if (inputable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
    eventProps.onFocus = createChainedFunction(onFocus, inputGroup?.onFocus);
    eventProps.onBlur = createChainedFunction(onBlur, inputGroup?.onBlur);
  }

  return (
    <Box
      as={as}
      ref={mergeRefs(ref, inputRef)}
      className={classes}
      id={id || controlId}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      {...inputProps}
      {...eventProps}
      {...rest}
    />
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
