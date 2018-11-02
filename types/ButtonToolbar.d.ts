import * as React from 'react';

import { StandardProps } from './index';

export interface ButtonToolbarProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;
}

declare const ButtonToolbar: React.ComponentType<ButtonToolbarProps>;

export default ButtonToolbar;
