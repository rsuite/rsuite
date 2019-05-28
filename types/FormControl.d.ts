import * as React from 'react';

import { PropTypes, StandardProps } from './index';

export type FormControlProps<P = {}> = StandardProps & {
  /** Proxied components */
  accepter: React.ComponentType<P>;

  /** Callback fired when data changing */
  onChange?: (value: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The name of form-control */
  name: string;

  /** The data validation trigger type, and it wiill overrides the setting on <Form> */
  checkTrigger?: PropTypes.CheckTrigger;

  /** Show error messages */
  errorMessage?: React.ReactNode;

  /** The placement of error messages */
  errorPlacement?: PropTypes.Placement8;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Plain text when the control has no value */
  plaintextDefaultValue: React.ReactNode;

  /** Value */

  value?: any;
} & P;

declare function FormControl<P = {}>(props: FormControlProps<P>): React.ReactElement;

export default FormControl;
