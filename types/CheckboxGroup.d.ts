import * as React from 'react';

export interface CheckboxGroupProps {
  /** Used for the name of the form */
  name?: string;

  /** Current value of the checkboxs. Creates a controlled component */
  value?: string;

  /** Initial value */
  defaultValue?: string;

  children?: React.ReactChildren;

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Called when the user attempts to change the checked state. */
  onChange?: (value: any, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** Additional classes */
  className?: string;

  /** Inline layout */
  inline?: boolean;
}

declare const CheckboxGroup: React.ComponentType<CheckboxGroupProps>;

export default CheckboxGroup;
