import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface CheckboxProps<V = any> extends StandardProps {
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
  onChange?: (value: V, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** Called when the checkbox or label is clicked. */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Ref of input element */
  inputRef?: React.Ref<any>;

  /** The HTML input value. */
  value?: V;

  /** A checkbox can receive focus. */
  tabIndex?: number;

  checkable?: boolean;

  onCheckboxClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
