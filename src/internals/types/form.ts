import { InputHTMLAttributes, SyntheticEvent } from 'react';

export interface FormControlBaseProps<ValueType = InputHTMLAttributes<HTMLInputElement>['value']> {
  /** Name of the form field */
  name?: string;

  /** Initial value */
  defaultValue?: ValueType;

  /** Current value of the component. Creates a controlled component */
  value?: ValueType;

  /**
   * Called after the value has been changed
   * todo Override event as ChangeEvent in components where onChange is delegated
   *      to an underlying <input> element
   */
  onChange?: (value: ValueType, event: SyntheticEvent) => void;

  /** Set the component to be disabled and cannot be entered */
  disabled?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;
}
