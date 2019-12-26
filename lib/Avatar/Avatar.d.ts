import * as React from 'react';
import { TypeAttributes, StandardProps } from '../@types/common';

export interface AvatarProps extends StandardProps {
  /** The content of the wrapped */
  children?: React.ReactNode;

  /** A avatar can have different sizes */
  size?: TypeAttributes.Size;

  /** Image src */
  src?: string;

  /** Set avatar shape to circle  */
  circle?: boolean;

  /** This attribute defines an alternative text description of the image */
  alt?: string;
}

declare const Avatar: React.ComponentType<AvatarProps>;

export default Avatar;
