import * as React from 'react';

import { PropTypes, StandardProps } from './index';

export interface FormControlProps extends StandardProps {
  /** Proxied components */
  accepter: React.ReactNode;

  /** Callback fired when data changing */
  onChange?: (value: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The name of form-control */
  name: string;

  /** The data validation trigger type, and it wiill overrides the setting on <Form> */
  checkTrigger?: 'change' | 'blur' | 'none';

  /** Show error messages */
  errorMessage?: React.ReactNode;

  /** The placement of error messages */
  errorPlacement?: PropTypes.Placement8;
}

declare const FormControl: React.ComponentType<FormControlProps>;

export default FormControl;
