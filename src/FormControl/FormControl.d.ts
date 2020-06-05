import * as React from 'react';

import { TypeAttributes, StandardProps } from '../@types/common';

/**
 * Props that FormControl passes to its accepter
 */
export interface FormControlAccepterProps<ValueType = any> {
  /** The name of form-control */
  name?: string;

  defaultValue?: ValueType;

  /** Value */
  value?: ValueType;

  /** Callback fired when data changing */
  onChange?(value: ValueType, event: React.SyntheticEvent<HTMLElement>): void;

  /** Whether form-control readonly */
  readOnly?: boolean;

  onBlur?(event: React.SyntheticEvent<any>): void;
}

/**
 * Props that <FormControl> itself takes
 */
export type FormControlProps<P = {}, ValueType = any> = StandardProps & {
  /** Proxied components */
  accepter?: React.ElementType<P & FormControlAccepterProps<ValueType>>;

  /** The name of form-control */
  name?: string;

  /** Value */
  value?: ValueType;

  /** Callback fired when data changing */
  onChange?(value: ValueType, event: React.SyntheticEvent<HTMLElement>): void;

  /** The data validation trigger type, and it wiill overrides the setting on <Form> */
  checkTrigger?: TypeAttributes.CheckTrigger;

  /** Show error messages */
  errorMessage?: React.ReactNode;

  /** The placement of error messages */
  errorPlacement?: TypeAttributes.Placement8;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Plain text when the control has no value */
  plaintextDefaultValue?: React.ReactNode;

  /** Asynchronous check value */
  checkAsync?: boolean;
};

// FormControl also takes accepter's props and passes them down
declare function FormControl<P = {}, ValueType = any>(
  props: FormControlProps<P, ValueType> & P
): React.ReactElement;

export default FormControl;
