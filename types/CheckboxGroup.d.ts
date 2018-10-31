import * as React from 'react';

import { StandardProps } from './index';

export interface CheckboxGroupProps extends StandardProps {
  /** Used for the name of the form */
  name?: string;

  /** Current value of the checkboxs. Creates a controlled component */
  value?: string;

  /** Initial value */
  defaultValue?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Called when the user attempts to change the checked state. */
  onChange?: (value: any, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export default CheckboxGroup;
