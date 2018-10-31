import * as React from 'react';

export interface IconStackProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Sets the icon size */
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

declare const IconStack: React.ComponentType<IconStackProps>;

export default IconStack;
