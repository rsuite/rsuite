import React, { useContext } from 'react';
import Plaintext from '@/internals/Plaintext';
import { forwardRef } from '@/internals/utils';
import { useFormGroup } from '../FormGroup';
import { InputGroupContext } from '../InputGroup/InputGroup';
import { KEY_VALUES } from '@/internals/constants';
import { useClassNames } from '@/internals/hooks';
import { createChainedFunction, mergeRefs } from '@/internals/utils';
import { PrependParameters } from '@/internals/types/utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, FormControlBaseProps, SizeType } from '@/internals/types';

export interface LocaleType {
  unfilled: string;
}

export interface InputProps
  extends WithAsProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>,
    Omit<FormControlBaseProps, 'onChange'> {
  /** The HTML input type */
  type?: string;

  /** The HTML input id */
  id?: string;

  /** A component can have different sizes */
  size?: SizeType;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /**
   * The htmlSize attribute defines the width of the <input> element.
   *
   * @see MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
   * @version 5.49.0
   */
  htmlSize?: number;

  /**
   * The callback function in which value is changed.
   */
  onChange?: PrependParameters<React.ChangeEventHandler<HTMLInputElement>, [value: string]>;

  /** Called on press enter */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

/**
 * The `<Input>` component is used to get user input in a text field.
 *
 * @see https://rsuitejs.com/components/input
 */
const Input = forwardRef<'input', InputProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Input', props);
  const {
    className,
    classPrefix = 'input',
    as: Component = 'input',
    type = 'text',
    disabled,
    value,
    defaultValue,
    inputRef,
    id,
    size,
    htmlSize,
    plaintext,
    placeholder,
    readOnly,
    onPressEnter,
    onFocus,
    onBlur,
    onKeyDown,
    onChange,
    ...rest
  } = propsWithDefaults;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_VALUES.ENTER) {
      onPressEnter?.(event);
    }
    onKeyDown?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target?.value, event);
  };

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { plaintext }));
  const inputGroupContext = useContext(InputGroupContext);
  const { controlId } = useFormGroup();

  // Make the Input component display in plain text,
  // and display default characters when there is no value.
  if (plaintext) {
    return (
      <Plaintext ref={ref} localeKey="unfilled" placeholder={placeholder}>
        {typeof value === 'undefined' ? defaultValue : value}
      </Plaintext>
    );
  }

  const inputable = !disabled && !readOnly;
  const eventProps: React.HTMLAttributes<HTMLInputElement> = {};

  if (inputable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
    eventProps.onFocus = createChainedFunction(onFocus, inputGroupContext?.onFocus);
    eventProps.onBlur = createChainedFunction(onBlur, inputGroupContext?.onBlur);
  }

  return (
    <Component
      {...rest}
      {...eventProps}
      ref={mergeRefs(ref, inputRef)}
      className={classes}
      type={type}
      id={id || controlId}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      size={htmlSize}
      placeholder={placeholder}
    />
  );
});

Input.displayName = 'Input';

export default Input;
