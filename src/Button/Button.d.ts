import * as React from 'react';

import { TypeAttributes, StandardProps } from '../@types/common';

export interface ButtonProps extends StandardProps {
  /** A button can have different appearances. */
  appearance?: TypeAttributes.Appearance;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

  /** A button can have different sizes */
  size?: TypeAttributes.Size;

  /** A button can have different colors */
  color?: TypeAttributes.Color;

  /** Primary content */
  children?: React.ReactNode;

  /** Format button to appear inside a content bloc */
  block?: boolean;

  /** Providing a `href` will render an `<a>` element, _styled_ as a button */
  href?: string;

  /** A button can show a loading indicator */
  loading?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** Called when the button is clicked. */
  onClick?: (event: React.SyntheticEvent) => void;

  /** Ripple after button click */
  ripple?: boolean;
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
