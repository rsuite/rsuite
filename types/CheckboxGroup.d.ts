import * as React from 'react';

import { StandardProps, FormControlBaseProps } from './index';

export interface CheckboxGroupProps extends StandardProps, FormControlBaseProps<string> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export default CheckboxGroup;
