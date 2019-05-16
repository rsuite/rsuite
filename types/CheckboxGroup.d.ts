import * as React from 'react';

import { StandardProps, FormControlBaseProps } from './index';
import { CheckboxProps } from './Checkbox';

export interface CheckboxGroupProps<V = any> extends StandardProps, FormControlBaseProps<Array<CheckboxProps<V>['value']>> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export default CheckboxGroup;
