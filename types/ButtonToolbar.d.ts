import * as React from 'react';

export interface ButtonToolbarProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;
}

declare const ButtonToolbar: React.ComponentType<ButtonToolbarProps>;

export default ButtonToolbar;
