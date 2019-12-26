import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface RadioProps<V = any> extends StandardProps {
  /** HTML title */
  title?: string;

  /** The disable of component */
  disabled?: boolean;

  /** Specifies whether the radio is selected */
  checked?: boolean;

  /** Specifies the initial state: whether or not the radio is selected */
  defaultChecked?: boolean;

  /** Ref for the input element */
  inputRef?: React.Ref<any>;

  /** Value, corresponding to the value of the Radiogroup, to determine whether the */
  value?: V;

  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Callback function with value changed */
  onChange?: (value: V, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
