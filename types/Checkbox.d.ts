import * as React from 'react';

import { StandardProps } from './index';

export interface CheckboxProps extends StandardProps {
  /** HTML title */
  title?: string;

  /** Inline layout */
  inline?: boolean;

  /** A checkbox can appear disabled and be unable to change states */
  disabled?: boolean;

  /** Whether or not checkbox is checked. */
  checked?: boolean;

  /** The initial value of checked. */
  defaultChecked?: boolean;

  /** Whether or not checkbox is indeterminate. */
  indeterminate?: boolean;

  /** Called when the user attempts to change the checked state. */
  onChange?: (value: any, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** Called when the checkbox or label is clicked. */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /** The HTML input value. */
  value?: any;

  /** A checkbox can receive focus. */
  tabIndex?: number;
}

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
