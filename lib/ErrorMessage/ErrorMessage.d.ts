import * as React from 'react';

import { TypeAttributes, StandardProps } from '../@types/common';

export interface ErrorMessageProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Show error messages */
  show?: boolean;

  /** The placement of error messages */
  placement?: TypeAttributes.Placement8;
}

declare const ErrorMessage: React.ComponentType<ErrorMessageProps>;

export default ErrorMessage;
