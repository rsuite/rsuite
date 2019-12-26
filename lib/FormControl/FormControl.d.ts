import * as React from 'react';

import { TypeAttributes, StandardProps } from '../@types/common';

export type FormControlProps<P = {}, ValueType = any> = StandardProps & {
  /** Proxied components */
  accepter?: React.ComponentType<P>;

  /** Callback fired when data changing */
  onChange?: (value: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The name of form-control */
  name?: string;

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

  /** Value */
  value?: ValueType;

  /** Asynchronous check value */
  checkAsync?: boolean;
} & P;

declare function FormControl<P = {}>(props: FormControlProps<P>): React.ReactElement;

export default FormControl;
