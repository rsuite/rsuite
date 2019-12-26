import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ControlLabelProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;

  /** Screen reader only */
  srOnly?: boolean;
}

declare const ControlLabel: React.ComponentType<ControlLabelProps>;

export default ControlLabel;
