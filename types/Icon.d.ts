import * as React from 'react';
import { SVGIcon } from './index';

export interface IconProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** You can use a custom element for this component */
  componentClass: React.ReactType<IconProps>;

  /** Icon name */
  icon: string | SVGIcon;

  /** Sets the icon size */
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';

  /** Flip the icon */
  flip?: 'horizontal' | 'vertical';

  /** Combine multiple icons */
  stack?: '1x' | '2x';

  /** Rotate the icon */
  rotate?: number;

  /** Fixed icon width because there are many icons with uneven size */
  fixedWidth?: boolean;

  /** Set SVG style when using custom SVG Icon */
  svgStyle?: object;

  /** Dynamic rotation icon */

  spin?: boolean;

  /** Use pulse to have it rotate with 8 steps */
  pulse?: boolean;

  /** Inverse color */
  inverse?: boolean;
}

declare const Icon: React.ComponentType<IconProps>;

export default Icon;
