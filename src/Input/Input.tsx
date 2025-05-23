import React, { useContext } from 'react';
import InputBase, { InputBaseCommonProps } from '@/internals/InputBase';
import { forwardRef } from '@/internals/utils';
import { InputGroupContext } from '../InputGroup';
import { useCustom } from '@/internals/hooks';
import { PrependParameters } from '@/internals/types/utils';
import type {
  SanitizedInputProps,
  PropsWithoutChange,
  FormControlBaseProps
} from '@/internals/types';

export interface InputProps
  extends InputBaseCommonProps,
    SanitizedInputProps,
    PropsWithoutChange<FormControlBaseProps> {
  /** The HTML input type */
  type?: string;

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
  const inputGroup = useContext(InputGroupContext);
  const {
    type = 'text',
    htmlSize,
    size = inputGroup?.size || 'md',
    classPrefix = 'input',
    ...rest
  } = propsWithDefaults;

  return (
    <InputBase
      as="input"
      ref={ref}
      classPrefix={classPrefix}
      size={size}
      type={type}
      inputProps={{ size: htmlSize }}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
