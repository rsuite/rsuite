import * as React from 'react';
import { PropTypes } from './index';

export interface FormControlProps {
  /** Proxied components */
  accepter: React.ReactNode;

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Callback fired when data changing */
  onChange?: (value: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The name of form-control */
  name: string;

  /** The data validation trigger type, and it wiill overrides the setting on <Form> */
  checkTrigger?: 'change' | 'blur' | 'none';

  /** Show error messages */
  errorMessage?: React.Node;

  /** The placement of error messages */
  errorPlacement?: PropTypes.Placement8;
}

declare const FormControl: React.ComponentType<FormControlProps>;

export default FormControl;
