import * as React from 'react';

import { StandardProps, TypeAttributes } from './index';

export interface InputNumberProps extends StandardProps {
  /** Button can have different appearances */
  buttonAppearance?: TypeAttributes.Appearance;

  /** An input can show that it is disabled */
  disabled?: boolean;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** The value of each step. can be decimal */
  step?: number;

  /** Current value of the input. Creates a controlled component */
  value?: number | string;

  /** Initial value */
  defaultValue?: number | string;

  /** Sets the element displayed to the left of the component */
  prefix?: React.ReactNode;

  /** Sets the element displayed on the right side of the component */
  postfix?: React.ReactNode;

  /** An Input can have different sizes */
  size?: TypeAttributes.Size;

  /** The callback function when value changes */
  onChange?: (value: any, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const InputNumber: React.ComponentType<InputNumberProps>;

export default InputNumber;
