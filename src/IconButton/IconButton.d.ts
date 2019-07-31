import * as React from 'react';

import { IconProps } from '../Icon/Icon.d';
import { ButtonProps } from '../Button/Button.d';
import { StandardProps } from '../@types/common';

export interface IconButtonProps extends StandardProps, ButtonProps {
  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Set circle button */
  circle?: boolean;

  /** The placement of icon */
  placement?: 'left' | 'right';
}

declare const IconButton: React.ComponentType<IconButtonProps>;

export default IconButton;
