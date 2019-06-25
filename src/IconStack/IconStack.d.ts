import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface IconStackProps extends StandardProps {
  /** Sets the icon size */
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

declare const IconStack: React.ComponentType<IconStackProps>;

export default IconStack;
