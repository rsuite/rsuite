import * as React from 'react';
import { IconProps } from './Icon';

export interface IconButtonProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right';
}

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
