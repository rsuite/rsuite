import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface BadgeProps extends StandardProps {
  /** The content of the wrapped */
  children?: React.ReactChild;

  /** Main content */
  content?: string | number | React.ReactNode;

  /** Max count */
  maxCount?: number;
}

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
