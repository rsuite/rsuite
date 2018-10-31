import * as React from 'react';
import { StandardProps } from '.';

export interface RadioGroupProps extends StandardProps {
  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Value */
  value?: any;

  /** Default Value */
  defaultValue?: any;

  /** Primary content */
  children?: React.ReactNode;

  /** Callback function with value changed */
  onChange?: (value: any, event: React.SyntheticInputEvent<HTMLInputElement>) => void;
}

declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;
