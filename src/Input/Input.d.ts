import * as React from 'react';

import { StandardProps, FormControlBaseProps } from '../@types/common';

export interface InputProps extends StandardProps, FormControlBaseProps<string> {
  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

  /** The HTML input type */
  type?: string;

  /** The HTML input id */
  id?: string;

  /** An Input field can show that it is disabled */
  disabled?: boolean;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /** Called on press enter */
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

declare const Input: React.ComponentType<InputProps>;

export default Input;
