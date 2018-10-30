import * as React from 'react';

export interface ControlLabelProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;

  /** Screen reader only */
  srOnly?: boolean;
}

declare const ControlLabel: React.ComponentType<ControlLabelProps>;

export default ControlLabel;
