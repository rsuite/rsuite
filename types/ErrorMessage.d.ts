import * as React from 'react';

import { PropTypes, StandardProps } from './index';

export interface ErrorMessageProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;

  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: PropTypes.Placement8;
}

declare const ErrorMessage: React.ComponentType<ErrorMessageProps>;

export default ErrorMessage;
