import * as React from 'react';

import { StandardProps, FormControlBaseProps } from '../@types/common';
import { CheckboxProps } from '../Checkbox/Checkbox.d';

export interface CheckboxGroupProps<V = any>
  extends StandardProps,
    FormControlBaseProps<CheckboxProps<V>['value'][]> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactChildren;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export default CheckboxGroup;
