import * as React from 'react';

export interface InputNumberProps {
  /** Button can have different appearances */
  buttonAppearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** An input can show that it is disabled */
  disabled?: boolean;

  /** Minimum value */
  min: number;

  /** Maximum value */
  max: number;

  /** The value of each step. can be decimal */
  step: number;

  /** Current value of the input. Creates a controlled component */
  value?: number | string;

  /** Initial value */
  defaultValue?: number | string;

  /** Sets the element displayed to the left of the component */
  prefix?: React.ReactNode;

  /** Sets the element displayed on the right side of the component */
  postfix?: React.ReactNode;

  /** An Input can have different sizes */
  size?: 'lg' | 'md' | 'sm' | 'xs';

  /** The callback function when value changes */
  onChange?: (value: any, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const InputNumber: React.ComponentType<InputNumberProps>;

export default InputNumber;
