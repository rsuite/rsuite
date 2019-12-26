import * as React from 'react';

import { StandardProps, FormControlBaseProps } from '../@types/common';
import { CheckboxProps } from '../Checkbox/Checkbox.d';

export interface CheckboxContextProps {
  inline?: boolean;
  name?: string;
  value?: any[];
  controlled?: boolean;
  onChange?: (value: any, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps<V = any>
  extends StandardProps,
    FormControlBaseProps<CheckboxProps<V>['value'][]> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export const CheckboxContext: React.Context<CheckboxContextProps>;
export default CheckboxGroup;
