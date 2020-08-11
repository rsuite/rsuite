import * as React from 'react';
import {StandardProps, TypeAttributes} from '../@types/common';

export interface BadgeProps extends StandardProps {
  /** The content of the wrapped */
  children?: React.ReactChild;

  /** Main content */
  content?: string | number | React.ReactNode | boolean;

  /** Max count */
  maxCount?: number;

  /** A badge can have different colors */
  color?: TypeAttributes.Color;
}

declare const Badge: React.ComponentType<BadgeProps>;

export default Badge;
